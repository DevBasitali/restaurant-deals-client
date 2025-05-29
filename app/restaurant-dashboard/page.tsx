import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, Package, Tag, Users } from "lucide-react"
import { DashboardShell } from "@/components/dashboard-shell"
import { DealsList } from "@/components/deals-list"
import { Button } from "react-day-picker"

export default function DashboardPage() {
  return (
    <DashboardShell>
      <div className="flex flex-col gap-5">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, <span className="font-medium">Bella Italia</span>. Here's an overview of your restaurant's
          performance.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Deals</CardTitle>
            <Tag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Bids</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">+1 from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Customer Redemptions</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">573</div>
            <p className="text-xs text-muted-foreground">+18% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Subscription Status</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Premium</div>
            <p className="text-xs text-muted-foreground">Renews in 24 days</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Deals</CardTitle>
            <CardDescription>Your most recent deals and their performance</CardDescription>
          </CardHeader>
          <CardContent>
            <DealsList />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Top Performing Deals</CardTitle>
            <CardDescription>Your best deals by customer redemption</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {topDeals.map((deal, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-2 h-16 bg-primary rounded-full mr-4" style={{ opacity: 1 - index * 0.2 }} />
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">{deal.title}</p>
                    <p className="text-sm text-muted-foreground">{deal.redemptions} redemptions</p>
                  </div>
                  <div className="ml-auto font-medium">{deal.percentage}%</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        {/* <Button 
        // variant="destructive" 
        // onClick={handleLogout}
        >
          Logout
        </Button> */}
      </div>
    </DashboardShell>
  )
}

const topDeals = [
  {
    title: "50% Off Pizza & Pasta Combo",
    redemptions: 245,
    percentage: 42,
  },
  {
    title: "Buy One Get One Free Appetizers",
    redemptions: 189,
    percentage: 33,
  },
  {
    title: "Free Dessert with Any Entree",
    redemptions: 92,
    percentage: 16,
  },
  {
    title: "Happy Hour: $5 Cocktails",
    redemptions: 47,
    percentage: 9,
  },
]
