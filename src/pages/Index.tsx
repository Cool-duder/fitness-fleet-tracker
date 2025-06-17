
import React, { useState } from 'react';
import { Search, Plus, Filter, CheckCircle, AlertTriangle, XCircle, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import EquipmentCard from '@/components/EquipmentCard';
import AddEquipmentDialog from '@/components/AddEquipmentDialog';
import EmailReportDialog from '@/components/EmailReportDialog';

interface Equipment {
  id: number;
  name: string;
  model: string;
  serialNumber: string;
  category: string;
  status: 'working' | 'needs-attention' | 'out-of-service';
  lastChecked: string;
  location: string;
  notes: string;
}

// Sample equipment data with 3 locations
const sampleEquipment: Equipment[] = [
  {
    id: 1,
    name: "Treadmill Pro X1",
    model: "TP-X1-2023",
    serialNumber: "TP123456789",
    category: "Cardio",
    status: "working",
    lastChecked: "2024-06-15",
    location: "Main Floor",
    notes: "All functions working properly"
  },
  {
    id: 2,
    name: "Elliptical Elite",
    model: "EE-450",
    serialNumber: "EE987654321",
    category: "Cardio",
    status: "needs-attention",
    lastChecked: "2024-06-14",
    location: "Main Floor",
    notes: "Slight noise from left pedal"
  },
  {
    id: 3,
    name: "Leg Press Machine",
    model: "LP-800",
    serialNumber: "LP555666777",
    category: "Strength",
    status: "working",
    lastChecked: "2024-06-16",
    location: "Upper Level",
    notes: "Recently serviced"
  },
  {
    id: 4,
    name: "Cable Crossover",
    model: "CC-Dual-Pro",
    serialNumber: "CC111222333",
    category: "Strength",
    status: "out-of-service",
    lastChecked: "2024-06-13",
    location: "Upper Level",
    notes: "Left cable needs replacement"
  },
  {
    id: 5,
    name: "Rowing Machine",
    model: "RM-Concept2",
    serialNumber: "RM444555666",
    category: "Cardio",
    status: "working",
    lastChecked: "2024-06-16",
    location: "Basement",
    notes: "Excellent condition"
  },
  {
    id: 6,
    name: "Spin Bike Pro",
    model: "SB-Pro-2024",
    serialNumber: "SB777888999",
    category: "Cardio",
    status: "working",
    lastChecked: "2024-06-15",
    location: "Basement",
    notes: "New equipment, performing well"
  }
];

const Index = () => {
  const [equipment, setEquipment] = useState<Equipment[]>(sampleEquipment);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [activeLocation, setActiveLocation] = useState('Main Floor');

  const locations = ['Main Floor', 'Upper Level', 'Basement'];
  const categories = ['Cardio', 'Strength', 'Free Weights', 'Accessories'];

  const getLocationEquipment = (location: string) => {
    return equipment.filter(item => item.location === location);
  };

  const getFilteredEquipment = (locationEquipment: Equipment[]) => {
    return locationEquipment.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.model.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
      const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
      
      return matchesSearch && matchesCategory && matchesStatus;
    });
  };

  const getStatusStats = (locationEquipment: Equipment[]) => {
    const working = locationEquipment.filter(item => item.status === 'working').length;
    const needsAttention = locationEquipment.filter(item => item.status === 'needs-attention').length;
    const outOfService = locationEquipment.filter(item => item.status === 'out-of-service').length;
    
    return { working, needsAttention, outOfService };
  };

  const handleAddEquipment = (newEquipment: Omit<Equipment, 'id'>) => {
    const equipmentWithId: Equipment = {
      ...newEquipment,
      id: Date.now(),
      status: newEquipment.status as 'working' | 'needs-attention' | 'out-of-service'
    };
    setEquipment(prev => [...prev, equipmentWithId]);
    setShowAddDialog(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Fitness Equipment Manager</h1>
              <p className="mt-1 text-sm text-gray-500">Track and maintain your health club equipment</p>
            </div>
            <div className="flex gap-2 mt-4 sm:mt-0">
              <Button 
                onClick={() => setShowEmailDialog(true)}
                variant="outline"
                className="bg-blue-50 hover:bg-blue-100 border-blue-200"
              >
                <Mail className="w-4 h-4 mr-2" />
                Email Report
              </Button>
              <Button 
                onClick={() => setShowAddDialog(true)}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Equipment
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Location Tabs */}
        <Tabs value={activeLocation} onValueChange={setActiveLocation} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            {locations.map(location => (
              <TabsTrigger key={location} value={location} className="text-sm">
                {location}
              </TabsTrigger>
            ))}
          </TabsList>

          {locations.map(location => {
            const locationEquipment = getLocationEquipment(location);
            const filteredEquipment = getFilteredEquipment(locationEquipment);
            const stats = getStatusStats(locationEquipment);

            return (
              <TabsContent key={location} value={location} className="space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="border-l-4 border-l-emerald-500">
                    <CardContent className="p-6">
                      <div className="flex items-center">
                        <CheckCircle className="w-8 h-8 text-emerald-600" />
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-600">Working</p>
                          <p className="text-2xl font-bold text-gray-900">{stats.working}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-amber-500">
                    <CardContent className="p-6">
                      <div className="flex items-center">
                        <AlertTriangle className="w-8 h-8 text-amber-600" />
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-600">Needs Attention</p>
                          <p className="text-2xl font-bold text-gray-900">{stats.needsAttention}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-red-500">
                    <CardContent className="p-6">
                      <div className="flex items-center">
                        <XCircle className="w-8 h-8 text-red-600" />
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-600">Out of Service</p>
                          <p className="text-2xl font-bold text-gray-900">{stats.outOfService}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Search and Filter */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex-1">
                        <div className="relative">
                          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <Input
                            placeholder="Search equipment, serial number, or model..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                          />
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <select
                          value={filterCategory}
                          onChange={(e) => setFilterCategory(e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        >
                          <option value="all">All Categories</option>
                          {categories.map(category => (
                            <option key={category} value={category}>{category}</option>
                          ))}
                        </select>

                        <select
                          value={filterStatus}
                          onChange={(e) => setFilterStatus(e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        >
                          <option value="all">All Status</option>
                          <option value="working">Working</option>
                          <option value="needs-attention">Needs Attention</option>
                          <option value="out-of-service">Out of Service</option>
                        </select>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Equipment Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredEquipment.map(item => (
                    <EquipmentCard 
                      key={item.id} 
                      equipment={item}
                      onUpdate={(updatedEquipment) => {
                        setEquipment(prev => prev.map(eq => 
                          eq.id === updatedEquipment.id ? updatedEquipment : eq
                        ));
                      }}
                    />
                  ))}
                </div>

                {filteredEquipment.length === 0 && (
                  <div className="text-center py-12">
                    <div className="text-gray-400 text-lg">No equipment found matching your criteria</div>
                  </div>
                )}
              </TabsContent>
            );
          })}
        </Tabs>
      </div>

      <AddEquipmentDialog 
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onAdd={handleAddEquipment}
      />

      <EmailReportDialog
        open={showEmailDialog}
        onOpenChange={setShowEmailDialog}
        equipment={equipment}
        locations={locations}
      />
    </div>
  );
};

export default Index;
