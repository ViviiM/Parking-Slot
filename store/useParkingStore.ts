import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Zone, Booking } from '@/types';
import { encryptData, decryptData } from '@/lib/encryption';
import { MOCK_ZONES } from '@/lib/dummyData';

interface ParkingState {
  zones: Zone[];
  activeBooking: Booking | null;
  bookings: Booking[];
  selectedZone: Zone | null;

  // Actions
  setZones: (zones: Zone[]) => void;
  selectZone: (zoneId: string) => void;
  bookSlot: (booking: Booking) => void;
  cancelBooking: (bookingId: string) => void;
  completeBooking: (bookingId: string) => void;
  updateAvailability: (zoneId: string) => void; 
}

const encryptedStorage = {
    getItem: (name: string) => {
      if (typeof window === 'undefined') return null;
      const item = localStorage.getItem(name);
      if (!item) return null;
      try {
        const decrypted = decryptData(item);
        return decrypted ? (typeof decrypted === 'string' ? decrypted : JSON.stringify(decrypted)) : null;
      } catch (e) {
        return null;
      }
    },
    setItem: (name: string, value: string) => {
      if (typeof window === 'undefined') return;
      localStorage.setItem(name, encryptData(value));
    },
    removeItem: (name: string) => {
      if (typeof window === 'undefined') return;
      localStorage.removeItem(name);
    },
};

export const useParkingStore = create<ParkingState>()(
  persist(
    (set, get) => ({
      zones: MOCK_ZONES,
      activeBooking: null,
      bookings: [],
      selectedZone: null,

      setZones: (zones) => set({ zones }),
      
      selectZone: (zoneId) => {
        const zone = get().zones.find((z) => z.id === zoneId);
        set({ selectedZone: zone || null });
      },

      bookSlot: (booking) => set((state) => ({
        bookings: [...state.bookings, booking],
        activeBooking: booking,
        // Update slot status in zone
        zones: state.zones.map(z => {
            if (z.id !== booking.zoneId) return z;
            return {
                ...z,
                parkingStructure: z.parkingStructure.map(layer => {
                    if (layer.name !== booking.layer) return layer;
                    return {
                        ...layer,
                        slots: layer.slots.map(slot => {
                            if (slot.id !== booking.slotId) return slot;
                            return { ...slot, isOccupied: true, bookedBy: booking.userId };
                        })
                    }
                }),
                availableSlots: z.availableSlots - 1
            }
        })
      })),

      cancelBooking: (bookingId) => set((state) => ({
        bookings: state.bookings.map(b => b.id === bookingId ? { ...b, status: 'cancelled' } : b),
        activeBooking: state.activeBooking?.id === bookingId ? null : state.activeBooking,
        // Release slot logic... (omitted for brevity but should be here)
      })),
      
      completeBooking: (bookingId) => set((state) => ({
          bookings: state.bookings.map(b => b.id === bookingId ? { ...b, status: 'completed' } : b),
          activeBooking: state.activeBooking?.id === bookingId ? null : state.activeBooking,
      })),

      updateAvailability: (zoneId) => {
          // Simulate some random changes
          set((state) => ({
              zones: state.zones.map(z => {
                  if (z.id !== zoneId) return z;
                  // Randomly free up or occupy a slot
                  const randomLayerIdx = Math.floor(Math.random() * z.parkingStructure.length);
                  const layer = z.parkingStructure[randomLayerIdx];
                  const randomSlotIdx = Math.floor(Math.random() * layer.slots.length);
                  
                  // Toggle occupation
                  const slot = layer.slots[randomSlotIdx];
                  // Only change if not booked by current user
                  if (slot.bookedBy === state.activeBooking?.userId) return z;
                  
                  const newIsOccupied = !slot.isOccupied;
                  
                  const newLayer = {
                      ...layer,
                      slots: layer.slots.map((s, i) => i === randomSlotIdx ? { ...s, isOccupied: newIsOccupied } : s)
                  };
                  
                  const newStructure = [...z.parkingStructure];
                  newStructure[randomLayerIdx] = newLayer;
                  
                  return {
                      ...z,
                      parkingStructure: newStructure,
                      availableSlots: newIsOccupied ? z.availableSlots - 1 : z.availableSlots + 1
                  };
              })
          }))
      }
    }),
    {
      name: 'parking-data-storage',
      storage: createJSONStorage(() => encryptedStorage),
      // We only persist bookings. Zones are reset on reload to pick up new mock data.
      // In a real app, zones would be fetched from an API.
      partialize: (state) => ({ 
          bookings: state.bookings, 
          activeBooking: state.activeBooking 
      }),
      // Rehydrate zones from MOCK_ZONES
      onRehydrateStorage: () => (state) => {
          if (state) {
              state.setZones(MOCK_ZONES);
          }
      }
    }
  )
);
