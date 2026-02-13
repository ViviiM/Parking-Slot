# 🅿️ ParkSlot - Smart Parking Solution

**ParkSlot** is a modern, responsive web application designed to simplify the parking experience. Built with **Next.js 16**, it offers real-time parking availability, smart slot allocation based on vehicle type, and a seamless booking process.

## 🚀 Features

- **🗺️ Interactive Map Interface**: 
  - Visualize parking zones and availability in real-time using Leaflet maps.
  - "Fly to" current user location.
  - Color-coded zones (Green for available, Red for full).

- **🚗 Smart Booking System**: 
  - **Auto-Allocation Logic**: Automatically suggests the best slot based on user profile (e.g., Disabled spots, EV charging stations).
  - Manual slot selection via an intuitive layer/floor view.
  - Real-time cost estimation based on duration.

- **👤 User Profile Management**:
  - Manage secure personal details.
  - **Vehicle Registry**: Add multiple vehicles, specifying type (**EV, Petrol, Diesel**) and plate numbers.
  - **Accessibility**: Priority settings for disabled parking requiremenets.

- **🎟️ Digital Parking Pass**:
  - View active bookings instantly.
  - **QR Code Generation**: For easy scanning at entry/exit points.
  - **Print/Download PDF**: Mobile-optimized pass view with native print support.

- **📱 Mobile-First Design**:
  - Fully responsive UI/UX tailored for on-the-go usage.
  - Bottom navigation and touch-friendly controls.

- **🔔 Smart Notifications**:
  - Real-time feedback using toast notifications (Success, Error, Warnings) for bookings and location services.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [ShadCN UI](https://ui.shadcn.com/)
- **Map**: [React Leaflet](https://react-leaflet.js.org/) & [Leaflet](https://leafletjs.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) (with persistence)
- **Forms & Validation**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Notifications**: [Sonner](https://sonner.emilkowal.ski/)

## 📦 Getting Started

Follow these steps to set up the project locally:

### Prerequisites
- Node.js 18+ installed
- npm, yarn, or pnpm

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/parkslot.git
   cd parkslot
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open the app:**
   Visit [http://localhost:3000](http://localhost:3000) in your browser.

## 📂 Project Structure

```
/parkslot
├── app/                  # Next.js App Router pages
│   ├── booking/          # Booking flow & success pages
│   ├── bookings/         # User booking history & view pass
│   ├── map/              # Main map interface
│   ├── auth/             # Login/Signup pages
│   └── layout.tsx        # Root layout with Toaster & Fonts
├── components/           # Reusable UI components
│   ├── booking/          # BookingPassModal, etc.
│   ├── map/              # ParkingMap, MapController
│   ├── user/             # UserProfileModal
│   └── ui/               # ShadCN UI primitives (Button, Card, etc.)
├── store/                # Global state (Zustand)
│   ├── useAuthStore.ts   # User session & profile state
│   └── useParkingStore.ts# Parking data & booking logic
├── types/                # TypeScript interfaces
├── lib/                  # Utilities & Dummy Data
└── public/               # Static assets & Icons
```

## 🔐 Security & Persistence
- User sessions and parking data are persisted locally using securely encrypted `localStorage` (via `crypto-js` and Zustand middleware).
- Authentication is simulated for demonstration purposes.

## 🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

Built with ❤️ by [Your Name] using Next.js & React.
