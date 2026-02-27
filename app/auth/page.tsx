"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuthStore } from "@/store/useAuthStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCheck, Loader2 } from "lucide-react";

// Schemas
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const personalSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  isDisabled: z.boolean().default(false),
});

const vehicleSchema = z.object({
  type: z.enum(["EV", "Petrol", "Diesel"]),
  plateNumber: z.string().min(4),
  model: z.string().min(2),
});

type Step = "login" | "personal" | "vehicle";

import { useSearchParams } from "next/navigation";

import { Suspense } from "react";

function AuthContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode");
  
  const { login } = useAuthStore();
  const [step, setStep] = useState<Step>(mode === "signup" ? "personal" : "login");
  const [loading, setLoading] = useState(false);
  
  // State for signup flow
  const [signupData, setSignupData] = useState<any>({});

  // Forms
  const loginForm = useForm({ resolver: zodResolver(loginSchema) });
  const personalForm = useForm({ 
      resolver: zodResolver(personalSchema),
      defaultValues: { isDisabled: false, name: "", email: "", password: "" } 
  });
  const vehicleForm = useForm({ 
      resolver: zodResolver(vehicleSchema),
      defaultValues: { type: "Petrol" as "EV" | "Petrol" | "Diesel", plateNumber: "", model: "" }
  });

  const onLogin = async (data: any) => {
    setLoading(true);
    // Simulate API
    setTimeout(() => {
      // Mock admin login
      if (data.email === "admin@park.com" && data.password === "admin123") {
        login({
          id: "admin-1",
          name: "Admin User",
          email: data.email,
          role: "admin",
          isDisabled: false,
        });
        router.push("/dashboard");
      } else {
        // Mock user login
        login({
          id: "user-1",
          name: "",
          email: data.email,
          role: "user",
          isDisabled: false,
          vehicle: { type: "Petrol", plateNumber: "ABC-123", model: "Mercedes" }
        });
        router.push("/map");
      }
      setLoading(false);
    }, 1000);
  };

  const onPersonalSubmit = (data: any) => {
    setSignupData({ ...signupData, ...data });
    setStep("vehicle");
  };

  const onVehicleSubmit = async (data: any) => {
    setLoading(true);
    const finalData = { ...signupData, vehicle: data };
    
    // Simulate Signup API
    setTimeout(() => {
      login({
        id: Math.random().toString(36).substr(2, 9),
        name: finalData.name,
        email: finalData.email,
        role: "user",
        isDisabled: finalData.isDisabled,
        vehicle: finalData.vehicle,
      });
      router.push("/map");
    }, 1000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/20 p-4">
      <Card className="w-full max-w-md shadow-lg border-muted">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            {step === "login" ? "Welcome Back" : "Create Account"}
          </CardTitle>
          <CardDescription className="text-center">
            {step === "login" 
              ? "Enter your credentials to access your account" 
              : step === "personal" 
                ? "Tell us a bit about yourself"
                : "Vehicle Details for smart allocation"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AnimatePresence mode="wait">
            {step === "login" && (
              <motion.form
                key="login"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onSubmit={loginForm.handleSubmit(onLogin)}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input {...loginForm.register("email")} placeholder="admin@park.com" />
                  {loginForm.formState.errors.email && <p className="text-red-500 text-xs">{String(loginForm.formState.errors.email.message)}</p>}
                </div>
                <div className="space-y-2">
                  <Label>Password</Label>
                  <Input type="password" {...loginForm.register("password")} placeholder="admin123" />
                  {loginForm.formState.errors.password && <p className="text-red-500 text-xs">{String(loginForm.formState.errors.password.message)}</p>}
                </div>
                <Button className="w-full" disabled={loading}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Login
                </Button>
                <div className="text-center text-sm">
                  Don't have an account? <span className="text-primary cursor-pointer hover:underline" onClick={() => setStep("personal")}>Sign up</span>
                </div>
              </motion.form>
            )}

            {step === "personal" && (
              <motion.form
                key="personal"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onSubmit={personalForm.handleSubmit(onPersonalSubmit)}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input {...personalForm.register("name")} placeholder="Your Name" />
                  {personalForm.formState.errors.name && <p className="text-red-500 text-xs">{String(personalForm.formState.errors.name.message)}</p>}
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input {...personalForm.register("email")} placeholder="email@example.com" />
                  {personalForm.formState.errors.email && <p className="text-red-500 text-xs">{String(personalForm.formState.errors.email.message)}</p>}
                </div> 
                <div className="space-y-2">
                  <Label>Password</Label>
                  <Input type="password" {...personalForm.register("password")} />
                  {personalForm.formState.errors.password && <p className="text-red-500 text-xs">{String(personalForm.formState.errors.password.message)}</p>}
                </div>
                <div className="flex items-center space-x-2 pt-2">
                    <input 
                        type="checkbox" 
                        id="isDisabled" 
                        {...personalForm.register("isDisabled")} 
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <Label htmlFor="isDisabled" className="cursor-pointer">I have a disability (Need priority parking)</Label>
                </div>

                <div className="flex justify-between pt-2">
                    <Button variant="ghost" type="button" onClick={() => setStep("login")}>Back</Button>
                    <Button type="submit">Next</Button>
                </div>
              </motion.form>
            )}

            {step === "vehicle" && (
              <motion.form
                key="vehicle"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onSubmit={vehicleForm.handleSubmit(onVehicleSubmit)}
                className="space-y-4"
              >
                 <div className="space-y-2">
                  <Label>Vehicle Type</Label>
                  <select 
                    {...vehicleForm.register("type")} 
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="Petrol">Petrol / Diesel</option>
                    <option value="EV">Electric Vehicle (EV)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Plate Number</Label>
                  <Input {...vehicleForm.register("plateNumber")} placeholder="ABC-1234" />
                </div>
                <div className="space-y-2">
                    <Label>Model</Label>
                    <Input {...vehicleForm.register("model")} placeholder="e.g. Toyota Prius" />
                </div>

                <div className="flex justify-between pt-4">
                    <Button variant="ghost" type="button" onClick={() => setStep("personal")}>Back</Button>
                    <Button type="submit" disabled={loading}>
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Complete Signup
                    </Button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin text-primary" /></div>}>
      <AuthContent />
    </Suspense>
  );
}
