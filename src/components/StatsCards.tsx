
import React from 'react';
import { CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

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

interface StatsCardsProps {
  equipment: Equipment[];
}

const StatsCards = ({ equipment }: StatsCardsProps) => {
  const working = equipment.filter(item => item.status === 'working').length;
  const needsAttention = equipment.filter(item => item.status === 'needs-attention').length;
  const outOfService = equipment.filter(item => item.status === 'out-of-service').length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="border-l-4 border-l-emerald-500">
        <CardContent className="p-6">
          <div className="flex items-center">
            <CheckCircle className="w-8 h-8 text-emerald-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Working</p>
              <p className="text-2xl font-bold text-gray-900">{working}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-amber-500">
        <CardContent className="p-6">
          <div className="flex items-center">
            <AlertTriangle className="w-8 h-8 text-amber-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Needs Attention</p>
              <p className="text-2xl font-bold text-gray-900">{needsAttention}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-red-500">
        <CardContent className="p-6">
          <div className="flex items-center">
            <XCircle className="w-8 h-8 text-red-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Out of Service</p>
              <p className="text-2xl font-bold text-gray-900">{outOfService}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsCards;
