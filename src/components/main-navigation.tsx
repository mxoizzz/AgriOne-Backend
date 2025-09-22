import { 
  ShoppingCart, 
  Package, 
  Cloud, 
  Warehouse, 
  Brain, 
  Award, 
  BookOpen,
  ChevronRight,
  TrendingUp
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"

interface NavItem {
  id: string
  icon: React.ReactNode
  label: string
  description: string
  color: string
  bgColor: string
  stats?: string
  badge?: string
}

const navItems: NavItem[] = [
  {
    id: "marketplace",
    icon: <ShoppingCart className="h-6 w-6" />,
    label: "Marketplace",
    description: "Sell your crops at best prices",
    color: "text-green-600",
    bgColor: "bg-green-100",
    stats: "6 Active Listings",
    badge: "Hot"
  },
  {
    id: "inputs",
    icon: <Package className="h-6 w-6" />,
    label: "Farm Inputs",
    description: "Seeds, fertilizer, pesticides",
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    stats: "30% Bulk Discount"
  },
  {
    id: "weather",
    icon: <Cloud className="h-6 w-6" />,
    label: "Weather",
    description: "7-day detailed forecast",
    color: "text-sky-600",
    bgColor: "bg-sky-100",
    stats: "Rain Alert Active"
  },
  {
    id: "storage",
    icon: <Warehouse className="h-6 w-6" />,
    label: "Storage",
    description: "Smart crop storage",
    color: "text-yellow-600",
    bgColor: "bg-yellow-100",
    stats: "1.75T Stored"
  },
  {
    id: "guidance",
    icon: <Brain className="h-6 w-6" />,
    label: "AI Guidance",
    description: "Pest & disease solutions",
    color: "text-purple-600",
    bgColor: "bg-purple-100",
    stats: "95% Accuracy"
  },
  {
    id: "schemes",
    icon: <Award className="h-6 w-6" />,
    label: "Gov Schemes",
    description: "Government benefits",
    color: "text-orange-600",
    bgColor: "bg-orange-100",
    stats: "₹6,000 Available",
    badge: "5 New"
  }
]

interface MainNavigationProps {
  onNavigate: (section: string) => void
}

export function MainNavigation({ onNavigate }: MainNavigationProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-green-600" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {navItems.map((item, index) => (
            <div
              key={index} 
              className="p-4 border rounded-lg cursor-pointer hover:shadow-md hover:border-gray-300 transition-all group"
              onClick={() => onNavigate(item.id)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`p-2 rounded-lg ${item.bgColor} group-hover:scale-105 transition-transform`}>
                  <div className={item.color}>
                    {item.icon}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {item.badge && (
                    <Badge variant="secondary" className="text-xs">
                      {item.badge}
                    </Badge>
                  )}
                  <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-gray-700 transition-colors" />
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-sm">{item.label}</div>
                <div className="text-xs text-muted-foreground">{item.description}</div>
                {item.stats && (
                  <div className="text-xs text-blue-600 mt-2">
                    {item.stats}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}