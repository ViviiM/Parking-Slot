"use client";

import { Booking } from "@/types";
import { Button } from "@/components/ui/button";
import { MapPin, CheckCircle2, Printer, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface BookingPassModalProps {
    booking: Booking | null;
    isOpen: boolean;
    onClose: () => void;
}

export default function BookingPassModal({ booking, isOpen, onClose }: BookingPassModalProps) {
    if (!booking || !isOpen) return null;

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200 print:bg-white print:p-0 print:block">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 print:shadow-none print:w-full print:max-w-none print:rounded-none print:max-h-none print:overflow-visible">
                {/* Print Header */}
                <div className="hidden print:block text-center pt-8 pb-4">
                     <h1 className="text-3xl font-bold">PARKING PASS</h1>
                </div>

                <div id="booking-pass-content" className="bg-white text-black flex flex-col w-full relative h-full overflow-hidden print:h-auto print:overflow-visible">
                    {/* Close Button (Hidden on Print) */}
                    <button 
                        onClick={onClose}
                        className="absolute top-4 right-4 text-white/80 hover:text-white z-20 print:hidden transition-colors"
                    >
                        <X className="w-6 h-6 drop-shadow-md"/>
                    </button>

                    {/* Scrollable Content */}
                    <div className="flex-1 overflow-y-auto no-scrollbar print:overflow-visible">
                        {/* Header Section */}
                        <div className="w-full bg-primary p-8 text-primary-foreground text-center relative overflow-hidden print:bg-black print:text-white shrink-0">
                            <div className="absolute top-0 left-0 w-full h-1 bg-white/20"></div>
                            <div className="relative z-10 space-y-1">
                                <h2 className="text-2xl font-bold tracking-tight uppercase">Access Pass</h2>
                                <p className="text-primary-foreground/80 text-xs uppercase tracking-widest font-medium">Scan at entry</p>
                            </div>
                            <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-white rounded-full"></div>
                            <div className="absolute -bottom-4 -right-4 w-8 h-8 bg-white rounded-full"></div>
                        </div>

                        {/* QR Code Section */}
                        <div className="bg-white w-full flex flex-col items-center py-8 border-b border-dashed border-gray-300 relative shrink-0">
                            <div className="w-48 h-48 sm:w-56 sm:h-56 bg-white border-4 border-black p-2 rounded-xl shadow-sm print:border-2 transition-all">
                               <img 
                                src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${booking.id}`} 
                                alt="QR Code" 
                                className="w-full h-full object-contain"
                               />
                            </div>
                            <p className="font-mono text-lg mt-4 text-gray-900 font-bold tracking-[0.2em] break-all px-4 text-center">{booking.id.toUpperCase()}</p>
                            
                            <div className="absolute -bottom-3 left-0 w-6 h-6 bg-gray-50 rounded-full translate-x-[-50%]"></div>
                            <div className="absolute -bottom-3 right-0 w-6 h-6 bg-gray-50 rounded-full translate-x-[50%]"></div>
                        </div>

                        {/* Details */}
                        <div className="w-full p-6 space-y-6 bg-gray-50/50 print:bg-white pb-8">
                            <div className="text-center">
                                <h3 className="text-xl font-bold text-gray-900 leading-tight">{booking.zoneName}</h3>
                                <div className="flex items-center justify-center text-sm text-gray-500 gap-1 mt-1">
                                    <MapPin className="w-3 h-3 flex-shrink-0"/> <span className="truncate">{booking.zoneId}</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className="bg-white p-4 rounded-xl border shadow-sm flex flex-col items-center text-center print:border-black">
                                    <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold mb-1">Slot Layer</p>
                                    <p className="font-bold text-lg">{booking.layer}</p>
                                </div>
                                <div className="bg-white p-4 rounded-xl border shadow-sm flex flex-col items-center text-center print:border-black">
                                    <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold mb-1">Slot Number</p>
                                    <p className="font-bold text-lg">{booking.slotId.split('-')[1]}</p>
                                </div>
                            </div>

                            <div className="space-y-3 bg-white p-4 rounded-xl border shadow-sm print:border-none print:p-0 print:shadow-none">
                                 <div className="flex justify-between items-center py-2 border-b border-gray-100 print:border-gray-200">
                                    <span className="text-sm text-gray-500">Vehicle</span>
                                    <span className="font-bold font-mono">{booking.vehicleNo}</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-gray-100 print:border-gray-200">
                                    <span className="text-sm text-gray-500">Total Time</span>
                                    <span className="font-bold">{booking.estimatedDuration} Hours</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-gray-100 print:border-gray-200">
                                    <span className="text-sm text-gray-500">Entry Time</span>
                                    <span className="font-bold">{new Date(booking.startTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                                </div>
                                 <div className="flex justify-between items-center py-2 border-gray-100">
                                    <span className="text-sm text-gray-500">Status</span>
                                    <span className="font-bold text-green-600 uppercase text-xs tracking-wider flex items-center gap-1">
                                        <CheckCircle2 className="w-3 h-3"/> Paid
                                    </span>
                                </div>
                            </div>
                            
                            <div className="flex items-center justify-between pt-2">
                                <span className="font-semibold text-gray-900">Total Paid</span>
                                <span className="text-2xl font-bold text-primary">${booking.totalCost}</span>
                            </div>
                        </div>
                    </div>

                    {/* Footer Actions (Sticky) */}
                    <div className="p-4 bg-white border-t flex flex-row gap-3 print:hidden shrink-0 z-10 w-full">
                        <Button variant="outline" className="flex-1 border-primary/20 hover:bg-primary/5 text-primary" onClick={handlePrint} title="Print / Save PDF">
                            <Printer className="w-4 h-4 mr-2"/> Print Pass
                        </Button>
                    </div>
                </div>
            </div>
            
            <style jsx global>{`
                @media print {
                    @page { margin: 0; size: auto; }
                    body { background: white; }
                    /* Hide everything except the modal content */
                    body > *:not(.fixed) { display: none !important; }
                    .fixed { position: static !important; background: white !important; padding: 0 !important; display: block !important; }
                    /* Hide scrollbars, shadows, rounded corners for print */
                    .shadow-2xl { box-shadow: none !important; }
                    .rounded-xl { border-radius: 0 !important; }
                    .bg-gray-50 { background-color: white !important; }
                    button { display: none !important; }
                    .print\\:h-auto { height: auto !important; }
                    .print\\:overflow-visible { overflow: visible !important; }
                }
            `}</style>
        </div>
    );
}
