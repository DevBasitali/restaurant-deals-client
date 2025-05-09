"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { MapPin, Tag } from "lucide-react"
import Image from "next/image"

export default function DealsPage() {
  const [location, setLocation] = useState<string>("all")
  const [dealType, setDealType] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("popular")

  // Filter and sort the deals based on the selected filters
  const filteredDeals = deals
    .filter((deal) => (location === "all" ? true : deal.location === location))
    .filter((deal) => (dealType === "all" ? true : deal.type === dealType))
    .sort((a, b) => {
      if (sortBy === "popular") return b.popularity - a.popularity
      if (sortBy === "newest") return new Date(b.date).getTime() - new Date(a.date).getTime()
      if (sortBy === "discount") return Number.parseInt(b.discount) - Number.parseInt(a.discount)
      return 0
    })

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Restaurant Deals</h1>
        <p className="text-gray-600">Discover the best deals from restaurants in your area</p>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-lg shadow-sm border p-4 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label htmlFor="location" className="text-sm font-medium">
              Location
            </label>
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger id="location" className="w-full">
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Cities</SelectLabel>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="new-york">New York</SelectItem>
                  <SelectItem value="los-angeles">Los Angeles</SelectItem>
                  <SelectItem value="chicago">Chicago</SelectItem>
                  <SelectItem value="miami">Miami</SelectItem>
                  <SelectItem value="san-francisco">San Francisco</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label htmlFor="deal-type" className="text-sm font-medium">
              Deal Type
            </label>
            <Select value={dealType} onValueChange={setDealType}>
              <SelectTrigger id="deal-type" className="w-full">
                <SelectValue placeholder="Select deal type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Types</SelectLabel>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="daily">Daily Deals</SelectItem>
                  <SelectItem value="weekly">Weekly Deals</SelectItem>
                  <SelectItem value="monthly">Monthly Deals</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label htmlFor="sort-by" className="text-sm font-medium">
              Sort By
            </label>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger id="sort-by" className="w-full">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Sort Options</SelectLabel>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="discount">Highest Discount</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-gray-600">
          Showing <span className="font-medium">{filteredDeals.length}</span> deals
        </p>
      </div>

      {/* Deals Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredDeals.map((deal) => (
          <Card key={deal.id} className="overflow-hidden transition-all duration-200 hover:shadow-md">
            <div className="relative h-48">
              <Image src={deal.image || "/placeholder.svg"} alt={deal.restaurantName} fill className="object-cover" />
              <div className="absolute top-3 right-3 bg-orange-600 text-white px-3 py-1 rounded-full font-bold">
                {deal.discount}
              </div>
              <div className="absolute bottom-3 left-3 bg-black/70 text-white text-xs px-2 py-1 rounded-full flex items-center">
                <Tag className="h-3 w-3 mr-1" />
                {deal.type.charAt(0).toUpperCase() + deal.type.slice(1)}
              </div>
            </div>
            <CardHeader className="pb-2">
              <h3 className="text-xl font-bold">{deal.restaurantName}</h3>
              <h4 className="text-gray-700 font-medium">{deal.title}</h4>
            </CardHeader>
            <CardContent className="pb-4">
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">{deal.description}</p>
              <div className="flex items-center text-gray-500 text-sm">
                <MapPin className="h-4 w-4 mr-1" />
                {locationNames[deal.location] || deal.location}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-gray-900 hover:bg-gray-800">View Deal</Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {filteredDeals.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium mb-2">No deals found</h3>
          <p className="text-gray-600">Try adjusting your filters to find more deals</p>
        </div>
      )}
    </div>
  )
}

// Location display names mapping
const locationNames: Record<string, string> = {
  "new-york": "New York",
  "los-angeles": "Los Angeles",
  chicago: "Chicago",
  miami: "Miami",
  "san-francisco": "San Francisco",
}

// Sample deals data
const deals = [
  {
    id: "1",
    restaurantName: "Bella Italia",
    title: "Pizza & Pasta Combo",
    discount: "50% OFF",
    description: "Enjoy our signature pizza and pasta combo at half price. Perfect for couples or small groups.",
    location: "new-york",
    type: "daily",
    image: "/placeholder.svg?height=200&width=300",
    popularity: 95,
    date: "2023-05-01",
  },
  {
    id: "2",
    restaurantName: "Sushi Master",
    title: "Buy One Get One Free Rolls",
    discount: "BOGO",
    description: "Buy any signature roll and get one of equal or lesser value for free. Available all week.",
    location: "los-angeles",
    type: "weekly",
    image: "/placeholder.svg?height=200&width=300",
    popularity: 88,
    date: "2023-05-05",
  },
  {
    id: "3",
    restaurantName: "Burger Joint",
    title: "Family Meal Deal",
    discount: "30% OFF",
    description: "Family meal with 4 burgers, 4 sides, and 4 drinks. Perfect for a family dinner.",
    location: "chicago",
    type: "weekly",
    image: "/placeholder.svg?height=200&width=300",
    popularity: 75,
    date: "2023-05-10",
  },
  {
    id: "4",
    restaurantName: "Taco Fiesta",
    title: "Taco Tuesday Special",
    discount: "$1 TACOS",
    description: "Every Tuesday, enjoy our signature tacos for just $1 each. Minimum order of 3 tacos.",
    location: "miami",
    type: "weekly",
    image: "/placeholder.svg?height=200&width=300",
    popularity: 92,
    date: "2023-05-15",
  },
  {
    id: "5",
    restaurantName: "Green Garden",
    title: "Vegan Lunch Special",
    discount: "FREE DESSERT",
    description: "Order any vegan main course and get a complimentary dessert. Available for lunch only.",
    location: "san-francisco",
    type: "daily",
    image: "/placeholder.svg?height=200&width=300",
    popularity: 70,
    date: "2023-05-20",
  },
  {
    id: "6",
    restaurantName: "Steakhouse Prime",
    title: "Date Night Special",
    discount: "25% OFF",
    description: "Two premium steaks with a bottle of wine at 25% off. Perfect for a romantic evening.",
    location: "new-york",
    type: "monthly",
    image: "/placeholder.svg?height=200&width=300",
    popularity: 85,
    date: "2023-05-25",
  },
  {
    id: "7",
    restaurantName: "Noodle House",
    title: "Ramen & Appetizer Combo",
    discount: "20% OFF",
    description: "Any ramen bowl with an appetizer of your choice at 20% off. Available daily.",
    location: "los-angeles",
    type: "daily",
    image: "/placeholder.svg?height=200&width=300",
    popularity: 78,
    date: "2023-06-01",
  },
  {
    id: "8",
    restaurantName: "Sweet Tooth",
    title: "Dessert Platter",
    discount: "15% OFF",
    description: "Dessert platter for 4 people with a variety of our signature desserts at 15% off.",
    location: "chicago",
    type: "monthly",
    image: "/placeholder.svg?height=200&width=300",
    popularity: 65,
    date: "2023-06-05",
  },
  {
    id: "9",
    restaurantName: "Mediterranean Delight",
    title: "Mezze Sampler",
    discount: "40% OFF",
    description: "Try our mezze sampler with hummus, baba ganoush, tabbouleh, and more at 40% off.",
    location: "miami",
    type: "weekly",
    image: "/placeholder.svg?height=200&width=300",
    popularity: 80,
    date: "2023-06-10",
  },
  {
    id: "10",
    restaurantName: "Seafood Harbor",
    title: "Lobster Special",
    discount: "35% OFF",
    description: "Enjoy our signature lobster dish with two sides at 35% off. Available on weekends only.",
    location: "san-francisco",
    type: "monthly",
    image: "/placeholder.svg?height=200&width=300",
    popularity: 90,
    date: "2023-06-15",
  },
  {
    id: "11",
    restaurantName: "BBQ Masters",
    title: "Ribs & Wings Combo",
    discount: "45% OFF",
    description: "Half rack of ribs and 6 wings with two sides at 45% off. Perfect for sharing.",
    location: "chicago",
    type: "daily",
    image: "/placeholder.svg?height=200&width=300",
    popularity: 88,
    date: "2023-06-20",
  },
  {
    id: "12",
    restaurantName: "Pho Corner",
    title: "Pho & Spring Roll Combo",
    discount: "25% OFF",
    description: "Large bowl of pho with 2 spring rolls at 25% off. Available all day.",
    location: "new-york",
    type: "weekly",
    image: "/placeholder.svg?height=200&width=300",
    popularity: 72,
    date: "2023-06-25",
  },
]
