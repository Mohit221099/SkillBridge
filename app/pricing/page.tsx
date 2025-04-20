"use client";

import { useState } from "react";
import { Check, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

export default function PricingPage() {
  const [billingInterval, setBillingInterval] = useState<"monthly" | "yearly">("monthly");

  const plans = [
    {
      name: "Free",
      description: "Perfect for getting started and exploring the platform.",
      price: {
        monthly: 0,
        yearly: 0,
      },
      features: [
        "Up to 3 project showcases",
        "Basic analytics",
        "Community support",
        "Access to public challenges",
        "Standard profile"
      ],
      limitations: [
        "No custom domain",
        "Community support only",
        "Basic analytics"
      ],
      badge: null,
      buttonText: "Get Started",
      buttonVariant: "outline" as const
    },
    {
      name: "Pro",
      description: "Best for developers building their professional portfolio.",
      price: {
        monthly: 12,
        yearly: 120,
      },
      features: [
        "Unlimited project showcases",
        "Advanced analytics",
        "Priority support",
        "Custom domain",
        "Featured profile badge",
        "Early access to new features",
        "AI-powered insights",
        "Remove platform branding"
      ],
      limitations: [],
      badge: "Most Popular",
      buttonText: "Subscribe",
      buttonVariant: "default" as const
    },
    {
      name: "Business",
      description: "For companies looking to hire top talent.",
      price: {
        monthly: 49,
        yearly: 490,
      },
      features: [
        "Everything in Pro",
        "Unlimited job postings",
        "Custom challenges",
        "Team collaboration",
        "API access",
        "Dedicated account manager",
        "Custom contracts",
        "Advanced reporting",
        "Bulk actions"
      ],
      limitations: [],
      badge: "Best Value",
      buttonText: "Contact Sales",
      buttonVariant: "default" as const
    }
  ];

  const features = {
    "Custom domain": "Host your portfolio on your own domain",
    "Featured profile badge": "Stand out in search results and listings",
    "AI-powered insights": "Get personalized recommendations and analytics",
    "Custom challenges": "Create and manage private challenges for recruitment",
    "API access": "Integrate with your existing tools and workflows",
    "Bulk actions": "Manage multiple projects and challenges efficiently"
  };

  return (
    <div className="min-h-screen bg-background py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Simple, transparent pricing</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Choose the perfect plan for your needs
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4">
            <Button
              variant={billingInterval === "monthly" ? "default" : "outline"}
              onClick={() => setBillingInterval("monthly")}
              className="w-28"
            >
              Monthly
            </Button>
            <Button
              variant={billingInterval === "yearly" ? "default" : "outline"}
              onClick={() => setBillingInterval("yearly")}
              className="w-28"
            >
              Yearly
              <Badge variant="secondary" className="ml-2 bg-green-500/10 text-green-500">
                -17%
              </Badge>
            </Button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan) => (
            <Card 
              key={plan.name} 
              className={`relative flex flex-col ${
                plan.name === "Pro" ? "border-blue-500 shadow-lg" : ""
              }`}
            >
              {plan.badge && (
                <Badge 
                  className="absolute -top-3 right-4 bg-blue-500"
                >
                  {plan.badge}
                </Badge>
              )}
              
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              
              <CardContent className="flex-1">
                <div className="mb-6">
                  <span className="text-4xl font-bold">
                    ${plan.price[billingInterval]}
                  </span>
                  {plan.price[billingInterval] > 0 && (
                    <span className="text-muted-foreground ml-2">
                      /{billingInterval === "monthly" ? "mo" : "yr"}
                    </span>
                  )}
                </div>
                
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">
                        {feature}
                        {features[feature] && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <HelpCircle className="h-4 w-4 inline ml-1 text-muted-foreground" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="w-64">{features[feature]}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              
              <CardFooter>
                <Button variant={plan.buttonVariant} className="w-full">
                  {plan.buttonText}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-20 text-center">
          <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-muted-foreground mb-4">
            Have questions? Check out our FAQ or contact our support team.
          </p>
          <Button variant="outline">View FAQ</Button>
        </div>
      </div>
    </div>
  );
}