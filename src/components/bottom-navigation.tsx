import { Home, ShoppingCart, Cloud, User, BookOpen } from "lucide-react"

const navItems = [
  { id: "home", icon: <Home className="h-5 w-5" />, label: "Home" },
  { id: "marketplace", icon: <ShoppingCart className="h-5 w-5" />, label: "Market" },
  { id: "weather", icon: <Cloud className="h-5 w-5" />, label: "Weather" },
  { id: "learning", icon: <BookOpen className="h-5 w-5" />, label: "Learn" },
  { id: "profile", icon: <User className="h-5 w-5" />, label: "Profile" }
]

interface BottomNavigationProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
      <div className="flex items-center justify-around">
        {navItems.map((item, index) => (
          <button
            key={index}
            onClick={() => onTabChange(item.id)}
            className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
              activeTab === item.id 
                ? "text-green-600 bg-green-50" 
                : "text-gray-600 hover:text-green-600 hover:bg-green-50"
            }`}
          >
            {item.icon}
            <span className="text-xs mt-1">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}