"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { useParkingStore } from "@/store/useParkingStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, Car, Zap, Loader2, TrendingUp, HelpCircle } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar, Legend } from 'recharts';

function SimpleTable({ bookings, onRemove }: { bookings: any[], onRemove: (id: string) => void }) {
  if (bookings.length === 0) {
      return <div className="p-8 text-center text-muted-foreground">No active bookings right now.</div>;
  }
  return (
    <div className="w-full overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Booking ID</TableHead>
            <TableHead>User Name</TableHead>
            <TableHead>Zone</TableHead>
            <TableHead>Slot</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.map((booking) => (
            <TableRow key={booking.id}>
              <TableCell className="font-mono text-xs">{booking.id}</TableCell>
              <TableCell className="font-medium">{booking.userName}</TableCell>
              <TableCell>{booking.zoneName}</TableCell>
              <TableCell>
                  <span className="bg-gray-100 px-2 py-1 rounded text-xs font-semibold">{booking.slotId}</span>
              </TableCell>
              <TableCell>
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-green-100 text-green-800 border border-green-200`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-green-600 mr-1.5"></span>
                  {booking.status}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="destructive" size="sm" onClick={() => onRemove(booking.id)} className="h-8">
                   Cancel
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

// Mock historic data for charts
const revenueData = [
  { time: '08:00', revenue: 1200 },
  { time: '10:00', revenue: 3100 },
  { time: '12:00', revenue: 6500 },
  { time: '14:00', revenue: 4800 },
  { time: '16:00', revenue: 8400 },
  { time: '18:00', revenue: 9800 },
  { time: '20:00', revenue: 11200 },
];

const densityData = [
  { time: '08:00', occupancy: 12 },
  { time: '10:00', occupancy: 45 },
  { time: '12:00', occupancy: 88 },
  { time: '14:00', occupancy: 65 },
  { time: '16:00', occupancy: 92 },
  { time: '18:00', occupancy: 70 },
  { time: '20:00', occupancy: 35 },
];

export default function Dashboard() {
    const router = useRouter();
    const { user, _hasHydrated } = useAuthStore();
    const { zones, bookings, cancelBooking } = useParkingStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (_hasHydrated && (!user || user.role !== 'admin')) {
            router.push('/auth');
        }
    }, [user, router, _hasHydrated]);

    if (!_hasHydrated || !user || user.role !== 'admin' || !mounted) {
        return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin w-8 h-8 text-primary" /></div>;
    }

    const activeBookings = bookings.filter(b => b.status === 'active');
    
    // Calculate KPIs
    const totalSlots = zones.reduce((acc, z) => acc + z.totalSlots, 0);
    const occupied = totalSlots - zones.reduce((acc, z) => acc + z.availableSlots, 0);
    const occupancyRate = totalSlots > 0 ? Math.round((occupied / totalSlots) * 100) : 0;

    // Dynamic zone data for bar chart
    const zoneData = zones.map(z => ({
        name: z.name.length > 15 ? z.name.substring(0, 15) + '...' : z.name,
        Occupied: z.totalSlots - z.availableSlots,
        Available: z.availableSlots,
    }));

    return (
        <div className="flex flex-col p-4 md:p-8 space-y-8 min-h-screen bg-gray-50/50 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Admin Dashboard</h1>
                <p className="text-muted-foreground mt-1 text-sm md:text-base">Monitor real-time parking metrics, active bookings, and revenue streams.</p>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="hover:shadow-md transition-shadow border-none shadow-sm bg-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-semibold text-gray-600">Total Revenue (Today)</CardTitle>
                        <TrendingUp className="h-4 w-4 text-emerald-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-gray-900">₹45,231</div>
                        <p className="text-xs text-emerald-600 font-medium mt-1">+20.1% vs yesterday</p>
                    </CardContent>
                </Card>
                <Card className="hover:shadow-md transition-shadow border-none shadow-sm bg-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-semibold text-gray-600">Active Bookings</CardTitle>
                        <Users className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-gray-900">{activeBookings.length}</div>
                        <p className="text-xs text-blue-600 font-medium mt-1">Live vehicles in zones</p>
                    </CardContent>
                </Card>
                <Card className="hover:shadow-md transition-shadow border-none shadow-sm bg-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-semibold text-gray-600">Overall Occupancy</CardTitle>
                        <Car className="h-4 w-4 text-orange-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-gray-900">{occupancyRate}%</div>
                        <p className="text-xs text-muted-foreground font-medium mt-1">{occupied} out of {totalSlots} slots filled</p>
                    </CardContent>
                </Card>
                <Card className="hover:shadow-md transition-shadow border-none shadow-sm bg-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-semibold text-gray-600">System Health</CardTitle>
                        <Zap className="h-4 w-4 text-purple-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-gray-900">99.9%</div>
                        <p className="text-xs text-purple-600 font-medium mt-1">All APIs operational</p>
                    </CardContent>
                </Card>
            </div>

            {/* Charts Section */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
                {/* Density Area Chart */}
                <Card className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="text-lg">Real-Time Parking Density</CardTitle>
                                <CardDescription>Hourly occupancy percentage across all zones</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                         <div className="h-[300px] w-full mt-4">
                             <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={densityData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorOccupancy" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                                    <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} dy={10} />
                                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} dx={-10} tickFormatter={(value) => `${value}%`} />
                                    <Tooltip 
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                        labelStyle={{ fontWeight: 'bold', color: '#374151' }}
                                    />
                                    <Area type="monotone" dataKey="occupancy" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorOccupancy)" name="Occupancy %" />
                                </AreaChart>
                            </ResponsiveContainer>
                         </div>
                    </CardContent>
                </Card>

                {/* Revenue Line Chart */}
                <Card className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                         <div className="flex justify-between items-center">
                            <div>
                                <CardTitle className="text-lg">Revenue Generation</CardTitle>
                                <CardDescription>Gross income trends for the current day</CardDescription>
                            </div>
                            <span className="text-xs font-semibold bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full">+12% Surge</span>
                        </div>
                    </CardHeader>
                    <CardContent>
                         <div className="h-[300px] w-full mt-4">
                             <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={revenueData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                                    <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} dy={10} />
                                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} dx={-10} tickFormatter={(val) => `₹${val/1000}k`} />
                                    <Tooltip 
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                        formatter={(value: any) => [`₹${(value || 0).toLocaleString()}`, "Revenue"]}
                                    />
                                    <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} dot={{r: 4, strokeWidth: 2}} activeDot={{r: 6}} />
                                </LineChart>
                            </ResponsiveContainer>
                         </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                {/* Zone Breakdown Chart */}
                <Card className="md:col-span-1 shadow-sm border-none bg-white">
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">Space Allocation <HelpCircle className="w-4 h-4 text-muted-foreground" /></CardTitle>
                        <CardDescription>Current utilization breakdown by zone</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <div className="h-[320px] w-full mt-2">
                             <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={zoneData} layout="vertical" margin={{ top: 0, right: 30, left: 20, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e5e7eb" />
                                    <XAxis type="number" hide />
                                    <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#4b5563', fontSize: 13, fontWeight: 500}} width={90} />
                                    <Tooltip 
                                        cursor={{fill: '#f3f4f6'}}
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    />
                                    <Legend wrapperStyle={{ paddingTop: '20px', fontSize: '13px' }}/>
                                    <Bar dataKey="Occupied" stackId="a" fill="#3b82f6" radius={[0, 0, 0, 0]} />
                                    <Bar dataKey="Available" stackId="a" fill="#e5e7eb" radius={[0, 4, 4, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                         </div>
                    </CardContent>
                </Card>

                {/* Active Bookings Table */}
                <Card className="md:col-span-2 shadow-sm border-none bg-white flex flex-col">
                    <CardHeader className="border-b bg-gray-50/50">
                        <CardTitle className="text-lg">Live Active Bookings</CardTitle>
                        <CardDescription>
                            Currently tracking {activeBookings.length} vehicles logged inside the facilities.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-0 flex-1">
                        <SimpleTable bookings={activeBookings} onRemove={cancelBooking} />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
