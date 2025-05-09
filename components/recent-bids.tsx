import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export function RecentBids() {
  return (
    <div className="space-y-8">
      {recentBids.map((bid) => (
        <div key={bid.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={`/placeholder.svg?height=36&width=36`} alt="Restaurant" />
            <AvatarFallback>{bid.restaurant.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{bid.restaurant}</p>
            <p className="text-sm text-muted-foreground">
              ${bid.amount} • {bid.position} position
            </p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Badge variant={getBadgeVariant(bid.status)}>{bid.status}</Badge>
          </div>
        </div>
      ))}
    </div>
  )
}

function getBadgeVariant(status: string) {
  switch (status) {
    case "Approved":
      return "default"
    case "Pending":
      return "secondary"
    case "Rejected":
      return "destructive"
    default:
      return "outline"
  }
}

const recentBids = [
  {
    id: "1",
    restaurant: "Bella Italia",
    amount: "250",
    position: "Featured",
    status: "Approved",
  },
  {
    id: "2",
    restaurant: "Sushi Master",
    amount: "180",
    position: "Top",
    status: "Pending",
  },
  {
    id: "3",
    restaurant: "Burger Joint",
    amount: "120",
    position: "Featured",
    status: "Approved",
  },
  {
    id: "4",
    restaurant: "Taco Fiesta",
    amount: "90",
    position: "Standard",
    status: "Pending",
  },
  {
    id: "5",
    restaurant: "Green Garden",
    amount: "75",
    position: "Standard",
    status: "Rejected",
  },
]
