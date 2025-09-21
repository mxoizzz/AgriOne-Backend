import { ArrowLeft, User, MapPin, Phone, Mail, Edit, Settings, HelpCircle, LogOut, Wallet, Award, Calendar, Star, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"
import { Separator } from "./ui/separator"
import { toast } from "sonner@2.0.3"

const profileStats = [
  { label: "Total Sales", value: "₹12.8L", icon: <Wallet className="h-6 w-6" />, change: "+12%", color: "text-green-600" },
  { label: "Crops Sold", value: "1.75T", icon: <Award className="h-6 w-6" />, change: "+25 this month", color: "text-blue-600" },
  { label: "Active Listings", value: "6", icon: <Edit className="h-6 w-6" />, change: "2 sold today", color: "text-purple-600" },
  { label: "Rating", value: "4.8", icon: <Star className="h-6 w-6" />, change: "47 reviews", color: "text-yellow-600" }
]

const menuItems = [
  { icon: <Edit className="h-5 w-5" />, label: "Edit Profile", action: "edit", description: "Update your personal information" },
  { icon: <Wallet className="h-5 w-5" />, label: "Payment History", action: "payments", description: "View all transactions" },
  { icon: <Settings className="h-5 w-5" />, label: "Settings", action: "settings", description: "App preferences and notifications" },
  { icon: <HelpCircle className="h-5 w-5" />, label: "Help & Support", action: "help", description: "Get help and contact support" },
  { icon: <LogOut className="h-5 w-5" />, label: "Logout", action: "logout", description: "Sign out of your account", danger: true }
]

const recentActivity = [
  { type: "sale", title: "Wheat sold", description: "500 kg at ₹2,180/quintal", amount: "+₹10,900", color: "bg-green-50 text-green-600" },
  { type: "purchase", title: "Seeds purchased", description: "High yield wheat variety", amount: "-₹2,500", color: "bg-blue-50 text-blue-600" },
  { type: "storage", title: "Storage updated", description: "Added 300 kg rice", amount: "Updated", color: "bg-yellow-50 text-yellow-600" },
  { type: "review", title: "Review received", description: "5-star rating from buyer", amount: "★★★★★", color: "bg-purple-50 text-purple-600" }
]

interface ProfileScreenProps {
  onBack: () => void
}

export function ProfileScreen({ onBack }: ProfileScreenProps) {
  const handleMenuClick = (action: string) => {
    switch (action) {
      case "edit":
        toast.info("Profile editing feature coming soon!")
        break
      case "payments":
        toast.info("Payment history will be displayed here")
        break
      case "settings":
        toast.info("Settings panel opening...")
        break
      case "help":
        toast.info("Help center opening...")
        break
      case "logout":
        toast.success("Logged out successfully!")
        break
      default:
        break
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
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
            <h1 className="text-2xl">Profile</h1>
            <p className="text-muted-foreground">Manage your account and preferences</p>
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-2">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Activity Report
          </Button>
          <Button className="bg-green-600 hover:bg-green-700">
            <Edit className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
        </div>
      </div>

      {/* Profile Info & Stats Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="lg:col-span-1">
          <CardContent className="p-6">
            <div className="text-center mb-6">
              <Avatar className="h-24 w-24 mx-auto mb-4">
                <AvatarImage src="/placeholder-avatar.jpg" />
                <AvatarFallback className="bg-green-100 text-green-600 text-2xl">RK</AvatarFallback>
              </Avatar>
              <h2 className="text-xl mb-1">Raju Kumar</h2>
              <p className="text-muted-foreground mb-2">Farmer</p>
              <div className="flex items-center justify-center gap-2">
                <Badge variant="secondary">Verified</Badge>
                <Badge variant="outline" className="text-green-600 border-green-300">
                  Premium Member
                </Badge>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>Village Khanpur, Ludhiana, Punjab</span>
              </div>
              <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>raju.kumar@email.com</span>
              </div>
            </div>

            <Button className="w-full mt-6" variant="outline">
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                Your Statistics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {profileStats.map((stat, index) => (
                  <div key={index} className="text-center p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className={`flex justify-center mb-3 ${stat.color}`}>
                      {stat.icon}
                    </div>
                    <div className="text-2xl mb-1">{stat.value}</div>
                    <div className="text-xs text-muted-foreground mb-1">{stat.label}</div>
                    <div className="text-xs text-blue-600">{stat.change}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div key={index} className={`flex items-center justify-between p-3 rounded-lg ${activity.color.split(' ')[0]}`}>
                    <div>
                      <div className="text-sm">{activity.title}</div>
                      <div className="text-xs text-muted-foreground">{activity.description}</div>
                    </div>
                    <div className={`text-sm ${activity.color.split(' ').slice(1).join(' ')}`}>
                      {activity.amount}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Menu Options */}
      <Card>
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {menuItems.map((item, index) => (
            <div key={index}>
              <button
                onClick={() => handleMenuClick(item.action)}
                className={`w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors ${
                  item.danger ? 'text-red-600' : ''
                }`}
              >
                <div className={`p-2 rounded-lg ${
                  item.danger ? 'bg-red-50' : 'bg-gray-100'
                }`}>
                  {item.icon}
                </div>
                <div className="flex-1 text-left">
                  <div className="text-sm">{item.label}</div>
                  <div className="text-xs text-muted-foreground">{item.description}</div>
                </div>
                <div className="text-gray-400">
                  →
                </div>
              </button>
              {index < menuItems.length - 1 && <Separator />}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}