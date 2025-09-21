import { Cloud, CloudRain, Sun, AlertTriangle, Droplets, Wind, Eye } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Alert, AlertDescription } from "./ui/alert"
import { Badge } from "./ui/badge"

const weatherData = [
  { 
    day: "Today", 
    date: "Mar 21",
    icon: <Sun className="h-8 w-8 text-yellow-500" />, 
    temp: "28°C", 
    desc: "Sunny",
    humidity: "65%",
    wind: "12 km/h",
    rain: "0%"
  },
  { 
    day: "Tomorrow", 
    date: "Mar 22",
    icon: <Cloud className="h-8 w-8 text-gray-500" />, 
    temp: "26°C", 
    desc: "Cloudy",
    humidity: "75%",
    wind: "8 km/h",
    rain: "10%"
  },
  { 
    day: "Wed", 
    date: "Mar 23",
    icon: <CloudRain className="h-8 w-8 text-blue-500" />, 
    temp: "24°C", 
    desc: "Light Rain",
    humidity: "85%",
    wind: "15 km/h",
    rain: "60%"
  },
  { 
    day: "Thu", 
    date: "Mar 24",
    icon: <CloudRain className="h-8 w-8 text-blue-500" />, 
    temp: "22°C", 
    desc: "Heavy Rain",
    humidity: "90%",
    wind: "20 km/h",
    rain: "80%"
  },
  { 
    day: "Fri", 
    date: "Mar 25",
    icon: <Cloud className="h-8 w-8 text-gray-500" />, 
    temp: "25°C", 
    desc: "Cloudy",
    humidity: "70%",
    wind: "10 km/h",
    rain: "20%"
  }
]

const farmingTips = [
  "Complete wheat harvesting before heavy rain on Thursday",
  "Apply fungicide to prevent crop diseases due to high humidity",
  "Ensure proper drainage in low-lying fields",
  "Store harvested crops in dry, covered areas"
]

export function WeatherForecast() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Cloud className="h-5 w-5 text-blue-600" />
          Weather Forecast
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Weather Highlight */}
        <div className="p-4 bg-gradient-to-r from-blue-50 to-yellow-50 rounded-lg border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Sun className="h-12 w-12 text-yellow-500" />
              <div>
                <div className="text-2xl">28°C</div>
                <div className="text-sm text-muted-foreground">Sunny, Clear Sky</div>
                <div className="text-xs text-blue-600">Ludhiana, Punjab</div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="flex flex-col items-center">
                <Droplets className="h-4 w-4 text-blue-500 mb-1" />
                <div className="text-xs text-muted-foreground">Humidity</div>
                <div className="text-sm">65%</div>
              </div>
              <div className="flex flex-col items-center">
                <Wind className="h-4 w-4 text-gray-500 mb-1" />
                <div className="text-xs text-muted-foreground">Wind</div>
                <div className="text-sm">12 km/h</div>
              </div>
              <div className="flex flex-col items-center">
                <Eye className="h-4 w-4 text-purple-500 mb-1" />
                <div className="text-xs text-muted-foreground">Visibility</div>
                <div className="text-sm">10 km</div>
              </div>
            </div>
          </div>
        </div>

        {/* Weather Alerts */}
        <div className="space-y-2">
          <Alert className="border-orange-200 bg-orange-50">
            <AlertTriangle className="h-4 w-4 text-orange-600" />
            <AlertDescription className="text-orange-800">
              Heavy rain expected in 2 days - protect your crops and ensure proper drainage!
            </AlertDescription>
          </Alert>
        </div>
        
        {/* 5-Day Forecast */}
        <div className="space-y-3">
          <h4 className="text-sm">5-Day Detailed Forecast</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-3">
            {weatherData.map((weather, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-3">
                  {weather.icon}
                  <div>
                    <div className="text-sm">{weather.day}</div>
                    <div className="text-xs text-muted-foreground">{weather.date}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-sm">{weather.temp}</div>
                    <div className="text-xs text-muted-foreground">{weather.desc}</div>
                  </div>
                  
                  <div className="text-right">
                    <Badge variant="outline" className="text-xs mb-1">
                      💧 {weather.rain}
                    </Badge>
                    <div className="text-xs text-muted-foreground">
                      🌬️ {weather.wind}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Agricultural Advice */}
        <div className="space-y-3 pt-2 border-t">
          <h4 className="text-sm flex items-center gap-2">
            <span>🌾</span>
            Agricultural Advice:
          </h4>
          <div className="space-y-2">
            {farmingTips.map((tip, index) => (
              <div key={index} className="flex items-start gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-sm text-muted-foreground">{tip}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}