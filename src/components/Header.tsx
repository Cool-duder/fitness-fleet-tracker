
import React from 'react';
import { Plus, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  onAddEquipment: () => void;
  onEmailReport: () => void;
}

const Header = ({ onAddEquipment, onEmailReport }: HeaderProps) => {
  return (
    <div className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Fitness Equipment Manager</h1>
            <p className="mt-1 text-sm text-gray-500">Track and maintain your health club equipment</p>
          </div>
          <div className="flex gap-2 mt-4 sm:mt-0">
            <Button 
              onClick={onEmailReport}
              variant="outline"
              className="bg-blue-50 hover:bg-blue-100 border-blue-200"
            >
              <Mail className="w-4 h-4 mr-2" />
              Email Report
            </Button>
            <Button 
              onClick={onAddEquipment}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Equipment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
