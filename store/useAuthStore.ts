import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { User, Role, Vehicle } from '@/types';
import { encryptData, decryptData } from '@/lib/encryption';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
  login: (userData: User) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

// Custom storage wrapper for encryption
const encryptedStorage = {
  getItem: (name: string) => {
    if (typeof window === 'undefined') return null;
    const item = localStorage.getItem(name);
    if (!item) return null;
    try {
      // The stored item is encrypted string. Decrypt it.
      // But wait! decryptData expects the ciphertext.
      // decryptData returns the JSON implementation.
      // HOWEVER, zustand's persist expects a stringified JSON.
      // So if I stored the raw encrypted string, decrypting it returns the Object?
      // No, decryptData returns whatever was encrypted.
      // Zustand persist passes the serialized state string to setItem.
      // So encryptData(serializedStateString) -> ciphertext.
      // decryptData(ciphertext) -> serializedStateString.
      
      // Let's check my encryption lib:
      // encryptData: returns CryptoJS.AES.encrypt(JSON.stringify(data))...
      // Oops, my encryptData JSON.stringifies the input. 
      // If Zustand passes a string, it gets stringified again (double quota).
      // That's fine, decryptData parses it once, returning the string "..." 
      // which Zustand then JSON.parses. PERFECT.
      
      const decrypted = decryptData(item);
      return decrypted;
    } catch (e) {
      return null;
    }
  },
  setItem: (name: string, value: string) => {
    if (typeof window === 'undefined') return;
    const encrypted = encryptData(value);
    localStorage.setItem(name, encrypted);
  },
  removeItem: (name: string) => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(name);
  },
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null as User | null,
      isAuthenticated: false,
      _hasHydrated: false,
      login: (userData) => set({ user: userData, isAuthenticated: true }),
      logout: () => {
          localStorage.removeItem('parking-auth-storage'); 
          set({ user: null, isAuthenticated: false });
      },
      updateUser: (updates) => set((state) => ({ 
        user: state.user ? { ...state.user, ...updates } : null 
      })),
      setHasHydrated: (state) => set({ _hasHydrated: state }),
    }),
    {
      name: 'parking-auth-storage',
      storage: createJSONStorage(() => encryptedStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
