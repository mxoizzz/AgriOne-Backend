import { Bell, User } from "lucide-react"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"

interface HomeHeaderProps {
  onProfileClick: () => void
  onNotificationClick: () => void
}

export function HomeHeader({ onProfileClick, onNotificationClick }: HomeHeaderProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-green-600 text-white">
      <div>
        <h1 className="text-lg">Welcome, Raju</h1>
        <p className="text-sm text-green-100">Have a great farming day!</p>
      </div>
      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-white hover:bg-green-500 relative"
          onClick={onNotificationClick}
        >
          <Bell className="h-5 w-5" />
          <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 bg-red-500 hover:bg-red-500">
            3
          </Badge>
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-white hover:bg-green-500"
          onClick={onProfileClick}
        >
          <User className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}