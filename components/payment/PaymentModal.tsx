"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, CreditCard, Smartphone, Building, Loader2, CheckCircle2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface PaymentModalProps {
    isOpen: boolean;
    amount: number;
    onClose: () => void;
    onSuccess: () => void;
}

export default function PaymentModal({ isOpen, amount, onClose, onSuccess }: PaymentModalProps) {
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    
    // Form states
    const [upiId, setUpiId] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvv, setCvv] = useState("");
    const [cardName, setCardName] = useState("");

    // Errors
    const [errors, setErrors] = useState<Record<string, string>>({});

    if (!isOpen) return null;

    const validateUpi = () => {
        if (!upiId) return "UPI ID is required";
        if (!/^[\w.-]+@[\w.-]+$/.test(upiId)) return "Invalid UPI format (e.g. name@bank)";
        return null;
    };

    const validateCard = () => {
        const errs: Record<string, string> = {};
        if (!cardNumber || cardNumber.replace(/\s/g, '').length < 15) errs.card = "Invalid card number";
        if (!expiry || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) errs.expiry = "Invalid expiry (MM/YY)";
        if (!cvv || cvv.length < 3) errs.cvv = "Invalid CVV";
        if (!cardName) errs.name = "Name on card is required";
        return errs;
    };

    const handleUpiPayment = () => {
        const err = validateUpi();
        if (err) {
            setErrors({ upi: err });
            return;
        }
        setErrors({});
        processPayment();
    };

    const handleCardPayment = () => {
        const errs = validateCard();
        if (Object.keys(errs).length > 0) {
            setErrors(errs);
            return;
        }
        setErrors({});
        processPayment();
    };

    const processPayment = () => {
        setIsProcessing(true);
        setTimeout(() => {
            setIsProcessing(false);
            setIsSuccess(true);
            setTimeout(() => {
                onSuccess();
                setIsSuccess(false);
                setUpiId("");
                setCardNumber("");
                setExpiry("");
                setCvv("");
                setCardName("");
            }, 1500);
        }, 2000);
    };

    // Format card number with spaces
    const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value.replace(/\D/g, '');
        const formatted = val.match(/.{1,4}/g)?.join(' ') || val;
        setCardNumber(formatted.substring(0, 19));
    };

    // Format expiry with slash
    const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let val = e.target.value.replace(/\D/g, '');
        if (val.length >= 2) {
            val = val.substring(0, 2) + '/' + val.substring(2, 4);
        }
        setExpiry(val.substring(0, 5));
    };

    return (
        <div className="fixed inset-0 z-[10000] bg-black/60 backdrop-blur-sm flex justify-center items-end sm:items-center p-0 sm:p-4 animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-md sm:rounded-2xl rounded-t-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in slide-in-from-bottom-5 sm:slide-in-from-bottom-0 sm:zoom-in-95 duration-300">
                {/* Header */}
                <div className="bg-gray-50 border-b px-6 py-4 flex items-center justify-between shrink-0">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Checkout</h2>
                        <p className="text-sm text-gray-500">Secure Payment Gateway</p>
                    </div>
                    <button onClick={onClose} disabled={isProcessing || isSuccess} className="text-gray-400 hover:text-gray-600 bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {isSuccess ? (
                    <div className="flex flex-col items-center justify-center p-12 space-y-4">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center animate-in zoom-in duration-500">
                            <CheckCircle2 className="w-10 h-10 text-green-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">Payment Successful!</h3>
                        <p className="text-gray-500 font-medium">₹{amount} has been paid.</p>
                    </div>
                ) : (
                    <div className="flex flex-col h-full overflow-hidden">
                        {/* Amount Banner */}
                        <div className="bg-blue-600 px-6 py-8 text-white flex flex-col items-center justify-center relative overflow-hidden shrink-0">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-16 -mt-16"></div>
                            <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full blur-xl -ml-10 -mb-10"></div>
                            <p className="text-blue-100 text-sm font-medium uppercase tracking-wider mb-1">Total Amount To Pay</p>
                            <h3 className="text-4xl font-extrabold tracking-tight">₹{amount}</h3>
                        </div>

                        {/* Payment Tabs */}
                        <div className="flex-1 overflow-y-auto bg-gray-50/50 p-6">
                            <Tabs defaultValue="upi" className="w-full">
                                <TabsList className="grid grid-cols-2 mb-6 bg-gray-100/80 p-1 rounded-xl">
                                    <TabsTrigger value="upi" className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg"><Smartphone className="w-4 h-4 mr-2"/> UPI</TabsTrigger>
                                    <TabsTrigger value="card" className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg"><CreditCard className="w-4 h-4 mr-2"/> Card</TabsTrigger>
                                </TabsList>

                                {/* UPI SECTION */}
                                <TabsContent value="upi" className="space-y-5 animate-in fade-in slide-in-from-left-2 duration-300">
                                    <div className="flex justify-end items-center gap-4 mb-2">
                                        <div className="h-5 flex items-center bg-white px-2 rounded-sm border border-gray-200">
                                            <span className="text-[10px] font-bold text-gray-600 tracking-wider">UPI</span>
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-700">Enter UPI ID</label>
                                        <input 
                                            type="text" 
                                            placeholder="example@okaxis" 
                                            value={upiId}
                                            onChange={(e) => setUpiId(e.target.value)}
                                            className={cn("w-full px-4 py-3 rounded-xl border bg-white focus:outline-none focus:ring-2 transition-all", errors.upi ? "border-red-300 focus:ring-red-100 placeholder:text-red-300" : "border-gray-200 focus:ring-blue-100 focus:border-blue-400")}
                                        />
                                        {errors.upi && <p className="text-xs text-red-500 pl-1 font-medium">{errors.upi}</p>}
                                        <p className="text-xs text-gray-500 pl-1 leading-relaxed">A payment request will be sent to this UPI ID. Please open your UPI app to approve the payment.</p>
                                    </div>

                                    <Button onClick={handleUpiPayment} disabled={isProcessing} className="w-full py-6 rounded-xl text-lg font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform">
                                        {isProcessing ? <Loader2 className="w-5 h-5 animate-spin"/> : `Pay ₹${amount} Securely`}
                                    </Button>
                                </TabsContent>

                                {/* CARD SECTION */}
                                <TabsContent value="card" className="space-y-4 animate-in fade-in slide-in-from-right-2 duration-300">
                                    <div className="flex justify-end items-center gap-3 mb-2">
                                        {/* <svg viewBox="0 0 100 32" className="h-5" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M43.38 1.12h21.7l-4.32 30.37h-21.7zM97.2 15c-0.41-0.99-4.67-10.49-4.67-10.49s-0.99-2.17-2.74-2.17H69.92l14.5 30.37h23.1zM38.89 31.49L55.7 1.12H32.4L11.47 31.49H29.3l4.88-14.23h10.6zm-10.44-23.91L24.7 22.1H13.35zM22.63 1.12H0.53v3.5c0 0 10.48 2.85 15.84 5.7L8.56 31.49" fill="#1A1F71"/>
                                            <path d="M16.87 10.32c-5.6-2.88-15.84-5.61-15.84-5.61l-0.68 4.54s9.59 2.28 15.32 4.87z" fill="#F7B600"/>
                                        </svg> */}
                                        <svg viewBox="0 0 24 16" className="h-6" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="7.5" cy="8" r="7.5" fill="#EB001B"/>
                                            <circle cx="16.5" cy="8" r="7.5" fill="#F79E1B"/>
                                            <path d="M12 2A7.47 7.47 0 009.68 8c0 2.56 1.28 4.88 3.2 6.13A7.48 7.48 0 0016 8a7.48 7.48 0 00-3.12-6" fill="#FF5F00"/>
                                        </svg>
                                        <div className="h-5 flex items-center bg-white px-2 rounded-sm border border-gray-200">
                                            <span className="text-[10px] font-bold text-gray-600 tracking-wider">CARD</span>
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-4">
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-semibold text-gray-700">Card Number</label>
                                            <div className="relative">
                                                <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                <input 
                                                    type="text" 
                                                    placeholder="0000 0000 0000 0000" 
                                                    value={cardNumber}
                                                    onChange={handleCardNumberChange}
                                                    className={cn("w-full pl-10 pr-4 py-3 rounded-xl border bg-white font-mono focus:outline-none focus:ring-2 transition-all", errors.card ? "border-red-300 focus:ring-red-100" : "border-gray-200 focus:ring-blue-100 focus:border-blue-400")}
                                                />
                                            </div>
                                            {errors.card && <p className="text-xs text-red-500 pl-1">{errors.card}</p>}
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-1.5">
                                                <label className="text-sm font-semibold text-gray-700">Expiry</label>
                                                <input 
                                                    type="text" 
                                                    placeholder="MM/YY" 
                                                    value={expiry}
                                                    onChange={handleExpiryChange}
                                                    className={cn("w-full px-4 py-3 rounded-xl border bg-white font-mono text-center focus:outline-none focus:ring-2 transition-all", errors.expiry ? "border-red-300 focus:ring-red-100" : "border-gray-200 focus:ring-blue-100 focus:border-blue-400")}
                                                />
                                                {errors.expiry && <p className="text-xs text-red-500 pl-1">{errors.expiry}</p>}
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-sm font-semibold text-gray-700">CVV</label>
                                                <input 
                                                    type="password" 
                                                    placeholder="•••" 
                                                    maxLength={4}
                                                    value={cvv}
                                                    onChange={(e) => setCvv(e.target.value.replace(/\D/g, ''))}
                                                    className={cn("w-full px-4 py-3 rounded-xl border bg-white font-mono text-center tracking-widest focus:outline-none focus:ring-2 transition-all", errors.cvv ? "border-red-300 focus:ring-red-100" : "border-gray-200 focus:ring-blue-100 focus:border-blue-400")}
                                                />
                                                {errors.cvv && <p className="text-xs text-red-500 pl-1">{errors.cvv}</p>}
                                            </div>
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-sm font-semibold text-gray-700">Name on Card</label>
                                            <input 
                                                type="text" 
                                                placeholder="John Doe" 
                                                value={cardName}
                                                onChange={(e) => setCardName(e.target.value)}
                                                className={cn("w-full px-4 py-3 rounded-xl border bg-white focus:outline-none focus:ring-2 transition-all", errors.name ? "border-red-300 focus:ring-red-100" : "border-gray-200 focus:ring-blue-100 focus:border-blue-400")}
                                            />
                                            {errors.name && <p className="text-xs text-red-500 pl-1">{errors.name}</p>}
                                        </div>
                                    </div>

                                    <Button onClick={handleCardPayment} disabled={isProcessing} className="w-full py-6 rounded-xl text-lg mt-2 font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform">
                                        {isProcessing ? <Loader2 className="w-5 h-5 animate-spin"/> : `Pay ₹${amount} Securely`}
                                    </Button>
                                </TabsContent>
                            </Tabs>
                            
                            <div className="mt-6 flex items-center justify-center gap-1.5 text-xs text-gray-400 opacity-80">
                                <CheckCircle2 className="w-3.5 h-3.5"/>
                                <span>100% Secure & Encrypted</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
