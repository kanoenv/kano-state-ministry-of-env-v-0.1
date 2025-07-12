
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { TreePine, Users, MapPin, Target, Calendar, TrendingUp } from 'lucide-react';

const TreeCampaignProgress = () => {
  // Mock data - in a real app, this would come from your database
  const campaignData = {
    totalTarget: 5000000,
    currentPlanted: 1250000,
    registeredOrganizations: 147,
    activePlantingSites: 89,
    volunteersEngaged: 2340,
    survivabilityRate: 87.5,
    lastUpdated: '2025-01-02'
  };

  const progressPercentage = (campaignData.currentPlanted / campaignData.totalTarget) * 100;

  const stats = [
    {
      icon: TreePine,
      label: 'Trees Planted',
      value: campaignData.currentPlanted.toLocaleString(),
      target: campaignData.totalTarget.toLocaleString(),
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      icon: Users,
      label: 'Organizations',
      value: campaignData.registeredOrganizations,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: MapPin,
      label: 'Active Sites',
      value: campaignData.activePlantingSites,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      icon: Target,
      label: 'Volunteers',
      value: campaignData.volunteersEngaged.toLocaleString(),
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">2025 Five Million Trees Campaign</h1>
        <p className="text-lg text-gray-600">Progress Tracker</p>
        <p className="text-sm text-gray-500 mt-1">Last updated: {campaignData.lastUpdated}</p>
      </div>

      {/* Main Progress Card */}
      <Card className="border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-green-800">Overall Campaign Progress</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">
              {progressPercentage.toFixed(1)}%
            </div>
            <p className="text-gray-600">
              {campaignData.currentPlanted.toLocaleString()} of {campaignData.totalTarget.toLocaleString()} trees planted
            </p>
          </div>
          <Progress value={progressPercentage} className="h-4" />
          <div className="flex justify-between text-sm text-gray-500">
            <span>0</span>
            <span>{campaignData.totalTarget.toLocaleString()} trees</span>
          </div>
        </CardContent>
      </Card>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}
                    </p>
                    {stat.target && (
                      <p className="text-xs text-gray-500">Target: {stat.target}</p>
                    )}
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <IconComponent className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              Survival Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600 mb-2">
              {campaignData.survivabilityRate}%
            </div>
            <p className="text-gray-600">
              Average tree survival rate across all planting sites
            </p>
            <Progress value={campaignData.survivabilityRate} className="h-2 mt-3" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              Campaign Timeline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Campaign Started</span>
                <span className="text-sm font-medium">January 2025</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Current Phase</span>
                <span className="text-sm font-medium text-green-600">Active Planting</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Expected Completion</span>
                <span className="text-sm font-medium">December 2025</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Planting Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="font-medium">Kano Metropolitan Tree Planting</p>
                <p className="text-sm text-gray-600">15,000 trees planted across major roads</p>
              </div>
              <span className="text-sm text-gray-500">2 days ago</span>
            </div>
            <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="font-medium">School Partnership Program</p>
                <p className="text-sm text-gray-600">12 schools joined the campaign</p>
              </div>
              <span className="text-sm text-gray-500">5 days ago</span>
            </div>
            <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <div className="flex-1">
                <p className="font-medium">Community Volunteer Training</p>
                <p className="text-sm text-gray-600">200 volunteers completed training</p>
              </div>
              <span className="text-sm text-gray-500">1 week ago</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TreeCampaignProgress;
