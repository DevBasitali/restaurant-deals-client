import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function RestaurantDeals() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-orange-50 to-white py-20 md:py-28">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-orange-600">
                  Delicious Savings at Your Favorite Restaurants
                </h1>
                <p className="max-w-[600px] text-gray-600 md:text-xl">
                  Discover exclusive deals and discounts at top-rated
                  restaurants in your area. Eat well, spend less.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <div>
    <Button 
      size="lg" 
      className="w-full bg-orange-600 hover:bg-orange-700"
    >
      Explore Deals
    </Button>
  </div>
  <div>
    <Link href="/auth" passHref>
      <Button
        size="lg"
        className="w-full bg-orange-600 hover:bg-orange-700"
        role="button"
      >
        Login
      </Button>
    </Link>
  </div>
</div>
            </div>
            <div className="flex items-center justify-center">
              <Image
                src="/placeholder.svg?height=400&width=600"
                width={600}
                height={400}
                alt="Delicious food spread"
                className="rounded-xl object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Deals Section */}
      <section className="py-16 bg-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900">
              Featured Deals
            </h2>
            <p className="max-w-[700px] text-gray-600 md:text-xl">
              Handpicked offers from the best restaurants in town
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {restaurantDeals.map((deal, index) => (
              <Card
                key={index}
                className="overflow-hidden transition-all duration-200 hover:shadow-lg"
              >
                <div className="relative h-48">
                  <Image
                    src={deal.image || "/placeholder.svg"}
                    alt={deal.restaurantName}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-orange-600 text-white px-3 py-1 rounded-full font-bold">
                    {deal.discount}
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <h3 className="text-xl font-bold">{deal.restaurantName}</h3>
                </CardHeader>
                <CardContent className="pb-4">
                  <p className="text-gray-600">{deal.dealTitle}</p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-gray-900 hover:bg-gray-800">
                    View Deal
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-orange-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-gray-900">
              What Our Users Say
            </h2>
            <p className="max-w-[700px] text-gray-600 md:text-xl">
              Join thousands of satisfied diners saving on their favorite meals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="flex justify-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 fill-orange-400 text-orange-400"
                      />
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 italic mb-4">
                    "{testimonial.comment}"
                  </p>
                  <p className="font-semibold">{testimonial.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">DealDish</h3>
              <p className="text-gray-400">
                Connecting food lovers with amazing restaurant deals since 2023.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    How It Works
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    For Restaurants
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Subscribe</h3>
              <p className="text-gray-400 mb-4">
                Get the latest deals delivered to your inbox.
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-4 py-2 rounded-l-md w-full focus:outline-none text-gray-900"
                />
                <Button className="rounded-l-none bg-orange-600 hover:bg-orange-700">
                  Join
                </Button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} DealDish. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Sample data
const restaurantDeals = [
  {
    restaurantName: "Bella Italia",
    dealTitle: "50% Off Pizza & Pasta Combo",
    discount: "50% OFF",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    restaurantName: "Sushi Master",
    dealTitle: "Buy One Get One Free Rolls",
    discount: "BOGO",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    restaurantName: "Burger Joint",
    dealTitle: "Family Meal Deal - 4 Burgers + Sides",
    discount: "30% OFF",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    restaurantName: "Taco Fiesta",
    dealTitle: "Taco Tuesday - $1 Tacos All Day",
    discount: "$1 TACOS",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    restaurantName: "Green Garden",
    dealTitle: "Vegan Lunch Special with Free Dessert",
    discount: "FREE DESSERT",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    restaurantName: "Steakhouse Prime",
    dealTitle: "Date Night: 2 Steaks + Wine Bottle",
    discount: "25% OFF",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    restaurantName: "Noodle House",
    dealTitle: "Ramen & Appetizer Combo",
    discount: "20% OFF",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    restaurantName: "Sweet Tooth",
    dealTitle: "Dessert Platter for 4 People",
    discount: "15% OFF",
    image: "/placeholder.svg?height=200&width=300",
  },
];

const testimonials = [
  {
    name: "Sarah Johnson",
    comment:
      "I saved over $50 on our family dinner last weekend. The deals are amazing and so easy to use!",
  },
  {
    name: "Michael Chen",
    comment:
      "DealDish has completely changed how I dine out. I've discovered so many new restaurants through their deals.",
  },
  {
    name: "Jessica Williams",
    comment:
      "The BOGO sushi deal was incredible! We got to try so many different rolls for half the price.",
  },
];
