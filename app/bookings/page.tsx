"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { useParkingStore } from "@/store/useParkingStore";
import { useEffect, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
    Loader2, Calendar, MapPin, Clock, ArrowLeft, 
    MoreVertical, Navigation, XCircle, CheckCircle2, Ticket
} from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import BookingPassModal from "@/components/booking/BookingPassModal";
import { Booking } from "@/types";

export default function BookingsPage() {
    const router = useRouter();
    const { user, _hasHydrated } = useAuthStore();
    const { bookings, cancelBooking } = useParkingStore();
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<'all' | 'active' | 'completed' | 'cancelled'>('all');
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

    useEffect(() => {
        if (_hasHydrated) {
            if (!user) {
                router.push('/auth');
            } else {
                setLoading(false);
            }
        }
    }, [_hasHydrated, user, router]);

    if (loading || !_hasHydrated) {
        return <div className="min-h-screen flex items-center justify-center bg-gray-50"><Loader2 className="animate-spin text-primary" /></div>;
    }

    const myBookings = bookings
        .filter(b => b.userId === user!.id)
        .filter(b => filter === 'all' ? true : b.status === filter)
        .sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime());

    const getStatusColor = (status: string) => {
        switch(status) {
            case 'active': return 'bg-green-100 text-green-700 border-green-200';
            case 'completed': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'cancelled': return 'bg-red-100 text-red-700 border-red-200';
            default: return 'bg-gray-100 text-gray-700';
        }
    };



    return (
        <div className="min-h-screen bg-gray-50 pb-20 md:pb-10">
            {/* Mobile Header */}
            <div className="bg-white sticky top-0 z-10 border-b px-4 py-3 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-3">
                    <Button variant="ghost" size="icon" className="-ml-2 rounded-full" onClick={() => router.push('/map')}>
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                    <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">My Bookings</h1>
                </div>
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                    {user?.name?.charAt(0)}
                </div>
            </div>

            <div className="container max-w-lg mx-auto py-4 px-4 space-y-4">
                {/* Stats Summary */}
                <div className="grid grid-cols-3 gap-3">
                    <div className="bg-white p-3 rounded-xl border shadow-sm flex flex-col items-center">
                        <span className="text-2xl font-bold text-primary">{bookings.filter(b => b.userId === user!.id).length}</span>
                        <span className="text-xs text-muted-foreground font-medium">Total</span>
                    </div>
                    <div className="bg-white p-3 rounded-xl border shadow-sm flex flex-col items-center">
                        <span className="text-2xl font-bold text-green-600">{bookings.filter(b => b.userId === user!.id && b.status === 'active').length}</span>
                        <span className="text-xs text-muted-foreground font-medium">Active</span>
                    </div>
                    <div className="bg-white p-3 rounded-xl border shadow-sm flex flex-col items-center">
                        <span className="text-2xl font-bold text-blue-600">{bookings.filter(b => b.userId === user!.id && b.status === 'completed').length}</span>
                        <span className="text-xs text-muted-foreground font-medium">Done</span>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                    {['all', 'active', 'completed', 'cancelled'].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f as any)}
                            className={cn(
                                "px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all border",
                                filter === f 
                                    ? "bg-primary text-primary-foreground border-primary shadow-md" 
                                    : "bg-white text-muted-foreground border-gray-200 hover:bg-gray-100"
                            )}
                        >
                            {f.charAt(0).toUpperCase() + f.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Bookings List */}
                <div className="space-y-4">
                    {myBookings.length > 0 ? (
                        myBookings.map((booking) => (
                            <Card key={booking.id} className="overflow-hidden border-none shadow-md group relative">
                                {/* Status Strip */}
                                <div className={cn(
                                    "absolute left-0 top-0 bottom-0 w-1.5",
                                    booking.status === 'active' ? "bg-green-500" : 
                                    booking.status === 'completed' ? "bg-blue-500" : "bg-red-400"
                                )} />

                                <CardHeader className="p-4 pb-2 pl-5 flex flex-row items-start justify-between space-y-0">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <Badge variant="outline" className={cn("capitalize border-0 px-2 py-0.5", getStatusColor(booking.status))}>
                                                {booking.status}
                                            </Badge>
                                            <span className="text-xs text-muted-foreground font-mono">#{booking.id.slice(-6)}</span>
                                        </div>
                                        <h3 className="font-bold text-lg leading-tight">{booking.zoneName}</h3>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-xl font-bold text-primary">${booking.totalCost}</div>
                                        <div className="text-xs text-muted-foreground">{booking.estimatedDuration} hrs</div>
                                    </div>
                                </CardHeader>

                                <CardContent className="p-4 pt-2 pl-5 pb-3 space-y-3">
                                    <div className="flex items-center gap-4 text-sm text-gray-600">
                                        <div className="flex items-center gap-1.5">
                                            <Calendar className="w-4 h-4 text-primary/70" />
                                            <span className="font-medium">{new Date(booking.startTime).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Clock className="w-4 h-4 text-primary/70" />
                                            <span className="font-medium">
                                                {new Date(booking.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                                        <div>
                                            <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Slot Info</p>
                                            <div className="flex items-center gap-2 mt-0.5">
                                                <Badge variant="secondary" className="bg-white border text-gray-700 font-mono">
                                                    {booking.layer}
                                                </Badge>
                                                <span className="font-bold text-gray-900">{booking.slotId.split('-')[1]}</span>
                                            </div>
                                        </div>
                                        {booking.status === 'active' && (
                                           <div className="text-right">
                                               <p className="text-xs text-green-600 font-medium">Navigating...</p>
                                               <Button size="icon" variant="ghost" className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                                                   <Navigation className="w-5 h-5" />
                                               </Button>
                                           </div>
                                        )}
                                    </div>
                                </CardContent>
                                
                                {booking.status === 'active' && (
                                    <CardFooter className="p-3 pl-5 bg-gray-50/50 border-t flex gap-3">
                                        <Button 
                                            variant="outline" 
                                            className="flex-1 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 h-9"
                                            onClick={() => cancelBooking(booking.id)}
                                        >
                                            <XCircle className="w-4 h-4 mr-2" />
                                            Cancel
                                        </Button>
                                        <Button 
                                            className="flex-1 bg-green-600 hover:bg-green-700 h-9"
                                            onClick={() => setSelectedBooking(booking)}
                                        >
                                            <Ticket className="w-4 h-4 mr-2" />
                                            View Pass
                                        </Button>
                                    </CardFooter>
                                )}
                            </Card>
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center py-16 text-center animate-in zoom-in-95 duration-300">
                            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                <Ticket className="w-10 h-10 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900">No {filter !== 'all' ? filter : ''} bookings</h3>
                            <p className="text-sm text-gray-500 max-w-[250px] mt-2 mb-6">
                                {filter === 'active' 
                                    ? "You don't have any active sessions. Ready to park?" 
                                    : "Your parking history is empty. Start your journey!"}
                            </p>
                            <Button className="rounded-full px-8 shadow-lg shadow-primary/20" onClick={() => router.push('/map')}>
                                Find Parking
                            </Button>
                        </div>
                    )}
                </div>
            </div>
            
            <BookingPassModal 
                booking={selectedBooking} 
                isOpen={!!selectedBooking} 
                onClose={() => setSelectedBooking(null)} 
            />
        </div>
    );
}
