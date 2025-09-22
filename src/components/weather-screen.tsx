import { ArrowLeft, Cloud, CloudRain, Sun, Wind, Droplets, Thermometer, Eye, MapPin, Calendar, Bell } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Alert, AlertDescription } from "./ui/alert"
import { Badge } from "./ui/badge"

const detailedWeather = [
  { 
    day: "Today", 
    date: "Mar 21",
    icon: <Sun className="h-8 w-8 text-yellow-500" />, 
    temp: "28°C", 
    desc: "Sunny",
    humidity: "65%",
    wind: "12 km/h",
    rain: "0%",
    high: "30°C",
    low: "18°C"
  },
  { 
    day: "Tomorrow", 
    date: "Mar 22",
    icon: <Cloud className="h-8 w-8 text-gray-500" />, 
    temp: "26°C", 
    desc: "Cloudy",
    humidity: "75%",
    wind: "8 km/h",
    rain: "10%",
    high: "28°C",
    low: "16°C"
  },
  { 
    day: "Wednesday", 
    date: "Mar 23",
    icon: <CloudRain className="h-8 w-8 text-blue-500" />, 
    temp: "24°C", 
    desc: "Light Rain",
    humidity: "85%",
    wind: "15 km/h",
    rain: "60%",
    high: "26°C",
    low: "14°C"
  },
  { 
    day: "Thursday", 
    date: "Mar 24",
    icon: <CloudRain className="h-8 w-8 text-blue-500" />, 
    temp: "22°C", 
    desc: "Heavy Rain",
    humidity: "90%",
    wind: "20 km/h",
    rain: "80%",
    high: "24°C",
    low: "12°C"
  },
  { 
    day: "Friday", 
    date: "Mar 25",
    icon: <Cloud className="h-8 w-8 text-gray-500" />, 
    temp: "25°C", 
    desc: "Cloudy",
    humidity: "70%",
    wind: "10 km/h",
    rain: "20%",
    high: "27°C",
    low: "15°C"
  }
]

const farmingTips = [
  "Complete wheat harvesting before heavy rain on Thursday",
  "Apply fungicide to prevent crop diseases due to high humidity",
  "Ensure proper drainage in low-lying fields",
  "Store harvested crops in dry, covered areas",
  "Consider delaying sowing activities until weather clears"
]

interface WeatherScreenProps {
  onBack: () => void
}

export function WeatherScreen({ onBack }: WeatherScreenProps) {
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
            <h1 className="text-2xl">Weather Forecast</h1>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>Ludhiana, Punjab</span>
            </div>
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-2">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            7-Day Forecast
          </Button>
          <Button variant="outline">
            <Bell className="h-4 w-4 mr-2" />
            Set Alerts
          </Button>
        </div>
      </div>

      {/* Main Weather Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Current Weather - Large Card */}
        <Card className="lg:col-span-2">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Current Conditions */}
              <div className="text-center md:text-left">
                <Sun className="h-20 w-20 text-yellow-500 mx-auto md:mx-0 mb-4" />
                <div className="text-4xl mb-2">28°C</div>
                <div className="text-lg text-muted-foreground mb-2">Sunny, Clear Sky</div>
                <div className="text-sm text-blue-600">Feels like 31°C</div>
              </div>
              
              {/* Weather Details */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <Droplets className="h-6 w-6 text-blue-500 mx-auto mb-2" />
                  <div className="text-xs text-muted-foreground">Humidity</div>
                  <div className="text-lg">65%</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <Wind className="h-6 w-6 text-gray-500 mx-auto mb-2" />
                  <div className="text-xs text-muted-foreground">Wind Speed</div>
                  <div className="text-lg">12 km/h</div>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <Eye className="h-6 w-6 text-purple-500 mx-auto mb-2" />
                  <div className="text-xs text-muted-foreground">Visibility</div>
                  <div className="text-lg">10 km</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <Thermometer className="h-6 w-6 text-green-500 mx-auto mb-2" />
                  <div className="text-xs text-muted-foreground">UV Index</div>
                  <div className="text-lg">High</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Weather Alerts */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Weather Alerts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Alert className="border-orange-200 bg-orange-50">
                <CloudRain className="h-4 w-4 text-orange-600" />
                <AlertDescription className="text-orange-800">
                  Heavy rain alert for Thursday - Take protective measures for crops
                </AlertDescription>
              </Alert>
              
              <Alert className="border-blue-200 bg-blue-50">
                <Thermometer className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-blue-800">
                  Temperature drop expected - Monitor sensitive crops
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 5-Day Forecast */}
      <Card>
        <CardHeader>
          <CardTitle>5-Day Detailed Forecast</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {detailedWeather.map((weather, index) => (
              <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                <div className="text-center mb-3">
                  <div className="text-sm font-medium">{weather.day}</div>
                  <div className="text-xs text-muted-foreground">{weather.date}</div>
                </div>
                
                <div className="flex justify-center mb-3">
                  {weather.icon}
                </div>
                
                <div className="text-center mb-3">
                  <div className="text-lg">{weather.temp}</div>
                  <div className="text-xs text-muted-foreground">{weather.desc}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    H:{weather.high} L:{weather.low}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span>💧 Rain:</span>
                    <span>{weather.rain}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>🌬️ Wind:</span>
                    <span>{weather.wind}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>💨 Humidity:</span>
                    <span>{weather.humidity}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Agricultural Advice */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>🌾</span>
            Agricultural Advice Based on Weather
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {farmingTips.map((tip, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
                <span className="text-sm">{tip}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}