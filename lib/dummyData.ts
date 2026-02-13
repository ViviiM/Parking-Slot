import { Zone, ParkingLayer, ParkingSlot } from '@/types';

// Helper to generate slots
const generateSlots = (layerName: string, count: number): ParkingSlot[] => {
  return Array.from({ length: count }).map((_, i) => ({
    id: `${layerName}-${i + 1}`,
    layer: layerName,
    typ: i % 10 === 0 ? 'disabled' : i % 5 === 0 ? 'ev' : 'standard', // 10% disabled, 20% EV (roughly)
    isOccupied: Math.random() > 0.7, // 30% occupied initially
  }));
};

export const MOCK_ZONES: Zone[] = [
  // Ahmedabad City Zones (1-30)
  {
    id: 'zone-1',
    name: 'Downtown Plaza',
    location: { lat: 40.7128, lng: -74.0060, address: '123 Main St, New York, NY' },
    landSize: 5000,
    hourlyRate: 5,
    totalSlots: 200,
    availableSlots: 140,
    evPoints: 20,
    disabledSpots: 10,
    parkingStructure: [
      { name: 'Ground', slots: generateSlots('G', 50) },
      { name: 'B1', slots: generateSlots('B1', 75) },
      { name: 'B2', slots: generateSlots('B2', 75) },
    ]
  },
  {
    id: 'zone-2',
    name: 'Tech Park',
    location: { lat: 40.7150, lng: -74.0100, address: '456 Tech Ave, New York, NY' },
    landSize: 8000,
    hourlyRate: 3,
    totalSlots: 300,
    availableSlots: 200,
    evPoints: 50,
    disabledSpots: 15,
    parkingStructure: [
      { name: 'Ground', slots: generateSlots('G', 100) },
      { name: 'B1', slots: generateSlots('B1', 100) },
      { name: 'B2', slots: generateSlots('B2', 100) },
    ]
  },
  {
    id: 'zone-3',
    name: 'Ahmedabad One Mall',
    location: { lat: 23.0225, lng: 72.5714, address: 'Vastrapur, Ahmedabad, Gujarat' },
    landSize: 15000,
    hourlyRate: 40,
    totalSlots: 800,
    availableSlots: 245,
    evPoints: 40,
    disabledSpots: 25,
    parkingStructure: [
      { name: 'Ground', slots: generateSlots('G', 200) },
      { name: 'B1', slots: generateSlots('B1', 300) },
      { name: 'B2', slots: generateSlots('B2', 300) },
    ]
  },
  {
    id: 'zone-4',
    name: 'Alpha One Mall',
    location: { lat: 23.0396, lng: 72.5567, address: 'Vastrapur, Ahmedabad, Gujarat' },
    landSize: 12000,
    hourlyRate: 35,
    totalSlots: 600,
    availableSlots: 180,
    evPoints: 30,
    disabledSpots: 20,
    parkingStructure: [
      { name: 'Ground', slots: generateSlots('G', 150) },
      { name: 'B1', slots: generateSlots('B1', 225) },
      { name: 'B2', slots: generateSlots('B2', 225) },
    ]
  },
  {
    id: 'zone-5',
    name: 'Prahlad Nagar Garden',
    location: { lat: 23.0029, lng: 72.5384, address: 'Prahlad Nagar, Ahmedabad, Gujarat' },
    landSize: 8000,
    hourlyRate: 25,
    totalSlots: 350,
    availableSlots: 95,
    evPoints: 20,
    disabledSpots: 12,
    parkingStructure: [
      { name: 'Ground', slots: generateSlots('G', 150) },
      { name: 'B1', slots: generateSlots('B1', 200) },
    ]
  },
  {
    id: 'zone-6',
    name: 'SG Highway Commercial',
    location: { lat: 23.0165, lng: 72.5250, address: 'SG Highway, Ahmedabad, Gujarat' },
    landSize: 10000,
    hourlyRate: 30,
    totalSlots: 450,
    availableSlots: 120,
    evPoints: 25,
    disabledSpots: 15,
    parkingStructure: [
      { name: 'Ground', slots: generateSlots('G', 150) },
      { name: 'B1', slots: generateSlots('B1', 150) },
      { name: 'B2', slots: generateSlots('B2', 150) },
    ]
  },
  {
    id: 'zone-7',
    name: 'Gandhi Ashram',
    location: { lat: 23.0606, lng: 72.5810, address: 'Sabarmati, Ahmedabad, Gujarat' },
    landSize: 6000,
    hourlyRate: 20,
    totalSlots: 250,
    availableSlots: 85,
    evPoints: 15,
    disabledSpots: 10,
    parkingStructure: [
      { name: 'Ground', slots: generateSlots('G', 150) },
      { name: 'B1', slots: generateSlots('B1', 100) },
    ]
  },
  {
    id: 'zone-8',
    name: 'Kalupur Railway Station',
    location: { lat: 23.0287, lng: 72.6020, address: 'Kalupur, Ahmedabad, Gujarat' },
    landSize: 9000,
    hourlyRate: 15,
    totalSlots: 400,
    availableSlots: 60,
    evPoints: 10,
    disabledSpots: 18,
    parkingStructure: [
      { name: 'Ground', slots: generateSlots('G', 250) },
      { name: 'B1', slots: generateSlots('B1', 150) },
    ]
  },
  {
    id: 'zone-9',
    name: 'ISKCON Temple',
    location: { lat: 23.0284, lng: 72.5575, address: 'SG Highway, Ahmedabad, Gujarat' },
    landSize: 7000,
    hourlyRate: 20,
    totalSlots: 300,
    availableSlots: 110,
    evPoints: 20,
    disabledSpots: 12,
    parkingStructure: [
      { name: 'Ground', slots: generateSlots('G', 200) },
      { name: 'B1', slots: generateSlots('B1', 100) },
    ]
  },
  {
    id: 'zone-10',
    name: 'Kankaria Lake',
    location: { lat: 23.0055, lng: 72.6053, address: 'Maninagar, Ahmedabad, Gujarat' },
    landSize: 12000,
    hourlyRate: 25,
    totalSlots: 500,
    availableSlots: 175,
    evPoints: 30,
    disabledSpots: 20,
    parkingStructure: [
      { name: 'Ground', slots: generateSlots('G', 200) },
      { name: 'B1', slots: generateSlots('B1', 200) },
      { name: 'B2', slots: generateSlots('B2', 100) },
    ]
  },
  {
    id: 'zone-11',
    name: 'GMDC Ground',
    location: { lat: 23.0632, lng: 72.5520, address: 'Vastrapur, Ahmedabad, Gujarat' },
    landSize: 20000,
    hourlyRate: 50,
    totalSlots: 1000,
    availableSlots: 450,
    evPoints: 60,
    disabledSpots: 30,
    parkingStructure: [
      { name: 'Ground', slots: generateSlots('G', 500) },
      { name: 'B1', slots: generateSlots('B1', 300) },
      { name: 'B2', slots: generateSlots('B2', 200) },
    ]
  },
  {
    id: 'zone-12',
    name: 'IIT Gandhinagar',
    location: { lat: 23.2115, lng: 72.6845, address: 'Palaj, Gandhinagar, Gujarat' },
    landSize: 18000,
    hourlyRate: 30,
    totalSlots: 700,
    availableSlots: 280,
    evPoints: 45,
    disabledSpots: 22,
    parkingStructure: [
      { name: 'Ground', slots: generateSlots('G', 250) },
      { name: 'B1', slots: generateSlots('B1', 250) },
      { name: 'B2', slots: generateSlots('B2', 200) },
    ]
  },
  {
    id: 'zone-13',
    name: 'Infocity Gandhinagar',
    location: { lat: 23.1782, lng: 72.6355, address: 'Infocity, Gandhinagar, Gujarat' },
    landSize: 15000,
    hourlyRate: 35,
    totalSlots: 600,
    availableSlots: 190,
    evPoints: 35,
    disabledSpots: 18,
    parkingStructure: [
      { name: 'Ground', slots: generateSlots('G', 200) },
      { name: 'B1', slots: generateSlots('B1', 200) },
      { name: 'B2', slots: generateSlots('B2', 200) },
    ]
  },
  {
    id: 'zone-14',
    name: 'Bareja Bus Stand',
    location: { lat: 22.8545, lng: 72.6345, address: 'Bareja, Ahmedabad, Gujarat' },
    landSize: 3000,
    hourlyRate: 10,
    totalSlots: 100,
    availableSlots: 45,
    evPoints: 5,
    disabledSpots: 4,
    parkingStructure: [
      { name: 'Ground', slots: generateSlots('G', 100) },
    ]
  },
  {
    id: 'zone-15',
    name: 'Bareja Market',
    location: { lat: 22.8550, lng: 72.6350, address: 'Main Bazaar, Bareja, Gujarat' },
    landSize: 2500,
    hourlyRate: 12,
    totalSlots: 80,
    availableSlots: 25,
    evPoints: 4,
    disabledSpots: 3,
    parkingStructure: [
      { name: 'Ground', slots: generateSlots('G', 80) },
    ]
  },
  {
    id: 'zone-16',
    name: 'Bopal Cross Roads',
    location: { lat: 23.0432, lng: 72.5298, address: 'Bopal, Ahmedabad, Gujarat' },
    landSize: 5500,
    hourlyRate: 25,
    totalSlots: 220,
    availableSlots: 88,
    evPoints: 12,
    disabledSpots: 8,
    parkingStructure: [
      { name: 'Ground', slots: generateSlots('G', 100) },
      { name: 'B1', slots: generateSlots('B1', 120) },
    ]
  },
  {
    id: 'zone-17',
    name: 'Thaltej Crossroads',
    location: { lat: 23.0608, lng: 72.5328, address: 'Thaltej, Ahmedabad, Gujarat' },
    landSize: 6000,
    hourlyRate: 28,
    totalSlots: 250,
    availableSlots: 92,
    evPoints: 15,
    disabledSpots: 10,
    parkingStructure: [
      { name: 'Ground', slots: generateSlots('G', 100) },
      { name: 'B1', slots: generateSlots('B1', 150) },
    ]
  },
  {
    id: 'zone-18',
    name: 'Vastrapur Lake',
    location: { lat: 23.0364, lng: 72.5388, address: 'Vastrapur, Ahmedabad, Gujarat' },
    landSize: 7500,
    hourlyRate: 25,
    totalSlots: 300,
    availableSlots: 105,
    evPoints: 18,
    disabledSpots: 12,
    parkingStructure: [
      { name: 'Ground', slots: generateSlots('G', 150) },
      { name: 'B1', slots: generateSlots('B1', 150) },
    ]
  },
  {
    id: 'zone-19',
    name: 'Naranpura Railway Crossing',
    location: { lat: 23.0652, lng: 72.5628, address: 'Naranpura, Ahmedabad, Gujarat' },
    landSize: 4000,
    hourlyRate: 18,
    totalSlots: 160,
    availableSlots: 55,
    evPoints: 8,
    disabledSpots: 6,
    parkingStructure: [
      { name: 'Ground', slots: generateSlots('G', 100) },
      { name: 'B1', slots: generateSlots('B1', 60) },
    ]
  },
  {
    id: 'zone-20',
    name: 'Maninagar Railway Station',
    location: { lat: 22.9964, lng: 72.6102, address: 'Maninagar, Ahmedabad, Gujarat' },
    landSize: 5000,
    hourlyRate: 15,
    totalSlots: 200,
    availableSlots: 45,
    evPoints: 10,
    disabledSpots: 8,
    parkingStructure: [
      { name: 'Ground', slots: generateSlots('G', 150) },
      { name: 'B1', slots: generateSlots('B1', 50) },
    ]
  },
  {
    id: 'zone-21',
    name: 'Narol Circle',
    location: { lat: 22.9852, lng: 72.6214, address: 'Narol, Ahmedabad, Gujarat' },
    landSize: 4500,
    hourlyRate: 20,
    totalSlots: 180,
    availableSlots: 62,
    evPoints: 9,
    disabledSpots: 7,
    parkingStructure: [
      { name: 'Ground', slots: generateSlots('G', 120) },
      { name: 'B1', slots: generateSlots('B1', 60) },
    ]
  },
  {
    id: 'zone-22',
    name: 'Bareja Char Rasta',
    location: { lat: 22.8548, lng: 72.6348, address: 'Bareja Crossing, Ahmedabad, Gujarat' },
    landSize: 2800,
    hourlyRate: 10,
    totalSlots: 90,
    availableSlots: 38,
    evPoints: 4,
    disabledSpots: 3,
    parkingStructure: [
      { name: 'Ground', slots: generateSlots('G', 90) },
    ]
  },
  {
    id: 'zone-23',
    name: 'Bareja Patiya',
    location: { lat: 22.8555, lng: 72.6335, address: 'Bareja Patiya, Gujarat' },
    landSize: 2200,
    hourlyRate: 8,
    totalSlots: 70,
    availableSlots: 30,
    evPoints: 3,
    disabledSpots: 2,
    parkingStructure: [
      { name: 'Ground', slots: generateSlots('G', 70) },
    ]
  },
  {
    id: 'zone-24',
    name: 'Gota Crossroads',
    location: { lat: 23.1062, lng: 72.5432, address: 'Gota, Ahmedabad, Gujarat' },
    landSize: 5500,
    hourlyRate: 22,
    totalSlots: 220,
    availableSlots: 85,
    evPoints: 12,
    disabledSpots: 8,
    parkingStructure: [
      { name: 'Ground', slots: generateSlots('G', 120) },
      { name: 'B1', slots: generateSlots('B1', 100) },
    ]
  },
  {
    id: 'zone-25',
    name: 'Chandkheda Bus Stop',
    location: { lat: 23.1152, lng: 72.5928, address: 'Chandkheda, Ahmedabad, Gujarat' },
    landSize: 4000,
    hourlyRate: 18,
    totalSlots: 160,
    availableSlots: 58,
    evPoints: 8,
    disabledSpots: 6,
    parkingStructure: [
      { name: 'Ground', slots: generateSlots('G', 100) },
      { name: 'B1', slots: generateSlots('B1', 60) },
    ]
  },
  {
    id: 'zone-26',
    name: 'Sabarmati Riverfront',
    location: { lat: 23.0252, lng: 72.5852, address: 'Riverfront, Ahmedabad, Gujarat' },
    landSize: 25000,
    hourlyRate: 30,
    totalSlots: 1200,
    availableSlots: 520,
    evPoints: 80,
    disabledSpots: 40,
    parkingStructure: [
      { name: 'Ground', slots: generateSlots('G', 500) },
      { name: 'B1', slots: generateSlots('B1', 400) },
      { name: 'B2', slots: generateSlots('B2', 300) },
    ]
  },
  {
    id: 'zone-27',
    name: 'Lal Darwaja',
    location: { lat: 23.0242, lng: 72.5828, address: 'Lal Darwaja, Ahmedabad, Gujarat' },
    landSize: 6000,
    hourlyRate: 25,
    totalSlots: 250,
    availableSlots: 45,
    evPoints: 15,
    disabledSpots: 10,
    parkingStructure: [
      { name: 'Ground', slots: generateSlots('G', 100) },
      { name: 'B1', slots: generateSlots('B1', 150) },
    ]
  },
  {
    id: 'zone-28',
    name: 'Navrangpura Bus Stand',
    location: { lat: 23.0445, lng: 72.5598, address: 'Navrangpura, Ahmedabad, Gujarat' },
    landSize: 5000,
    hourlyRate: 20,
    totalSlots: 200,
    availableSlots: 68,
    evPoints: 12,
    disabledSpots: 8,
    parkingStructure: [
      { name: 'Ground', slots: generateSlots('G', 120) },
      { name: 'B1', slots: generateSlots('B1', 80) },
    ]
  },
  {
    id: 'zone-29',
    name: 'C.G. Road',
    location: { lat: 23.0382, lng: 72.5562, address: 'C.G. Road, Ahmedabad, Gujarat' },
    landSize: 7000,
    hourlyRate: 30,
    totalSlots: 300,
    availableSlots: 75,
    evPoints: 18,
    disabledSpots: 12,
    parkingStructure: [
      { name: 'Ground', slots: generateSlots('G', 100) },
      { name: 'B1', slots: generateSlots('B1', 100) },
      { name: 'B2', slots: generateSlots('B2', 100) },
    ]
  },
  {
    id: 'zone-30',
    name: 'Gujarat University',
    location: { lat: 23.0312, lng: 72.5468, address: 'Navrangpura, Ahmedabad, Gujarat' },
    landSize: 9000,
    hourlyRate: 25,
    totalSlots: 400,
    availableSlots: 185,
    evPoints: 25,
    disabledSpots: 15,
    parkingStructure: [
      { name: 'Ground', slots: generateSlots('G', 200) },
      { name: 'B1', slots: generateSlots('B1', 200) },
    ]
  },

  // Gujarat Cities Zones (31-60)
  {
    id: 'zone-31',
    name: 'Surat Textile Market',
    location: { lat: 21.1702, lng: 72.8311, address: 'Ring Road, Surat, Gujarat' },
    landSize: 18000,
    hourlyRate: 35,
    totalSlots: 750,
    availableSlots: 210,
    evPoints: 45,
    disabledSpots: 25,
    parkingStructure: [
      { name: 'Ground', slots: generateSlots('G', 250) },
      { name: 'B1', slots: generateSlots('B1', 250) },
      { name: 'B2', slots: generateSlots('B2', 250) },
    ]
  },
  {
    id: 'zone-32',
    name: 'VR Surat',
    location: { lat: 21.1522, lng: 72.7678, address: 'Vesu, Surat, Gujarat' },
    landSize: 14000,
    hourlyRate: 40,
    totalSlots: 600,
    availableSlots: 165,
    evPoints: 35,
    disabledSpots: 20,
    parkingStructure: [
      { name: 'Ground', slots: generateSlots('G', 200) },
      { name: 'B1', slots: generateSlots('B1', 200) },
      { name: 'B2', slots: generateSlots('B2', 200) },
    ]
  },
  {
    id: 'zone-33',
    name: 'Vadodara Railway Station',
    location: { lat: 22.3072, lng: 73.1812, address: 'Vadodara, Gujarat' },
    landSize: 8000,
    hourlyRate: 20,
    totalSlots: 350,
    availableSlots: 85,
    evPoints: 20,
    disabledSpots: 15,
    parkingStructure: [
      { name: 'Ground', slots: generateSlots('G', 200) },
      { name: 'B1', slots: generateSlots('B1', 150) },
    ]
  },
  {
    id: 'zone-34',
    name: 'Inorbit Vadodara',
    location: { lat: 22.3152, lng: 73.1862, address: 'Vadodara, Gujarat' },
    landSize: 11000,
    hourlyRate: 35,
    totalSlots: 500,
    availableSlots: 155,
    evPoints: 30,
    disabledSpots: 18,
    parkingStructure: [
      { name: 'Ground', slots: generateSlots('G', 150) },
      { name: 'B1', slots: generateSlots('B1', 175) },
      { name: 'B2', slots: generateSlots('B2', 175) },
    ]
  },
  {
    id: 'zone-35',
    name: 'Rajkot Airport',
    location: { lat: 22.3092, lng: 70.7796, address: 'Rajkot, Gujarat' },
    landSize: 7000,
    hourlyRate: 25,
    totalSlots: 300,
    availableSlots: 95,
    evPoints: 18,
    disabledSpots: 12,
    parkingStructure: [
      { name: 'Ground', slots: generateSlots('G', 150) },
      { name: 'B1', slots: generateSlots('B1', 150) },
    ]
  },
  {
    id: 'zone-36',
    name: 'Race Course Rajkot',
    location: { lat: 22.2952, lng: 70.7982, address: 'Rajkot, Gujarat' },
    landSize: 9000,
    hourlyRate: 25,
    totalSlots: 400,
    availableSlots: 145,
    evPoints: 25,
    disabledSpots: 15,
    parkingStructure: [
      { name: 'Ground', slots: generateSlots('G', 200) },
      { name: 'B1', slots: generateSlots('B1', 200) },
    ]
  },
  {
    id: 'zone-37',
    name: 'Bhavnagar Bus Terminal',
    location: { lat: 21.7645, lng: 72.1519, address: 'Bhavnagar, Gujarat' },
    landSize: 5500,
    hourlyRate: 18,
    totalSlots: 220,
    availableSlots: 78,
    evPoints: 12,
    disabledSpots: 8,
    parkingStructure: [
      { name: 'Ground', slots: generateSlots('G', 150) },
      { name: 'B1', slots: generateSlots('B1', 70) },
    ]
  },
  {
    id: 'zone-38',
    name: 'Jamnagar Refinery',
    location: { lat: 22.4707, lng: 70.0724, address: 'Jamnagar, Gujarat' },
    landSize: 12000,
    hourlyRate: 30,
    totalSlots: 500,
    availableSlots: 185,
    evPoints: 30,
    disabledSpots: 18,
    parkingStructure: [
      { name: 'Ground', slots: generateSlots('G', 200) },
      { name: 'B1', slots: generateSlots('B1', 150) },
      { name: 'B2', slots: generateSlots('B2', 150) },
    ]
  },
  {
    id: 'zone-39',
    name: 'Junagadh City Center',
    location: { lat: 21.5222, lng: 70.4579, address: 'Junagadh, Gujarat' },
    landSize: 5000,
    hourlyRate: 20,
    totalSlots: 200,
    availableSlots: 72,
    evPoints: 12,
    disabledSpots: 8,
    parkingStructure: [
      { name: 'Ground', slots: generateSlots('G', 120) },
      { name: 'B1', slots: generateSlots('B1', 80) },
    ]
  },
  {
    id: 'zone-40',
    name: 'Anand Dairy',
    location: { lat: 22.5645, lng: 72.9289, address: 'Anand, Gujarat' },
    landSize: 8000,
    hourlyRate: 25,
    totalSlots: 350,
    availableSlots: 125,
    evPoints: 20,
    disabledSpots: 12,
    parkingStructure: [
      { name: 'Ground', slots: generateSlots('G', 150) },
      { name: 'B1', slots: generateSlots('B1', 200) },
    ]
  },
  {
    id: 'zone-41',
    name: 'Nadiad Bus Station',
    location: { lat: 22.6916, lng: 72.8616, address: 'Nadiad, Gujarat' },
    landSize: 4500,
    hourlyRate: 15,
    totalSlots: 180,
    availableSlots: 62,
    evPoints: 10,
    disabledSpots: 6,
    parkingStructure: [
      { name: 'Ground', slots: generateSlots('G', 120) },
      { name: 'B1', slots: generateSlots('B1', 60) },
    ]
  },
  {
    id: 'zone-42',
    name: 'Mehsana Bus Stand',
    location: { lat: 23.5882, lng: 72.3692, address: 'Mehsana, Gujarat' },
    landSize: 5000,
    hourlyRate: 18,
    totalSlots: 200,
    availableSlots: 68,
    evPoints: 12,
    disabledSpots: 8,
    parkingStructure: [
      { name: 'Ground', slots: generateSlots('G', 120) },
      { name: 'B1', slots: generateSlots('B1', 80) },
    ]
  },
  {
    id: 'zone-43',
    name: 'Bhuj City Market',
    location: { lat: 23.2419, lng: 69.6669, address: 'Bhuj, Gujarat' },
    landSize: 6000,
    hourlyRate: 20,
    totalSlots: 250,
    availableSlots: 92,
    evPoints: 15,
    disabledSpots: 10,
    parkingStructure: [
      { name: 'Ground', slots: generateSlots('G', 150) },
      { name: 'B1', slots: generateSlots('B1', 100) },
    ]
  },
  {
    id: 'zone-44',
    name: 'Porbandar Beach',
    location: { lat: 21.6417, lng: 69.6293, address: 'Porbandar, Gujarat' },
    landSize: 7000,
    hourlyRate: 25,
    totalSlots: 300,
    availableSlots: 115,
    evPoints: 18,
    disabledSpots: 12,
    parkingStructure: [
      { name: 'Ground', slots: generateSlots('G', 150) },
      { name: 'B1', slots: generateSlots('B1', 150) },
    ]
  },
  {
    id: 'zone-45',
    name: 'Dwarka Temple',
    location: { lat: 22.2442, lng: 68.9685, address: 'Dwarka, Gujarat' },
    landSize: 10000,
    hourlyRate: 30,
    totalSlots: 450,
    availableSlots: 135,
    evPoints: 25,
    disabledSpots: 18,
    parkingStructure: [
      { name: 'Ground', slots: generateSlots('G', 200) },
      { name: 'B1', slots: generateSlots('B1', 150) },
      { name: 'B2', slots: generateSlots('B2', 100) },
    ]
  },
  {
    id: 'zone-46',
    name: 'Somnath Temple',
    location: { lat: 20.8880, lng: 70.4014, address: 'Somnath, Gujarat' },
    landSize: 9000,
    hourlyRate: 25,
    totalSlots: 400,
    availableSlots: 155,
    evPoints: 22,
    disabledSpots: 15,
    parkingStructure: [
      { name: 'Ground', slots: generateSlots('G', 200) },
      { name: 'B1', slots: generateSlots('B1', 200) },
    ]
  },
  {
    id: 'zone-47',
    name: 'Statue of Unity',
    location: { lat: 21.8380, lng: 73.7191, address: 'Kevadia, Gujarat' },
    landSize: 30000,
    hourlyRate: 50,
    totalSlots: 1500,
    availableSlots: 580,
    evPoints: 100,
    disabledSpots: 50,
    parkingStructure: [
      { name: 'Ground', slots: generateSlots('G', 600) },
      { name: 'B1', slots: generateSlots('B1', 500) },
      { name: 'B2', slots: generateSlots('B2', 400) },
    ]
  },
  {
    id: 'zone-48',
    name: 'Patan Rani Vav',
    location: { lat: 23.8589, lng: 72.0966, address: 'Patan, Gujarat' },
    landSize: 6000,
    hourlyRate: 20,
    totalSlots: 250,
    availableSlots: 98,
    evPoints: 15,
    disabledSpots: 10,
    parkingStructure: [
      { name: 'Ground', slots: generateSlots('G', 150) },
      { name: 'B1', slots: generateSlots('B1', 100) },
    ]
  },
  {
    id: 'zone-49',
    name: 'Modhera Sun Temple',
    location: { lat: 23.5825, lng: 72.0966, address: 'Modhera, Gujarat' },
    landSize: 5500,
    hourlyRate: 20,
    totalSlots: 220,
    availableSlots: 85,
    evPoints: 12,
    disabledSpots: 8,
    parkingStructure: [
      { name: 'Ground', slots: generateSlots('G', 150) },
      { name: 'B1', slots: generateSlots('B1', 70) },
    ]
  },
  {
    id: 'zone-50',
    name: 'Bharuch Bus Station',
    location: { lat: 21.7051, lng: 72.9959, address: 'Bharuch, Gujarat' },
    landSize: 4000,
    hourlyRate: 15,
    totalSlots: 160,
    availableSlots: 55,
    evPoints: 8,
    disabledSpots: 6,
    parkingStructure: [
      { name: 'Ground', slots: generateSlots('G', 100) },
      { name: 'B1', slots: generateSlots('B1', 60) },
    ]
  },
  {
    id: 'zone-51',
    name: 'Navsari Railway Station',
    location: { lat: 20.9467, lng: 72.9420, address: 'Navsari, Gujarat' },
    landSize: 3800,
    hourlyRate: 15,
    totalSlots: 150,
    availableSlots: 48,
    evPoints: 8,
    disabledSpots: 5,
    parkingStructure: [
      { name: 'Ground', slots: generateSlots('G', 90) },
      { name: 'B1', slots: generateSlots('B1', 60) },
    ]
  },
  {
    id: 'zone-52',
    name: 'Vapi Industrial Area',
    location: { lat: 20.3718, lng: 72.9202, address: 'Vapi, Gujarat' },
    landSize: 11000,
    hourlyRate: 30,
    totalSlots: 500,
    availableSlots: 185,
    evPoints: 30,
    disabledSpots: 18,
    parkingStructure: [
      { name: 'Ground', slots: generateSlots('G', 200) },
      { name: 'B1', slots: generateSlots('B1', 150) },
      { name: 'B2', slots: generateSlots('B2', 150) },
    ]
  },
  {
    id: 'zone-53',
    name: 'Gandhidham Market',
    location: { lat: 23.0699, lng: 70.1285, address: 'Gandhidham, Gujarat' },
    landSize: 5000,
    hourlyRate: 20,
    totalSlots: 200,
    availableSlots: 72,
    evPoints: 12,
    disabledSpots: 8,
    parkingStructure: [
      { name: 'Ground', slots: generateSlots('G', 120) },
      { name: 'B1', slots: generateSlots('B1', 80) },
    ]
  },
  {
    id: 'zone-54',
    name: 'Morbi Ceramic Zone',
    location: { lat: 22.8258, lng: 70.8378, address: 'Morbi, Gujarat' },
    landSize: 9000,
    hourlyRate: 25,
    totalSlots: 400,
    availableSlots: 155,
    evPoints: 25,
    disabledSpots: 15,
    parkingStructure: [
      { name: 'Ground', slots: generateSlots('G', 200) },
      { name: 'B1', slots: generateSlots('B1', 200) },
    ]
  },
  {
    id: 'zone-55',
    name: 'Surendranagar Bus Depot',
    location: { lat: 22.7208, lng: 71.6482, address: 'Surendranagar, Gujarat' },
    landSize: 4200,
    hourlyRate: 15,
    totalSlots: 170,
    availableSlots: 58,
    evPoints: 9,
    disabledSpots: 6,
    parkingStructure: [
      { name: 'Ground', slots: generateSlots('G', 100) },
      { name: 'B1', slots: generateSlots('B1', 70) },
    ]
  },
  {
    id: 'zone-56',
    name: 'Veraval Fishing Port',
    location: { lat: 20.9078, lng: 70.3614, address: 'Veraval, Gujarat' },
    landSize: 6500,
    hourlyRate: 20,
    totalSlots: 280,
    availableSlots: 105,
    evPoints: 16,
    disabledSpots: 10,
    parkingStructure: [
      { name: 'Ground', slots: generateSlots('G', 150) },
      { name: 'B1', slots: generateSlots('B1', 130) },
    ]
  },
  {
    id: 'zone-57',
    name: 'Godhra Bus Stand',
    location: { lat: 22.7785, lng: 73.6242, address: 'Godhra, Gujarat' },
    landSize: 3800,
    hourlyRate: 15,
    totalSlots: 150,
    availableSlots: 52,
    evPoints: 8,
    disabledSpots: 5,
    parkingStructure: [
      { name: 'Ground', slots: generateSlots('G', 90) },
      { name: 'B1', slots: generateSlots('B1', 60) },
    ]
  },
  {
    id: 'zone-58',
    name: 'Dahod City Center',
    location: { lat: 22.8365, lng: 74.2582, address: 'Dahod, Gujarat' },
    landSize: 4000,
    hourlyRate: 16,
    totalSlots: 160,
    availableSlots: 58,
    evPoints: 9,
    disabledSpots: 6,
    parkingStructure: [
      { name: 'Ground', slots: generateSlots('G', 100) },
      { name: 'B1', slots: generateSlots('B1', 60) },
    ]
  },
  {
    id: 'zone-59',
    name: 'Palanpur Market',
    location: { lat: 24.1724, lng: 72.4388, address: 'Palanpur, Gujarat' },
    landSize: 4500,
    hourlyRate: 18,
    totalSlots: 180,
    availableSlots: 65,
    evPoints: 10,
    disabledSpots: 7,
    parkingStructure: [
      { name: 'Ground', slots: generateSlots('G', 110) },
      { name: 'B1', slots: generateSlots('B1', 70) },
    ]
  },
  {
    id: 'zone-60',
    name: 'Himatnagar Bus Station',
    location: { lat: 23.5988, lng: 72.9512, address: 'Himatnagar, Gujarat' },
    landSize: 3800,
    hourlyRate: 15,
    totalSlots: 150,
    availableSlots: 54,
    evPoints: 8,
    disabledSpots: 6,
    parkingStructure: [
      { name: 'Ground', slots: generateSlots('G', 90) },
      { name: 'B1', slots: generateSlots('B1', 60) },
    ]
  },

  // Major Indian Cities Zones (61-100)
  {
    id: 'zone-61',
    name: 'Mumbai CSMT',
    location: { lat: 18.9400, lng: 72.8355, address: 'CSMT, Mumbai, Maharashtra' },
    landSize: 20000,
    hourlyRate: 60,
    totalSlots: 1000,
    availableSlots: 185,
    evPoints: 75,
    disabledSpots: 35,
    parkingStructure: [
      { name: 'Ground', slots: generateSlots('G', 300) },
      { name: 'B1', slots: generateSlots('B1', 350) },
      { name: 'B2', slots: generateSlots('B2', 350) },
    ]
  },
  {
    id: 'zone-62',
    name: 'Phoenix Mall Mumbai',
    location: { lat: 19.0051, lng: 72.8482, address: 'Lower Parel, Mumbai, Maharashtra' },
    landSize: 16000,
    hourlyRate: 70,
    totalSlots: 800,
    availableSlots: 145,
    evPoints: 50,
    disabledSpots: 28,
    parkingStructure: [
      { name: 'Ground', slots: generateSlots('G', 250) },
      { name: 'B1', slots: generateSlots('B1', 275) },
      { name: 'B2', slots: generateSlots('B2', 275) },
    ]
  },
  {
    id: 'zone-63',
    name: 'Delhi Connaught Place',
    location: { lat: 28.6329, lng: 77.2190, address: 'CP, New Delhi' },
    landSize: 18000,
    hourlyRate: 55,
    totalSlots: 900,
    availableSlots: 165,
    evPoints: 60,
    disabledSpots: 30,
    parkingStructure: [
      { name: 'Ground', slots: generateSlots('G', 300) },
      { name: 'B1', slots: generateSlots('B1', 300) },
      { name: 'B2', slots: generateSlots('B2', 300) },
    ]
  },
  {
    id: 'zone-64',
    name: 'Select Citywalk Delhi',
    location: { lat: 28.5278, lng: 77.2208, address: 'Saket, New Delhi' },
    landSize: 14000,
    hourlyRate: 65,
    totalSlots: 700,
    availableSlots: 115,
    evPoints: 45,
    disabledSpots: 25,
    parkingStructure: [
      { name: 'Ground', slots: generateSlots('G', 200) },
      { name: 'B1', slots: generateSlots('B1', 250) },
      { name: 'B2', slots: generateSlots('B2', 250) },
    ]
  },
  {
    id: 'zone-65',
    name: 'Bangalore Airport',
    location: { lat: 13.1986, lng: 77.7066, address: 'KIA, Bangalore, Karnataka' },
    landSize: 25000,
    hourlyRate: 50,
    totalSlots: 1200,
    availableSlots: 320,
    evPoints: 80,
    disabledSpots: 40,
    parkingStructure: [
      { name: 'Ground', slots: generateSlots('G', 400) },
      { name: 'B1', slots: generateSlots('B1', 400) },
      { name: 'B2', slots: generateSlots('B2', 400) },
    ]
  },
  {
    id: 'zone-66',
    name: 'Forum Mall Bangalore',
    location: { lat: 12.9348, lng: 77.6108, address: 'Koramangala, Bangalore' },
    landSize: 12000,
    hourlyRate: 60,
    totalSlots: 600,
    availableSlots: 95,
    evPoints: 35,
    disabledSpots: 20,
    parkingStructure: [
      { name: 'Ground', slots: generateSlots('G', 200) },
      { name: 'B1', slots: generateSlots('B1', 200) },
      { name: 'B2', slots: generateSlots('B2', 200) },
    ]
  },
  {
    id: 'zone-67',
    name: 'Chennai Central',
    location: { lat: 13.0827, lng: 80.2757, address: 'Chennai, Tamil Nadu' },
    landSize: 15000,
    hourlyRate: 45,
    totalSlots: 750,
    availableSlots: 155,
    evPoints: 50,
    disabledSpots: 28,
    parkingStructure: [
      { name: 'Ground', slots: generateSlots('G', 250) },
      { name: 'B1', slots: generateSlots('B1', 250) },
      { name: 'B2', slots: generateSlots('B2', 250) },
    ]
  },
  {
    id: 'zone-68',
    name: 'Phoenix Chennai',
    location: { lat: 13.0158, lng: 80.2062, address: 'Velachery, Chennai' },
    landSize: 13000,
    hourlyRate: 55,
    totalSlots: 650,
    availableSlots: 125,
    evPoints: 40,
    disabledSpots: 22,
    parkingStructure: [
      { name: 'Ground', slots: generateSlots('G', 200) },
      { name: 'B1', slots: generateSlots('B1', 225) },
      { name: 'B2', slots: generateSlots('B2', 225) },
    ]
  },
  {
    id: 'zone-69',
    name: 'Kolkata Howrah',
    location: { lat: 22.5859, lng: 88.3438, address: 'Howrah, Kolkata' },
    landSize: 14000,
    hourlyRate: 40,
    totalSlots: 700,
    availableSlots: 165,
    evPoints: 45,
    disabledSpots: 25,
    parkingStructure: [
      { name: 'Ground', slots: generateSlots('G', 250) },
      { name: 'B1', slots: generateSlots('B1', 225) },
      { name: 'B2', slots: generateSlots('B2', 225) },
    ]
  },
  {
    id: 'zone-70',
    name: 'South City Kolkata',
    location: { lat: 22.5009, lng: 88.3525, address: 'Jadavpur, Kolkata' },
    landSize: 11000,
    hourlyRate: 50,
    totalSlots: 550,
    availableSlots: 115,
    evPoints: 32,
    disabledSpots: 18,
    parkingStructure: [
      { name: 'Ground', slots: generateSlots('G', 200) },
      { name: 'B1', slots: generateSlots('B1', 175) },
      { name: 'B2', slots: generateSlots('B2', 175) },
    ]
  },
  {
    id: 'zone-71',
    name: 'Pune Airport',
    location: { lat: 18.5793, lng: 73.9089, address: 'Lohegaon, Pune' },
    landSize: 9000,
    hourlyRate: 40,
    totalSlots: 400,
    availableSlots: 110,
    evPoints: 25,
    disabledSpots: 15,
    parkingStructure: [
      { name: 'Ground', slots: generateSlots('G', 150) },
      { name: 'B1', slots: generateSlots('B1', 125) },
      { name: 'B2', slots: generateSlots('B2', 125) },
    ]
  },
  {
    id: 'zone-72',
    name: 'Phoenix Pune',
    location: { lat: 18.5595, lng: 73.9128, address: 'Viman Nagar, Pune' },
    landSize: 10000,
    hourlyRate: 55,
    totalSlots: 500,
    availableSlots: 95,
    evPoints: 30,
    disabledSpots: 18,
    parkingStructure: [
      { name: 'Ground', slots: generateSlots('G', 150) },
      { name: 'B1', slots: generateSlots('B1', 175) },
      { name: 'B2', slots: generateSlots('B2', 175) },
    ]
  },
  {
    id: 'zone-73',
    name: 'Jaipur Railway Station',
    location: { lat: 26.9175, lng: 75.7878, address: 'Jaipur, Rajasthan' },
    landSize: 8000,
    hourlyRate: 30,
    totalSlots: 350,
    availableSlots: 105,
    evPoints: 22,
    disabledSpots: 14,
    parkingStructure: [
      { name: 'Ground', slots: generateSlots('G', 150) },
      { name: 'B1', slots: generateSlots('B1', 100) },
      { name: 'B2', slots: generateSlots('B2', 100) },
    ]
  },
  {
    id: 'zone-74',
    name: 'Hyderabad Airport',
    location: { lat: 17.2403, lng: 78.4294, address: 'Shamshabad, Hyderabad' },
    landSize: 22000,
    hourlyRate: 55,
    totalSlots: 1100,
    availableSlots: 280,
    evPoints: 70,
    disabledSpots: 38,
    parkingStructure: [
      { name: 'Ground', slots: generateSlots('G', 350) },
      { name: 'B1', slots: generateSlots('B1', 375) },
      { name: 'B2', slots: generateSlots('B2', 375) },
    ]
  },
  {
    id: 'zone-75',
    name: 'Inorbit Hyderabad',
    location: { lat: 17.4358, lng: 78.3892, address: 'Madhapur, Hyderabad' },
    landSize: 12000,
    hourlyRate: 50,
    totalSlots: 600,
    availableSlots: 135,
    evPoints: 35,
    disabledSpots: 20,
    parkingStructure: [
      { name: 'Ground', slots: generateSlots('G', 200) },
      { name: 'B1', slots: generateSlots('B1', 200) },
      { name: 'B2', slots: generateSlots('B2', 200) },
    ]
  },
  {
    id: 'zone-76',
    name: 'Lucknow Airport',
    location: { lat: 26.7606, lng: 80.8892, address: 'Lucknow, UP' },
    landSize: 8500,
    hourlyRate: 35,
    totalSlots: 380,
    availableSlots: 115,
    evPoints: 24,
    disabledSpots: 14,
    parkingStructure: [
      { name: 'Ground', slots: generateSlots('G', 150) },
      { name: 'B1', slots: generateSlots('B1', 115) },
      { name: 'B2', slots: generateSlots('B2', 115) },
    ]
  },
  {
    id: 'zone-77',
    name: 'Indore Bus Terminal',
    location: { lat: 22.7196, lng: 75.8577, address: 'Indore, MP' },
    landSize: 7000,
    hourlyRate: 25,
    totalSlots: 300,
    availableSlots: 95,
    evPoints: 18,
    disabledSpots: 12,
    parkingStructure: [
      { name: 'Ground', slots: generateSlots('G', 150) },
      { name: 'B1', slots: generateSlots('B1', 150) },
    ]
  },
  {
    id: 'zone-78',
    name: 'Nagpur Railway Station',
    location: { lat: 21.1498, lng: 79.0889, address: 'Nagpur, Maharashtra' },
    landSize: 7500,
    hourlyRate: 28,
    totalSlots: 320,
    availableSlots: 105,
    evPoints: 20,
    disabledSpots: 12,
    parkingStructure: [
      { name: 'Ground', slots: generateSlots('G', 150) },
      { name: 'B1', slots: generateSlots('B1', 170) },
    ]
  },
  {
    id: 'zone-79',
    name: 'Visakhapatnam Beach',
    location: { lat: 17.7116, lng: 83.3018, address: 'Vizag, AP' },
    landSize: 9000,
    hourlyRate: 30,
    totalSlots: 400,
    availableSlots: 155,
    evPoints: 25,
    disabledSpots: 15,
    parkingStructure: [
      { name: 'Ground', slots: generateSlots('G', 200) },
      { name: 'B1', slots: generateSlots('B1', 200) },
    ]
  },
  {
    id: 'zone-80',
    name: 'Bhopal Lake View',
    location: { lat: 23.2456, lng: 77.4039, address: 'Bhopal, MP' },
    landSize: 6500,
    hourlyRate: 25,
    totalSlots: 280,
    availableSlots: 98,
    evPoints: 16,
    disabledSpots: 10,
    parkingStructure: [
      { name: 'Ground', slots: generateSlots('G', 150) },
      { name: 'B1', slots: generateSlots('B1', 130) },
    ]
  },
  {
    id: 'zone-81',
    name: 'Chandigarh Sector 17',
    location: { lat: 30.7353, lng: 76.7853, address: 'Chandigarh' },
    landSize: 8000,
    hourlyRate: 35,
    totalSlots: 350,
    availableSlots: 125,
    evPoints: 22,
    disabledSpots: 14,
    parkingStructure: [
      { name: 'Ground', slots: generateSlots('G', 150) },
      { name: 'B1', slots: generateSlots('B1', 100) },
      { name: 'B2', slots: generateSlots('B2', 100) },
    ]
  },
  {
    id: 'zone-82',
    name: 'Guwahati Airport',
    location: { lat: 26.1062, lng: 91.5898, address: 'Guwahati, Assam' },
    landSize: 7000,
    hourlyRate: 35,
    totalSlots: 300,
    availableSlots: 88,
    evPoints: 18,
    disabledSpots: 12,
    parkingStructure: [
      { name: 'Ground', slots: generateSlots('G', 150) },
      { name: 'B1', slots: generateSlots('B1', 150) },
    ]
  },
  {
    id: 'zone-83',
    name: 'Bareja Gram Panchayat',
    location: { lat: 22.8542, lng: 72.6342, address: 'Bareja, Ahmedabad, Gujarat' },
    landSize: 1800,
    hourlyRate: 5,
    totalSlots: 50,
    availableSlots: 22,
    evPoints: 2,
    disabledSpots: 2,
    parkingStructure: [
      { name: 'Ground', slots: generateSlots('G', 50) },
    ]
  },
  {
    id: 'zone-84',
    name: 'Bareja Primary Health Center',
    location: { lat: 22.8535, lng: 72.6355, address: 'Bareja, Gujarat' },
    landSize: 1500,
    hourlyRate: 5,
    totalSlots: 40,
    availableSlots: 18,
    evPoints: 2,
    disabledSpots: 2,
    parkingStructure: [
      { name: 'Ground', slots: generateSlots('G', 40) },
    ]
  },
  {
    id: 'zone-85',
    name: 'Bareja Railway Station',
    location: { lat: 22.8558, lng: 72.6338, address: 'Bareja, Gujarat' },
    landSize: 2200,
    hourlyRate: 8,
    totalSlots: 60,
    availableSlots: 25,
    evPoints: 3,
    disabledSpots: 2,
    parkingStructure: [
      { name: 'Ground', slots: generateSlots('G', 60) },
    ]
  },
  {
    id: 'zone-86',
    name: 'Kochi Marine Drive',
    location: { lat: 9.9726, lng: 76.2782, address: 'Kochi, Kerala' },
    landSize: 8000,
    hourlyRate: 35,
    totalSlots: 350,
    availableSlots: 135,
    evPoints: 22,
    disabledSpots: 14,
    parkingStructure: [
      { name: 'Ground', slots: generateSlots('G', 150) },
      { name: 'B1', slots: generateSlots('B1', 200) },
    ]
  },
  {
    id: 'zone-87',
    name: 'Lulu Mall Kochi',
    location: { lat: 10.0251, lng: 76.3085, address: 'Edappally, Kochi' },
    landSize: 15000,
    hourlyRate: 50,
    totalSlots: 750,
    availableSlots: 185,
    evPoints: 50,
    disabledSpots: 28,
    parkingStructure: [
      { name: 'Ground', slots: generateSlots('G', 250) },
      { name: 'B1', slots: generateSlots('B1', 250) },
      { name: 'B2', slots: generateSlots('B2', 250) },
    ]
  },
  {
    id: 'zone-88',
    name: 'Mysore Palace',
    location: { lat: 12.3052, lng: 76.6552, address: 'Mysore, Karnataka' },
    landSize: 10000,
    hourlyRate: 30,
    totalSlots: 450,
    availableSlots: 165,
    evPoints: 28,
    disabledSpots: 18,
    parkingStructure: [
      { name: 'Ground', slots: generateSlots('G', 200) },
      { name: 'B1', slots: generateSlots('B1', 250) },
    ]
  },
  {
    id: 'zone-89',
    name: 'Madurai Meenakshi Temple',
    location: { lat: 9.9252, lng: 78.1198, address: 'Madurai, Tamil Nadu' },
    landSize: 9000,
    hourlyRate: 25,
    totalSlots: 400,
    availableSlots: 145,
    evPoints: 25,
    disabledSpots: 16,
    parkingStructure: [
      { name: 'Ground', slots: generateSlots('G', 200) },
      { name: 'B1', slots: generateSlots('B1', 200) },
    ]
  },
  {
    id: 'zone-90',
    name: 'Udaipur City Palace',
    location: { lat: 24.5765, lng: 73.6835, address: 'Udaipur, Rajasthan' },
    landSize: 8000,
    hourlyRate: 35,
    totalSlots: 350,
    availableSlots: 125,
    evPoints: 22,
    disabledSpots: 14,
    parkingStructure: [
      { name: 'Ground', slots: generateSlots('G', 150) },
      { name: 'B1', slots: generateSlots('B1', 200) },
    ]
  },
  {
    id: 'zone-91',
    name: 'Jodhpur Airport',
    location: { lat: 26.2592, lng: 73.0488, address: 'Jodhpur, Rajasthan' },
    landSize: 6000,
    hourlyRate: 30,
    totalSlots: 250,
    availableSlots: 82,
    evPoints: 15,
    disabledSpots: 10,
    parkingStructure: [
      { name: 'Ground', slots: generateSlots('G', 150) },
      { name: 'B1', slots: generateSlots('B1', 100) },
    ]
  },
  {
    id: 'zone-92',
    name: 'Amritsar Golden Temple',
    location: { lat: 31.6200, lng: 74.8765, address: 'Amritsar, Punjab' },
    landSize: 12000,
    hourlyRate: 30,
    totalSlots: 550,
    availableSlots: 185,
    evPoints: 35,
    disabledSpots: 22,
    parkingStructure: [
      { name: 'Ground', slots: generateSlots('G', 250) },
      { name: 'B1', slots: generateSlots('B1', 150) },
      { name: 'B2', slots: generateSlots('B2', 150) },
    ]
  },
  {
    id: 'zone-93',
    name: 'Ludhiana Bus Stand',
    location: { lat: 30.9009, lng: 75.8573, address: 'Ludhiana, Punjab' },
    landSize: 5500,
    hourlyRate: 25,
    totalSlots: 220,
    availableSlots: 78,
    evPoints: 14,
    disabledSpots: 8,
    parkingStructure: [
      { name: 'Ground', slots: generateSlots('G', 120) },
      { name: 'B1', slots: generateSlots('B1', 100) },
    ]
  },
  {
    id: 'zone-94',
    name: 'Dehradun Railway Station',
    location: { lat: 30.3254, lng: 78.0437, address: 'Dehradun, Uttarakhand' },
    landSize: 5000,
    hourlyRate: 25,
    totalSlots: 200,
    availableSlots: 68,
    evPoints: 12,
    disabledSpots: 8,
    parkingStructure: [
      { name: 'Ground', slots: generateSlots('G', 120) },
      { name: 'B1', slots: generateSlots('B1', 80) },
    ]
  },
  {
    id: 'zone-95',
    name: 'Shimla Mall Road',
    location: { lat: 31.1048, lng: 77.1734, address: 'Shimla, Himachal Pradesh' },
    landSize: 4000,
    hourlyRate: 35,
    totalSlots: 150,
    availableSlots: 35,
    evPoints: 8,
    disabledSpots: 6,
    parkingStructure: [
      { name: 'Ground', slots: generateSlots('G', 80) },
      { name: 'B1', slots: generateSlots('B1', 70) },
    ]
  },
  {
    id: 'zone-96',
    name: 'Manali Bus Stand',
    location: { lat: 32.2396, lng: 77.1887, address: 'Manali, HP' },
    landSize: 3500,
    hourlyRate: 30,
    totalSlots: 130,
    availableSlots: 42,
    evPoints: 6,
    disabledSpots: 4,
    parkingStructure: [
      { name: 'Ground', slots: generateSlots('G', 80) },
      { name: 'B1', slots: generateSlots('B1', 50) },
    ]
  },
  {
    id: 'zone-97',
    name: 'Panjim Market',
    location: { lat: 15.4989, lng: 73.8278, address: 'Panjim, Goa' },
    landSize: 4500,
    hourlyRate: 40,
    totalSlots: 180,
    availableSlots: 55,
    evPoints: 10,
    disabledSpots: 6,
    parkingStructure: [
      { name: 'Ground', slots: generateSlots('G', 100) },
      { name: 'B1', slots: generateSlots('B1', 80) },
    ]
  },
  {
    id: 'zone-98',
    name: 'Calangute Beach',
    location: { lat: 15.5442, lng: 73.7557, address: 'Calangute, Goa' },
    landSize: 6000,
    hourlyRate: 50,
    totalSlots: 250,
    availableSlots: 65,
    evPoints: 15,
    disabledSpots: 10,
    parkingStructure: [
      { name: 'Ground', slots: generateSlots('G', 150) },
      { name: 'B1', slots: generateSlots('B1', 100) },
    ]
  },
  {
    id: 'zone-99',
    name: 'Bareja Vegetable Market',
    location: { lat: 22.8549, lng: 72.6349, address: 'Bareja, Gujarat' },
    landSize: 2000,
    hourlyRate: 8,
    totalSlots: 60,
    availableSlots: 28,
    evPoints: 3,
    disabledSpots: 2,
    parkingStructure: [
      { name: 'Ground', slots: generateSlots('G', 60) },
    ]
  },
  {
    id: 'zone-100',
    name: 'Bareja Crossroads',
    location: { lat: 22.8552, lng: 72.6342, address: 'Bareja Char Rasta, Gujarat' },
    landSize: 2500,
    hourlyRate: 10,
    totalSlots: 75,
    availableSlots: 32,
    evPoints: 4,
    disabledSpots: 3,
    parkingStructure: [
      { name: 'Ground', slots: generateSlots('G', 75) },
    ]
  }
];
