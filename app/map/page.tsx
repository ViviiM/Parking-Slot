"use client";
import React, { useState, useMemo, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useAuthStore } from '@/store/useAuthStore';
import { useParkingStore } from '@/store/useParkingStore';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Loader2, Car, Zap, Accessibility, Clock, Search, User, LogOut, Ticket } from 'lucide-react';
import { Booking, ParkingSlot, Zone } from '@/types';
import { cn } from '@/lib/utils';
import UserProfileModal from '@/components/user/UserProfileModal';
import { toast } from 'sonner';

// Dynamic import for Map to avoid SSR issues
const ParkingMap = dynamic(() => import('@/components/map/ParkingMap'), {
  ssr: false,
  loading: () => <div className="h-[60vh] w-full flex items-center justify-center bg-muted text-muted-foreground">Loading Map...</div>
});

export default function MapPage() {
    const router = useRouter();
    const { user, _hasHydrated, logout } = useAuthStore();
    const { zones, bookSlot } = useParkingStore();
    
    const [selectedZoneId, setSelectedZoneId] = useState<string | null>(null);
    const [selectedSlot, setSelectedSlot] = useState<ParkingSlot | null>(null);
    const [bookingProcessing, setProcessing] = useState(false);
    const [duration, setDuration] = useState(2); // hours
    const selectedZone = useMemo(() => zones.find(z => z.id === selectedZoneId), [zones, selectedZoneId]);
    const [searchQuery, setSearchQuery] = useState("");
    const [focusedLocation, setFocusedLocation] = useState<[number, number] | null>(null);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const detailsRef = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Only redirect if hydration is complete and user is missing
        if (_hasHydrated && !user) {
            router.push('/auth');
        }
    }, [user, router, _hasHydrated]);

    if (!_hasHydrated || !user) {
         return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin" /></div>;
    }

    const handleLogout = () => {
        logout();
        router.push('/auth');
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;

        const query = searchQuery.toLowerCase();
        
        // Detailed search matching name or address
        const matchedZone = zones.find(z => 
            z.name.toLowerCase().includes(query) || 
            (z.location.address && z.location.address.toLowerCase().includes(query))
        );

        if (matchedZone) {
            setFocusedLocation([matchedZone.location.lat, matchedZone.location.lng]);
            setSelectedZoneId(matchedZone.id);
            setSelectedSlot(null);
        } else {
             toast.error("Location not found. Try searching for a specific zone name or address.");
        }
    };

    
    const handleZoneSelect = (id: string) => {
        setSelectedZoneId(id);
        setSelectedSlot(null);
        
        // Scroll to details section on mobile
        setTimeout(() => {
            detailsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    };

    const autoAllocate = () => {
        if (!selectedZone || !user) return;
        
        let bestSlot: ParkingSlot | null = null;
        const allSlots = selectedZone.parkingStructure.flatMap(layer => layer.slots);
        const available = allSlots.filter(s => !s.isOccupied);
        
        if (user.isDisabled) {
            bestSlot = available.find(s => s.typ === 'disabled') || available[0];
        } else if (user.vehicle?.type === 'EV') {
            bestSlot = available.find(s => s.typ === 'ev') || available[0];
        } else {
            bestSlot = available.find(s => s.typ === 'standard') || available[0];
        }
        
        if (bestSlot) {
            setSelectedSlot(bestSlot);
        } else {
            toast.warning("No suitable slots available in this zone!");
        }
    };

    const handleBooking = () => {
        if (!selectedZone || !selectedSlot || !user) return;
        setProcessing(true);
        const cost = selectedZone.hourlyRate * duration;

        setTimeout(() => {
            const newBooking: Booking = {
                id: Math.random().toString(36).substr(2, 9),
                userId: user.id,
                userName: user.name,
                zoneId: selectedZone.id!,
                zoneName: selectedZone.name!,
                slotId: selectedSlot.id,
                layer: selectedSlot.layer,
                vehicleNo: user.vehicle?.plateNumber || 'Unknown',
                startTime: new Date().toISOString(),
                estimatedDuration: duration,
                totalCost: cost,
                status: 'active'
            };
            
            bookSlot(newBooking);
            setProcessing(false);
            router.push('/booking/success');
        }, 1500);
    };

    return (
    <div className="flex flex-col min-h-screen p-4 pb-24 md:pb-4 gap-4 max-w-7xl mx-auto relative">
      {/* Profile Modal Overlay */}
      {isProfileOpen && (
          <UserProfileModal 
            user={user} 
            isOpen={isProfileOpen} 
            onClose={() => setIsProfileOpen(false)} 
            onLogout={handleLogout}
          />
      )}

      <header className="flex justify-between items-center pb-2">
        <div className="flex items-center gap-3">
            <div 
                className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center cursor-pointer hover:bg-primary/20 transition-colors"
                onClick={() => setIsProfileOpen(true)}
            >
                <User className="w-5 h-5" />
            </div>
            <div>
                <h1 className="text-2xl font-bold">Ashish Parking</h1>
                <p className="text-muted-foreground text-sm cursor-pointer hover:underline" onClick={() => setIsProfileOpen(true)}>
                    Welcome, {user.name || 'Ashish'}
                </p>
            </div>
        </div>
        
        <div className="flex items-center gap-2">
             <Button variant="ghost" size="icon" onClick={() => router.push('/bookings')} title="My Bookings">
                 <Ticket className="w-5 h-5 text-muted-foreground" />
             </Button>
             {user?.isDisabled && <Badge variant="destructive" className="hidden md:flex"><Accessibility className="w-3 h-3 mr-1"/> Priority</Badge>}
             {user?.vehicle?.type === 'EV' && <Badge variant="default" className="bg-green-600 hidden md:flex"><Zap className="w-3 h-3 mr-1"/> EV</Badge>}
        </div>
      </header>
      
      
      <main className="grid md:grid-cols-3 gap-6 h-full flex-1">
        {/* Map Section */}
        <div className="md:col-span-2 relative h-full flex flex-col gap-4">
             {/* Search Bar - Interactive */}
             <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-[400] w-3/4 max-w-md">
                 <form onSubmit={handleSearch} className="relative group">
                     <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                     <input 
                        type="text" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search location (e.g. Downtown)" 
                        className="w-full pl-10 pr-4 py-2 rounded-full border shadow-sm bg-white/90 backdrop-blur focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                     />
                 </form>
             </div>
             
             <ParkingMap onZoneSelect={handleZoneSelect} focusedLocation={focusedLocation} />
        </div>

        {/* Configuration / Details Section */}
        <div ref={detailsRef} className="md:col-span-1 h-full overflow-y-auto pb-20 md:pb-0 scroll-mt-20">
             <Card className="h-full border-none shadow-none md:border md:shadow-sm">
                <CardHeader>
                    <CardTitle>{selectedZone ? selectedZone.name : "Select a Zone"}</CardTitle>
                    <CardDescription>
                        {selectedZone 
                          ? <span>{selectedZone.availableSlots} slots • ${selectedZone.hourlyRate}/hr • <span className="text-blue-500">{1.2} km away</span></span>
                          : "Tap a green circle on the map to view details"}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {selectedZone ? (
                        <div className="space-y-6">
                            {/* Trip Scheduler if far away */}
                            <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 text-sm flex gap-3 items-start">
                                <Clock className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                                <div>
                                    <p className="font-semibold text-blue-900">Schedule Arrival?</p>
                                    <p className="text-blue-700">It takes about <span className="font-bold">15 mins</span> to drive there.</p>
                                    <div className="mt-2 flex items-center gap-2">
                                        <label className="text-xs font-medium">Arrive at:</label>
                                        <input type="time" className="bg-white border rounded px-1 py-0.5 text-xs" defaultValue="14:30" />
                                    </div>
                                </div>
                            </div>
                        
                            {/* Layer View */}
                            <Tabs defaultValue={selectedZone.parkingStructure[0].name} className="w-full">
                                <TabsList className="grid w-full grid-cols-3">
                                    {selectedZone.parkingStructure.map(layer => (
                                        <TabsTrigger key={layer.name} value={layer.name}>{layer.name}</TabsTrigger>
                                    ))}
                                </TabsList>
                                <div className="max-h-[300px] overflow-y-auto pr-1 mt-4 custom-scrollbar">
                                    {selectedZone.parkingStructure.map(layer => (
                                        <TabsContent key={layer.name} value={layer.name} className="mt-0">
                                            <div className="grid grid-cols-5 gap-2">
                                                {layer.slots.map(slot => (
                                                    <button
                                                        key={slot.id}
                                                        disabled={slot.isOccupied}
                                                        onClick={() => setSelectedSlot(slot)}
                                                        className={cn(
                                                            "h-8 rounded text-xs flex items-center justify-center border transition-all relative overflow-hidden",
                                                            slot.isOccupied 
                                                                ? "bg-muted text-muted-foreground opacity-50 cursor-not-allowed" 
                                                                : selectedSlot?.id === slot.id 
                                                                    ? "bg-primary text-primary-foreground border-primary scale-110 shadow-md z-10" 
                                                                    : "bg-background hover:bg-accent hover:border-primary/50",
                                                            slot.typ === 'disabled' && !slot.isOccupied && "border-blue-300 bg-blue-50 text-blue-700",
                                                            slot.typ === 'ev' && !slot.isOccupied && "border-green-300 bg-green-50 text-green-700"
                                                        )}
                                                    >
                                                        {slot.typ === 'disabled' ? <Accessibility className="w-3 h-3"/> : 
                                                         slot.typ === 'ev' ? <Zap className="w-3 h-3"/> : 
                                                         slot.id.split('-')[1]}
                                                    </button>
                                                ))}
                                            </div>
                                        </TabsContent>
                                    ))}
                                </div>
                            </Tabs>

                            <div className="space-y-4 pt-4 border-t">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">Duration</span>
                                    <div className="flex items-center gap-2 bg-muted rounded-md p-1">
                                        <Button variant="ghost" size="icon" className="h-7 w-7 rounded-sm" onClick={() => setDuration(Math.max(1, duration - 1))}>-</Button>
                                        <span className="w-8 text-center text-sm font-mono">{duration}h</span>
                                        <Button variant="ghost" size="icon" className="h-7 w-7 rounded-sm" onClick={() => setDuration(duration + 1)}>+</Button>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center font-bold text-lg">
                                    <span>Total</span>
                                    <span>${selectedZone.hourlyRate * duration}</span>
                                </div>
                            </div>

                            <div className="flex gap-3 pt-2">
                                <Button variant="outline" className="flex-1" onClick={autoAllocate}>
                                    Auto-Find
                                </Button>
                                <Button className="flex-1" disabled={!selectedSlot || bookingProcessing} onClick={handleBooking}>
                                    {bookingProcessing ? <Loader2 className="animate-spin w-4 h-4"/> : "Confirm Booking"}
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-muted-foreground opacity-50 animate-in fade-in">
                            <Car className="w-16 h-16 mb-4 stroke-1" />
                            <p className="text-lg font-medium">Select a zone</p>
                            <p className="text-sm">Tap on the map to start</p>
                        </div>
                    )}
                </CardContent>
             </Card>
        </div>
      </main>
      
      {/* Mobile helper text or actions could go here */}
    </div>
  );
}
