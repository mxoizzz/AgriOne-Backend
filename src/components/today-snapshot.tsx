import { AlertTriangle, Cloud, Droplets, Sun, TrendingUp, Warehouse, DollarSign, Users, BarChart3 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"

interface TodaySnapshotProps {
  onWeatherClick: () => void
  onStorageClick: () => void
  onAlertClick: () => void
}

export function TodaySnapshot({ onWeatherClick, onStorageClick, onAlertClick }: TodaySnapshotProps) {
  return (
    <div className="space-y-6">
      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Today's Earnings</p>
                <p className="text-2xl">₹24,750</p>
                <p className="text-xs text-green-600">+12% from yesterday</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Buyers</p>
                <p className="text-2xl">47</p>
                <p className="text-xs text-blue-600">8 new inquiries</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Crops Listed</p>
                <p className="text-2xl">6</p>
                <p className="text-xs text-purple-600">2 sold today</p>
              </div>
              <BarChart3 className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card 
          className="cursor-pointer hover:shadow-md transition-shadow"
          onClick={onWeatherClick}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Weather</p>
                <p className="text-2xl">28°C</p>
                <p className="text-xs text-yellow-600">Sunny, Clear</p>
              </div>
              <Sun className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Today's Overview */}
      <Card className="border-l-4 border-l-yellow-500">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Sun className="h-5 w-5 text-yellow-500" />
            Today's Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Weather */}
            <div 
              className="flex items-center justify-between p-3 bg-blue-50 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors"
              onClick={onWeatherClick}
            >
              <div className="flex items-center gap-2">
                <Sun className="h-4 w-4 text-blue-600" />
                <span className="text-sm">Weather Forecast</span>
              </div>
              <div className="text-right">
                <div className="text-sm">Sunny, 28°C</div>
                <div className="text-xs text-muted-foreground">Rain in 2 days</div>
              </div>
            </div>

            {/* Mandi Prices */}
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span className="text-sm">Best Price Today</span>
              </div>
              <div className="text-right">
                <div className="text-sm flex items-center gap-1">
                  ₹2,180/quintal
                  <TrendingUp className="h-3 w-3 text-green-600" />
                </div>
                <Badge variant="secondary" className="text-xs">Wheat +₹50</Badge>
              </div>
            </div>

            {/* Storage */}
            <div 
              className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg cursor-pointer hover:bg-yellow-100 transition-colors"
              onClick={onStorageClick}
            >
              <div className="flex items-center gap-2">
                <Warehouse className="h-4 w-4 text-yellow-600" />
                <span className="text-sm">Storage Status</span>
              </div>
              <div className="text-right">
                <div className="text-sm">1.75T Total</div>
                <div className="text-xs text-muted-foreground">85% capacity</div>
              </div>
            </div>
          </div>

          {/* Alert */}
          <div 
            className="flex items-center gap-2 p-3 bg-orange-50 rounded-lg border border-orange-200 cursor-pointer hover:bg-orange-100 transition-colors mt-4"
            onClick={onAlertClick}
          >
            <AlertTriangle className="h-4 w-4 text-orange-600" />
            <span className="text-sm flex-1">PM-KISAN scheme deadline: 5 days remaining</span>
            <Badge variant="outline" className="text-orange-600 border-orange-300">
              Action Required
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}