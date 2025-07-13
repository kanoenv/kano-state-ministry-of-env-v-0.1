import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AdminLayout from '@/components/admin/AdminLayout';
import { BarChart, FileText, Users, AlertTriangle, Loader2, Briefcase, ArrowRight, TrendingUp, TrendingDown, Activity, Clock, Download, Filter, Calendar, RefreshCw, Eye, MapPin, Zap } from 'lucide-react';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const Dashboard = () => {
  const { adminUser, isAuthenticated } = useAdminAuth();
  const { toast } = useToast();
  const [dashboardData, setDashboardData] = useState({
    totalReports: 0,
    contentPublished: 0,
    userVisits: 0,
    airQualityStations: 0,
    recruitmentApplications: 0
  });
  const [recentReports, setRecentReports] = useState<any[]>([]);
  const [recentApplications, setRecentApplications] = useState<any[]>([]);
  const [airQualityData, setAirQualityData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      const { count: reportsCount, error: reportsError } = await supabase
        .from('reports')
        .select('*', { count: 'exact', head: true });
        
      if (reportsError) throw reportsError;
      
      const { count: contentCount, error: contentError } = await supabase
        .from('content')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'Published');
        
      if (contentError) throw contentError;
      
      const { count: stationsCount, error: stationsError } = await supabase
        .from('air_quality')
        .select('*', { count: 'exact', head: true });
        
      if (stationsError) throw stationsError;
      
      const { count: applicationsCount, error: applicationsError } = await supabase
        .from('recruitment_applications')
        .select('*', { count: 'exact', head: true });
        
      if (applicationsError) throw applicationsError;
      
      setDashboardData({
        totalReports: reportsCount || 0,
        contentPublished: contentCount || 0,
        userVisits: 1284,
        airQualityStations: stationsCount || 0,
        recruitmentApplications: applicationsCount || 0
      });
      
      const { data: reports, error: recentReportsError } = await supabase
        .from('reports')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(4);
        
      if (recentReportsError) throw recentReportsError;
      setRecentReports(reports || []);
      
      const { data: applications, error: recentApplicationsError } = await supabase
        .from('recruitment_applications')
        .select('full_name, reference_number, lga_of_origin, status, created_at')
        .order('created_at', { ascending: false })
        .limit(4);
        
      if (recentApplicationsError) throw recentApplicationsError;
      setRecentApplications(applications || []);
      
      const { data: airQuality, error: airQualityError } = await supabase
        .from('air_quality')
        .select('*')
        .order('location', { ascending: true });
        
      if (airQualityError) throw airQualityError;
      setAirQualityData(airQuality || []);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast({
        title: 'Error',
        description: 'Failed to load dashboard data',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    if (isAuthenticated) {
      fetchDashboardData();
    }
  }, [isAuthenticated]);
  
  const getAqiCategory = (aqi: number) => {
    if (aqi <= 50) return { label: 'Good', color: 'bg-emerald-500', textColor: 'text-emerald-800', bgColor: 'bg-emerald-50', borderColor: 'border-emerald-200' };
    if (aqi <= 100) return { label: 'Moderate', color: 'bg-yellow-500', textColor: 'text-yellow-800', bgColor: 'bg-yellow-50', borderColor: 'border-yellow-200' };
    if (aqi <= 150) return { label: 'Unhealthy for Sensitive', color: 'bg-orange-500', textColor: 'text-orange-800', bgColor: 'bg-orange-50', borderColor: 'border-orange-200' };
    if (aqi <= 200) return { label: 'Unhealthy', color: 'bg-red-500', textColor: 'text-red-800', bgColor: 'bg-red-50', borderColor: 'border-red-200' };
    if (aqi <= 300) return { label: 'Very Unhealthy', color: 'bg-purple-500', textColor: 'text-purple-800', bgColor: 'bg-purple-50', borderColor: 'border-purple-200' };
    return { label: 'Hazardous', color: 'bg-rose-500', textColor: 'text-rose-800', bgColor: 'bg-rose-50', borderColor: 'border-rose-200' };
  };
  
  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'New': { variant: 'destructive' as const, icon: <Clock className="h-3 w-3" /> },
      'In Progress': { variant: 'default' as const, icon: <Activity className="h-3 w-3" /> },
      'Under Review': { variant: 'secondary' as const, icon: <Eye className="h-3 w-3" /> },
      'Resolved': { variant: 'outline' as const, icon: <TrendingUp className="h-3 w-3" />, className: 'border-green-200 bg-green-50 text-green-800' },
      'Pending': { variant: 'secondary' as const, icon: <Clock className="h-3 w-3" /> },
      'Shortlisted': { variant: 'default' as const, icon: <TrendingUp className="h-3 w-3" /> },
      'Interview': { variant: 'default' as const, icon: <Activity className="h-3 w-3" /> },
      'Approved': { variant: 'outline' as const, icon: <TrendingUp className="h-3 w-3" />, className: 'border-green-200 bg-green-50 text-green-800' },
      'Rejected': { variant: 'destructive' as const, icon: <TrendingDown className="h-3 w-3" /> }
    };
    
    const config = statusConfig[status] || { variant: 'outline' as const, icon: null };
    
    return (
      <Badge variant={config.variant} className={`text-xs flex items-center gap-1 ${config.className || ''}`}>
        {config.icon}
        {status}
      </Badge>
    );
  };
  
  const stats = [
    {
      title: "Environmental Reports",
      value: dashboardData.totalReports.toString(),
      description: "Issues reported by citizens",
      icon: <AlertTriangle className="h-6 w-6" />,
      change: dashboardData.totalReports > 0 ? "+12% from last month" : "No reports yet",
      trend: "up" as const,
      gradient: "from-red-500 via-red-600 to-red-700",
      bgGradient: "from-red-50 to-red-100/50",
      link: "/admin/reports",
      accentColor: "red"
    },
    {
      title: "Published Content",
      value: dashboardData.contentPublished.toString(),
      description: "News articles and resources",
      icon: <FileText className="h-6 w-6" />,
      change: dashboardData.contentPublished > 0 ? "+8% from last month" : "No content yet",
      trend: "up" as const,
      gradient: "from-blue-500 via-blue-600 to-blue-700",
      bgGradient: "from-blue-50 to-blue-100/50",
      link: "/admin/content",
      accentColor: "blue"
    },
    {
      title: "Active Users",
      value: dashboardData.userVisits.toLocaleString(),
      description: "Unique visitors this month",
      icon: <Users className="h-6 w-6" />,
      change: "+18% from last month",
      trend: "up" as const,
      gradient: "from-emerald-500 via-emerald-600 to-emerald-700",
      bgGradient: "from-emerald-50 to-emerald-100/50",
      link: "/admin/dashboard",
      accentColor: "emerald"
    },
    {
      title: "Job Applications",
      value: dashboardData.recruitmentApplications.toString(),
      description: "Forest Guard applications",
      icon: <Briefcase className="h-6 w-6" />,
      change: dashboardData.recruitmentApplications > 0 ? "New applications" : "No applications",
      trend: dashboardData.recruitmentApplications > 0 ? "up" as const : "neutral" as const,
      gradient: "from-purple-500 via-purple-600 to-purple-700",
      bgGradient: "from-purple-50 to-purple-100/50",
      link: "/admin/recruitment",
      accentColor: "purple"
    }
  ];
  
  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Enhanced Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-kano-primary to-green-600 flex items-center justify-center">
                <BarChart className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Dashboard Overview</h1>
                <p className="text-gray-600 dark:text-gray-400">Welcome back, {adminUser?.full_name}. Here's your ministry's performance.</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="outline" size="sm" className="h-9">
              <Calendar className="h-4 w-4 mr-2" />
              Last 30 days
            </Button>
            <Button variant="outline" size="sm" className="h-9" onClick={fetchDashboardData}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button variant="outline" size="sm" className="h-9">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button size="sm" className="h-9 bg-gradient-to-r from-kano-primary to-green-600 hover:from-kano-primary/90 hover:to-green-600/90">
              <BarChart className="h-4 w-4 mr-2" />
              Analytics
            </Button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-center space-y-4">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-kano-primary to-green-600 flex items-center justify-center mx-auto">
                <Loader2 className="h-8 w-8 animate-spin text-white" />
              </div>
              <div>
                <p className="text-lg font-medium text-gray-900 dark:text-gray-100">Loading dashboard</p>
                <p className="text-gray-600 dark:text-gray-400">Fetching your latest data...</p>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Enhanced Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={index} className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group bg-white dark:bg-gray-800">
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} opacity-60 dark:opacity-40`}></div>
                  <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${stat.gradient}`}></div>
                  
                  <CardContent className="relative p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.gradient} text-white shadow-lg`}>
                        {stat.icon}
                      </div>
                      {stat.trend === "up" && (
                        <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                          <TrendingUp className="h-4 w-4" />
                          <span className="text-xs font-medium">↗</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                      <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{stat.value}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{stat.description}</p>
                      
                      <div className="flex items-center justify-between pt-2">
                        <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">{stat.change}</p>
                        <Link to={stat.link}>
                          <Button variant="ghost" size="sm" className="text-xs h-7 opacity-0 group-hover:opacity-100 transition-opacity">
                            View
                            <ArrowRight className="h-3 w-3 ml-1" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Enhanced Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              {/* Recent Reports Table */}
              <Card className="xl:col-span-2 border-0 shadow-lg bg-white dark:bg-gray-800">
                <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 border-b dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30">
                        <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">Recent Environmental Reports</CardTitle>
                        <CardDescription>Latest issues reported by citizens</CardDescription>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50/50 dark:bg-gray-700/50 border-b dark:border-gray-700">
                        <tr>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Type</th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Location</th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Date</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                        {recentReports.length > 0 ? (
                          recentReports.map((report) => (
                            <tr key={report.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                              <td className="px-6 py-4">
                                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{report.type}</span>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                  <MapPin className="h-3 w-3" />
                                  {report.location}
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                {getStatusBadge(report.status)}
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                                {new Date(report.created_at).toLocaleDateString()}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={4} className="px-6 py-16 text-center text-gray-500 dark:text-gray-400">
                              <div className="space-y-3">
                                <AlertTriangle className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto" />
                                <div>
                                  <p className="text-lg font-medium">No reports available</p>
                                  <p className="text-sm">Reports from citizens will appear here</p>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                  
                  {recentReports.length > 0 && (
                    <div className="px-6 py-4 bg-gray-50/50 dark:bg-gray-700/50 border-t dark:border-gray-700">
                      <Link to="/admin/reports">
                        <Button variant="outline" size="sm" className="w-full">
                          View All Reports
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              {/* Enhanced Air Quality Monitor */}
              <Card className="border-0 shadow-lg bg-white dark:bg-gray-800">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-emerald-50 dark:from-blue-900/30 dark:to-emerald-900/30 border-b dark:border-gray-700">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                      <Zap className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Air Quality Monitor</CardTitle>
                      <CardDescription>Real-time environmental readings</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {airQualityData.length > 0 ? (
                      airQualityData.map((station) => {
                        const category = getAqiCategory(station.aqi);
                        
                        return (
                          <div key={station.id} className={`p-4 border rounded-xl ${category.borderColor} ${category.bgColor} hover:shadow-md transition-all duration-200`}>
                            <div className="flex justify-between items-center mb-3">
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                                <span className="font-semibold text-gray-900 dark:text-gray-100">{station.location}</span>
                              </div>
                              <Badge className={`${category.bgColor} ${category.textColor} border-0 font-medium`}>
                                {category.label}
                              </Badge>
                            </div>
                            <div className="space-y-3">
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600 dark:text-gray-400">AQI Level</span>
                                <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">{station.aqi}</span>
                              </div>
                              <Progress value={Math.min(100, (station.aqi / 300) * 100)} className="h-2" />
                              <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                                <span>Last updated</span>
                                <span className="font-medium">{new Date(station.updated_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="text-center py-8 space-y-3">
                        <Zap className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto" />
                        <div>
                          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">No monitoring stations configured</p>
                          <p className="text-gray-400 dark:text-gray-500 text-xs">Configure stations to see air quality data</p>
                        </div>
                      </div>
                    )}
                    
                    <Link to="/admin/air-quality">
                      <Button variant="outline" size="sm" className="w-full mt-4">
                        <BarChart className="h-4 w-4 mr-2" />
                        Manage Stations
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Enhanced Applications Table */}
            <Card className="border-0 shadow-lg bg-white dark:bg-gray-800">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/30 dark:to-blue-900/30 border-b dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30">
                      <Briefcase className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Recent Forest Guard Applications</CardTitle>
                      <CardDescription>Latest recruitment applications received</CardDescription>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50/50 dark:bg-gray-700/50 border-b dark:border-gray-700">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Reference</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Applicant</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">LGA</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Applied</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                      {recentApplications.length > 0 ? (
                        recentApplications.map((application, index) => (
                          <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                            <td className="px-6 py-4">
                              <span className="text-sm font-mono font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded">
                                {application.reference_number}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100">{application.full_name}</td>
                            <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{application.lga_of_origin}</td>
                            <td className="px-6 py-4">
                              {getStatusBadge(application.status)}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                              {new Date(application.created_at).toLocaleDateString()}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={5} className="px-6 py-16 text-center text-gray-500 dark:text-gray-400">
                            <div className="space-y-3">
                              <Briefcase className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto" />
                              <div>
                                <p className="text-lg font-medium">No applications yet</p>
                                <p className="text-sm">Forest Guard applications will appear here</p>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                
                {recentApplications.length > 0 && (
                  <div className="px-6 py-4 bg-gray-50/50 dark:bg-gray-700/50 border-t dark:border-gray-700">
                    <Link to="/admin/recruitment">
                      <Button variant="outline" size="sm" className="w-full">
                        <Briefcase className="h-4 w-4 mr-2" />
                        Manage All Applications
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
