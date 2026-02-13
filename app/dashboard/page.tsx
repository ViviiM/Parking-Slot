"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { useParkingStore } from "@/store/useParkingStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"; // Need to create Table component or just use divs
import { BarChart, Users, Car, AlertTriangle, Zap, Loader2 } from "lucide-react";

// For brevity, using simple Table structure
function SimpleTable({ bookings, onRemove }: { bookings: any[], onRemove: (id: string) => void }) {
  return (
    <div className="w-full overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Zone</TableHead>
            <TableHead>Slot</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.map((booking) => (
            <TableRow key={booking.id}>
              <TableCell>{booking.id}</TableCell>
              <TableCell>{booking.userName}</TableCell>
              <TableCell>{booking.zoneName}</TableCell>
              <TableCell>{booking.slotId}</TableCell>
              <TableCell>
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-green-100 text-green-800`}>
                  {booking.status}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="destructive" size="sm" onClick={() => onRemove(booking.id)}>
                   Remove
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}


export default function Dashboard() {
    const router = useRouter();
    const { user, _hasHydrated } = useAuthStore();
    const { zones, bookings, cancelBooking } = useParkingStore();
    const [stats, setStats] = useState({ totalByRole: {}, occupancy: 0 });

    useEffect(() => {
        if (_hasHydrated && (!user || user.role !== 'admin')) {
            router.push('/auth');
        }
    }, [user, router, _hasHydrated]);

    if (!_hasHydrated || !user || user.role !== 'admin') {
        return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin" /></div>;
    }

    const activeBookings = bookings.filter(b => b.status === 'active');
    
    // Calculate KPIs
    const totalSlots = zones.reduce((acc, z) => acc + z.totalSlots, 0);
    const occupied = totalSlots - zones.reduce((acc, z) => acc + z.availableSlots, 0);
    const evUsage = zones.reduce((acc, z) => acc + z.evPoints, 0); // Mock usage calculation logic

    return (
        <div className="flex flex-col p-6 space-y-6 min-h-screen bg-muted/10 animate-in fade-in duration-500">
            <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {/* Cards with framer motion logic or just CSS animation */}
                <Card className="hover:shadow-lg transition-all">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                        <span className="text-muted-foreground">$</span>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$45,231.89</div>
                        <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                    </CardContent>
                </Card>
                <Card className="hover:shadow-lg transition-all">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Bookings</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{activeBookings.length}</div>
                        <p className="text-xs text-muted-foreground">+180 since last hour</p>
                    </CardContent>
                </Card>
                <Card className="hover:shadow-lg transition-all">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Occupancy Rate</CardTitle>
                        <Car className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{Math.round((occupied / totalSlots) * 100)}%</div>
                        <p className="text-xs text-muted-foreground">{occupied} / {totalSlots} slots active</p>
                    </CardContent>
                </Card>
                <Card className="hover:shadow-lg transition-all">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">System Health</CardTitle>
                        <Zap className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">98.2%</div>
                        <p className="text-xs text-muted-foreground">All systems operational</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4 hover:shadow-lg transition-shadow">
                    <CardHeader>
                        <CardTitle>Recent Bookings</CardTitle>
                        <CardDescription>
                            You have {activeBookings.length} active bookings managed.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <SimpleTable bookings={activeBookings} onRemove={cancelBooking} />
                    </CardContent>
                </Card>
                <Card className="col-span-3 hover:shadow-lg transition-shadow">
                    <CardHeader>
                        <CardTitle>Parking Density</CardTitle>
                        <CardDescription>
                            Real-time heatmap of parking zones.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                         {/* Placeholder for small map or chart */}
                         <div className="h-[300px] flex items-center justify-center bg-muted rounded-md border border-dashed relative overflow-hidden group">
                             <span className="text-muted-foreground z-10 font-mono text-sm tracking-wider">LIVE HEATMAP</span>
                             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                             <div className="absolute h-full w-2 bg-gradient-to-b from-transparent via-green-400 to-transparent left-0 animate-[scan_3s_ease-in-out_infinite]" />
                         </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

// Add Loader2 to imports if missing
