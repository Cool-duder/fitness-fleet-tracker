import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle, Clock, Plus, Edit3, Trash2, Save, X, FileText } from 'lucide-react';
import { getMaintenanceRecord, saveMaintenanceRecord, getDefaultChecklistItems } from '@/utils/maintenanceState';

interface MaintenanceChecklistDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  location: string;
}

interface ChecklistItem {
  id: string;
  label: string;
  completed: boolean;
}

const MaintenanceChecklistDialog: React.FC<MaintenanceChecklistDialogProps> = ({
  open,
  onOpenChange,
  location
}) => {
  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState('');
  const [newItemText, setNewItemText] = useState('');
  const [showAddInput, setShowAddInput] = useState(false);
  const [notes, setNotes] = useState('');

  // Load maintenance record when dialog opens or location changes
  useEffect(() => {
    if (open && location) {
      const record = getMaintenanceRecord(location);
      if (record) {
        setChecklistItems(record.checklistItems);
        setNotes(record.notes);
      } else {
        setChecklistItems(getDefaultChecklistItems());
        setNotes('');
      }
    }
  }, [open, location]);

  // Save maintenance record whenever items or notes change
  useEffect(() => {
    if (location && checklistItems.length > 0) {
      saveMaintenanceRecord(location, checklistItems, notes);
    }
  }, [location, checklistItems, notes]);

  const handleItemCheck = (itemId: string, checked: boolean) => {
    setChecklistItems(prev => prev.map(item => 
      item.id === itemId ? { ...item, completed: checked } : item
    ));
  };

  const handleStartEdit = (item: ChecklistItem) => {
    setEditingId(item.id);
    setEditingText(item.label);
  };

  const handleSaveEdit = () => {
    if (editingId && editingText.trim()) {
      setChecklistItems(prev => prev.map(item => 
        item.id === editingId ? { ...item, label: editingText.trim() } : item
      ));
    }
    setEditingId(null);
    setEditingText('');
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingText('');
  };

  const handleDeleteItem = (itemId: string) => {
    setChecklistItems(prev => prev.filter(item => item.id !== itemId));
  };

  const handleAddItem = () => {
    if (newItemText.trim()) {
      const newItem: ChecklistItem = {
        id: `item_${Date.now()}`,
        label: newItemText.trim(),
        completed: false
      };
      setChecklistItems(prev => [...prev, newItem]);
      setNewItemText('');
      setShowAddInput(false);
    }
  };

  const handleCancelAdd = () => {
    setNewItemText('');
    setShowAddInput(false);
  };

  const allItemsCompleted = checklistItems.every(item => item.completed);
  const completedCount = checklistItems.filter(item => item.completed).length;

  const handleClose = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Maintenance Checklist - {location}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Progress</span>
            <Badge variant={allItemsCompleted ? "default" : "secondary"}>
              {completedCount}/{checklistItems.length}
            </Badge>
          </div>

          <div className="space-y-3">
            {checklistItems.map((item) => (
              <div key={item.id} className="flex items-center space-x-2 group">
                <Checkbox
                  id={item.id}
                  checked={item.completed}
                  onCheckedChange={(checked) => handleItemCheck(item.id, checked as boolean)}
                />
                
                {editingId === item.id ? (
                  <div className="flex items-center space-x-2 flex-1">
                    <Input
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      className="flex-1"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSaveEdit();
                        if (e.key === 'Escape') handleCancelEdit();
                      }}
                      autoFocus
                    />
                    <Button size="sm" onClick={handleSaveEdit} className="p-1 h-8 w-8">
                      <Save className="w-3 h-3" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={handleCancelEdit} className="p-1 h-8 w-8">
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                ) : (
                  <>
                    <label
                      htmlFor={item.id}
                      className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex-1 ${
                        item.completed ? 'line-through text-gray-500' : ''
                      }`}
                    >
                      {item.label}
                    </label>
                    {item.completed && (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    )}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleStartEdit(item)}
                        className="p-1 h-6 w-6"
                      >
                        <Edit3 className="w-3 h-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDeleteItem(item.id)}
                        className="p-1 h-6 w-6 text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </>
                )}
              </div>
            ))}

            {showAddInput ? (
              <div className="flex items-center space-x-2">
                <div className="w-4" />
                <Input
                  value={newItemText}
                  onChange={(e) => setNewItemText(e.target.value)}
                  placeholder="Enter new checklist item..."
                  className="flex-1"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleAddItem();
                    if (e.key === 'Escape') handleCancelAdd();
                  }}
                  autoFocus
                />
                <Button size="sm" onClick={handleAddItem} className="p-1 h-8 w-8">
                  <Save className="w-3 h-3" />
                </Button>
                <Button size="sm" variant="outline" onClick={handleCancelAdd} className="p-1 h-8 w-8">
                  <X className="w-3 h-3" />
                </Button>
              </div>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAddInput(true)}
                className="w-full"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add New Item
              </Button>
            )}
          </div>

          {/* Notes Section */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <label htmlFor="notes" className="text-sm font-medium">Notes</label>
            </div>
            <Textarea
              id="notes"
              placeholder="Add any additional notes about the maintenance tasks..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[80px]"
            />
          </div>

          {allItemsCompleted && checklistItems.length > 0 && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-md">
              <p className="text-sm text-green-800 font-medium">
                ✅ All maintenance tasks completed for {location}!
              </p>
            </div>
          )}

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={handleClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MaintenanceChecklistDialog;
