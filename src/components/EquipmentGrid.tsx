
import React from 'react';
import EquipmentCard from '@/components/EquipmentCard';

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

interface EquipmentGridProps {
  equipment: Equipment[];
  onUpdateEquipment: (updatedEquipment: Equipment) => void;
}

const EquipmentGrid = ({ equipment, onUpdateEquipment }: EquipmentGridProps) => {
  if (equipment.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-lg">No equipment found matching your criteria</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {equipment.map(item => (
        <EquipmentCard 
          key={item.id} 
          equipment={item}
          onUpdate={onUpdateEquipment}
        />
      ))}
    </div>
  );
};

export default EquipmentGrid;
