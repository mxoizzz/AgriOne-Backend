import { TrendingDown, TrendingUp, ShoppingCart, BarChart3 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { useState } from "react"
import { toast } from "sonner@2.0.3"

const cropPrices = [
  { 
    name: "Wheat", 
    localPrice: 2130, 
    agriOnePrice: 2180, 
    trend: "up" as const,
    change: 50,
    stock: "500 kg",
    demand: "High"
  },
  { 
    name: "Rice", 
    localPrice: 2850, 
    agriOnePrice: 2900, 
    trend: "up" as const,
    change: 50,
    stock: "300 kg",
    demand: "Medium"
  },
  { 
    name: "Corn", 
    localPrice: 1820, 
    agriOnePrice: 1850, 
    trend: "down" as const,
    change: -30,
    stock: "200 kg",
    demand: "Low"
  }
]

interface MarketplacePreviewProps {
  onViewAll: () => void
}

export function MarketplacePreview({ onViewAll }: MarketplacePreviewProps) {
  const [selling, setSelling] = useState<string | null>(null)

  const handleSell = (cropName: string) => {
    setSelling(cropName)
    setTimeout(() => {
      setSelling(null)
      toast.success(`${cropName} selling process initiated! You'll receive payment in 24 hours.`)
    }, 2000)
  }

  const handleInstantSell = () => {
    toast.success("Instant payment option activated! Choose your crop to sell.")
    onViewAll()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 text-green-600" />
            <span>Marketplace Prices</span>
          </div>
          <Button variant="outline" size="sm" onClick={onViewAll}>
            <BarChart3 className="h-4 w-4 mr-2" />
            View All
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 p-3 bg-green-50 rounded-lg">
          <div className="text-center">
            <div className="text-lg text-green-600">₹2,180</div>
            <div className="text-xs text-green-700">Best Price</div>
          </div>
          <div className="text-center">
            <div className="text-lg text-blue-600">47</div>
            <div className="text-xs text-blue-700">Active Buyers</div>
          </div>
          <div className="text-center">
            <div className="text-lg text-purple-600">1.0T</div>
            <div className="text-xs text-purple-700">Listed Today</div>
          </div>
        </div>

        {/* Crop Listings */}
        <div className="space-y-3">
          {cropPrices.map((crop, index) => (
            <div key={index} className="p-3 border rounded-lg hover:shadow-sm transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm">{crop.name}</span>
                  {crop.trend === "up" ? (
                    <TrendingUp className="h-4 w-4 text-green-600" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-600" />
                  )}
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${
                      crop.demand === "High" ? "border-green-300 text-green-700" :
                      crop.demand === "Medium" ? "border-yellow-300 text-yellow-700" :
                      "border-gray-300 text-gray-700"
                    }`}
                  >
                    {crop.demand} Demand
                  </Badge>
                </div>
                
                <div className="text-right">
                  <div className="text-sm">₹{crop.agriOnePrice}/quintal</div>
                  <Badge 
                    variant={crop.trend === "up" ? "default" : "destructive"}
                    className="text-xs"
                  >
                    {crop.change > 0 ? "+" : ""}₹{crop.change}
                  </Badge>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="text-xs text-muted-foreground">
                  Your stock: {crop.stock} • Local: ₹{crop.localPrice}/quintal
                </div>
                
                <Button 
                  size="sm" 
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => handleSell(crop.name)}
                  disabled={selling === crop.name}
                >
                  {selling === crop.name ? "Listing..." : "Sell Now"}
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-2 gap-3 pt-2">
          <Button 
            variant="outline"
            onClick={onViewAll}
          >
            View Market Trends
          </Button>
          <Button 
            className="bg-green-600 hover:bg-green-700"
            onClick={handleInstantSell}
          >
            Instant Payment
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}