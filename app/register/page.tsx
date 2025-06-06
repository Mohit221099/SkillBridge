"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Code, Briefcase, ArrowLeft, Check, X } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";

// Form validation schemas
const contributorFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  skills: z.string().optional(),
  experience: z.enum(["student", "beginner", "intermediate", "advanced", "expert"]),
});

const hirerFormSchema = z.object({
  companyName: z.string().min(2, "Company name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  industry: z.string().min(2, "Industry must be at least 2 characters"),
  website: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
});

export default function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState("contributor");

  useEffect(() => {
    const role = searchParams.get("role");
    if (role === "contributor" || role === "hirer") {
      setActiveTab(role);
    }
  }, [searchParams]);

  // Contributor form
  const {
    register: registerContributor,
    handleSubmit: handleSubmitContributor,
    watch: watchContributor,
    formState: { errors: contributorErrors, isSubmitting: isContributorSubmitting },
  } = useForm({
    resolver: zodResolver(contributorFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      skills: "",
      experience: "student",
    },
  });

  // Hirer form
  const {
    register: registerHirer,
    handleSubmit: handleSubmitHirer,
    watch: watchHirer,
    formState: { errors: hirerErrors, isSubmitting: isHirerSubmitting },
  } = useForm({
    resolver: zodResolver(hirerFormSchema),
    defaultValues: {
      companyName: "",
      email: "",
      password: "",
      industry: "",
      website: "",
    },
  });

  // Watch password fields for real-time validation
  const contributorPassword = watchContributor("password");
  const hirerPassword = watchHirer("password");

  // Handle contributor registration
 // Update the onSubmitContributor and onSubmitHirer functions to include error logging
// Update the onSubmitContributor and onSubmitHirer functions to include error logging
const onSubmitContributor = async (data: any) => {
  try {
    console.log("Submitting contributor data:", data); // Debug log
    
    const response = await fetch("/api/register", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data, role: "contributor" }),
    });
    
    console.log("Response status:", response.status);
    
    // Attempt to parse the response
    let result;
    try {
      result = await response.json();
      console.log("Response body:", result);
    } catch (e) {
      console.error("Failed to parse response:", e);
    }

    if (!response.ok) {
      throw new Error(result?.message || `Error: ${response.status}`);
    }

    toast.success("Contributor account created successfully!");
    router.push("/dashboard/contributor");
  } catch (error: unknown) {
    const err = error as Error;
    console.error("Registration error:", err);
  
    toast.error(err.message || "Failed to create account. Please try again.");
  }
};

  // Handle hirer registration
  const onSubmitHirer = async (data: any) => {
    try {
      // Use a full URL path to ensure proper routing
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, role: "contributor" }),
        // Add cache: 'no-store' to prevent caching issues
        cache: 'no-store',
      });
  
      // Log response for debugging
      console.log("Registration response status:", response.status);
      
      // Check if we can get JSON from the response 
      let result;
      try {
        result = await response.json();
        console.log("Response data:", result);
      } catch (e) {
        console.error("Failed to parse response:", e);
      }
  
      if (!response.ok) {
        throw new Error(result?.message || "Failed to create account");
      }
  
      toast.success("Hirer account created successfully!");
      router.push("/dashboard/hirer");
    } catch (error: unknown) {
      const err = error as Error;
      console.error("Registration error:", err);
      toast.error(err.message || "Failed to create account. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-background to-secondary/20 p-4">
      <Link
        href="/"
        className="absolute top-8 left-8 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </Link>

      <Card className="w-full max-w-md shadow-lg animate-fade-in">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-2">
            {activeTab === "contributor" ? (
              <Code className="h-10 w-10 text-blue-600" />
            ) : (
              <Briefcase className="h-10 w-10 text-purple-600" />
            )}
          </div>
          <CardTitle className="text-2xl text-center">Create an account</CardTitle>
          <CardDescription className="text-center">
            Join our community as a {activeTab === "contributor" ? "contributor" : "hirer"}
          </CardDescription>
        </CardHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 mx-6">
            <TabsTrigger
              value="contributor"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              Contributor
            </TabsTrigger>
            <TabsTrigger
              value="hirer"
              className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
            >
              Hirer
            </TabsTrigger>
          </TabsList>

          {/* Contributor Registration Form */}
          <TabsContent value="contributor">
            <form onSubmit={handleSubmitContributor(onSubmitContributor)}>
              <CardContent className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="contributor-name">Full Name</Label>
                  <Input
                    id="contributor-name"
                    placeholder="John Doe"
                    {...registerContributor("name")}
                  />
                  {contributorErrors.name && (
                    <p className="text-sm text-destructive">{contributorErrors.name.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contributor-email">Email</Label>
                  <Input
                    id="contributor-email"
                    type="email"
                    placeholder="john@example.com"
                    {...registerContributor("email")}
                  />
                  {contributorErrors.email && (
                    <p className="text-sm text-destructive">{contributorErrors.email.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contributor-password">Password</Label>
                  <Input
                    id="contributor-password"
                    type="password"
                    {...registerContributor("password")}
                  />
                  {contributorErrors.password && (
                    <p className="text-sm text-destructive">{contributorErrors.password.message}</p>
                  )}
                  <PasswordStrengthIndicator password={contributorPassword} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contributor-skills">Skills (comma separated)</Label>
                  <Input
                    id="contributor-skills"
                    placeholder="React, JavaScript, Node.js"
                    {...registerContributor("skills")}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Experience Level</Label>
                  <RadioGroup defaultValue="student" {...registerContributor("experience")}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="student" id="contributor-student" />
                      <Label htmlFor="contributor-student">Student</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="beginner" id="contributor-beginner" />
                      <Label htmlFor="contributor-beginner">Beginner</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="intermediate" id="contributor-intermediate" />
                      <Label htmlFor="contributor-intermediate">Intermediate</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="advanced" id="contributor-advanced" />
                      <Label htmlFor="contributor-advanced">Advanced</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="expert" id="contributor-expert" />
                      <Label htmlFor="contributor-expert">Expert</Label>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>

              <CardFooter className="flex flex-col">
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={isContributorSubmitting}
                >
                  {isContributorSubmitting ? "Creating Account..." : "Create Contributor Account"}
                </Button>

                <p className="text-center text-sm text-muted-foreground mt-4">
                  Already have an account?{" "}
                  <Link href="/login" className="text-blue-600 hover:underline">
                    Log in
                  </Link>
                </p>
              </CardFooter>
            </form>
          </TabsContent>

          {/* Hirer Registration Form */}
          <TabsContent value="hirer">
            <form onSubmit={handleSubmitHirer(onSubmitHirer)}>
              <CardContent className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="hirer-company">Company Name</Label>
                  <Input
                    id="hirer-company"
                    placeholder="Acme Corp"
                    {...registerHirer("companyName")}
                  />
                  {hirerErrors.companyName && (
                    <p className="text-sm text-destructive">{hirerErrors.companyName.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hirer-email">Company Email</Label>
                  <Input
                    id="hirer-email"
                    type="email"
                    placeholder="hr@acmecorp.com"
                    {...registerHirer("email")}
                  />
                  {hirerErrors.email && (
                    <p className="text-sm text-destructive">{hirerErrors.email.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hirer-password">Password</Label>
                  <Input
                    id="hirer-password"
                    type="password"
                    {...registerHirer("password")}
                  />
                  {hirerErrors.password && (
                    <p className="text-sm text-destructive">{hirerErrors.password.message}</p>
                  )}
                  <PasswordStrengthIndicator password={hirerPassword} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hirer-industry">Industry</Label>
                  <Input
                    id="hirer-industry"
                    placeholder="Technology"
                    {...registerHirer("industry")}
                  />
                  {hirerErrors.industry && (
                    <p className="text-sm text-destructive">{hirerErrors.industry.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hirer-website">Website (optional)</Label>
                  <Input
                    id="hirer-website"
                    placeholder="https://www.acmecorp.com"
                    {...registerHirer("website")}
                  />
                  {hirerErrors.website && (
                    <p className="text-sm text-destructive">{hirerErrors.website.message}</p>
                  )}
                </div>
              </CardContent>

              <CardFooter className="flex flex-col">
                <Button
                  type="submit"
                  className="w-full bg-purple-600 hover:bg-purple-700"
                  disabled={isHirerSubmitting}
                >
                  {isHirerSubmitting ? "Creating Account..." : "Create Hirer Account"}
                </Button>

                <p className="text-center text-sm text-muted-foreground mt-4">
                  Already have an account?{" "}
                  <Link href="/login" className="text-purple-600 hover:underline">
                    Log in
                  </Link>
                </p>
              </CardFooter>
            </form>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}

function PasswordStrengthIndicator({ password }: { password: string }) {
  const requirements = [
    { text: "At least 8 characters", met: password?.length >= 8 },
    { text: "At least one uppercase letter", met: /[A-Z]/.test(password) },
    { text: "At least one lowercase letter", met: /[a-z]/.test(password) },
    { text: "At least one number", met: /[0-9]/.test(password) },
  ];

  return (
    <div className="mt-1">
      <p className="text-xs text-muted-foreground mb-1">Password strength requirements:</p>
      <div className="space-y-1">
        {requirements.map((req, index) => (
          <Requirement key={index} met={req.met} text={req.text} />
        ))}
      </div>
    </div>
  );
}

function Requirement({ met, text }: { met: boolean; text: string }) {
  return (
    <div className="flex items-center gap-2">
      {met ? (
        <Check className="h-3 w-3 text-green-500" />
      ) : (
        <X className="h-3 w-3 text-destructive" />
      )}
      <span className={`text-xs ${met ? "text-muted-foreground" : "text-destructive"}`}>
        {text}
      </span>
    </div>
  );
}