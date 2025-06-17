
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle, AlertTriangle, XCircle, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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

interface EmailReportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  equipment: Equipment[];
  locations: string[];
}

const EmailReportDialog: React.FC<EmailReportDialogProps> = ({
  open,
  onOpenChange,
  equipment,
  locations
}) => {
  const [emailAddress, setEmailAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const generateReport = () => {
    let report = `FITNESS EQUIPMENT WEEKLY REPORT\n`;
    report += `Generated: ${new Date().toLocaleDateString()}\n\n`;

    locations.forEach(location => {
      const locationEquipment = equipment.filter(item => item.location === location);
      const working = locationEquipment.filter(item => item.status === 'working').length;
      const needsAttention = locationEquipment.filter(item => item.status === 'needs-attention').length;
      const outOfService = locationEquipment.filter(item => item.status === 'out-of-service').length;

      report += `=== ${location.toUpperCase()} ===\n`;
      report += `Total Equipment: ${locationEquipment.length}\n`;
      report += `✅ Working: ${working}\n`;
      report += `⚠️  Needs Attention: ${needsAttention}\n`;
      report += `❌ Out of Service: ${outOfService}\n\n`;

      if (needsAttention > 0) {
        report += `Equipment Needing Attention:\n`;
        locationEquipment
          .filter(item => item.status === 'needs-attention')
          .forEach(item => {
            report += `- ${item.name} (${item.serialNumber}): ${item.notes}\n`;
          });
        report += `\n`;
      }

      if (outOfService > 0) {
        report += `Out of Service Equipment:\n`;
        locationEquipment
          .filter(item => item.status === 'out-of-service')
          .forEach(item => {
            report += `- ${item.name} (${item.serialNumber}): ${item.notes}\n`;
          });
        report += `\n`;
      }
    });

    return report;
  };

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!emailAddress) {
      toast({
        title: "Error",
        description: "Please enter an email address",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const report = generateReport();
      const subject = `Weekly Equipment Report - ${new Date().toLocaleDateString()}`;
      
      // Create mailto link
      const mailtoLink = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(report)}`;
      
      // Open default email client
      window.location.href = mailtoLink;
      
      toast({
        title: "Email Opened",
        description: "Your default email client has been opened with the report",
      });
      
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to open email client",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getTotalStats = () => {
    const working = equipment.filter(item => item.status === 'working').length;
    const needsAttention = equipment.filter(item => item.status === 'needs-attention').length;
    const outOfService = equipment.filter(item => item.status === 'out-of-service').length;
    
    return { working, needsAttention, outOfService, total: equipment.length };
  };

  const stats = getTotalStats();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5" />
            Email Weekly Report
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Report Preview */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Report Summary</h3>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
                <div className="text-sm text-gray-600">Total Equipment</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{locations.length}</div>
                <div className="text-sm text-gray-600">Locations</div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm">Working</span>
                </div>
                <span className="font-semibold">{stats.working}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span className="text-sm">Needs Attention</span>
                </div>
                <span className="font-semibold">{stats.needsAttention}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-red-600" />
                  <span className="text-sm">Out of Service</span>
                </div>
                <span className="font-semibold">{stats.outOfService}</span>
              </div>
            </div>
          </div>

          {/* Email Form */}
          <form onSubmit={handleSendEmail} className="space-y-4">
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
                placeholder="manager@healthclub.com"
                required
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button 
                type="submit" 
                className="flex-1 bg-blue-600 hover:bg-blue-700"
                disabled={isLoading}
              >
                {isLoading ? 'Preparing...' : 'Send Report'}
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
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EmailReportDialog;
