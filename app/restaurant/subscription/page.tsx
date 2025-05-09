"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, HelpCircle, X } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { RestaurantShell } from "@/components/restaurant-shell"

export default function SubscriptionPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly")
  const [currentPlan, setCurrentPlan] = useState("pro") // Assuming the restaurant is on Pro plan

  const handleSubscribe = (planId: string) => {
    // In a real app, you would handle the subscription process
    console.log(`Subscribing to ${planId} plan with ${billingCycle} billing`)
    setCurrentPlan(planId)
  }

  return (
    <RestaurantShell>
      <div className="flex flex-col gap-5">
        <h1 className="text-3xl font-bold tracking-tight">Subscription Plans</h1>
        <p className="text-muted-foreground">
          Choose the perfect plan to grow your restaurant's presence on our platform.
        </p>
      </div>

      {/* Billing Cycle Toggle */}
      <div className="flex justify-center my-8">
        <Tabs
          defaultValue="monthly"
          className="w-[400px]"
          onValueChange={(v) => setBillingCycle(v as "monthly" | "annual")}
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="monthly">Monthly Billing</TabsTrigger>
            <TabsTrigger value="annual">
              Annual Billing{" "}
              <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 border-green-200">
                Save 20%
              </Badge>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Pricing Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Basic Plan */}
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              Basic
              {currentPlan === "basic" && (
                <Badge variant="outline" className="ml-2">
                  Current Plan
                </Badge>
              )}
            </CardTitle>
            <CardDescription>For restaurants just getting started</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <span className="text-3xl font-bold">${billingCycle === "monthly" ? "49" : "39"}</span>
              <span className="text-muted-foreground">/month</span>
              {billingCycle === "annual" && (
                <div className="text-sm text-green-600 font-medium">
                  ${49 * 12} ${39 * 12} billed annually
                </div>
              )}
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-green-500" />
                <span>List up to 5 deals</span>
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-green-500" />
                <span>Basic analytics</span>
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-green-500" />
                <span>Standard customer support</span>
              </li>
              <li className="flex items-center">
                <X className="mr-2 h-4 w-4 text-gray-300" />
                <span className="text-muted-foreground">Featured placement</span>
              </li>
              <li className="flex items-center">
                <X className="mr-2 h-4 w-4 text-gray-300" />
                <span className="text-muted-foreground">Bidding capabilities</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button
              variant={currentPlan === "basic" ? "outline" : "default"}
              className="w-full"
              onClick={() => handleSubscribe("basic")}
            >
              {currentPlan === "basic" ? "Current Plan" : "Subscribe Now"}
            </Button>
          </CardFooter>
        </Card>

        {/* Pro Plan - Highlighted */}
        <Card className="border-primary bg-primary/5 shadow-md relative">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Badge className="px-3 py-1 text-sm">MOST POPULAR</Badge>
          </div>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              Pro
              {currentPlan === "pro" && (
                <Badge variant="outline" className="ml-2">
                  Current Plan
                </Badge>
              )}
            </CardTitle>
            <CardDescription>Perfect for growing restaurants</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <span className="text-3xl font-bold">${billingCycle === "monthly" ? "99" : "79"}</span>
              <span className="text-muted-foreground">/month</span>
              {billingCycle === "annual" && (
                <div className="text-sm text-green-600 font-medium">
                  ${99 * 12} ${79 * 12} billed annually
                </div>
              )}
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-green-500" />
                <span>List up to 15 deals</span>
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-green-500" />
                <span>Advanced analytics</span>
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-green-500" />
                <span>Priority customer support</span>
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-green-500" />
                <span>Featured placement opportunities</span>
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-green-500" />
                <span>Basic bidding capabilities</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button
              variant={currentPlan === "pro" ? "outline" : "default"}
              className="w-full"
              onClick={() => handleSubscribe("pro")}
            >
              {currentPlan === "pro" ? "Current Plan" : "Subscribe Now"}
            </Button>
          </CardFooter>
        </Card>

        {/* Premium Plan */}
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              Premium
              {currentPlan === "premium" && (
                <Badge variant="outline" className="ml-2">
                  Current Plan
                </Badge>
              )}
            </CardTitle>
            <CardDescription>For established restaurants</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <span className="text-3xl font-bold">${billingCycle === "monthly" ? "199" : "159"}</span>
              <span className="text-muted-foreground">/month</span>
              {billingCycle === "annual" && (
                <div className="text-sm text-green-600 font-medium">
                  ${199 * 12} ${159 * 12} billed annually
                </div>
              )}
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-green-500" />
                <span>Unlimited deals</span>
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-green-500" />
                <span>Comprehensive analytics</span>
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-green-500" />
                <span>Dedicated account manager</span>
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-green-500" />
                <span>Premium featured placement</span>
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-green-500" />
                <span>Advanced bidding with discounts</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button
              variant={currentPlan === "premium" ? "outline" : "default"}
              className="w-full"
              onClick={() => handleSubscribe("premium")}
            >
              {currentPlan === "premium" ? "Current Plan" : "Subscribe Now"}
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Features Comparison Table */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Features Comparison</h2>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Feature</TableHead>
                <TableHead className="text-center">Basic</TableHead>
                <TableHead className="text-center">Pro</TableHead>
                <TableHead className="text-center">Premium</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {features.map((feature) => (
                <TableRow key={feature.name}>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      {feature.name}
                      {feature.tooltip && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <HelpCircle className="h-4 w-4 ml-2 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="w-[200px]">{feature.tooltip}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">{renderFeatureValue(feature.basic)}</TableCell>
                  <TableCell className="text-center">{renderFeatureValue(feature.pro)}</TableCell>
                  <TableCell className="text-center">{renderFeatureValue(feature.premium)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-12 mb-8">
        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {faqs.map((faq, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-lg">{faq.question}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </RestaurantShell>
  )
}

// Helper function to render feature values
function renderFeatureValue(value: string | boolean | number) {
  if (typeof value === "boolean") {
    return value ? (
      <Check className="h-5 w-5 text-green-500 mx-auto" />
    ) : (
      <X className="h-5 w-5 text-gray-300 mx-auto" />
    )
  }
  return value
}

// Features data
const features = [
  {
    name: "Number of Deals",
    basic: "Up to 5",
    pro: "Up to 15",
    premium: "Unlimited",
    tooltip: "The maximum number of active deals you can have at any time.",
  },
  {
    name: "Featured Placement",
    basic: false,
    pro: "Basic",
    premium: "Premium",
    tooltip: "Get your restaurant featured in prominent positions on our platform.",
  },
  {
    name: "Analytics",
    basic: "Basic",
    pro: "Advanced",
    premium: "Comprehensive",
    tooltip: "Track the performance of your deals and customer engagement.",
  },
  {
    name: "Customer Support",
    basic: "Standard",
    pro: "Priority",
    premium: "Dedicated Manager",
    tooltip: "Access to our support team for any questions or issues.",
  },
  {
    name: "Bidding Capabilities",
    basic: false,
    pro: "Basic",
    premium: "Advanced",
    tooltip: "Ability to bid for premium placement on our platform.",
  },
  {
    name: "Deal Visibility Boost",
    basic: "1x",
    pro: "2x",
    premium: "3x",
    tooltip: "Increased visibility in search results and recommendations.",
  },
  {
    name: "Customer Reviews Management",
    basic: "View Only",
    pro: "Respond & View",
    premium: "Full Management",
    tooltip: "Tools to manage and respond to customer reviews.",
  },
  {
    name: "Marketing Tools",
    basic: false,
    pro: "Basic",
    premium: "Advanced",
    tooltip: "Access to marketing tools to promote your deals.",
  },
  {
    name: "API Access",
    basic: false,
    pro: false,
    premium: true,
    tooltip: "Access to our API for integration with your systems.",
  },
  {
    name: "Multi-location Support",
    basic: "1 location",
    pro: "Up to 3 locations",
    premium: "Unlimited",
    tooltip: "Support for multiple restaurant locations under one account.",
  },
]

// FAQs data
const faqs = [
  {
    question: "Can I change my plan later?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.",
  },
  {
    question: "Is there a contract or commitment?",
    answer:
      "No long-term contracts. You can cancel your subscription at any time, effective at the end of your current billing period.",
  },
  {
    question: "How does billing work?",
    answer:
      "We offer both monthly and annual billing options. Annual billing comes with a 20% discount compared to monthly billing.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, PayPal, and bank transfers for annual plans.",
  },
]
