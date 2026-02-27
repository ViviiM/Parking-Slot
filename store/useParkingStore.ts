import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Zone, Booking } from '@/types';
import { encryptData, decryptData } from '@/lib/encryption';
import { MOCK_ZONES, getInitialZones } from '@/lib/dummyData';

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
  completeBooking: (bookingId: string, finalDurationHr?: number, finalCost?: number) => void;
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
      zones: getInitialZones(),
      activeBooking: null,
      bookings: [],
      selectedZone: null,

      setZones: (zones) => set({ zones }),
      
      selectZone: (zoneId) => {
        const zone = get().zones.find((z) => z.id === zoneId);
        set({ selectedZone: zone || null });
      },

      bookSlot: (booking) => set((state) => {
          if (typeof window !== 'undefined') {
              try {
                  const keys = JSON.parse(localStorage.getItem('booked_slots_keys') || '[]');
                  keys.push({ zoneId: booking.zoneId, slotId: booking.slotId });
                  localStorage.setItem('booked_slots_keys', JSON.stringify(keys));
              } catch(e) {}
          }
          const newZones = state.zones.map(z => {
              if (z.id !== booking.zoneId) return z;
              return {
                  ...z,
                  parkingStructure: z.parkingStructure.map(layer => {
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
          });
          
          return {
            bookings: [...state.bookings, booking],
            activeBooking: booking,
            zones: newZones,
            selectedZone: state.selectedZone?.id === booking.zoneId 
                ? newZones.find(z => z.id === booking.zoneId) 
                : state.selectedZone
          };
      }),

      cancelBooking: (bookingId) => set((state) => {
        const booking = state.bookings.find(b => b.id === bookingId);
        if (!booking) return state;

        if (typeof window !== 'undefined') {
            try {
                let keys = JSON.parse(localStorage.getItem('booked_slots_keys') || '[]');
                keys = keys.filter((k: any) => !(k.zoneId === booking.zoneId && k.slotId === booking.slotId));
                localStorage.setItem('booked_slots_keys', JSON.stringify(keys));
            } catch(e) {}
        }

        const newZones = state.zones.map(z => {
            if (z.id !== booking.zoneId) return z;
            return {
                ...z,
                parkingStructure: z.parkingStructure.map(layer => {
                    return {
                        ...layer,
                        slots: layer.slots.map(slot => {
                            if (slot.id !== booking.slotId) return slot;
                            return { ...slot, isOccupied: false, bookedBy: undefined };
                        })
                    }
                }),
                availableSlots: z.availableSlots + 1
            }
        });

        return {
            bookings: state.bookings.map(b => b.id === bookingId ? { ...b, status: 'cancelled' } : b),
            activeBooking: state.activeBooking?.id === bookingId ? null : state.activeBooking,
            zones: newZones,
            selectedZone: state.selectedZone?.id === booking.zoneId ? newZones.find(z => z.id === booking.zoneId) : state.selectedZone
        };
      }),
      
      completeBooking: (bookingId, finalDurationHr, finalCost) => set((state) => {
          const booking = state.bookings.find(b => b.id === bookingId);
          if (!booking) return state;

          if (typeof window !== 'undefined') {
              try {
                  let keys = JSON.parse(localStorage.getItem('booked_slots_keys') || '[]');
                  keys = keys.filter((k: any) => !(k.zoneId === booking.zoneId && k.slotId === booking.slotId));
                  localStorage.setItem('booked_slots_keys', JSON.stringify(keys));
              } catch(e) {}
          }

          const newZones = state.zones.map(z => {
              if (z.id !== booking.zoneId) return z;
              return {
                  ...z,
                  parkingStructure: z.parkingStructure.map(layer => {
                      return {
                          ...layer,
                          slots: layer.slots.map(slot => {
                              if (slot.id !== booking.slotId) return slot;
                              return { ...slot, isOccupied: false, bookedBy: undefined };
                          })
                      }
                  }),
                  availableSlots: z.availableSlots + 1
              }
          });

          return {
              bookings: state.bookings.map(b => b.id === bookingId ? { 
                  ...b, 
                  status: 'completed',
                  estimatedDuration: finalDurationHr || b.estimatedDuration,
                  totalCost: finalCost !== undefined ? finalCost : b.totalCost,
                  endTime: new Date().toISOString()
              } : b),
              activeBooking: state.activeBooking?.id === bookingId ? null : state.activeBooking,
              zones: newZones,
              selectedZone: state.selectedZone?.id === booking.zoneId ? newZones.find(z => z.id === booking.zoneId) : state.selectedZone
          };
      }),

      updateAvailability: (zoneId) => {
          // Simulate some random changes
          set((state) => {
              const newZones = state.zones.map(z => {
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
              });

              return {
                  zones: newZones,
                  selectedZone: state.selectedZone?.id === zoneId ? newZones.find(z => z.id === zoneId) : state.selectedZone
              };
          })
      }
    }),
    {
      name: 'parking-data-storage',
      storage: createJSONStorage(() => encryptedStorage),
      // We only persist bookings. Zones are reset on reload to pick up new mock data and manually disabled by getInitialZones.
      partialize: (state) => ({ 
          bookings: state.bookings, 
          activeBooking: state.activeBooking
      })
    }
  )
);
