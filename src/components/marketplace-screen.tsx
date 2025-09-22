import { TrendingDown, TrendingUp, Search, Filter, ArrowLeft, BarChart3, Users, DollarSign, Package } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Input } from "./ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { useState } from "react"
import { toast } from "sonner@2.0.3"

const allCrops = [
  { name: "Wheat", localPrice: 2130, agriOnePrice: 2180, trend: "up" as const, change: 50, stock: "500 kg", demand: "High", buyers: 12 },
  { name: "Rice", localPrice: 2850, agriOnePrice: 2900, trend: "up" as const, change: 50, stock: "300 kg", demand: "Medium", buyers: 8 },
  { name: "Corn", localPrice: 1820, agriOnePrice: 1850, trend: "down" as const, change: -30, stock: "200 kg", demand: "Low", buyers: 3 },
  { name: "Cotton", localPrice: 6200, agriOnePrice: 6350, trend: "up" as const, change: 150, stock: "100 kg", demand: "High", buyers: 15 },
  { name: "Soybeans", localPrice: 4100, agriOnePrice: 4180, trend: "up" as const, change: 80, stock: "150 kg", demand: "Medium", buyers: 6 },
  { name: "Sugarcane", localPrice: 350, agriOnePrice: 380, trend: "up" as const, change: 30, stock: "1000 kg", demand: "High", buyers: 20 }
]

interface MarketplaceScreenProps {
  onBack: () => void
}

export function MarketplaceScreen({ onBack }: MarketplaceScreenProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [selling, setSelling] = useState<string | null>(null)

  const filteredCrops = allCrops.filter(crop => {
    const matchesSearch = crop.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterType === "all" || 
      (filterType === "high-demand" && crop.demand === "High") ||
      (filterType === "trending-up" && crop.trend === "up")
    return matchesSearch && matchesFilter
  })

  const handleSell = (cropName: string, price: number) => {
    setSelling(cropName)
    setTimeout(() => {
      setSelling(null)
      toast.success(`${cropName} listed for sale at ₹${price}/quintal! Buyers will contact you soon.`)
    }, 2000)
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={onBack}
            className="lg:hidden"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl">Marketplace</h1>
            <p className="text-muted-foreground">Manage your crop listings and sales</p>
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-2">
          <Button variant="outline">
            <BarChart3 className="h-4 w-4 mr-2" />
            Analytics
          </Button>
          <Button className="bg-green-600 hover:bg-green-700">
            + Add New Listing
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Earnings</p>
                <p className="text-2xl">₹12.8L</p>
                <p className="text-xs text-green-600">+12% this month</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Listings</p>
                <p className="text-2xl">6</p>
                <p className="text-xs text-blue-600">2 sold today</p>
              </div>
              <Package className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Interested Buyers</p>
                <p className="text-2xl">64</p>
                <p className="text-xs text-purple-600">8 new inquiries</p>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg. Price Gain</p>
                <p className="text-2xl">+₹87</p>
                <p className="text-xs text-green-600">vs local market</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search crops..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Crops</SelectItem>
                <SelectItem value="high-demand">High Demand</SelectItem>
                <SelectItem value="trending-up">Trending Up</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Crop Listings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredCrops.map((crop, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-green-600 text-lg">🌾</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg">{crop.name}</h3>
                      {crop.trend === "up" ? (
                        <TrendingUp className="h-4 w-4 text-green-600" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-600" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">Stock: {crop.stock}</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-xl">₹{crop.agriOnePrice}</div>
                  <div className="text-sm text-muted-foreground">/quintal</div>
                  <Badge 
                    variant={crop.trend === "up" ? "default" : "destructive"}
                    className="text-xs"
                  >
                    {crop.change > 0 ? "+" : ""}₹{crop.change}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <div className="text-sm text-muted-foreground">Demand</div>
                  <Badge variant="outline" className={`text-xs ${
                    crop.demand === "High" ? "border-green-500 text-green-700" :
                    crop.demand === "Medium" ? "border-yellow-500 text-yellow-700" :
                    "border-gray-500 text-gray-700"
                  }`}>
                    {crop.demand}
                  </Badge>
                </div>
                <div className="text-center">
                  <div className="text-sm text-muted-foreground">Buyers</div>
                  <div className="text-sm">{crop.buyers}</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-muted-foreground">Local Price</div>
                  <div className="text-sm">₹{crop.localPrice}</div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  className="flex-1 bg-green-600 hover:bg-green-700"
                  onClick={() => handleSell(crop.name, crop.agriOnePrice)}
                  disabled={selling === crop.name}
                >
                  {selling === crop.name ? "Listing..." : "Sell Now"}
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="flex-1"
                >
                  Set Price Alert
                </Button>
              </div>

              <div className="mt-3 text-xs text-muted-foreground">
                Advantage over local market: +₹{crop.agriOnePrice - crop.localPrice} per quintal
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}