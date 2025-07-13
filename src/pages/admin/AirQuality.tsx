
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AdminLayout from '@/components/admin/AdminLayout';
import { BarChart, Upload, Settings, Plus, Gauge, AlertTriangle, CheckCircle, Save, Loader2, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAdminAuth } from '@/context/AdminAuthContext';

type Station = {
  id: string;
  name: string;
  location: string;
  status: string;
  last_updated: string;
  aqi: number;
  category: string;
};

type Alert = {
  id: string;
  station_name: string;
  type: string;
  value: string;
  timestamp: string;
  status: string;
};

const AirQuality = () => {
  const { toast } = useToast();
  const { isAuthenticated } = useAdminAuth();
  const [stations, setStations] = useState<Station[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddStationOpen, setIsAddStationOpen] = useState(false);
  const [newStation, setNewStation] = useState({
    name: '',
    location: '',
    aqi: 50,
    status: 'Active',
  });

  // Fetch air quality data
  const fetchAirQualityData = async () => {
    setIsLoading(true);
    try {
      // Fetch stations data
      const { data: airQualityData, error } = await supabase
        .from('air_quality')
        .select('*')
        .order('location', { ascending: true });
        
      if (error) throw error;
      
      // Transform data to match our component's expected format
      const transformedData = airQualityData.map(item => ({
        id: item.id,
        name: item.location,
        location: item.location,
        status: item.status,
        last_updated: new Date(item.updated_at).toLocaleString(),
        aqi: item.aqi,
        category: getAqiCategory(item.aqi)
      }));
      
      setStations(transformedData);
      
      // Generate some demo alerts based on the data
      const generatedAlerts = transformedData
        .filter(station => station.aqi > 70)
        .map(station => ({
          id: `alert-${station.id}`,
          station_name: station.name,
          type: station.aqi > 90 ? 'High AQI' : 'Rising AQI Trend',
          value: station.aqi > 90 ? `${station.aqi}` : `${station.aqi} (↑10 in 1hr)`,
          timestamp: station.last_updated,
          status: 'Active'
        }));
      
      setAlerts(generatedAlerts);
    } catch (error) {
      console.error('Error fetching air quality data:', error);
      toast({
        title: 'Error',
        description: 'Failed to load air quality data',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Determine AQI category based on value
  const getAqiCategory = (aqi: number) => {
    if (aqi <= 50) return 'Good';
    if (aqi <= 100) return 'Moderate';
    if (aqi <= 150) return 'Unhealthy for Sensitive Groups';
    if (aqi <= 200) return 'Unhealthy';
    if (aqi <= 300) return 'Very Unhealthy';
    return 'Hazardous';
  };
  
  // Get badge color based on AQI category
  const getAqiBadgeColor = (category: string) => {
    switch(category) {
      case "Good":
        return "bg-green-100 text-green-800";
      case "Moderate":
        return "bg-yellow-100 text-yellow-800";
      case "Unhealthy for Sensitive Groups":
      case "Unhealthy":
        return "bg-orange-100 text-orange-800";
      case "Very Unhealthy":
      case "Hazardous":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  
  // Add new station
  const handleAddStation = async () => {
    try {
      // Validate inputs
      if (!newStation.name || !newStation.location || isNaN(newStation.aqi)) {
        toast({
          title: 'Validation Error',
          description: 'Please fill in all required fields with valid values',
          variant: 'destructive'
        });
        return;
      }
      
      // Insert new station to database
      const { data, error } = await supabase
        .from('air_quality')
        .insert([{ 
          location: newStation.location,
          aqi: newStation.aqi,
          status: newStation.status,
        }])
        .select();
        
      if (error) throw error;
      
      toast({
        title: 'Success',
        description: 'Monitoring station added successfully',
      });
      
      // Refresh data and close dialog
      fetchAirQualityData();
      setIsAddStationOpen(false);
      setNewStation({
        name: '',
        location: '',
        aqi: 50,
        status: 'Active',
      });
    } catch (error) {
      console.error('Error adding station:', error);
      toast({
        title: 'Error',
        description: 'Failed to add monitoring station',
        variant: 'destructive'
      });
    }
  };
  
  // Resolve an alert
  const resolveAlert = async (alertId: string) => {
    try {
      // Update alert status in state (in a real app, you'd update it in the database)
      setAlerts(alerts.map(alert => 
        alert.id === alertId 
          ? { ...alert, status: 'Resolved' } 
          : alert
      ));
      
      toast({
        title: 'Alert Resolved',
        description: 'The alert has been marked as resolved',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to resolve alert',
        variant: 'destructive'
      });
    }
  };
  
  // Update station AQI value
  const updateStationAqi = async (stationId: string, newAqi: number) => {
    try {
      const { error } = await supabase
        .from('air_quality')
        .update({ 
          aqi: newAqi,
          updated_at: new Date().toISOString()
        })
        .eq('id', stationId);
        
      if (error) throw error;
      
      // Update locally
      setStations(stations.map(station => 
        station.id === stationId 
          ? { 
              ...station, 
              aqi: newAqi, 
              category: getAqiCategory(newAqi),
              last_updated: new Date().toLocaleString()
            } 
          : station
      ));
      
      toast({
        title: 'AQI Updated',
        description: 'Air Quality Index has been updated',
      });
    } catch (error) {
      console.error('Error updating AQI:', error);
      toast({
        title: 'Error',
        description: 'Failed to update Air Quality Index',
        variant: 'destructive'
      });
    }
  };
  
  // Fetch data on component mount
  useEffect(() => {
    if (isAuthenticated) {
      fetchAirQualityData();
    }
  }, [isAuthenticated]);

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <BarChart size={28} />
          Air Quality Management
        </h1>
        
        <div className="space-x-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Upload size={16} />
            Import Data
          </Button>
          <Button 
            className="flex items-center gap-2" 
            onClick={() => setIsAddStationOpen(true)}
          >
            <Plus size={16} />
            Add Station
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="stations">
        <TabsList className="grid grid-cols-2 mb-6">
          <TabsTrigger value="stations" className="flex items-center gap-2">
            <Gauge size={16} />
            Monitoring Stations
          </TabsTrigger>
          <TabsTrigger value="alerts" className="flex items-center gap-2">
            <AlertTriangle size={16} />
            AQI Alerts
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="stations">
          <Card>
            <CardHeader>
              <CardTitle>Air Quality Monitoring Stations</CardTitle>
              <CardDescription>
                Current status of all monitoring stations in Kano State
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center items-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-kano-primary" />
                </div>
              ) : stations.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500">No monitoring stations found.</p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => setIsAddStationOpen(true)}
                  >
                    <Plus className="mr-2 h-4 w-4" /> Add Your First Station
                  </Button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-gray-200 bg-gray-50">
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Station</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Current AQI</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Updated</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stations.map((station) => (
                        <tr key={station.id} className="border-b border-gray-200 hover:bg-gray-50">
                          <td className="px-4 py-4 text-sm font-medium text-gray-900">{station.name}</td>
                          <td className="px-4 py-4 text-sm text-gray-900">{station.location}</td>
                          <td className="px-4 py-4 text-sm">
                            <Badge className="bg-green-100 text-green-800">
                              {station.status}
                            </Badge>
                          </td>
                          <td className="px-4 py-4 text-sm">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-gray-900">{station.aqi}</span>
                              <div>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-6 w-6 p-0"
                                  onClick={() => updateStationAqi(station.id, Math.max(0, station.aqi - 5))}
                                >
                                  -
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-6 w-6 p-0"
                                  onClick={() => updateStationAqi(station.id, station.aqi + 5)}
                                >
                                  +
                                </Button>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-sm">
                            <Badge className={getAqiBadgeColor(station.category)}>
                              {station.category}
                            </Badge>
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-900">{station.last_updated}</td>
                          <td className="px-4 py-4 text-sm">
                            <Button variant="outline" size="sm" className="h-8 px-2 flex items-center">
                              <Settings className="h-3.5 w-3.5 mr-1" />
                              Manage
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="alerts">
          <Card>
            <CardHeader>
              <CardTitle>Air Quality Alerts</CardTitle>
              <CardDescription>
                Current and recent air quality alerts
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center items-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-kano-primary" />
                </div>
              ) : alerts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500">No air quality alerts at this time.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-gray-200 bg-gray-50">
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Alert ID</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Station</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Value</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Timestamp</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {alerts.map((alert) => (
                        <tr key={alert.id} className="border-b border-gray-200 hover:bg-gray-50">
                          <td className="px-4 py-4 text-sm text-gray-900">#{alert.id.slice(0, 8)}</td>
                          <td className="px-4 py-4 text-sm font-medium text-gray-900">{alert.station_name}</td>
                          <td className="px-4 py-4 text-sm text-gray-900">{alert.type}</td>
                          <td className="px-4 py-4 text-sm font-semibold text-gray-900">{alert.value}</td>
                          <td className="px-4 py-4 text-sm text-gray-900">{alert.timestamp}</td>
                          <td className="px-4 py-4 text-sm">
                            <Badge className={alert.status === 'Active' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}>
                              {alert.status}
                            </Badge>
                          </td>
                          <td className="px-4 py-4 text-sm">
                            {alert.status === 'Active' ? (
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="h-8 px-2 flex items-center text-green-600"
                                onClick={() => resolveAlert(alert.id)}
                              >
                                <CheckCircle className="h-3.5 w-3.5 mr-1" />
                                Resolve
                              </Button>
                            ) : (
                              <Button variant="outline" size="sm" className="h-8 px-2 flex items-center" disabled>
                                Resolved
                              </Button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Add Station Dialog */}
      <Dialog open={isAddStationOpen} onOpenChange={setIsAddStationOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Monitoring Station</DialogTitle>
            <DialogDescription>
              Create a new air quality monitoring station
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="station-name">Station Name</Label>
              <Input 
                id="station-name" 
                placeholder="e.g., Kano Central"
                value={newStation.name}
                onChange={e => setNewStation({...newStation, name: e.target.value, location: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input 
                id="location" 
                placeholder="e.g., Ibrahim Taiwo Road"
                value={newStation.location}
                onChange={e => setNewStation({...newStation, location: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="aqi">Initial AQI Value</Label>
              <Input 
                id="aqi" 
                type="number" 
                min={0}
                max={500}
                value={newStation.aqi}
                onChange={e => setNewStation({...newStation, aqi: parseInt(e.target.value)})}
              />
              <p className="text-xs text-gray-500">
                AQI Scale: 0-50 (Good), 51-100 (Moderate), 101-150 (Unhealthy for Sensitive Groups),
                151-200 (Unhealthy), 201-300 (Very Unhealthy), 301+ (Hazardous)
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select 
                value={newStation.status} 
                onValueChange={value => setNewStation({...newStation, status: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Maintenance">Maintenance</SelectItem>
                  <SelectItem value="Offline">Offline</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddStationOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddStation}>
              <Save className="h-4 w-4 mr-2" />
              Save Station
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AirQuality;
