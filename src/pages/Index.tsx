
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import StatsCards from '@/components/StatsCards';
import SearchFilter from '@/components/SearchFilter';
import EquipmentGrid from '@/components/EquipmentGrid';
import AddEquipmentDialog from '@/components/AddEquipmentDialog';
import EmailReportDialog from '@/components/EmailReportDialog';
import MaintenanceChecklistDialog from '@/components/MaintenanceChecklistDialog';

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
  // Hawthorn Park Equipment
  {
    id: 1,
    name: "CYBEX Bike Spinner",
    model: "770C",
    serialNumber: "J0319-770C005N",
    category: "Cardio",
    status: "working",
    lastChecked: "2024-06-17",
    location: "Hawthorn Park",
    notes: ""
  },
  {
    id: 2,
    name: "CYBEX Bike Spinner",
    model: "770C",
    serialNumber: "J0721-770C008N",
    category: "Cardio",
    status: "working",
    lastChecked: "2024-06-17",
    location: "Hawthorn Park",
    notes: ""
  },
  {
    id: 3,
    name: "CYBEX Treadmill Intelligent Suspension",
    model: "770T",
    serialNumber: "J0318-770TX062N",
    category: "Cardio",
    status: "working",
    lastChecked: "2024-06-17",
    location: "Hawthorn Park",
    notes: ""
  },
  {
    id: 4,
    name: "CYBEX Treadmill Intelligent Suspension",
    model: "770T",
    serialNumber: "H0927-770TX058N",
    category: "Cardio",
    status: "working",
    lastChecked: "2024-06-17",
    location: "Hawthorn Park",
    notes: ""
  },
  {
    id: 5,
    name: "CYBEX Treadmill Intelligent Suspension",
    model: "770T",
    serialNumber: "H1008-770TX067N",
    category: "Cardio",
    status: "working",
    lastChecked: "2024-06-17",
    location: "Hawthorn Park",
    notes: ""
  },
  {
    id: 6,
    name: "CYBEX Treadmill Intelligent Suspension",
    model: "770T",
    serialNumber: "J0218-770TX049N",
    category: "Cardio",
    status: "working",
    lastChecked: "2024-06-17",
    location: "Hawthorn Park",
    notes: ""
  },
  {
    id: 7,
    name: "CYBEX Treadmill Intelligent Suspension",
    model: "770T",
    serialNumber: "J0218-770TX061N",
    category: "Cardio",
    status: "working",
    lastChecked: "2024-06-17",
    location: "Hawthorn Park",
    notes: ""
  },
  {
    id: 8,
    name: "CYBEX Treadmill Intelligent Suspension",
    model: "770T",
    serialNumber: "J0318-770TX061N",
    category: "Cardio",
    status: "working",
    lastChecked: "2024-06-17",
    location: "Hawthorn Park",
    notes: ""
  },
  {
    id: 9,
    name: "Stairs Master",
    model: "SC",
    serialNumber: "155005DAY13520020",
    category: "Cardio",
    status: "working",
    lastChecked: "2024-06-17",
    location: "Hawthorn Park",
    notes: ""
  },
  {
    id: 10,
    name: "CYBEX Arc Trainer",
    model: "772AT",
    serialNumber: "J0527772AT006N",
    category: "Cardio",
    status: "working",
    lastChecked: "2024-06-17",
    location: "Hawthorn Park",
    notes: ""
  },
  {
    id: 11,
    name: "CYBEX Arc Trainer",
    model: "772AT",
    serialNumber: "J0527772AT009N",
    category: "Cardio",
    status: "working",
    lastChecked: "2024-06-17",
    location: "Hawthorn Park",
    notes: ""
  },
  {
    id: 12,
    name: "CYBEX Arc Trainer",
    model: "772AT",
    serialNumber: "J0514772AT934N",
    category: "Cardio",
    status: "working",
    lastChecked: "2024-06-17",
    location: "Hawthorn Park",
    notes: ""
  },
  {
    id: 13,
    name: "Octane Fitness",
    model: "4700 Touch",
    serialNumber: "F1403EL0097601",
    category: "Cardio",
    status: "working",
    lastChecked: "2024-06-17",
    location: "Hawthorn Park",
    notes: ""
  },
  {
    id: 14,
    name: "Octane Fitness",
    model: "4700 Touch",
    serialNumber: "F1403EL0097801",
    category: "Cardio",
    status: "working",
    lastChecked: "2024-06-17",
    location: "Hawthorn Park",
    notes: ""
  },
  {
    id: 15,
    name: "CYBEX Recom Recline Bike",
    model: "770R",
    serialNumber: "J0319-770R022N",
    category: "Cardio",
    status: "working",
    lastChecked: "2024-06-17",
    location: "Hawthorn Park",
    notes: ""
  },
  {
    id: 16,
    name: "CYBEX Recom Recline Bike",
    model: "770R",
    serialNumber: "J0625-770R017N",
    category: "Cardio",
    status: "working",
    lastChecked: "2024-06-17",
    location: "Hawthorn Park",
    notes: ""
  },
  {
    id: 17,
    name: "VR1 Lat/Row",
    model: "13250",
    serialNumber: "J062713250074N",
    category: "Strength",
    status: "working",
    lastChecked: "2024-06-17",
    location: "Hawthorn Park",
    notes: ""
  },
  {
    id: 18,
    name: "Bravo System Multi",
    model: "8810",
    serialNumber: "J071008810048N",
    category: "Strength",
    status: "working",
    lastChecked: "2024-06-17",
    location: "Hawthorn Park",
    notes: ""
  },
  {
    id: 19,
    name: "VR1 Fly/Delt",
    model: "1311",
    serialNumber: "J032013111430N",
    category: "Strength",
    status: "working",
    lastChecked: "2024-06-17",
    location: "Hawthorn Park",
    notes: ""
  },
  {
    id: 20,
    name: "VR1 Leg Press",
    model: "13041",
    serialNumber: "J041013041664N",
    category: "Strength",
    status: "working",
    lastChecked: "2024-06-17",
    location: "Hawthorn Park",
    notes: ""
  },
  {
    id: 21,
    name: "VR1 Leg Extension Leg Curl",
    model: "13260",
    serialNumber: "J041613260633N",
    category: "Strength",
    status: "working",
    lastChecked: "2024-06-17",
    location: "Hawthorn Park",
    notes: ""
  },
  {
    id: 22,
    name: "Bravo System Multi",
    model: "8810",
    serialNumber: "J071008810046N",
    category: "Strength",
    status: "working",
    lastChecked: "2024-06-17",
    location: "Hawthorn Park",
    notes: ""
  },
  {
    id: 23,
    name: "VR1 Hip Abduction/Adduction",
    model: "13180",
    serialNumber: "J062613180714N",
    category: "Strength",
    status: "working",
    lastChecked: "2024-06-17",
    location: "Hawthorn Park",
    notes: ""
  },
  {
    id: 24,
    name: "VR1 Multi Press",
    model: "13240",
    serialNumber: "J032013240497N",
    category: "Strength",
    status: "working",
    lastChecked: "2024-06-17",
    location: "Hawthorn Park",
    notes: ""
  },
  {
    id: 25,
    name: "Dip Multi",
    model: "16180",
    serialNumber: "J041016180091N",
    category: "Strength",
    status: "working",
    lastChecked: "2024-06-17",
    location: "Hawthorn Park",
    notes: ""
  },
  {
    id: 26,
    name: "Concept 2",
    model: "1997 Model E",
    serialNumber: "0529140-1997-410132628",
    category: "Cardio",
    status: "working",
    lastChecked: "2024-06-17",
    location: "Hawthorn Park",
    notes: ""
  },
  // The Encore Equipment
  {
    id: 27,
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
    id: 28,
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
    id: 29,
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
    id: 30,
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
    id: 31,
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
    id: 32,
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
    id: 33,
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
    id: 34,
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
    id: 35,
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
    id: 36,
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
    id: 37,
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
    id: 38,
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
    id: 39,
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
    id: 40,
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
    id: 41,
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
    id: 42,
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
    id: 43,
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
    id: 44,
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
    id: 45,
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
    id: 46,
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
    id: 47,
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
    id: 48,
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
    id: 49,
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
    id: 50,
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
    id: 51,
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
    id: 52,
    name: "Lat Pull Up/Dip/Abs Station",
    model: "16185",
    serialNumber: "L033116185573N",
    category: "Strength",
    status: "working",
    lastChecked: "2024-06-17",
    location: "The Encore",
    notes: ""
  },
  // The Regent Equipment - Updated with new comprehensive list
  {
    id: 53,
    name: "Octane Fitness",
    model: "XTONE",
    serialNumber: "F1902SS00225-01",
    category: "Cardio",
    status: "working",
    lastChecked: "2024-06-17",
    location: "The Regent",
    notes: ""
  },
  {
    id: 54,
    name: "Octane Fitness",
    model: "XTONE",
    serialNumber: "F1907SS00416-01",
    category: "Cardio",
    status: "working",
    lastChecked: "2024-06-17",
    location: "The Regent",
    notes: ""
  },
  {
    id: 55,
    name: "Octane Fitness",
    model: "XTONE",
    serialNumber: "F1902SS00220-01",
    category: "Cardio",
    status: "working",
    lastChecked: "2024-06-17",
    location: "The Regent",
    notes: ""
  },
  {
    id: 56,
    name: "True Treadmill Soft System",
    model: "Soft System",
    serialNumber: "19-TC6501041H",
    category: "Cardio",
    status: "working",
    lastChecked: "2024-06-17",
    location: "The Regent",
    notes: ""
  },
  {
    id: 57,
    name: "True Treadmill Soft System",
    model: "Soft System",
    serialNumber: "19-TC6500912G",
    category: "Cardio",
    status: "working",
    lastChecked: "2024-06-17",
    location: "The Regent",
    notes: ""
  },
  {
    id: 58,
    name: "True Treadmill Soft System",
    model: "Soft System",
    serialNumber: "19-TC6501042H",
    category: "Cardio",
    status: "working",
    lastChecked: "2024-06-17",
    location: "The Regent",
    notes: ""
  },
  {
    id: 59,
    name: "True Stationary Bike",
    model: "Stationary Bike",
    serialNumber: "19-4073001",
    category: "Cardio",
    status: "working",
    lastChecked: "2024-06-17",
    location: "The Regent",
    notes: ""
  },
  {
    id: 60,
    name: "Octane Fitness Recon",
    model: "Recon",
    serialNumber: "F1906SP00161-01",
    category: "Cardio",
    status: "working",
    lastChecked: "2024-06-17",
    location: "The Regent",
    notes: ""
  },
  {
    id: 61,
    name: "Lat Pulldown / Mid Row Hoist",
    model: "HD-3200",
    serialNumber: "18-03-A00-053126",
    category: "Strength",
    status: "working",
    lastChecked: "2024-06-17",
    location: "The Regent",
    notes: ""
  },
  {
    id: 62,
    name: "Multi Unit Machine Cybex",
    model: "zzzzz",
    serialNumber: "18-03-A00-53135",
    category: "Strength",
    status: "working",
    lastChecked: "2024-06-17",
    location: "The Regent",
    notes: ""
  },
  {
    id: 63,
    name: "XR650 Recumbent Elliptical Octane",
    model: "XR650",
    serialNumber: "F19065P00161-01",
    category: "Cardio",
    status: "working",
    lastChecked: "2024-06-17",
    location: "The Regent",
    notes: ""
  },
  {
    id: 64,
    name: "Stair Master",
    model: "zzzzz",
    serialNumber: "LD0303L18340224",
    category: "Cardio",
    status: "working",
    lastChecked: "2024-06-17",
    location: "The Regent",
    notes: ""
  },
  {
    id: 65,
    name: "True Fitness Stationary Bike",
    model: "C400",
    serialNumber: "19-4073001",
    category: "Cardio",
    status: "working",
    lastChecked: "2024-06-17",
    location: "The Regent",
    notes: ""
  },
  {
    id: 66,
    name: "True Fitness Treadmill",
    model: "TC650",
    serialNumber: "19-TC6501041H",
    category: "Cardio",
    status: "working",
    lastChecked: "2024-06-17",
    location: "The Regent",
    notes: ""
  },
  {
    id: 67,
    name: "True Fitness Treadmill",
    model: "TC650",
    serialNumber: "19-TC6500912G",
    category: "Cardio",
    status: "working",
    lastChecked: "2024-06-17",
    location: "The Regent",
    notes: ""
  },
  {
    id: 68,
    name: "True Fitness Treadmill",
    model: "TC650",
    serialNumber: "19-TC6501042H",
    category: "Cardio",
    status: "working",
    lastChecked: "2024-06-17",
    location: "The Regent",
    notes: ""
  },
  {
    id: 69,
    name: "Exercise Bench Octane",
    model: "Bench",
    serialNumber: "19-14-A04-035136",
    category: "Strength",
    status: "working",
    lastChecked: "2024-06-17",
    location: "The Regent",
    notes: ""
  },
  {
    id: 70,
    name: "Exercise Bench Octane",
    model: "Bench",
    serialNumber: "19-14-A03-037090",
    category: "Strength",
    status: "working",
    lastChecked: "2024-06-17",
    location: "The Regent",
    notes: ""
  },
  {
    id: 71,
    name: "Decline Bench Octane",
    model: "Bench",
    serialNumber: "19-03-002-058397",
    category: "Strength",
    status: "working",
    lastChecked: "2024-06-17",
    location: "The Regent",
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
  const [showMaintenanceDialog, setShowMaintenanceDialog] = useState(false);
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

  const handleDeleteEquipment = (equipmentId: number) => {
    setEquipment(prev => prev.filter(eq => eq.id !== equipmentId));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header 
        onAddEquipment={() => setShowAddDialog(true)}
        onEmailReport={() => setShowEmailDialog(true)}
        onMaintenanceChecklist={() => setShowMaintenanceDialog(true)}
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
                  onDeleteEquipment={handleDeleteEquipment}
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

      <MaintenanceChecklistDialog
        open={showMaintenanceDialog}
        onOpenChange={setShowMaintenanceDialog}
        location={activeLocation}
      />
    </div>
  );
};

export default Index;
