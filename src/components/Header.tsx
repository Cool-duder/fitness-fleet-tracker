
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
        <div className="flex justify-between items-center py-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Equipment Management</h1>
            <p className="text-gray-600 mt-1">Track and manage fitness equipment across all locations</p>
          </div>
          
          <div className="flex gap-4">
            <Button
              onClick={onMaintenanceChecklist}
              className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-lg hover:shadow-xl transition-all duration-200 px-6 py-3 text-sm font-semibold"
            >
              <ClipboardCheck className="w-5 h-5 mr-2" />
              Maintenance Checklist
            </Button>
            <Button
              onClick={onAddEquipment}
              className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white shadow-lg hover:shadow-xl transition-all duration-200 px-6 py-3 text-sm font-semibold"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Equipment
            </Button>
            <Button
              onClick={onEmailReport}
              variant="outline"
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white shadow-lg hover:shadow-xl transition-all duration-200 px-6 py-3 text-sm font-semibold"
            >
              <Mail className="w-5 h-5 mr-2" />
              Email Report
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
