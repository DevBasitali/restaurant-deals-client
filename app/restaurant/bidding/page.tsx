"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Crown, DollarSign, Info, Star, Trophy } from "lucide-react"
import { RestaurantShell } from "@/components/restaurant-shell"

export default function BiddingPage() {
  const [selectedSlot, setSelectedSlot] = useState<BiddingSlot | null>(null)
  const [bidAmount, setBidAmount] = useState("")
  const [bidSuccess, setBidSuccess] = useState(false)

  const handleSelectSlot = (slot: BiddingSlot) => {
    setSelectedSlot(slot)
    setBidAmount((slot.currentBid + 10).toString()) // Set initial bid to current + $10
    setBidSuccess(false)
  }

  const handleBidSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would submit the bid to your backend
    console.log("Submitting bid:", { slotId: selectedSlot?.id, amount: bidAmount })
    setBidSuccess(true)
  }

  return (
    <RestaurantShell>
      <div className="flex flex-col gap-5">
        <h1 className="text-3xl font-bold tracking-tight">Bidding Dashboard</h1>
        <p className="text-muted-foreground">
          Place bids for premium placement of your restaurant and deals on our platform.
        </p>
      </div>

      {/* Subscription Plan Benefits */}
      <Card className="bg-gradient-to-r from-orange-50 to-amber-50 border-orange-100">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Crown className="h-5 w-5 text-orange-500" />
                Premium Subscription
              </CardTitle>
              <CardDescription>Your current plan benefits</CardDescription>
            </div>
            <Badge variant="outline" className="bg-orange-100 text-orange-700 border-orange-200">
              Premium
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex flex-col gap-1">
              <div className="font-medium">Bidding Power</div>
              <div className="text-sm text-muted-foreground">
                Premium members get a 10% discount on all successful bids
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="font-medium">Bid Visibility</div>
              <div className="text-sm text-muted-foreground">
                Your bids are highlighted and get priority in tie situations
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="font-medium">Bid Alerts</div>
              <div className="text-sm text-muted-foreground">Get instant notifications when you're outbid</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-7">
        {/* Bidding Slots */}
        <div className="md:col-span-4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Available Bidding Slots</CardTitle>
              <CardDescription>Select a slot to place your bid</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="featured" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="featured">Featured</TabsTrigger>
                  <TabsTrigger value="category">Category</TabsTrigger>
                  <TabsTrigger value="location">Location</TabsTrigger>
                </TabsList>
                <TabsContent value="featured" className="space-y-4 pt-4">
                  {featuredSlots.map((slot) => (
                    <div
                      key={slot.id}
                      className={`flex items-center justify-between p-4 rounded-lg border ${
                        selectedSlot?.id === slot.id
                          ? "border-orange-200 bg-orange-50"
                          : "border-gray-200 hover:border-orange-200 hover:bg-orange-50"
                      } cursor-pointer transition-colors`}
                      onClick={() => handleSelectSlot(slot)}
                    >
                      <div className="flex items-center gap-3">
                        {slot.position === 1 && <Trophy className="h-5 w-5 text-yellow-500" />}
                        {slot.position === 2 && <Trophy className="h-5 w-5 text-gray-400" />}
                        {slot.position === 3 && <Trophy className="h-5 w-5 text-amber-700" />}
                        {slot.position > 3 && <Star className="h-5 w-5 text-gray-400" />}
                        <div>
                          <div className="font-medium">{slot.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {slot.description} • {slot.impressions.toLocaleString()} impressions/day
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <div className="font-bold">${slot.currentBid}</div>
                        <div className="text-xs text-muted-foreground">Current highest bid</div>
                      </div>
                    </div>
                  ))}
                </TabsContent>
                <TabsContent value="category" className="pt-4">
                  <div className="flex items-center justify-center h-40 border rounded-lg border-dashed">
                    <div className="text-center">
                      <p className="text-muted-foreground">Category bidding slots coming soon</p>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="location" className="pt-4">
                  <div className="flex items-center justify-center h-40 border rounded-lg border-dashed">
                    <div className="text-center">
                      <p className="text-muted-foreground">Location bidding slots coming soon</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your Active Bids</CardTitle>
              <CardDescription>Currently active bids from your restaurant</CardDescription>
            </CardHeader>
            <CardContent>
              {activeBids.length > 0 ? (
                <div className="space-y-4">
                  {activeBids.map((bid) => (
                    <div
                      key={bid.id}
                      className="flex items-center justify-between p-4 rounded-lg border border-gray-200"
                    >
                      <div>
                        <div className="font-medium">{bid.slotName}</div>
                        <div className="text-sm text-muted-foreground">
                          Bid placed on {bid.date} • {bid.status}
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <div className="font-bold">${bid.amount}</div>
                        <Badge
                          variant={
                            bid.status === "Winning" ? "default" : bid.status === "Outbid" ? "destructive" : "outline"
                          }
                          className="mt-1"
                        >
                          {bid.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center h-40 border rounded-lg border-dashed">
                  <div className="text-center">
                    <p className="text-muted-foreground">You don't have any active bids</p>
                    <p className="text-sm text-muted-foreground">Select a slot above to place your first bid</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Bid Form */}
        <div className="md:col-span-3 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Place Your Bid</CardTitle>
              <CardDescription>Enter your bid amount for the selected slot</CardDescription>
            </CardHeader>
            <CardContent>
              {selectedSlot ? (
                <form onSubmit={handleBidSubmit}>
                  <div className="space-y-4">
                    <div>
                      <div className="font-medium mb-2">Selected Slot</div>
                      <div className="p-3 bg-muted rounded-md">
                        <div className="font-medium">{selectedSlot.name}</div>
                        <div className="text-sm text-muted-foreground">{selectedSlot.description}</div>
                        <div className="text-sm mt-1">
                          Current highest bid: <span className="font-bold">${selectedSlot.currentBid}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bid-amount">Your Bid Amount ($)</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="bid-amount"
                          type="number"
                          min={selectedSlot.currentBid + 5}
                          step="5"
                          value={bidAmount}
                          onChange={(e) => setBidAmount(e.target.value)}
                          className="pl-9"
                          required
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Minimum bid: ${selectedSlot.currentBid + 5} (current highest + $5)
                      </p>
                    </div>

                    <div className="flex items-start gap-2 p-3 bg-blue-50 text-blue-800 rounded-md">
                      <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                      <div className="text-sm">
                        <p>
                          Bids are processed daily at midnight. If your bid is successful, your account will be charged
                          the bid amount.
                        </p>
                        <p className="mt-1">
                          As a Premium member, you'll receive a 10% discount on the final bid amount.
                        </p>
                      </div>
                    </div>

                    {bidSuccess && (
                      <Alert className="bg-green-50 text-green-800 border-green-200">
                        <AlertTitle>Bid Placed Successfully!</AlertTitle>
                        <AlertDescription>
                          Your bid of ${bidAmount} for {selectedSlot.name} has been submitted. You'll be notified if you
                          win the auction.
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>

                  <div className="mt-6">
                    <Button type="submit" className="w-full">
                      Place Bid
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="flex items-center justify-center h-64 border rounded-lg border-dashed">
                  <div className="text-center">
                    <p className="text-muted-foreground">No slot selected</p>
                    <p className="text-sm text-muted-foreground">Select a bidding slot to place your bid</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Bidding FAQ</CardTitle>
              <CardDescription>Common questions about the bidding process</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium">How does the bidding process work?</h3>
                <p className="text-sm text-muted-foreground">
                  Bids are processed daily at midnight. The highest bidder for each slot wins the placement for the
                  following day.
                </p>
              </div>
              <div>
                <h3 className="font-medium">How long does a winning bid last?</h3>
                <p className="text-sm text-muted-foreground">
                  Winning bids secure your placement for 24 hours, after which a new auction begins.
                </p>
              </div>
              <div>
                <h3 className="font-medium">Can I cancel my bid?</h3>
                <p className="text-sm text-muted-foreground">
                  Bids can be canceled up to 1 hour before the daily auction closes at midnight.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View Full Bidding Guidelines
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </RestaurantShell>
  )
}

// Types
interface BiddingSlot {
  id: string
  name: string
  description: string
  position: number
  currentBid: number
  impressions: number
}

interface ActiveBid {
  id: string
  slotName: string
  amount: number
  date: string
  status: "Winning" | "Outbid" | "Pending"
}

// Sample data
const featuredSlots: BiddingSlot[] = [
  {
    id: "slot-1",
    name: "Homepage Hero Spotlight",
    description: "Top position on the homepage",
    position: 1,
    currentBid: 350,
    impressions: 15000,
  },
  {
    id: "slot-2",
    name: "Featured Restaurant #1",
    description: "First featured restaurant on homepage",
    position: 2,
    currentBid: 250,
    impressions: 12000,
  },
  {
    id: "slot-3",
    name: "Featured Restaurant #2",
    description: "Second featured restaurant on homepage",
    position: 3,
    currentBid: 200,
    impressions: 10000,
  },
  {
    id: "slot-4",
    name: "Featured Restaurant #3",
    description: "Third featured restaurant on homepage",
    position: 4,
    currentBid: 150,
    impressions: 8000,
  },
  {
    id: "slot-5",
    name: "Featured Deal #1",
    description: "First featured deal on deals page",
    position: 5,
    currentBid: 120,
    impressions: 7500,
  },
  {
    id: "slot-6",
    name: "Featured Deal #2",
    description: "Second featured deal on deals page",
    position: 6,
    currentBid: 100,
    impressions: 6000,
  },
  {
    id: "slot-7",
    name: "Search Results Top Position",
    description: "Top position in search results",
    position: 7,
    currentBid: 80,
    impressions: 5000,
  },
]

const activeBids: ActiveBid[] = [
  {
    id: "bid-1",
    slotName: "Featured Restaurant #2",
    amount: 220,
    date: "2023-06-10",
    status: "Winning",
  },
  {
    id: "bid-2",
    slotName: "Featured Deal #1",
    amount: 100,
    date: "2023-06-09",
    status: "Outbid",
  },
]
