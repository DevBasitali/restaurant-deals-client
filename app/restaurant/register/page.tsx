"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, UtensilsCrossed } from "lucide-react"

export default function RestaurantRegistration() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    plan: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePlanChange = (value: string) => {
    setFormData((prev) => ({ ...prev, plan: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Here you would typically send the data to your backend
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-orange-100 p-3 rounded-full">
              <UtensilsCrossed className="h-8 w-8 text-orange-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Register Your Restaurant</h1>
          <p className="mt-2 text-gray-600">Join our platform and start offering exclusive deals to customers</p>
        </div>

        <Card className="border-none shadow-lg">
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>Restaurant Information</CardTitle>
              <CardDescription>Please provide details about your restaurant to complete registration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Restaurant Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="e.g., Bella Italia"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Tell customers about your restaurant, cuisine, and specialties..."
                  className="min-h-[120px]"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="address"
                    name="address"
                    placeholder="123 Main St, City, State, ZIP"
                    className="pl-10"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="plan">Subscription Plan</Label>
                <Select onValueChange={handlePlanChange} defaultValue={formData.plan} required>
                  <SelectTrigger id="plan">
                    <SelectValue placeholder="Select a plan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">
                      <div className="flex flex-col">
                        <span className="font-medium">Basic</span>
                        <span className="text-xs text-gray-500">List up to 5 deals per month</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="pro">
                      <div className="flex flex-col">
                        <span className="font-medium">Pro</span>
                        <span className="text-xs text-gray-500">List up to 15 deals per month + analytics</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="premium">
                      <div className="flex flex-col">
                        <span className="font-medium">Premium</span>
                        <span className="text-xs text-gray-500">Unlimited deals + featured placement</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700">
                Register Restaurant
              </Button>
              <p className="text-center text-sm text-gray-500">
                By registering, you agree to our{" "}
                <a href="#" className="font-medium text-orange-600 hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="font-medium text-orange-600 hover:underline">
                  Partner Agreement
                </a>
              </p>
            </CardFooter>
          </form>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Already registered?{" "}
            <a href="/auth" className="font-medium text-orange-600 hover:underline">
              Sign in to your account
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
