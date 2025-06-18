
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock } from 'lucide-react';

interface MaintenanceChecklistDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  location: string;
}

const MaintenanceChecklistDialog: React.FC<MaintenanceChecklistDialogProps> = ({
  open,
  onOpenChange,
  location
}) => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    vacuumAirVent: false,
    mobFloor: false,
    bathroom: false,
    paintingBordersFloorPanels: false,
    vacuumFitnessEquipment: false
  });

  const checklistItems = [
    { id: 'vacuumAirVent', label: 'Vacuum Air Vent' },
    { id: 'mobFloor', label: 'Mop Floor' },
    { id: 'bathroom', label: 'Bathroom' },
    { id: 'paintingBordersFloorPanels', label: 'Painting Borders and Floor Panels' },
    { id: 'vacuumFitnessEquipment', label: 'Vacuum Fitness Equipment' }
  ];

  const handleItemCheck = (itemId: string, checked: boolean) => {
    setCheckedItems(prev => ({
      ...prev,
      [itemId]: checked
    }));
  };

  const allItemsCompleted = Object.values(checkedItems).every(item => item);
  const completedCount = Object.values(checkedItems).filter(item => item).length;

  const handleClose = () => {
    setCheckedItems({
      vacuumAirVent: false,
      mobFloor: false,
      bathroom: false,
      paintingBordersFloorPanels: false,
      vacuumFitnessEquipment: false
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Maintenance Checklist - {location}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Progress</span>
            <Badge variant={allItemsCompleted ? "default" : "secondary"}>
              {completedCount}/{checklistItems.length}
            </Badge>
          </div>

          <div className="space-y-3">
            {checklistItems.map((item) => (
              <div key={item.id} className="flex items-center space-x-3">
                <Checkbox
                  id={item.id}
                  checked={checkedItems[item.id]}
                  onCheckedChange={(checked) => handleItemCheck(item.id, checked as boolean)}
                />
                <label
                  htmlFor={item.id}
                  className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
                    checkedItems[item.id] ? 'line-through text-gray-500' : ''
                  }`}
                >
                  {item.label}
                </label>
                {checkedItems[item.id] && (
                  <CheckCircle className="w-4 h-4 text-green-600" />
                )}
              </div>
            ))}
          </div>

          {allItemsCompleted && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-md">
              <p className="text-sm text-green-800 font-medium">
                ✅ All maintenance tasks completed for {location}!
              </p>
            </div>
          )}

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={handleClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MaintenanceChecklistDialog;
