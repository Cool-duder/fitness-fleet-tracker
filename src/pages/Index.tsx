import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import StatsCards from '@/components/StatsCards';
import SearchFilter from '@/components/SearchFilter';
import EquipmentGrid from '@/components/EquipmentGrid';
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
    location: "Hawthorn Park",
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
    location: "Hawthorn Park",
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
    location: "The Encore",
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
    location: "The Encore",
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
    location: "The Regent",
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
    location: "The Regent",
    notes: "New equipment, performing well"
  },
  // Adding all The Encore equipment
  {
    id: 7,
    name: "CYBEX Treadmill",
    model: "770T",
    serialNumber: "L0516-770TX045N",
    category: "Cardio",
    status: "working",
    lastChecked: "2024-06-17",
    location: "The Encore",
    notes: ""
  },
  {
    id: 8,
    name: "CYBEX Treadmill",
    model: "770T",
    serialNumber: "L0609-770TX041N",
    category: "Cardio",
    status: "working",
    lastChecked: "2024-06-17",
    location: "The Encore",
    notes: ""
  },
  {
    id: 9,
    name: "CYBEX Treadmill",
    model: "770T",
    serialNumber: "L0527-770TX031N",
    category: "Cardio",
    status: "working",
    lastChecked: "2024-06-17",
    location: "The Encore",
    notes: ""
  },
  {
    id: 10,
    name: "CYBEX Treadmill",
    model: "770T",
    serialNumber: "L0527-770TX034N",
    category: "Cardio",
    status: "working",
    lastChecked: "2024-06-17",
    location: "The Encore",
    notes: ""
  },
  {
    id: 11,
    name: "CYBEX Treadmill",
    model: "770T",
    serialNumber: "L0603-770TX037N",  
    category: "Cardio",
    status: "working",
    lastChecked: "2024-06-17",
    location: "The Encore",
    notes: ""
  },
  {
    id: 12,
    name: "CYBEX Recon Bike",
    model: "770R",
    serialNumber: "L0617-770R014N",
    category: "Cardio",
    status: "working",
    lastChecked: "2024-06-17",
    location: "The Encore",
    notes: ""
  },
  {
    id: 13,
    name: "CYBEX Stationary Bike",
    model: "770C",
    serialNumber: "L0622-770C011N",
    category: "Cardio",
    status: "working",
    lastChecked: "2024-06-17",
    location: "The Encore",
    notes: ""
  },
  {
    id: 14,
    name: "CYBEX Multipress",
    model: "13240",
    serialNumber: "L042713240819N",
    category: "Strength",
    status: "working",
    lastChecked: "2024-06-17",
    location: "The Encore",
    notes: ""
  },
  {
    id: 15,
    name: "CYBEX Leg Extension/Leg Curl",
    model: "13260",
    serialNumber: "L04271360152N",
    category: "Strength",
    status: "working",
    lastChecked: "2024-06-17",
    location: "The Encore",
    notes: ""
  },
  {
    id: 16,
    name: "CYBEX Leg Press",
    model: "13041",
    serialNumber: "L0420130-41092N",
    category: "Strength",
    status: "working",
    lastChecked: "2024-06-17",
    location: "The Encore",
    notes: ""
  },
  {
    id: 17,
    name: "CYBEX Chest Fly/Rear Delt",
    model: "13111",
    serialNumber: "L04271311727N",
    category: "Strength",
    status: "working",
    lastChecked: "2024-06-17",
    location: "The Encore",
    notes: ""
  },
  {
    id: 18,
    name: "CYBEX Lat/Rower",
    model: "13250",
    serialNumber: "K020513250001N",
    category: "Strength",
    status: "working",
    lastChecked: "2024-06-17",
    location: "The Encore",
    notes: ""
  },
  {
    id: 19,
    name: "CYBEX Incline/Decline Bench",
    model: "16171",
    serialNumber: "L05261671059N",
    category: "Strength",
    status: "working",
    lastChecked: "2024-06-17",
    location: "The Encore",
    notes: ""
  },
  {
    id: 20,
    name: "CYBEX Bravo Bench",
    model: "8821",
    serialNumber: "L051908821434N",
    category: "Strength",
    status: "working",
    lastChecked: "2024-06-17",
    location: "The Encore",
    notes: ""
  },
  {
    id: 21,
    name: "CYBEX Bravo Multi Unit",
    model: "8810",
    serialNumber: "L063008810193N",
    category: "Strength",
    status: "working",
    lastChecked: "2024-06-17",
    location: "The Encore",
    notes: ""
  },
  {
    id: 22,
    name: "CYBEX Adjustable Bench",
    model: "16001",
    serialNumber: "L062416001228N",
    category: "Strength",
    status: "working",
    lastChecked: "2024-06-17",
    location: "The Encore",
    notes: ""
  },
  {
    id: 23,
    name: "Octane Fitness",
    model: "XTONE",
    serialNumber: "F1601MA10577-01",
    category: "Cardio",
    status: "working",
    lastChecked: "2024-06-17",
    location: "The Encore",
    notes: ""
  },
  {
    id: 24,
    name: "Octane Fitness",
    model: "XTONE",
    serialNumber: "F1601MA01585-01",
    category: "Cardio",
    status: "working",
    lastChecked: "2024-06-17",
    location: "The Encore",
    notes: ""
  },
  {
    id: 25,
    name: "Octane Fitness",
    model: "PRO4700",
    serialNumber: "F1601MA01577-01",
    category: "Cardio",
    status: "working",
    lastChecked: "2024-06-17",
    location: "The Encore",
    notes: ""
  },
  {
    id: 26,
    name: "Octane Fitness",
    model: "PRO4700",
    serialNumber: "F1605AP107776-02",
    category: "Cardio",
    status: "working",
    lastChecked: "2024-06-17",
    location: "The Encore",
    notes: ""
  },
  {
    id: 27,
    name: "Octane Fitness",
    model: "XR600",
    serialNumber: "F1603AD08795-02",
    category: "Cardio",
    status: "working",
    lastChecked: "2024-06-17",
    location: "The Encore",
    notes: ""
  },
  {
    id: 28,
    name: "Matrix Rower",
    model: "ROWER-01",
    serialNumber: "AR09151214079",
    category: "Cardio",
    status: "working",
    lastChecked: "2024-06-17",
    location: "The Encore",
    notes: ""
  },
  {
    id: 29,
    name: "Schwinn Spinning Bike",
    model: "Carbon Blue",
    serialNumber: "002-2439",
    category: "Cardio",
    status: "working",
    lastChecked: "2024-06-17",
    location: "The Encore",
    notes: ""
  },
  {
    id: 30,
    name: "CYBEX Back Extension",
    model: "16022",
    serialNumber: "L063016022016N",
    category: "Strength",
    status: "working",
    lastChecked: "2024-06-17",
    location: "The Encore",
    notes: ""
  },
  {
    id: 31,
    name: "CYBEX Hip Abduction/Adduction",
    model: "138180",
    serialNumber: "L052613180355N",
    category: "Strength",
    status: "working",
    lastChecked: "2024-06-17",
    location: "The Encore",
    notes: ""
  },
  {
    id: 32,
    name: "Lat Pull Up/Dip/Abs Station",
    model: "16185",
    serialNumber: "L033116185573N",
    category: "Strength",
    status: "working",
    lastChecked: "2024-06-17",
    location: "The Encore",
    notes: ""
  }
];

