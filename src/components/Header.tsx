
import React from 'react';
import { Plus, Mail, ClipboardCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  onAddEquipment: () => void;
  onEmailReport: () => void;
  onMaintenanceChecklist: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAddEquipment, onEmailReport, onMaintenanceChecklist }) => {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Equipment Management</h1>
            <p className="text-gray-600">Track and manage fitness equipment across all locations</p>
          </div>
          
          <div className="flex gap-3">
            <Button
              onClick={onMaintenanceChecklist}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <ClipboardCheck className="w-4 h-4 mr-2" />
              Maintenance Checklist
            </Button>
            <Button
              onClick={onAddEquipment}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Equipment
            </Button>
            <Button
              onClick={onEmailReport}
              variant="outline"
            >
              <Mail className="w-4 h-4 mr-2" />
              Email Report
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
