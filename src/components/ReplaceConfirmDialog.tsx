
import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

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

interface ReplaceConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  equipment: Equipment;
  onConfirm: () => void;
}

const ReplaceConfirmDialog: React.FC<ReplaceConfirmDialogProps> = ({
  open,
  onOpenChange,
  equipment,
  onConfirm
}) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Replace Equipment?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to replace "{equipment.name}" (Serial: {equipment.serialNumber})?
            <br /><br />
            This will:
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Mark the status as "Working"</li>
              <li>Update the last checked date to today</li>
              <li>Keep all other equipment details</li>
            </ul>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-orange-600 hover:bg-orange-700"
          >
            Replace Equipment
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ReplaceConfirmDialog;
