import { 
  Home, 
  ShoppingCart, 
  Cloud, 
  User, 
  BookOpen,
  Package, 
  Warehouse, 
  Brain, 
  Award,
  ChevronLeft,
  ChevronRight
} from "lucide-react"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"

const navItems = [
  { id: "home", icon: <Home className="h-5 w-5" />, label: "Dashboard" },
  { id: "marketplace", icon: <ShoppingCart className="h-5 w-5" />, label: "Marketplace", badge: "Hot" },
  { id: "weather", icon: <Cloud className="h-5 w-5" />, label: "Weather" },
  { id: "inputs", icon: <Package className="h-5 w-5" />, label: "Farm Inputs" },
  { id: "storage", icon: <Warehouse className="h-5 w-5" />, label: "Storage" },
  { id: "guidance", icon: <Brain className="h-5 w-5" />, label: "Crop Guidance" },
  { id: "schemes", icon: <Award className="h-5 w-5" />, label: "Gov Schemes", badge: "5 New" },
  { id: "learning", icon: <BookOpen className="h-5 w-5" />, label: "Learning" },
  { id: "profile", icon: <User className="h-5 w-5" />, label: "Profile" }
]

interface WebSidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
  collapsed: boolean
  onToggleCollapse: () => void
}

export function WebSidebar({ activeTab, onTabChange, collapsed, onToggleCollapse }: WebSidebarProps) {
  return (
    <div className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 transition-all duration-300 z-50 ${
      collapsed ? 'w-16' : 'w-64'
    }`}>
      {/* Logo */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm">🌾</span>
              </div>
              <span className="text-xl text-gray-900">AgriOne</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleCollapse}
            className="text-gray-600 hover:text-gray-900"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Welcome Message */}
      {!collapsed && (
        <div className="p-4 bg-green-50 border-b border-gray-200">
          <div className="text-sm text-green-800">Welcome back,</div>
          <div className="text-green-900">Raju Kumar</div>
          <div className="text-xs text-green-600 mt-1">Have a great farming day!</div>
        </div>
      )}

      {/* Navigation */}
      <nav className="p-2 space-y-1">
        {navItems.map((item) => (
          <Button
            key={item.id}
            variant={activeTab === item.id ? "default" : "ghost"}
            className={`w-full justify-start ${collapsed ? 'px-2' : 'px-3'} ${
              activeTab === item.id 
                ? "bg-green-600 text-white hover:bg-green-700" 
                : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
            }`}
            onClick={() => onTabChange(item.id)}
          >
            <div className="flex items-center gap-3 w-full">
              {item.icon}
              {!collapsed && (
                <>
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.badge && (
                    <Badge 
                      variant="secondary" 
                      className={`text-xs ${
                        activeTab === item.id ? "bg-green-500 text-white" : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {item.badge}
                    </Badge>
                  )}
                </>
              )}
            </div>
          </Button>
        ))}
      </nav>

      {/* Quick Stats */}
      {!collapsed && (
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-green-50 rounded-lg p-3 border border-green-200">
            <div className="text-xs text-green-600 mb-1">Today's Earnings</div>
            <div className="text-lg text-green-800">₹24,750</div>
            <div className="text-xs text-green-600">+12% from yesterday</div>
          </div>
        </div>
      )}
    </div>
  )
}