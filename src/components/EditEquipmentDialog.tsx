
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

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

interface EditEquipmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  equipment: Equipment;
  onUpdate: (equipment: Equipment) => void;
  onReplace: (equipment: Equipment) => void;
}

const EditEquipmentDialog: React.FC<EditEquipmentDialogProps> = ({
  open,
  onOpenChange,
  equipment,
  onUpdate,
  onReplace
}) => {
  const [formData, setFormData] = useState({
    name: equipment.name,
    model: equipment.model,
    serialNumber: equipment.serialNumber,
    category: equipment.category,
    location: equipment.location,
    notes: equipment.notes
  });

  const categories = ['Cardio', 'Strength', 'Free Weights', 'Accessories'];
  const locations = ['Hawthorn Park', 'The Encore', 'The Regent'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const updatedEquipment = {
      ...equipment,
      ...formData
    };

    onUpdate(updatedEquipment);
    onOpenChange(false);
  };

  const handleReplace = () => {
    const replacementEquipment = {
      ...equipment,
      ...formData,
      status: 'working' as const,
      lastChecked: new Date().toISOString().split('T')[0]
    };

    onReplace(replacementEquipment);
    onOpenChange(false);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Equipment</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Equipment Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="model">Model</Label>
            <Input
              id="model"
              value={formData.model}
              onChange={(e) => handleChange('model', e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="serialNumber">Serial Number</Label>
            <Input
              id="serialNumber"
              value={formData.serialNumber}
              onChange={(e) => handleChange('serialNumber', e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="category">Category</Label>
            <select
              id="category"
              value={formData.category}
              onChange={(e) => handleChange('category', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div>
            <Label htmlFor="location">Location</Label>
            <select
              id="location"
              value={formData.location}
              onChange={(e) => handleChange('location', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {locations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
          </div>

          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleChange('notes', e.target.value)}
              placeholder="Equipment notes..."
              rows={3}
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1 bg-emerald-600 hover:bg-emerald-700">
              Update Equipment
            </Button>
            <Button
              type="button"
              onClick={handleReplace}
              className="flex-1 bg-orange-600 hover:bg-orange-700"
            >
              Replace Equipment
            </Button>
          </div>
          
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="w-full"
          >
            Cancel
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditEquipmentDialog;
