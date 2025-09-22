import { X, AlertTriangle, TrendingUp, Cloud, Award } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"

const notifications = [
  {
    id: 1,
    type: "price",
    icon: <TrendingUp className="h-4 w-4 text-green-600" />,
    title: "Price Alert: Wheat",
    message: "Wheat price increased to ₹2,180/quintal (+₹50)",
    time: "5 minutes ago",
    unread: true
  },
  {
    id: 2,
    type: "weather",
    icon: <Cloud className="h-4 w-4 text-blue-600" />,
    title: "Weather Alert",
    message: "Heavy rain expected in 2 days. Protect your crops!",
    time: "1 hour ago",
    unread: true
  },
  {
    id: 3,
    type: "scheme",
    icon: <Award className="h-4 w-4 text-orange-600" />,
    title: "PM-KISAN Reminder",
    message: "Application deadline in 5 days. Apply now to receive ₹6,000",
    time: "2 hours ago",
    unread: true
  },
  {
    id: 4,
    type: "sale",
    icon: <TrendingUp className="h-4 w-4 text-green-600" />,
    title: "Sale Completed",
    message: "Your rice has been sold for ₹14,500. Payment processed.",
    time: "1 day ago",
    unread: false
  }
]

interface NotificationsModalProps {
  open: boolean
  onClose: () => void
}

export function NotificationsModal({ open, onClose }: NotificationsModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Notifications
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
          <DialogDescription>
            View your recent alerts and updates
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-3 rounded-lg border transition-colors cursor-pointer hover:bg-gray-50 ${
                notification.unread ? 'bg-blue-50 border-blue-200' : 'bg-white'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">{notification.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-sm">{notification.title}</h4>
                    {notification.unread && (
                      <Badge variant="secondary" className="text-xs px-1.5 py-0.5">
                        New
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">
                    {notification.message}
                  </p>
                  <span className="text-xs text-muted-foreground">
                    {notification.time}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex gap-2 pt-2">
          <Button variant="outline" className="flex-1" onClick={onClose}>
            Mark All Read
          </Button>
          <Button className="flex-1" onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}