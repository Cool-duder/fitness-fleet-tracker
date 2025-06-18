
interface ChecklistItem {
  id: string;
  label: string;
  completed: boolean;
}

interface MaintenanceRecord {
  location: string;
  checklistItems: ChecklistItem[];
  notes: string;
  lastUpdated: string;
}

const STORAGE_KEY = 'maintenance_records';

export const getMaintenanceRecord = (location: string): MaintenanceRecord | null => {
  try {
    const records = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') as MaintenanceRecord[];
    return records.find(record => record.location === location) || null;
  } catch {
    return null;
  }
};

export const saveMaintenanceRecord = (location: string, checklistItems: ChecklistItem[], notes: string) => {
  try {
    const records = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') as MaintenanceRecord[];
    const existingIndex = records.findIndex(record => record.location === location);
    
    const newRecord: MaintenanceRecord = {
      location,
      checklistItems,
      notes,
      lastUpdated: new Date().toISOString()
    };

    if (existingIndex >= 0) {
      records[existingIndex] = newRecord;
    } else {
      records.push(newRecord);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  } catch (error) {
    console.error('Failed to save maintenance record:', error);
  }
};

export const getAllMaintenanceRecords = (): MaintenanceRecord[] => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') as MaintenanceRecord[];
  } catch {
    return [];
  }
};

export const getDefaultChecklistItems = (): ChecklistItem[] => [
  { id: 'vacuumAirVent', label: 'Vacuum Air Vent', completed: false },
  { id: 'mopFloor', label: 'Mop Floor', completed: false },
  { id: 'bathroom', label: 'Bathroom', completed: false },
  { id: 'paintingBordersFloorPanels', label: 'Painting Borders and Floor Panels', completed: false },
  { id: 'vacuumFitnessEquipment', label: 'Vacuum Fitness Equipment', completed: false }
];
