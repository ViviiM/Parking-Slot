"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LogOut, Ticket, Zap, Car, Accessibility, Edit2, Check, X, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { User as UserType } from "@/types";

interface UserProfileModalProps {
    user: UserType | null;
    isOpen: boolean;
    onClose: () => void;
    onLogout: () => void;
}

export default function UserProfileModal({ user, isOpen, onClose, onLogout }: UserProfileModalProps) {
    const router = useRouter();
    const { updateUser } = useAuthStore();
    const [isEditing, setIsEditing] = useState(false);
    
    // Form State
    const [name, setName] = useState(user?.name || "");
    const [plateNumber, setPlateNumber] = useState(user?.vehicle?.plateNumber || "");
    const [vehicleType, setVehicleType] = useState<'EV' | 'Petrol' | 'Diesel'>(user?.vehicle?.type || 'Petrol');
    const [isDisabled, setIsDisabled] = useState(user?.isDisabled || false);

    useEffect(() => {
        if (isOpen && user) {
            setName(user.name);
            setPlateNumber(user.vehicle?.plateNumber || "");
            setVehicleType(user.vehicle?.type || 'Petrol');
            setIsDisabled(user.isDisabled || false);
        }
    }, [isOpen, user]);

    const handleSave = () => {
        updateUser({
            name,
            vehicle: {
                plateNumber,
                type: vehicleType,
                model: user?.vehicle?.model || ''
            },
            isDisabled
        });
        setIsEditing(false);
    };

    if (!isOpen || !user) return null;

    return (
        <div className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="p-6 bg-primary text-primary-foreground relative">
                    <button 
                      onClick={onClose}
                      className="absolute top-4 right-4 text-primary-foreground/80 hover:text-white"
                    >
                        ✕
                    </button>
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-3xl font-bold">
                            {user.name?.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1">
                            {!isEditing ? (
                                <>
                                    <h2 className="text-2xl font-bold">{user.name}</h2>
                                    <p className="opacity-90 text-sm">{user.email}</p>
                                    <Badge variant="secondary" className="mt-2 bg-white/20 hover:bg-white/30 text-white border-0">
                                        {user.role === 'admin' ? 'Administrator' : 'Verified User'}
                                    </Badge>
                                </>
                            ) : (
                                <div className="space-y-2">
                                    <input 
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full bg-white/10 border border-white/30 rounded px-2 py-1 text-white placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-white"
                                        placeholder="Enter Name"
                                    />
                                    <p className="opacity-90 text-sm">{user.email}</p>
                                </div>
                            )}
                        </div>
                        <Button 
                            size="icon" 
                            variant="ghost" 
                            className="text-primary-foreground hover:bg-white/20"
                            onClick={() => setIsEditing(!isEditing)}
                        >
                            {isEditing ? <X className="w-5 h-5"/> : <Edit2 className="w-5 h-5"/>}
                        </Button>
                    </div>
                </div>
                
                <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                    {/* Vehicle Details Section */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                            <CreditCard className="w-4 h-4"/> Vehicle Information
                        </h3>
                        
                        {!isEditing ? (
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-3 bg-muted rounded-lg border border-transparent hover:border-primary/20 transition-colors">
                                    <p className="text-xs text-muted-foreground uppercase mb-1">Plate Number</p>
                                    <p className="font-mono font-bold text-lg tracking-wider text-primary">
                                        {user.vehicle?.plateNumber || 'Not Set'}
                                    </p>
                                </div>
                                <div className="p-3 bg-muted rounded-lg border border-transparent hover:border-primary/20 transition-colors">
                                    <p className="text-xs text-muted-foreground uppercase mb-1">Vehicle Type</p>
                                    <div className="flex items-center gap-2 font-medium">
                                        {user.vehicle?.type === 'EV' && <Badge variant="default" className="bg-green-600 hover:bg-green-700"><Zap className="w-3 h-3 mr-1"/> EV</Badge>}
                                        {user.vehicle?.type === 'Petrol' && <Badge variant="secondary"><Car className="w-3 h-3 mr-1"/> Petrol</Badge>}
                                        {user.vehicle?.type === 'Diesel' && <Badge variant="secondary" className="bg-gray-200"><Car className="w-3 h-3 mr-1"/> Diesel</Badge>}
                                        {!user.vehicle?.type && <span className="text-muted-foreground italic">Not specified</span>}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4 p-4 border rounded-lg bg-gray-50/50">
                                <div>
                                    <label className="text-xs font-semibold uppercase text-muted-foreground mb-1 block">License Plate</label>
                                    <input 
                                        value={plateNumber}
                                        onChange={(e) => setPlateNumber(e.target.value.toUpperCase())}
                                        className="w-full border rounded px-3 py-2 font-mono uppercase focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                        placeholder="GJ-01-AB-1234"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-semibold uppercase text-muted-foreground mb-2 block">Propulsion Type</label>
                                    <div className="grid grid-cols-3 gap-2">
                                        <button 
                                            onClick={() => setVehicleType('Petrol')}
                                            className={cn(
                                                "p-2 rounded-md border flex flex-col items-center justify-center gap-1 transition-all text-xs font-medium h-16",
                                                vehicleType === 'Petrol' ? "bg-primary text-primary-foreground border-primary" : "bg-white hover:bg-gray-50"
                                            )}
                                        >
                                            <Car className="w-4 h-4"/> Petrol
                                        </button>
                                        <button 
                                            onClick={() => setVehicleType('Diesel')}
                                            className={cn(
                                                "p-2 rounded-md border flex flex-col items-center justify-center gap-1 transition-all text-xs font-medium h-16",
                                                vehicleType === 'Diesel' ? "bg-gray-800 text-white border-gray-800" : "bg-white hover:bg-gray-50"
                                            )}
                                        >
                                            <Car className="w-4 h-4"/> Diesel
                                        </button>
                                        <button 
                                            onClick={() => setVehicleType('EV')}
                                            className={cn(
                                                "p-2 rounded-md border flex flex-col items-center justify-center gap-1 transition-all text-xs font-medium h-16",
                                                vehicleType === 'EV' ? "bg-green-600 text-white border-green-600 shadow-md" : "bg-white hover:bg-gray-50"
                                            )}
                                        >
                                            <Zap className="w-4 h-4"/> EV
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Preferences Section */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                            <Accessibility className="w-4 h-4"/> Accessibility & Preferences
                        </h3>
                        
                        {!isEditing ? (
                            <div className="flex flex-wrap gap-2">
                                {user.isDisabled ? (
                                    <div className="flex items-center gap-3 p-3 bg-blue-50 text-blue-700 rounded-lg w-full border border-blue-100">
                                        <div className="p-2 bg-blue-100 rounded-full">
                                            <Accessibility className="w-5 h-5"/>
                                        </div>
                                        <div>
                                            <p className="font-semibold">Accessibility Priority</p>
                                            <p className="text-xs opacity-80">Prioritize disabled spots near entrance</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="p-3 bg-gray-50 text-gray-500 rounded-lg w-full border text-sm text-center italic">
                                        No special accessibility requirements set.
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div 
                                onClick={() => setIsDisabled(!isDisabled)}
                                className={cn(
                                    "cursor-pointer flex items-center gap-3 p-3 rounded-lg border transition-all select-none",
                                    isDisabled 
                                        ? "bg-blue-50 border-blue-200 ring-1 ring-blue-200" 
                                        : "bg-white hover:bg-gray-50 border-gray-200"
                                )}
                            >
                                <div className={cn(
                                    "w-5 h-5 rounded border flex items-center justify-center transition-colors",
                                    isDisabled ? "bg-blue-600 border-blue-600" : "bg-white border-gray-300"
                                )}>
                                    {isDisabled && <Check className="w-3 h-3 text-white"/>}
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">Require Accessible Parking</p>
                                    <p className="text-xs text-muted-foreground">Enable to prioritize spots reserved for disabilities</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="pt-4 border-t gap-4 flex flex-col">
                        {isEditing ? (
                             <Button onClick={handleSave} className="w-full bg-primary hover:bg-primary/90 gap-2">
                                 <Check className="w-4 h-4"/> Save Changes
                             </Button>
                        ) : (
                            <div className="grid grid-cols-2 gap-4">
                                <Button variant="outline" onClick={() => router.push('/bookings')} className="w-full hover:bg-primary/5 hover:text-primary hover:border-primary/30">
                                    <Ticket className="w-4 h-4 mr-2"/> My Bookings
                                </Button>
                                <Button variant="destructive" onClick={onLogout} className="w-full">
                                    <LogOut className="w-4 h-4 mr-2"/> Sign Out
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
