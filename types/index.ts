export type Role = 'admin' | 'user';

export interface Vehicle {
  type: 'EV' | 'Petrol' | 'Diesel';
  plateNumber: string;
  model: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  isDisabled: boolean;
  vehicle?: Vehicle;
}

export interface Location {
  lat: number;
  lng: number;
  address?: string;
}

export interface ParkingSlot {
  id: string; // e.g., 'G-01', 'B1-05'
  layer: string; // 'Ground', 'B1', etc.
  typ: 'standard' | 'ev' | 'disabled';
  isOccupied: boolean;
  bookedBy?: string; // userId
}

export interface ParkingLayer {
  name: string; // 'Ground', 'B1'
  slots: ParkingSlot[];
}

export interface Zone {
  id: string;
  name: string;
  location: Location;
  landSize: number; // sq meters
  hourlyRate: number;
  parkingStructure: ParkingLayer[];
  totalSlots: number;
  availableSlots: number;
  evPoints: number;
  disabledSpots: number;
}

export interface Booking {
  id: string;
  userId: string;
  userName: string;
  zoneId: string;
  zoneName: string;
  slotId: string;
  layer: string;
  vehicleNo: string;
  startTime: string; // ISO
  endTime?: string; // ISO
  estimatedDuration: number; // hours
  totalCost: number;
  status: 'active' | 'completed' | 'cancelled';
}
