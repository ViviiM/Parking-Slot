"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

export default function BookingSuccessPage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center p-6 text-center">
      <div className="mb-4 rounded-full bg-green-100 p-6">
        <CheckCircle2 className="h-16 w-16 text-green-600" />
      </div>
      <h1 className="mb-2 text-3xl font-bold">Booking Confirmed!</h1>
      <p className="mb-8 text-muted-foreground">
        Your parking slot has been successfully reserved. A digital ticket has been sent to your email.
      </p>
      <div className="flex gap-4">
        <Link href="/map">
          <Button variant="outline">Book Another</Button>
        </Link>
        <Link href="/bookings">
          <Button>View My Bookings</Button>
        </Link>
      </div>
    </div>
  );
}
