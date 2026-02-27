"use client";

import Link from "next/link";
import { useAuthStore } from "@/store/useAuthStore";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Home() {
  const { user } = useAuthStore();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-background to-muted p-6">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="z-10 text-center space-y-6"
      >
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
        Smart Parking
        </h1>
        <p className="text-xl text-muted-foreground max-w-[600px]">
          Seamless real-time parking slot booking. Find, book, and park within seconds.
        </p>

        <div className="flex gap-4 justify-center pt-8">
          {user ? (
            <Link href={user.role === 'admin' ? "/dashboard" : "/map"}>
              <Button size="lg" className="rounded-full px-8">
                Go to Dashboard
              </Button>
            </Link>
          ) : (
            <>
              <Link href="/auth">
                <Button size="lg" className="rounded-full px-8 shadow-lg">
                  Get Started
                </Button>
              </Link>
              <Link href="/auth?mode=login">
                <Button variant="outline" size="lg" className="rounded-full px-8">
                  Login
                </Button>
              </Link>
            </>
          )}
        </div>
      </motion.div>
    </main>
  );
}
