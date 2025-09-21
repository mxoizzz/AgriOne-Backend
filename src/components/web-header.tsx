import { Bell, Search, User, Menu } from "lucide-react"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Input } from "./ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

interface WebHeaderProps {
  onProfileClick: () => void
  onNotificationClick: () => void
  currentScreen: string
}

const screenTitles = {
  home: "Dashboard",
  marketplace: "Marketplace",
  weather: "Weather Forecast",
  profile: "Profile",
  learning: "Learning Center",
  inputs: "Farm Inputs",
  storage: "Storage Management",
  guidance: "Crop Guidance",
  schemes: "Government Schemes"
}

export function WebHeader({ onProfileClick, onNotificationClick, currentScreen }: WebHeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl text-gray-900">
            {screenTitles[currentScreen as keyof typeof screenTitles] || "AgriOne"}
          </h1>
        </div>
        
        {/* Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search crops, prices, weather..."
              className="pl-10 bg-gray-50 border-gray-200"
            />
          </div>
        </div>
        
        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Mobile Search */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden text-gray-600 hover:text-gray-900"
          >
            <Search className="h-5 w-5" />
          </Button>
          
          {/* Notifications */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-gray-600 hover:text-gray-900 relative"
            onClick={onNotificationClick}
          >
            <Bell className="h-5 w-5" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 bg-red-500 hover:bg-red-500 text-xs">
              3
            </Badge>
          </Button>
          
          {/* Weather Widget */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-2 bg-blue-50 rounded-lg">
            <div className="text-blue-600">☀️</div>
            <div className="text-sm">
              <div className="text-blue-900">28°C</div>
              <div className="text-blue-600 text-xs">Sunny</div>
            </div>
          </div>
          
          {/* User Profile */}
          <Button 
            variant="ghost" 
            className="flex items-center gap-2 hover:bg-gray-100"
            onClick={onProfileClick}
          >
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder-avatar.jpg" />
              <AvatarFallback className="bg-green-100 text-green-600">RK</AvatarFallback>
            </Avatar>
            <div className="hidden md:block text-left">
              <div className="text-sm text-gray-900">Raju Kumar</div>
              <div className="text-xs text-gray-500">Farmer</div>
            </div>
          </Button>
        </div>
      </div>
    </header>
  )
}