"use client"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, MapPin, Tag, Users } from "lucide-react"
import { CountdownTimer } from "@/components/countdown-timer"
import { StarRating } from "@/components/star-rating"

export default function DealPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch the deal data based on the ID
  const deal = deals.find((d) => d.id === params.id) || deals[0]
  const relatedDeals = deals.filter((d) => d.id !== deal.id).slice(0, 4)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Deal Header */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="text-orange-600 border-orange-200 bg-orange-50">
                {deal.type.charAt(0).toUpperCase() + deal.type.slice(1)} Deal
              </Badge>
              <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                <Users className="h-3 w-3 mr-1" />
                {deal.redeemed}+ Redeemed
              </Badge>
            </div>
            <h1 className="text-3xl font-bold mb-2">{deal.title}</h1>
            <div className="flex items-center gap-2 text-gray-600 mb-4">
              <span className="font-medium">{deal.restaurantName}</span>
              <span>•</span>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                {locationNames[deal.location] || deal.location}
              </div>
            </div>
          </div>

          {/* Deal Image */}
          <div className="relative h-[300px] rounded-xl overflow-hidden">
            <Image src={deal.image || "/placeholder.svg"} alt={deal.title} fill className="object-cover" />
            <div className="absolute top-4 right-4 bg-orange-600 text-white px-4 py-2 rounded-lg font-bold text-lg">
              {deal.discount}
            </div>
          </div>

          {/* Countdown Timer */}
          {deal.isFlashDeal && (
            <div className="bg-gray-50 rounded-lg p-4 border">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-5 w-5 text-orange-600" />
                <h3 className="font-medium">Limited Time Offer</h3>
              </div>
              <CountdownTimer targetDate={deal.expiryDate} />
            </div>
          )}

          {/* Tabs for Description and Details */}
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="details">Details & Restrictions</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="p-4 bg-white rounded-b-lg border border-t-0">
              <div className="prose max-w-none">
                <p className="text-gray-700 mb-4">{deal.fullDescription}</p>
                <h3 className="text-lg font-medium mb-2">What's Included:</h3>
                <ul className="list-disc pl-5 space-y-1 mb-4">
                  {deal.included.map((item, index) => (
                    <li key={index} className="text-gray-700">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>
            <TabsContent value="details" className="p-4 bg-white rounded-b-lg border border-t-0">
              <div className="prose max-w-none">
                <h3 className="text-lg font-medium mb-2">Terms & Conditions:</h3>
                <ul className="list-disc pl-5 space-y-1 mb-4">
                  {deal.terms.map((term, index) => (
                    <li key={index} className="text-gray-700">
                      {term}
                    </li>
                  ))}
                </ul>
                <h3 className="text-lg font-medium mb-2">Valid:</h3>
                <p className="text-gray-700">{deal.validPeriod}</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Action Card */}
          <Card className="border-none shadow-md">
            <CardHeader className="pb-2">
              <h3 className="text-xl font-bold">Deal Summary</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Original Price</p>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold">${deal.discountedPrice}</span>
                  <span className="text-gray-500 line-through">${deal.originalPrice}</span>
                  <span className="text-green-600 text-sm font-medium">
                    Save {Math.round(((deal.originalPrice - deal.discountedPrice) / deal.originalPrice) * 100)}%
                  </span>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-1">User Ratings</p>
                <div className="flex items-center gap-2">
                  <StarRating rating={deal.rating} />
                  <span className="text-gray-600">({deal.reviewCount} reviews)</span>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-1">Redemption</p>
                <p className="text-gray-700">{deal.redemptionInfo}</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-orange-600 hover:bg-orange-700 text-lg py-6">Redeem Deal</Button>
            </CardFooter>
          </Card>

          {/* Location Map */}
          <Card>
            <CardHeader className="pb-2">
              <h3 className="text-lg font-medium">Location</h3>
            </CardHeader>
            <CardContent className="p-0">
              <div className="relative h-[200px] w-full">
                <Image
                  src="/placeholder.svg?height=200&width=400&text=Map+Preview"
                  alt="Restaurant location map"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <p className="font-medium">{deal.restaurantName}</p>
                <p className="text-gray-600 mb-2">{deal.address}</p>
                <Button variant="outline" size="sm" className="w-full">
                  Get Directions
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Restaurant Info */}
          <Card>
            <CardHeader className="pb-2">
              <h3 className="text-lg font-medium">About {deal.restaurantName}</h3>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">{deal.restaurantDescription}</p>
              <div className="flex flex-wrap gap-2">
                {deal.cuisineTypes.map((cuisine, index) => (
                  <Badge key={index} variant="secondary">
                    {cuisine}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Related Deals */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Related Deals You Might Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedDeals.map((relatedDeal) => (
            <Card key={relatedDeal.id} className="overflow-hidden transition-all duration-200 hover:shadow-md">
              <div className="relative h-48">
                <Image
                  src={relatedDeal.image || "/placeholder.svg"}
                  alt={relatedDeal.restaurantName}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-3 right-3 bg-orange-600 text-white px-3 py-1 rounded-full font-bold">
                  {relatedDeal.discount}
                </div>
                <div className="absolute bottom-3 left-3 bg-black/70 text-white text-xs px-2 py-1 rounded-full flex items-center">
                  <Tag className="h-3 w-3 mr-1" />
                  {relatedDeal.type.charAt(0).toUpperCase() + relatedDeal.type.slice(1)}
                </div>
              </div>
              <CardHeader className="pb-2">
                <h3 className="text-lg font-bold">{relatedDeal.restaurantName}</h3>
                <h4 className="text-gray-700">{relatedDeal.title}</h4>
              </CardHeader>
              <CardContent className="pb-4">
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{relatedDeal.description}</p>
                <div className="flex items-center text-gray-500 text-sm">
                  <MapPin className="h-4 w-4 mr-1" />
                  {locationNames[relatedDeal.location] || relatedDeal.location}
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-gray-900 hover:bg-gray-800">View Deal</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
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
    title: "50% Off Pizza & Pasta Combo",
    discount: "50% OFF",
    description: "Enjoy our signature pizza and pasta combo at half price. Perfect for couples or small groups.",
    fullDescription:
      "Indulge in an authentic Italian dining experience with our signature Pizza & Pasta Combo. This deal includes one large specialty pizza of your choice and two pasta dishes from our classic pasta menu. Perfect for sharing with family or friends, this combo offers exceptional value while delivering the rich flavors of traditional Italian cuisine that Bella Italia is known for.",
    included: [
      "One large specialty pizza (choose from Margherita, Pepperoni, Vegetarian, or Supreme)",
      "Two pasta dishes (choose from Spaghetti Bolognese, Fettuccine Alfredo, or Penne Arrabbiata)",
      "Complimentary garlic bread basket",
    ],
    terms: [
      "Valid for dine-in only",
      "Cannot be combined with other offers or promotions",
      "Valid for up to 4 people per table",
      "Reservation recommended",
      "Tax and gratuity not included",
    ],
    validPeriod: "Monday to Thursday, 5:00 PM to 9:00 PM. Expires June 30, 2023.",
    location: "new-york",
    address: "123 Italian Ave, New York, NY 10001",
    type: "daily",
    image: "/placeholder.svg?height=300&width=600",
    popularity: 95,
    date: "2023-05-01",
    isFlashDeal: true,
    expiryDate: "2023-06-30T23:59:59",
    originalPrice: 59.99,
    discountedPrice: 29.99,
    rating: 4.7,
    reviewCount: 243,
    redeemed: 578,
    redemptionInfo: "Present this deal at the restaurant to redeem",
    restaurantDescription:
      "Bella Italia brings the authentic flavors of Italy to New York. Our chefs use traditional recipes and the freshest ingredients to create memorable dining experiences.",
    cuisineTypes: ["Italian", "Pizza", "Pasta"],
  },
  {
    id: "2",
    restaurantName: "Sushi Master",
    title: "Buy One Get One Free Rolls",
    discount: "BOGO",
    description: "Buy any signature roll and get one of equal or lesser value for free. Available all week.",
    fullDescription:
      "Experience the art of sushi with our Buy One Get One Free offer on all signature rolls. Choose from our extensive menu of expertly crafted rolls, featuring the freshest seafood and ingredients. Whether you're a sushi connoisseur or trying it for the first time, this deal allows you to explore more flavors without the extra cost.",
    included: [
      "Buy any signature roll and get a second roll of equal or lesser value for free",
      "Choose from over 20 different signature rolls",
      "Includes both traditional and contemporary roll options",
    ],
    terms: [
      "Valid for dine-in and takeout",
      "Limited to 3 free rolls per table/order",
      "Cannot be combined with other offers",
      "Not valid on special event days",
      "Substitutions may incur additional charges",
    ],
    validPeriod: "Valid 7 days a week. Expires July 15, 2023.",
    location: "los-angeles",
    address: "456 Ocean Blvd, Los Angeles, CA 90001",
    type: "weekly",
    image: "/placeholder.svg?height=300&width=600",
    popularity: 88,
    date: "2023-05-05",
    isFlashDeal: false,
    expiryDate: "2023-07-15T23:59:59",
    originalPrice: 32.99,
    discountedPrice: 16.49,
    rating: 4.5,
    reviewCount: 187,
    redeemed: 412,
    redemptionInfo: "Show this deal on your phone when ordering",
    restaurantDescription:
      "Sushi Master brings the authentic flavors of Japan to Los Angeles. Our master chefs have trained for years to perfect the art of sushi making, ensuring each piece is a masterpiece.",
    cuisineTypes: ["Japanese", "Sushi", "Asian Fusion"],
  },
  {
    id: "3",
    restaurantName: "Burger Joint",
    title: "Family Meal Deal - 4 Burgers + Sides",
    discount: "30% OFF",
    description: "Family meal with 4 burgers, 4 sides, and 4 drinks. Perfect for a family dinner.",
    fullDescription:
      "Feed the whole family with our Family Meal Deal! This hearty package includes four of our signature handcrafted burgers, each made with 100% Angus beef and topped with fresh ingredients. Accompanied by four sides of your choice and four drinks, this deal provides a complete meal experience at an unbeatable value.",
    included: [
      "Four signature burgers (Classic, Cheese, Bacon, or Veggie)",
      "Four sides (French Fries, Onion Rings, Coleslaw, or Side Salad)",
      "Four drinks (Soft Drinks, Iced Tea, or Lemonade)",
      "Complimentary dipping sauces",
    ],
    terms: [
      "Valid for dine-in, takeout, and delivery",
      "Substitutions allowed with possible upcharge",
      "Cannot be combined with other promotions",
      "Delivery fees not included in deal price",
      "Premium burger options available for additional charge",
    ],
    validPeriod: "Valid every day. Expires August 31, 2023.",
    location: "chicago",
    address: "789 Beef Street, Chicago, IL 60601",
    type: "weekly",
    image: "/placeholder.svg?height=300&width=600",
    popularity: 75,
    date: "2023-05-10",
    isFlashDeal: false,
    expiryDate: "2023-08-31T23:59:59",
    originalPrice: 69.99,
    discountedPrice: 48.99,
    rating: 4.3,
    reviewCount: 156,
    redeemed: 289,
    redemptionInfo: "Valid for online orders with code FAMILY30",
    restaurantDescription:
      "Burger Joint serves up the juiciest, most flavorful burgers in Chicago. We use only premium Angus beef, freshly baked buns, and house-made condiments to create the perfect burger experience.",
    cuisineTypes: ["American", "Burgers", "Comfort Food"],
  },
  {
    id: "4",
    restaurantName: "Taco Fiesta",
    title: "Taco Tuesday - $1 Tacos All Day",
    discount: "$1 TACOS",
    description: "Every Tuesday, enjoy our signature tacos for just $1 each. Minimum order of 3 tacos.",
    fullDescription:
      "Make every Tuesday special with our famous $1 Taco deal! Choose from a variety of authentic Mexican tacos, each prepared with traditional recipes and fresh ingredients. Our corn tortillas are made in-house daily, and filled with your choice of perfectly seasoned meats or vegetarian options, then topped with fresh cilantro, onions, and our signature salsas.",
    included: [
      "Street-style tacos for $1 each (minimum order of 3)",
      "Choice of protein: Carne Asada, Chicken Tinga, Carnitas, or Vegetarian",
      "Traditional toppings included",
      "Handmade corn tortillas",
    ],
    terms: [
      "Valid only on Tuesdays",
      "Minimum order of 3 tacos per person",
      "Valid for dine-in only",
      "Premium toppings and special tacos not included",
      "Limit of 10 tacos per customer",
    ],
    validPeriod: "Every Tuesday from 11:00 AM to 9:00 PM. No expiration date.",
    location: "miami",
    address: "101 Sunshine Ave, Miami, FL 33101",
    type: "weekly",
    image: "/placeholder.svg?height=300&width=600",
    popularity: 92,
    date: "2023-05-15",
    isFlashDeal: true,
    expiryDate: "2023-07-31T23:59:59",
    originalPrice: 3.5,
    discountedPrice: 1,
    rating: 4.6,
    reviewCount: 312,
    redeemed: 1245,
    redemptionInfo: "No coupon needed, just visit on Tuesdays",
    restaurantDescription:
      "Taco Fiesta brings the vibrant flavors of Mexico to Miami. Our recipes have been passed down through generations, ensuring an authentic and delicious experience with every bite.",
    cuisineTypes: ["Mexican", "Tacos", "Latin American"],
  },
  {
    id: "5",
    restaurantName: "Green Garden",
    title: "Vegan Lunch Special with Free Dessert",
    discount: "FREE DESSERT",
    description: "Order any vegan main course and get a complimentary dessert. Available for lunch only.",
    fullDescription:
      "Enjoy a healthy and delicious plant-based lunch at Green Garden and receive a complimentary vegan dessert! Our lunch menu features a variety of innovative vegan dishes made with locally-sourced, organic ingredients. Each main course is thoughtfully prepared to provide a balanced, nutritious, and satisfying meal that even non-vegans will love.",
    included: [
      "Any vegan main course from our lunch menu",
      "Complimentary vegan dessert (Chef's daily selection)",
      "Organic herbal tea or filtered water",
    ],
    terms: [
      "Valid for lunch hours only (11:00 AM to 3:00 PM)",
      "One free dessert per main course ordered",
      "Valid for dine-in and takeout",
      "Cannot be combined with other promotions",
      "Dessert selection based on daily availability",
    ],
    validPeriod: "Monday to Friday, 11:00 AM to 3:00 PM. Expires September 15, 2023.",
    location: "san-francisco",
    address: "202 Organic Lane, San Francisco, CA 94101",
    type: "daily",
    image: "/placeholder.svg?height=300&width=600",
    popularity: 70,
    date: "2023-05-20",
    isFlashDeal: false,
    expiryDate: "2023-09-15T23:59:59",
    originalPrice: 22.99,
    discountedPrice: 22.99,
    rating: 4.8,
    reviewCount: 98,
    redeemed: 176,
    redemptionInfo: "Mention this deal when ordering",
    restaurantDescription:
      "Green Garden is San Francisco's premier vegan restaurant, offering creative plant-based dishes that prove healthy eating can be delicious and satisfying. We source our ingredients from local organic farms.",
    cuisineTypes: ["Vegan", "Organic", "Health Food"],
  },
]
