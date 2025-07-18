

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface AddEquipmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (equipment: any) => void;
}

const AddEquipmentDialog: React.FC<AddEquipmentDialogProps> = ({
  open,
  onOpenChange,
  onAdd
}) => {
  const [formData, setFormData] = useState({
    name: '',
    model: '',
    serialNumber: '',
    category: 'Cardio',
    location: 'Hawthorn Park',
    notes: ''
  });

  const categories = ['Cardio', 'Strength', 'Free Weights', 'Accessories'];
  const locations = ['Hawthorn Park', 'The Encore', 'The Regent'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('Form submitted with data:', formData);
    
    // Close virtual keyboard on mobile/iPad
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    
    const newEquipment = {
      ...formData,
      status: 'working',
      lastChecked: new Date().toISOString().split('T')[0]
    };

    console.log('New equipment object created:', newEquipment);
    console.log('Calling onAdd function...');
    
    // Use setTimeout to ensure state updates don't conflict with dialog closing
    setTimeout(() => {
      onAdd(newEquipment);
      
      console.log('Equipment added, resetting form...');
      
      // Reset form
      setFormData({
        name: '',
        model: '',
        serialNumber: '',
        category: 'Cardio',
        location: 'Hawthorn Park',
        notes: ''
      });

      console.log('Form reset complete');
      
      // Close dialog after a brief delay
      setTimeout(() => {
        onOpenChange(false);
      }, 100);
    }, 50);
  };

  const handleChange = (field: string, value: string) => {
    console.log(`Updating field ${field} with value:`, value);
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Trigger form submission
    const form = e.currentTarget.closest('form');
    if (form) {
      form.requestSubmit();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Equipment</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Equipment Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="e.g., Treadmill Pro X1"
              required
              autoComplete="off"
            />
          </div>

          <div>
            <Label htmlFor="model">Model</Label>
            <Input
              id="model"
              value={formData.model}
              onChange={(e) => handleChange('model', e.target.value)}
              placeholder="e.g., TP-X1-2023"
              required
              autoComplete="off"
            />
          </div>

          <div>
            <Label htmlFor="serialNumber">Serial Number</Label>
            <Input
              id="serialNumber"
              value={formData.serialNumber}
              onChange={(e) => handleChange('serialNumber', e.target.value)}
              placeholder="e.g., TP123456789"
              required
              autoComplete="off"
            />
          </div>

          <div>
            <Label htmlFor="category">Category</Label>
            <select
              id="category"
              value={formData.category}
              onChange={(e) => handleChange('category', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 text-base"
              style={{ fontSize: '16px' }} // Prevents zoom on iOS
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 text-base"
              style={{ fontSize: '16px' }} // Prevents zoom on iOS
            >
              {locations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
          </div>

          <div>
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleChange('notes', e.target.value)}
              placeholder="Any additional information..."
              rows={3}
              style={{ fontSize: '16px' }} // Prevents zoom on iOS
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button 
              type="button"
              onClick={handleAddClick}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 touch-manipulation"
              style={{ minHeight: '44px' }} // Better touch target for mobile
            >
              Add Equipment
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 touch-manipulation"
              style={{ minHeight: '44px' }} // Better touch target for mobile
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddEquipmentDialog;

