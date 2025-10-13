import { useState } from 'react';
import { 
  Card, CardContent, CardDescription, CardHeader, CardTitle 
} from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Label } from '../../components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { 
  Plus, Edit2, Trash2, Save, User, Award, Newspaper, FileText 
} from 'lucide-react';
import { toast } from 'sonner';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter
} from '../../components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { Badge } from '../../components/ui/badge';

export function ContentManagementPage() {
  const [aboutContent, setAboutContent] = useState(
    'GreenCo is a leading electricity infrastructure company committed to powering sustainable communities...'
  );
  const [isSavingAbout, setIsSavingAbout] = useState(false);

  const [teamMembers, setTeamMembers] = useState([
    { id: '1', name: 'John Smith', role: 'CEO & Founder', photo: '', linkedin: 'https://linkedin.com/in/johnsmith' },
    { id: '2', name: 'Sarah Johnson', role: 'Chief Technology Officer', photo: '', linkedin: 'https://linkedin.com/in/sarahjohnson' }
  ]);
  const [teamDialogOpen, setTeamDialogOpen] = useState(false);
  const [currentTeamMember, setCurrentTeamMember] = useState(null);

  const [achievements, setAchievements] = useState([
    { id: '1', title: '100+ Projects Completed', description: 'Successfully delivered infrastructure projects across the region', image: '' }
  ]);
  const [achievementDialogOpen, setAchievementDialogOpen] = useState(false);
  const [currentAchievement, setCurrentAchievement] = useState(null);

  const [newsItems, setNewsItems] = useState([
    { id: '1', title: 'GreenCo Expands to New Markets', date: '2025-01-15', content: 'We are excited to announce our expansion into renewable energy sectors...', link: '/news/expansion-2025' }
  ]);
  const [newsDialogOpen, setNewsDialogOpen] = useState(false);
  const [currentNews, setCurrentNews] = useState(null);

  const handleSaveAbout = () => {
    setIsSavingAbout(true);
    setTimeout(() => {
      setIsSavingAbout(false);
      toast.success('About Us content updated');
    }, 500);
  };

  const handleSaveTeamMember = () => {
    if (!currentTeamMember) return;
    if (currentTeamMember.id) {
      setTeamMembers(prev => prev.map(m => m.id === currentTeamMember.id ? currentTeamMember : m));
      toast.success('Team member updated');
    } else {
      setTeamMembers(prev => [...prev, { ...currentTeamMember, id: Date.now().toString() }]);
      toast.success('Team member added');
    }
    setTeamDialogOpen(false);
    setCurrentTeamMember(null);
  };

  const handleDeleteTeamMember = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      setTeamMembers(prev => prev.filter(m => m.id !== id));
      toast.success('Team member deleted');
    }
  };

  const handleSaveAchievement = () => {
    if (!currentAchievement) return;
    if (currentAchievement.id) {
      setAchievements(prev => prev.map(a => a.id === currentAchievement.id ? currentAchievement : a));
      toast.success('Achievement updated');
    } else {
      setAchievements(prev => [...prev, { ...currentAchievement, id: Date.now().toString() }]);
      toast.success('Achievement added');
    }
    setAchievementDialogOpen(false);
    setCurrentAchievement(null);
  };

  const handleDeleteAchievement = (id) => {
    if (window.confirm('Delete this achievement?')) {
      setAchievements(prev => prev.filter(a => a.id !== id));
      toast.success('Achievement deleted');
    }
  };

  const handleSaveNews = () => {
    if (!currentNews) return;
    if (currentNews.id) {
      setNewsItems(prev => prev.map(n => n.id === currentNews.id ? currentNews : n));
      toast.success('News item updated');
    } else {
      setNewsItems(prev => [...prev, { ...currentNews, id: Date.now().toString() }]);
      toast.success('News item added');
    }
    setNewsDialogOpen(false);
    setCurrentNews(null);
  };

  const handleDeleteNews = (id) => {
    if (window.confirm('Delete this news item?')) {
      setNewsItems(prev => prev.filter(n => n.id !== id));
      toast.success('News item deleted');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-slate-900 dark:text-white mb-2">Website Content</h1>
        <p className="text-slate-600 dark:text-slate-400">Manage your website pages and content</p>
      </div>

      <Tabs defaultValue="about" className="w-full">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 h-auto">
          <TabsTrigger value="about" className="gap-2"><FileText className="w-4 h-4" /> About</TabsTrigger>
          <TabsTrigger value="team" className="gap-2"><User className="w-4 h-4" /> Team</TabsTrigger>
          <TabsTrigger value="achievements" className="gap-2"><Award className="w-4 h-4" /> Achievements</TabsTrigger>
          <TabsTrigger value="news" className="gap-2"><Newspaper className="w-4 h-4" /> News</TabsTrigger>
        </TabsList>

        {/* About Tab */}
        <TabsContent value="about" className="space-y-4">
          <Card className="border-slate-200 dark:border-slate-800">
            <CardHeader>
              <CardTitle className="text-slate-900 dark:text-white">About Us Content</CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400">Edit your company's about page content</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                value={aboutContent}
                onChange={(e) => setAboutContent(e.target.value)}
                className="min-h-[300px]"
                placeholder="Enter your about us content..."
              />
              <div className="flex justify-end">
                <Button onClick={handleSaveAbout} disabled={isSavingAbout} className="bg-green-600 hover:bg-green-700 text-white gap-2">
                  <Save className="w-4 h-4" /> {isSavingAbout ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Team Tab */}
        <TabsContent value="team" className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-slate-600 dark:text-slate-400">{teamMembers.length} team member{teamMembers.length !== 1 ? 's' : ''}</p>
            <Button
              onClick={() => { setCurrentTeamMember({ id: '', name: '', role: '', photo: '', linkedin: '' }); setTeamDialogOpen(true); }}
              className="bg-green-600 hover:bg-green-700 text-white gap-2"
            >
              <Plus className="w-4 h-4" /> Add Member
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map(member => (
              <Card key={member.id} className="border-slate-200 dark:border-slate-800">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <Avatar className="w-16 h-16">
                      {member.photo ? <AvatarImage src={member.photo} alt={member.name} /> : <AvatarFallback className="bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300">{member.name.split(' ').map(n => n[0]).join('').toUpperCase()}</AvatarFallback>}
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-slate-900 dark:text-white font-medium mb-1">{member.name}</h3>
                      <p className="text-slate-600 dark:text-slate-400 text-sm">{member.role}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => { setCurrentTeamMember(member); setTeamDialogOpen(true); }} className="flex-1 gap-2">
                      <Edit2 className="w-3 h-3" /> Edit
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDeleteTeamMember(member.id, member.name)} className="text-red-600 hover:text-red-700 dark:text-red-400">
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Achievements Tab */}
        <TabsContent value="achievements" className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-slate-600 dark:text-slate-400">{achievements.length} achievement{achievements.length !== 1 ? 's' : ''}</p>
            <Button
              onClick={() => { setCurrentAchievement({ id: '', title: '', description: '', image: '' }); setAchievementDialogOpen(true); }}
              className="bg-green-600 hover:bg-green-700 text-white gap-2"
            >
              <Plus className="w-4 h-4" /> Add Achievement
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map(a => (
              <Card key={a.id} className="border-slate-200 dark:border-slate-800 overflow-hidden">
                {a.image && <div className="aspect-video bg-slate-100 dark:bg-slate-900"><img src={a.image} alt={a.title} className="w-full h-full object-cover" /></div>}
                <CardContent className="p-4">
                  <h3 className="text-slate-900 dark:text-white font-medium mb-2">{a.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-2">{a.description}</p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => { setCurrentAchievement(a); setAchievementDialogOpen(true); }} className="flex-1 gap-2">
                      <Edit2 className="w-3 h-3" /> Edit
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDeleteAchievement(a.id)} className="text-red-600 hover:text-red-700 dark:text-red-400">
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* News Tab */}
        <TabsContent value="news" className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-slate-600 dark:text-slate-400">{newsItems.length} news item{newsItems.length !== 1 ? 's' : ''}</p>
            <Button
              onClick={() => { setCurrentNews({ id: '', title: '', date: '', content: '', link: '' }); setNewsDialogOpen(true); }}
              className="bg-green-600 hover:bg-green-700 text-white gap-2"
            >
              <Plus className="w-4 h-4" /> Add News
            </Button>
          </div>

          <Card className="border-slate-200 dark:border-slate-800">
            <CardContent className="p-0 divide-y divide-slate-200 dark:divide-slate-800">
              {newsItems.map(n => (
                <div key={n.id} className="p-6 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-slate-900 dark:text-white font-medium">{n.title}</h3>
                        <Badge variant="outline" className="text-xs">{new Date(n.date).toLocaleDateString()}</Badge>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 text-sm mb-2 line-clamp-2">{n.content}</p>
                      {n.link && <a href={n.link} className="text-green-600 dark:text-green-400 text-sm hover:underline">{n.link}</a>}
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <Button variant="outline" size="sm" onClick={() => { setCurrentNews(n); setNewsDialogOpen(true); }}>
                        <Edit2 className="w-3 h-3" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDeleteNews(n.id)} className="text-red-600 hover:text-red-700 dark:text-red-400">
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Team Dialog */}
      <Dialog open={teamDialogOpen} onOpenChange={setTeamDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{currentTeamMember?.id ? 'Edit' : 'Add'} Team Member</DialogTitle></DialogHeader>
          {currentTeamMember && (
            <div className="space-y-4">
              <Input value={currentTeamMember.name} onChange={(e) => setCurrentTeamMember({...currentTeamMember, name: e.target.value})} placeholder="Name" />
              <Input value={currentTeamMember.role} onChange={(e) => setCurrentTeamMember({...currentTeamMember, role: e.target.value})} placeholder="Role" />
              <Input value={currentTeamMember.photo} onChange={(e) => setCurrentTeamMember({...currentTeamMember, photo: e.target.value})} placeholder="Photo URL" />
              <Input value={currentTeamMember.linkedin} onChange={(e) => setCurrentTeamMember({...currentTeamMember, linkedin: e.target.value})} placeholder="LinkedIn URL" />
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setTeamDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveTeamMember} className="bg-green-600 hover:bg-green-700 text-white">{currentTeamMember?.id ? 'Update' : 'Add'} Member</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Achievement Dialog */}
      <Dialog open={achievementDialogOpen} onOpenChange={setAchievementDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{currentAchievement?.id ? 'Edit' : 'Add'} Achievement</DialogTitle></DialogHeader>
          {currentAchievement && (
            <div className="space-y-4">
              <Input value={currentAchievement.title} onChange={(e) => setCurrentAchievement({...currentAchievement, title: e.target.value})} placeholder="Title" />
              <Textarea value={currentAchievement.description} onChange={(e) => setCurrentAchievement({...currentAchievement, description: e.target.value})} rows={3} placeholder="Description" />
              <Input value={currentAchievement.image} onChange={(e) => setCurrentAchievement({...currentAchievement, image: e.target.value})} placeholder="Image URL" />
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setAchievementDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveAchievement} className="bg-green-600 hover:bg-green-700 text-white">{currentAchievement?.id ? 'Update' : 'Add'} Achievement</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* News Dialog */}
      <Dialog open={newsDialogOpen} onOpenChange={setNewsDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{currentNews?.id ? 'Edit' : 'Add'} News Item</DialogTitle></DialogHeader>
          {currentNews && (
            <div className="space-y-4">
              <Input value={currentNews.title} onChange={(e) => setCurrentNews({...currentNews, title: e.target.value})} placeholder="Title" />
              <Input type="date" value={currentNews.date} onChange={(e) => setCurrentNews({...currentNews, date: e.target.value})} />
              <Textarea value={currentNews.content} onChange={(e) => setCurrentNews({...currentNews, content: e.target.value})} rows={5} placeholder="Content" />
              <Input value={currentNews.link} onChange={(e) => setCurrentNews({...currentNews, link: e.target.value})} placeholder="Link (optional)" />
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewsDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveNews} className="bg-green-600 hover:bg-green-700 text-white">{currentNews?.id ? 'Update' : 'Add'} News</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
