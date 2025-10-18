import { Link, useNavigate } from "react-router-dom";
import { usePhotoStore } from "../../store/PhotoStore";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import {
  Image,
  Eye,
  EyeOff,
  Upload,
  FileText,
  Settings,
  TrendingUp,
  Activity,
} from "lucide-react";

export function DashboardPage() {
  const navigate = useNavigate();
  const photos = usePhotoStore((state) => state.photos);
  // visiblePhotos: only those with isVisible true
  const visiblePhotos = photos.filter((p) => p.isVisible);
  const hiddenPhotos = photos.filter((p) => !p.isVisible);

  const stats = [
    {
      title: "Total Photos",
      value: photos.length,
      icon: Image,
      color: "bg-blue-500",
      description: "All uploaded media",
    },
    {
      title: "Visible Photos",
      value: visiblePhotos.length,
      icon: Eye,
      color: "bg-green-500",
      description: "Shown on website",
    },
    {
      title: "Hidden Photos",
      value: hiddenPhotos.length,
      icon: EyeOff,
      color: "bg-orange-500",
      description: "Not displayed",
    },
    {
      title: "Recent Activity",
      value: photos.length > 0 ? "Active" : "None",
      icon: Activity,
      color: "bg-purple-500",
      description: "Last 7 days",
    },
  ];

  const quickActions = [
    {
      title: "Upload Images",
      description: "Add new images to your gallery",
      icon: Upload,
      link: "/admin/upload",
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-50 dark:bg-green-950/30",
    },
    {
      title: "View Gallery",
      description: "Browse all uploaded images",
      icon: Image,
      link: "/admin/gallery",
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-50 dark:bg-blue-950/30",
    },
    {
      title: "Site Settings",
      description: "Configure website preferences",
      icon: Settings,
      link: "/admin/settings",
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-50 dark:bg-purple-950/30",
    },
  ];

  const recentPhotos = photos.slice(0, 4);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-slate-900 dark:text-white mb-2">Dashboard</h1>
        <p className="text-slate-600 dark:text-slate-400">
          Welcome back! Here's an overview of your website.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card
              key={stat.title}
              className="border-slate-200 dark:border-slate-800 overflow-hidden"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                      {stat.title}
                    </p>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white mb-1">
                      {stat.value}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-500">
                      {stat.description}
                    </p>
                  </div>
                  <div className={`${stat.color} p-3 rounded-xl`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-slate-900 dark:text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link key={action.title} to={action.link}>
                <Card className="border-slate-200 dark:border-slate-800 hover:shadow-lg transition-all duration-200 group h-full">
                  <CardContent className="p-6">
                    <div
                      className={`${action.bgColor} w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                    >
                      <Icon className={`w-6 h-6 ${action.color}`} />
                    </div>
                    <h3 className="text-slate-900 dark:text-white font-medium mb-2">
                      {action.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {action.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Recent Photos */}
      {recentPhotos.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-slate-900 dark:text-white">Recent Photos</h2>
            <Button
              variant="outline"
              onClick={() => navigate("/admin/gallery")}
            >
              View All
            </Button>
          </div>
          <Card className="border-slate-200 dark:border-slate-800">
            <CardContent className="p-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {recentPhotos.map((photo) => (
                  <div
                    key={photo._id}
                    className="group relative aspect-square rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-900"
                  >
                    <img
                      src={photo.thumbnail || photo.url}
                      alt={photo.title || "Image"}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 right-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          photo.isVisible ? "bg-green-500" : "bg-slate-400"
                        }`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Empty State */}
      {photos.length === 0 && (
        <Card className="border-slate-200 dark:border-slate-800 border-dashed">
          <CardContent className="p-12 text-center">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-950/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <Image className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-slate-900 dark:text-white mb-2">Get Started</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-md mx-auto">
              Start building your website by uploading photos to your gallery.
            </p>
            <Button
              onClick={() => navigate("/admin/upload")}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload Images
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Performance Insights */}
      <Card className="border-slate-200 dark:border-slate-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-white">
            <TrendingUp className="w-5 h-5 text-green-500" />
            Website Status
          </CardTitle>
          <CardDescription className="text-slate-600 dark:text-slate-400">
            Your website is live and performing well
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-slate-50 dark:bg-slate-900">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">
                    Website Status
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    All systems operational
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open("/", "_blank")}
              >
                View Site
              </Button>
            </div>

            {visiblePhotos.length > 0 && (
              <div className="p-4 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900">
                <p className="text-sm text-green-800 dark:text-green-300">
                  <strong>{visiblePhotos.length}</strong> photo
                  {visiblePhotos.length !== 1 ? "s are" : " is"} currently
                  visible in your gallery.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