const Index = () => {
  const [equipment, setEquipment] = useState<Equipment[]>(sampleEquipment);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [activeLocation, setActiveLocation] = useState('Hawthorn Park');

  const locations = ['Hawthorn Park', 'The Encore', 'The Regent'];
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

  const handleAddEquipment = (newEquipment: Omit<Equipment, 'id'>) => {
    console.log('handleAddEquipment called with:', newEquipment);
    console.log('Current equipment list length:', equipment.length);
    
    const equipmentWithId: Equipment = {
      ...newEquipment,
      id: Date.now(),
      status: newEquipment.status as 'working' | 'needs-attention' | 'out-of-service'
    };
    
    console.log('Equipment with ID created:', equipmentWithId);
    
    setEquipment(prev => {
      console.log('Previous equipment list:', prev);
      const newList = [...prev, equipmentWithId];
      console.log('New equipment list:', newList);
      return newList;
    });
    
    console.log('Closing dialog...');
    setShowAddDialog(false);
  };

  const handleUpdateEquipment = (updatedEquipment: Equipment) => {
    setEquipment(prev => prev.map(eq => 
      eq.id === updatedEquipment.id ? updatedEquipment : eq
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header 
        onAddEquipment={() => setShowAddDialog(true)}
        onEmailReport={() => setShowEmailDialog(true)}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

            return (
              <TabsContent key={location} value={location} className="space-y-6">
                <StatsCards equipment={locationEquipment} />

                <SearchFilter
                  searchTerm={searchTerm}
                  onSearchChange={setSearchTerm}
                  filterCategory={filterCategory}
                  onCategoryChange={setFilterCategory}
                  filterStatus={filterStatus}
                  onStatusChange={setFilterStatus}
                  categories={categories}
                />

                <EquipmentGrid 
                  equipment={filteredEquipment}
                  onUpdateEquipment={handleUpdateEquipment}
                />
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
