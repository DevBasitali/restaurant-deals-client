import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export function RecentDeals() {
  return (
    <div className="space-y-8">
      {recentDeals.map((deal) => (
        <div key={deal.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={`/placeholder.svg?height=36&width=36`} alt="Deal" />
            <AvatarFallback>D</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{deal.title}</p>
            <p className="text-sm text-muted-foreground">
              {deal.restaurant} • {deal.discount}
            </p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Badge variant={deal.status === "Active" ? "default" : "secondary"}>{deal.status}</Badge>
          </div>
        </div>
      ))}
    </div>
  )
}

const recentDeals = [
  {
    id: "1",
    title: "50% Off Pizza & Pasta Combo",
    restaurant: "Bella Italia",
    discount: "50% OFF",
    status: "Active",
  },
  {
    id: "2",
    title: "Buy One Get One Free Appetizers",
    restaurant: "Sushi Master",
    discount: "BOGO",
    status: "Active",
  },
  {
    id: "3",
    title: "Free Dessert with Any Entree",
    restaurant: "Green Garden",
    discount: "FREE DESSERT",
    status: "Active",
  },
  {
    id: "4",
    title: "Happy Hour: $5 Cocktails",
    restaurant: "Taco Fiesta",
    discount: "$5 DRINKS",
    status: "Scheduled",
  },
  {
    id: "5",
    title: "Family Meal Deal: 4 Entrees for $50",
    restaurant: "Burger Joint",
    discount: "30% OFF",
    status: "Draft",
  },
]
