import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export function DealsList() {
  return (
    <div className="space-y-8">
      {deals.map((deal) => (
        <div key={deal.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={`/placeholder.svg?height=36&width=36`} alt="Deal" />
            <AvatarFallback>D</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{deal.title}</p>
            <p className="text-sm text-muted-foreground">
              {deal.redemptions} redemptions • {deal.views} views
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

const deals = [
  {
    id: "1",
    title: "50% Off Pizza & Pasta Combo",
    redemptions: 245,
    views: 1203,
    status: "Active",
  },
  {
    id: "2",
    title: "Buy One Get One Free Appetizers",
    redemptions: 189,
    views: 876,
    status: "Active",
  },
  {
    id: "3",
    title: "Free Dessert with Any Entree",
    redemptions: 92,
    views: 543,
    status: "Active",
  },
  {
    id: "4",
    title: "Happy Hour: $5 Cocktails",
    redemptions: 47,
    views: 321,
    status: "Scheduled",
  },
  {
    id: "5",
    title: "Family Meal Deal: 4 Entrees for $50",
    redemptions: 0,
    views: 0,
    status: "Draft",
  },
]
