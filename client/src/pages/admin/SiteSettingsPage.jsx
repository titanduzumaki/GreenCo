import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Label } from '../../components/ui/label';
import { Switch } from '../../components/ui/switch';
import { 
  Save, 
  Globe, 
  Share2, 
  Search,
  Palette
} from 'lucide-react';
import { toast } from 'sonner';
import { Separator } from '../../components/ui/separator';

export function SiteSettingsPage() {
  const [settings, setSettings] = useState({
    siteName: 'GreenCo',
    tagline: 'Powering Cities, Empowering Lives',
    homepageTitle: 'Electricity Infrastructure Solutions',
    linkedin: 'https://linkedin.com/company/greenco',
    instagram: 'https://instagram.com/greenco',
    facebook: 'https://facebook.com/greenco',
    twitter: 'https://twitter.com/greenco',
    defaultTheme: 'light',
    metaTitle: 'GreenCo - Leading Electricity Infrastructure Company',
    metaDescription: 'GreenCo provides innovative electrical infrastructure solutions, from power grid modernization to renewable energy integration.',
    metaKeywords: 'electricity, infrastructure, renewable energy, power grid, smart cities',
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success('Settings saved successfully');
    }, 500);
  };

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-slate-900 dark:text-white mb-2">Site Settings</h1>
        <p className="text-slate-600 dark:text-slate-400">
          Configure your website settings and preferences
        </p>
      </div>

      {/* General Settings */}
      <Card className="border-slate-200 dark:border-slate-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-white">
            <Globe className="w-5 h-5 text-green-500" />
            General
          </CardTitle>
          <CardDescription className="text-slate-600 dark:text-slate-400">
            Basic website information and branding
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <Label htmlFor="siteName">Site Name</Label>
              <Input
                id="siteName"
                value={settings.siteName}
                onChange={(e) => updateSetting('siteName', e.target.value)}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="tagline">Tagline</Label>
              <Input
                id="tagline"
                value={settings.tagline}
                onChange={(e) => updateSetting('tagline', e.target.value)}
                className="mt-2"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="homepageTitle">Homepage Title</Label>
            <Input
              id="homepageTitle"
              value={settings.homepageTitle}
              onChange={(e) => updateSetting('homepageTitle', e.target.value)}
              className="mt-2"
            />
            <p className="text-sm text-slate-500 dark:text-slate-500 mt-1">
              This appears as the main heading on your homepage
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Social Media Links */}
      <Card className="border-slate-200 dark:border-slate-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-white">
            <Share2 className="w-5 h-5 text-green-500" />
            Social Media Links
          </CardTitle>
          <CardDescription className="text-slate-600 dark:text-slate-400">
            Connect your social media profiles
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* LinkedIn */}
          <div>
            <Label htmlFor="linkedin" className="flex items-center gap-2">
              LinkedIn
            </Label>
            <Input
              id="linkedin"
              value={settings.linkedin}
              onChange={(e) => updateSetting('linkedin', e.target.value)}
              className="mt-2"
              placeholder="https://linkedin.com/company/yourcompany"
            />
          </div>
          {/* Instagram */}
          <div>
            <Label htmlFor="instagram" className="flex items-center gap-2">
              Instagram
            </Label>
            <Input
              id="instagram"
              value={settings.instagram}
              onChange={(e) => updateSetting('instagram', e.target.value)}
              className="mt-2"
              placeholder="https://instagram.com/yourcompany"
            />
          </div>
          {/* Facebook */}
          <div>
            <Label htmlFor="facebook" className="flex items-center gap-2">
              Facebook
            </Label>
            <Input
              id="facebook"
              value={settings.facebook}
              onChange={(e) => updateSetting('facebook', e.target.value)}
              className="mt-2"
              placeholder="https://facebook.com/yourcompany"
            />
          </div>
          {/* Twitter */}
          <div>
            <Label htmlFor="twitter" className="flex items-center gap-2">
              X (Twitter)
            </Label>
            <Input
              id="twitter"
              value={settings.twitter}
              onChange={(e) => updateSetting('twitter', e.target.value)}
              className="mt-2"
              placeholder="https://twitter.com/yourcompany"
            />
          </div>
        </CardContent>
      </Card>

      {/* Theme Preferences */}
      <Card className="border-slate-200 dark:border-slate-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-white">
            <Palette className="w-5 h-5 text-green-500" />
            Theme Preferences
          </CardTitle>
          <CardDescription className="text-slate-600 dark:text-slate-400">
            Set the default appearance for your website
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 rounded-lg bg-slate-50 dark:bg-slate-900">
            <div>
              <Label htmlFor="defaultTheme">Default Theme Mode</Label>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                Choose light or dark as the default theme
              </p>
            </div>
            <Switch
              id="defaultTheme"
              checked={settings.defaultTheme === 'dark'}
              onCheckedChange={(checked) => updateSetting('defaultTheme', checked ? 'dark' : 'light')}
            />
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-500 mt-2">
            Current: <span className="font-medium">{settings.defaultTheme === 'dark' ? 'Dark' : 'Light'}</span> mode
          </p>
        </CardContent>
      </Card>

      {/* SEO Settings */}
      <Card className="border-slate-200 dark:border-slate-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-white">
            <Search className="w-5 h-5 text-green-500" />
            SEO Settings
          </CardTitle>
          <CardDescription className="text-slate-600 dark:text-slate-400">
            Optimize your website for search engines
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="metaTitle">Meta Title</Label>
            <Input
              id="metaTitle"
              value={settings.metaTitle}
              onChange={(e) => updateSetting('metaTitle', e.target.value)}
              className="mt-2"
              maxLength={60}
            />
            <p className="text-sm text-slate-500 dark:text-slate-500 mt-1">
              {settings.metaTitle.length}/60 characters
            </p>
          </div>

          <div>
            <Label htmlFor="metaDescription">Meta Description</Label>
            <Textarea
              id="metaDescription"
              value={settings.metaDescription}
              onChange={(e) => updateSetting('metaDescription', e.target.value)}
              className="mt-2"
              rows={3}
              maxLength={160}
            />
            <p className="text-sm text-slate-500 dark:text-slate-500 mt-1">
              {settings.metaDescription.length}/160 characters
            </p>
          </div>

          <div>
            <Label htmlFor="metaKeywords">Keywords</Label>
            <Textarea
              id="metaKeywords"
              value={settings.metaKeywords}
              onChange={(e) => updateSetting('metaKeywords', e.target.value)}
              className="mt-2"
              rows={2}
              placeholder="keyword1, keyword2, keyword3"
            />
            <p className="text-sm text-slate-500 dark:text-slate-500 mt-1">
              Separate keywords with commas
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="sticky bottom-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 -mx-8 px-8 py-4 flex justify-end">
        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-green-600 hover:bg-green-700 text-white gap-2 min-w-[150px]"
        >
          <Save className="w-4 h-4" />
          {isSaving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </div>
  );
}
