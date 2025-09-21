import { BookOpen, Play, Award } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { toast } from "sonner@2.0.3"

const schemes = [
  {
    title: "PM-KISAN Scheme",
    deadline: "5 days",
    amount: "₹6,000",
    status: "urgent" as const
  },
  {
    title: "Soil Health Card",
    deadline: "15 days",
    amount: "Free",
    status: "normal" as const
  }
]

const videos = [
  {
    title: "Wheat Disease Management",
    duration: "5 minutes",
    language: "Hindi"
  },
  {
    title: "Organic Fertilizer Preparation",
    duration: "8 minutes",
    language: "Hindi"
  }
]

interface QuickTipsProps {
  onSchemeClick: (scheme: string) => void
  onVideoClick: (video: string) => void
}

export function QuickTips({ onSchemeClick, onVideoClick }: QuickTipsProps) {
  const handleSchemeLearn = (schemeName: string) => {
    onSchemeClick(schemeName)
    toast.info(`Opening details for ${schemeName}`)
  }

  const handleVideoWatch = (videoTitle: string) => {
    onVideoClick(videoTitle)
    toast.success(`Playing: ${videoTitle}`)
  }

  return (
    <div className="p-4 space-y-4">
      {/* Today's Tip */}
      <Card className="border-l-4 border-l-blue-500">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <BookOpen className="h-4 w-4 text-blue-600" />
            </div>
            <div className="flex-1">
              <Badge variant="secondary" className="text-xs mb-2">Today's Tip</Badge>
              <p className="text-sm">Improve soil fertility through crop rotation</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Government Schemes */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-orange-600" />
            Government Schemes
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {schemes.map((scheme, index) => (
            <div key={index} className="flex items-center justify-between p-2 border rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex-1">
                <div className="text-sm">{scheme.title}</div>
                <div className="text-xs text-muted-foreground">Amount: {scheme.amount}</div>
              </div>
              <div className="text-right mr-3">
                <Badge 
                  variant={scheme.status === "urgent" ? "destructive" : "secondary"}
                  className="text-xs"
                >
                  {scheme.deadline} left
                </Badge>
              </div>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => handleSchemeLearn(scheme.title)}
              >
                Learn
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Learning Videos */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Play className="h-5 w-5 text-red-600" />
            Educational Videos
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {videos.map((video, index) => (
            <div key={index} className="flex items-center gap-3 p-2 border rounded-lg hover:bg-gray-50 transition-colors">
              <div className="p-2 bg-red-100 rounded-lg">
                <Play className="h-4 w-4 text-red-600" />
              </div>
              <div className="flex-1">
                <div className="text-sm">{video.title}</div>
                <div className="text-xs text-muted-foreground">
                  {video.duration} • {video.language}
                </div>
              </div>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => handleVideoWatch(video.title)}
              >
                Watch
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}