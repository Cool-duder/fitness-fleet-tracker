
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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
  const [status, setStatus] = useState<'working' | 'needs-attention' | 'out-of-service'>(equipment.status);
  const [notes, setNotes] = useState(equipment.notes);

  const predefinedNotes = [
    'Needs Lubricant',
    'Not functioning properly',
    'Making noise',
    'Out of order',
    'Replace cable',
    'Check belt and strap',
    'Needs repair',
    'Check fastener bolt or screw'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const updatedEquipment = {
      ...equipment,
      status,
      notes,
      lastChecked: new Date().toISOString().split('T')[0]
    };

    onUpdate(updatedEquipment);
  };

  const handleStatusChange = (newStatus: 'working' | 'needs-attention' | 'out-of-service') => {
    setStatus(newStatus);
  };

  const handlePredefinedNoteSelect = (selectedNote: string) => {
    setNotes(prev => {
      if (prev && !prev.endsWith('\n') && prev.length > 0) {
        return prev + '\n' + selectedNote;
      }
      return prev + selectedNote;
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Inspect {equipment.name}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm text-gray-600">
              <strong>Model:</strong> {equipment.model}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Serial:</strong> {equipment.serialNumber}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Location:</strong> {equipment.location}
            </p>
          </div>

          <div>
            <Label>Status</Label>
            <div className="grid grid-cols-1 gap-2 mt-2">
              <Button
                type="button"
                variant={status === 'working' ? 'default' : 'outline'}
                onClick={() => handleStatusChange('working')}
                className={status === 'working' ? 'bg-emerald-600 hover:bg-emerald-700' : ''}
              >
                Working
              </Button>
              <Button
                type="button"
                variant={status === 'needs-attention' ? 'default' : 'outline'}
                onClick={() => handleStatusChange('needs-attention')}
                className={status === 'needs-attention' ? 'bg-amber-600 hover:bg-amber-700' : ''}
              >
                Needs Attention
              </Button>
              <Button
                type="button"
                variant={status === 'out-of-service' ? 'default' : 'outline'}
                onClick={() => handleStatusChange('out-of-service')}
                className={status === 'out-of-service' ? 'bg-red-600 hover:bg-red-700' : ''}
              >
                Out of Service
              </Button>
            </div>
          </div>

          <div>
            <Label htmlFor="predefined-notes">Quick Notes</Label>
            <Select onValueChange={handlePredefinedNoteSelect}>
              <SelectTrigger className="w-full mt-1">
                <SelectValue placeholder="Select a predefined note..." />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {predefinedNotes.map((note) => (
                  <SelectItem key={note} value={note}>
                    {note}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="notes">Inspection Notes</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add inspection notes..."
              rows={4}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700">
              Update Equipment
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default InspectionDialog;
