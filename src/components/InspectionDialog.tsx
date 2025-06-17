
import React, { useState } from 'react';
import { CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

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

interface InspectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  equipment: Equipment;
  onUpdate: (equipment: Equipment) => void;
}

const InspectionDialog: React.FC<InspectionDialogProps> = ({
  open,
  onOpenChange,
  equipment,
  onUpdate
}) => {
  const [status, setStatus] = useState(equipment.status);
  const [notes, setNotes] = useState('');
  const [checkItems, setCheckItems] = useState({
    powerOn: false,
    displayWorking: false,
    safetyFeatures: false,
    physicalCondition: false,
    calibration: false,
    cleaning: false
  });

  const handleSubmit = () => {
    const updatedEquipment = {
      ...equipment,
      status: status as 'working' | 'needs-attention' | 'out-of-service',
      lastChecked: new Date().toISOString().split('T')[0],
      notes: notes || equipment.notes
    };

    onUpdate(updatedEquipment);
  };

  const getStatusIcon = (statusType: string) => {
    switch (statusType) {
      case 'working':
        return <CheckCircle className="w-5 h-5 text-emerald-600" />;
      case 'needs-attention':
        return <AlertTriangle className="w-5 h-5 text-amber-600" />;
      case 'out-of-service':
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Equipment Inspection: {equipment.name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Equipment Info */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Model:</span> {equipment.model}
              </div>
              <div>
                <span className="font-medium">Serial:</span> {equipment.serialNumber}
              </div>
              <div>
                <span className="font-medium">Location:</span> {equipment.location}
              </div>
              <div>
                <span className="font-medium">Category:</span> {equipment.category}
              </div>
            </div>
          </div>

          {/* Inspection Checklist */}
          <div>
            <h3 className="text-lg font-medium mb-4">Inspection Checklist</h3>
            <div className="space-y-3">
              {Object.entries({
                powerOn: "Power on/off functionality",
                displayWorking: "Display and controls working",
                safetyFeatures: "Safety features operational",
                physicalCondition: "Good physical condition (no damage)",
                calibration: "Calibration/settings correct",
                cleaning: "Equipment cleaned and sanitized"
              }).map(([key, label]) => (
                <div key={key} className="flex items-center space-x-2">
                  <Checkbox
                    id={key}
                    checked={checkItems[key as keyof typeof checkItems]}
                    onCheckedChange={(checked) => 
                      setCheckItems(prev => ({ ...prev, [key]: checked }))
                    }
                  />
                  <Label htmlFor={key} className="text-sm">{label}</Label>
                </div>
              ))}
            </div>
          </div>

          {/* Status Selection */}
          <div>
            <h3 className="text-lg font-medium mb-4">Equipment Status</h3>
            <RadioGroup value={status} onValueChange={setStatus}>
              <div className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-gray-50">
                <RadioGroupItem value="working" id="working" />
                <Label htmlFor="working" className="flex items-center gap-2 cursor-pointer flex-1">
                  {getStatusIcon('working')}
                  <div>
                    <div className="font-medium text-emerald-700">Working</div>
                    <div className="text-xs text-gray-600">Equipment is functioning properly</div>
                  </div>
                </Label>
              </div>

              <div className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-gray-50">
                <RadioGroupItem value="needs-attention" id="needs-attention" />
                <Label htmlFor="needs-attention" className="flex items-center gap-2 cursor-pointer flex-1">
                  {getStatusIcon('needs-attention')}
                  <div>
                    <div className="font-medium text-amber-700">Needs Attention</div>
                    <div className="text-xs text-gray-600">Minor issues that need addressing</div>
                  </div>
                </Label>
              </div>

              <div className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-gray-50">
                <RadioGroupItem value="out-of-service" id="out-of-service" />
                <Label htmlFor="out-of-service" className="flex items-center gap-2 cursor-pointer flex-1">
                  {getStatusIcon('out-of-service')}
                  <div>
                    <div className="font-medium text-red-700">Out of Service</div>
                    <div className="text-xs text-gray-600">Equipment cannot be used safely</div>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Notes */}
          <div>
            <Label htmlFor="notes" className="text-lg font-medium mb-2 block">
              Inspection Notes
            </Label>
            <Textarea
              id="notes"
              placeholder="Add any observations, issues found, or maintenance notes..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              onClick={handleSubmit}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700"
            >
              Complete Inspection
            </Button>
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InspectionDialog;
