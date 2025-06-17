
import React, { useState } from 'react';
import { CheckCircle, AlertTriangle, XCircle, Calendar, MapPin, Edit3, Wrench } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import InspectionDialog from './InspectionDialog';

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

interface EquipmentCardProps {
  equipment: Equipment;
  onUpdate: (equipment: Equipment) => void;
}

const EquipmentCard: React.FC<EquipmentCardProps> = ({ equipment, onUpdate }) => {
  const [showInspection, setShowInspection] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'working':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'needs-attention':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'out-of-service':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'working':
        return <CheckCircle className="w-4 h-4" />;
      case 'needs-attention':
        return <AlertTriangle className="w-4 h-4" />;
      case 'out-of-service':
        return <XCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <>
      <Card className="hover:shadow-lg transition-shadow duration-200 border-l-4 border-l-emerald-500">
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-lg font-semibold text-gray-900 mb-1">
                {equipment.name}
              </CardTitle>
              <p className="text-sm text-gray-600">{equipment.model}</p>
            </div>
            <Badge className={`${getStatusColor(equipment.status)} flex items-center gap-1`}>
              {getStatusIcon(equipment.status)}
              {equipment.status.replace('-', ' ')}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center text-sm text-gray-600">
              <span className="font-medium w-20">Serial:</span>
              <span className="font-mono text-gray-900">{equipment.serialNumber}</span>
            </div>
            
            <div className="flex items-center text-sm text-gray-600">
              <span className="font-medium w-20">Category:</span>
              <Badge variant="outline" className="text-xs">
                {equipment.category}
              </Badge>
            </div>

            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="w-3 h-3 mr-1" />
              <span>{equipment.location}</span>
            </div>

            <div className="flex items-center text-sm text-gray-600">
              <Calendar className="w-3 h-3 mr-1" />
              <span>Last checked: {formatDate(equipment.lastChecked)}</span>
            </div>
          </div>

          {equipment.notes && (
            <div className="p-3 bg-gray-50 rounded-md">
              <p className="text-sm text-gray-700">{equipment.notes}</p>
            </div>
          )}

          <div className="flex gap-2 pt-2">
            <Button
              onClick={() => setShowInspection(true)}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
              size="sm"
            >
              <Wrench className="w-4 h-4 mr-2" />
              Inspect
            </Button>
          </div>
        </CardContent>
      </Card>

      <InspectionDialog
        open={showInspection}
        onOpenChange={setShowInspection}
        equipment={equipment}
        onUpdate={(updatedEquipment) => {
          onUpdate(updatedEquipment);
          setShowInspection(false);
        }}
      />
    </>
  );
};

export default EquipmentCard;
