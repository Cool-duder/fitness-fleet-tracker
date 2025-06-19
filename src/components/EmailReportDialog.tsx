import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle, AlertTriangle, XCircle, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { getAllMaintenanceRecords, getDefaultChecklistItems } from '@/utils/maintenanceState';

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
    const maintenanceRecords = getAllMaintenanceRecords();
    
    let report = `FITNESS EQUIPMENT WEEKLY REPORT\n`;
    report += `Generated: ${new Date().toLocaleDateString()}\n`;
    report += `Time: ${new Date().toLocaleTimeString()}\n\n`;

    locations.forEach(location => {
      const locationEquipment = equipment.filter(item => item.location === location);
      const working = locationEquipment.filter(item => item.status === 'working').length;
      const needsAttention = locationEquipment.filter(item => item.status === 'needs-attention').length;
      const outOfService = locationEquipment.filter(item => item.status === 'out-of-service').length;

      // Get maintenance record for this location
      const maintenanceRecord = maintenanceRecords.find(record => record.location === location);
      const checklistItems = maintenanceRecord?.checklistItems || getDefaultChecklistItems();
      const completedItems = checklistItems.filter(item => item.completed).length;
      const totalItems = checklistItems.length;

      report += `${'='.repeat(60)}\n`;
      report += `${location.toUpperCase()} - LOCATION REPORT\n`;
      report += `${'='.repeat(60)}\n\n`;

      // MAINTENANCE CHECKLIST - PROMINENTLY DISPLAYED
      report += `🔧 MAINTENANCE CHECKLIST RESULTS:\n`;
      report += `${'-'.repeat(40)}\n`;
      
      // Show completion status first
      let checklistStatus = 'NOT STARTED';
      let statusIcon = '❌';
      if (completedItems === totalItems && totalItems > 0) {
        checklistStatus = 'COMPLETED ✅';
        statusIcon = '✅';
      } else if (completedItems > 0) {
        checklistStatus = 'IN PROGRESS ⚠️';
        statusIcon = '⚠️';
      }
      
      report += `STATUS: ${statusIcon} ${checklistStatus} (${completedItems}/${totalItems} tasks completed)\n`;
      
      if (maintenanceRecord?.lastUpdated) {
        report += `LAST UPDATED: ${new Date(maintenanceRecord.lastUpdated).toLocaleDateString()} at ${new Date(maintenanceRecord.lastUpdated).toLocaleTimeString()}\n`;
      }
      report += `\n`;

      // Individual checklist items with check-off status
      report += `DETAILED CHECKLIST:\n`;
      checklistItems.forEach(item => {
        const checkmark = item.completed ? '☑️ DONE' : '☐ PENDING';
        report += `  ${checkmark} - ${item.label}\n`;
      });
      report += `\n`;
      
      // Maintenance notes
      report += `MAINTENANCE NOTES:\n`;
      report += `${'-'.repeat(20)}\n`;
      if (maintenanceRecord?.notes && maintenanceRecord.notes.trim()) {
        report += `${maintenanceRecord.notes}\n`;
      } else {
        report += `[No additional maintenance notes provided]\n`;
      }
      report += `\n`;

      // Equipment Summary
      report += `📊 EQUIPMENT SUMMARY:\n`;
      report += `${'-'.repeat(25)}\n`;
      report += `• Total Equipment: ${locationEquipment.length}\n`;
      report += `• ✅ Working: ${working}\n`;
      report += `• ⚠️  Needs Attention: ${needsAttention}\n`;
      report += `• ❌ Out of Service: ${outOfService}\n\n`;

      // Equipment Needing Attention
      if (needsAttention > 0) {
        report += `⚠️  EQUIPMENT REQUIRING ATTENTION:\n`;
        report += `${'-'.repeat(35)}\n`;
        locationEquipment
          .filter(item => item.status === 'needs-attention')
          .forEach(item => {
            report += `• ${item.name} (${item.model})\n`;
            report += `  Serial: ${item.serialNumber} | Category: ${item.category}\n`;
            report += `  Last Checked: ${new Date(item.lastChecked).toLocaleDateString()}\n`;
            report += `  Notes: ${item.notes || 'No additional notes'}\n`;
            report += `  Action Required: Maintenance/Inspection needed\n\n`;
          });
      }

      // Out of Service Equipment
      if (outOfService > 0) {
        report += `❌ OUT OF SERVICE EQUIPMENT:\n`;
        report += `${'-'.repeat(30)}\n`;
        locationEquipment
          .filter(item => item.status === 'out-of-service')
          .forEach(item => {
            report += `• ${item.name} (${item.model})\n`;
            report += `  Serial: ${item.serialNumber} | Category: ${item.category}\n`;
            report += `  Last Checked: ${new Date(item.lastChecked).toLocaleDateString()}\n`;
            report += `  Notes: ${item.notes || 'No additional notes'}\n`;
            report += `  Action Required: IMMEDIATE REPAIR/REPLACEMENT NEEDED\n\n`;
          });
      }

      // Working Equipment Summary
      if (working > 0) {
        report += `✅ WORKING EQUIPMENT (${working} items):\n`;
        report += `${'-'.repeat(30)}\n`;
        const workingEquipment = locationEquipment.filter(item => item.status === 'working');
        const cardioCount = workingEquipment.filter(item => item.category === 'Cardio').length;
        const strengthCount = workingEquipment.filter(item => item.category === 'Strength').length;
        const otherCount = workingEquipment.filter(item => !['Cardio', 'Strength'].includes(item.category)).length;
        
        report += `• Cardio Equipment: ${cardioCount} units\n`;
        report += `• Strength Equipment: ${strengthCount} units\n`;
        if (otherCount > 0) {
          report += `• Other Equipment: ${otherCount} units\n`;
        }
        report += `\n`;
      }

      report += `${'-'.repeat(60)}\n\n`;
    });

    // Overall Summary with Maintenance Overview
    const totalWorking = equipment.filter(item => item.status === 'working').length;
    const totalNeedsAttention = equipment.filter(item => item.status === 'needs-attention').length;
    const totalOutOfService = equipment.filter(item => item.status === 'out-of-service').length;

    report += `🏢 OVERALL FACILITY SUMMARY:\n`;
    report += `${'='.repeat(35)}\n`;
    
    // Maintenance completion overview
    const maintenanceOverview = locations.map(location => {
      const record = maintenanceRecords.find(r => r.location === location);
      const items = record?.checklistItems || getDefaultChecklistItems();
      const completed = items.filter(item => item.completed).length;
      const total = items.length;
      return { location, completed, total, percentage: Math.round((completed/total)*100) };
    });

    report += `MAINTENANCE COMPLETION BY LOCATION:\n`;
    maintenanceOverview.forEach(({ location, completed, total, percentage }) => {
      const status = percentage === 100 ? '✅' : percentage > 0 ? '⚠️' : '❌';
      report += `${status} ${location}: ${completed}/${total} tasks (${percentage}%)\n`;
    });
    report += `\n`;

    report += `EQUIPMENT TOTALS:\n`;
    report += `Total Locations: ${locations.length}\n`;
    report += `Total Equipment: ${equipment.length}\n`;
    report += `Working: ${totalWorking} (${((totalWorking/equipment.length)*100).toFixed(1)}%)\n`;
    report += `Needs Attention: ${totalNeedsAttention} (${((totalNeedsAttention/equipment.length)*100).toFixed(1)}%)\n`;
    report += `Out of Service: ${totalOutOfService} (${((totalOutOfService/equipment.length)*100).toFixed(1)}%)\n\n`;

    if (totalNeedsAttention > 0 || totalOutOfService > 0) {
      report += `🚨 PRIORITY ACTIONS REQUIRED:\n`;
      if (totalOutOfService > 0) {
        report += `• ${totalOutOfService} equipment units require immediate repair/replacement\n`;
      }
      if (totalNeedsAttention > 0) {
        report += `• ${totalNeedsAttention} equipment units require maintenance/inspection\n`;
      }
      
      // Add maintenance completion priorities
      const incompleteLocations = maintenanceOverview.filter(loc => loc.percentage < 100);
      if (incompleteLocations.length > 0) {
        report += `• Complete maintenance checklists for: ${incompleteLocations.map(loc => loc.location).join(', ')}\n`;
      }
      report += `\n`;
    }

    report += `Report generated by Equipment Management System\n`;
    report += `For questions or concerns, please contact facility management.\n`;

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
      const subject = `Weekly Equipment & Maintenance Report - ${new Date().toLocaleDateString()}`;
      
      const mailtoLink = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(report)}`;
      
      window.location.href = mailtoLink;
      
      toast({
        title: "Email Opened",
        description: "Your default email client has been opened with the comprehensive report",
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

            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500">
                ✓ Shows individual maintenance checklist completion for each location<br/>
                ✓ Displays check-off status for each maintenance task<br/>
                ✓ Includes location-specific notes and completion percentages<br/>
                ✓ Detailed equipment information and priority actions
              </p>
            </div>
          </div>

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
                {isLoading ? 'Preparing...' : 'Send Location-Specific Report'}
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
