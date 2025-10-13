import { useState, useRef } from 'react';
import { usePhotos } from '../../contexts/PhotoContext';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Card, CardContent } from '../../components/ui/card';
import { Label } from '../../components/ui/label';
import { Switch } from '../../components/ui/switch';
import { Badge } from '../../components/ui/badge';
import { Checkbox } from '../../components/ui/checkbox';
import {
  Upload,
  Trash2,
  Eye,
  EyeOff,
  MoreVertical,
  Search,
  X,
  FileImage
} from 'lucide-react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../../components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';

export function MediaLibraryPage() {
  const { photos, addPhotos, updatePhoto, deletePhoto, toggleVisibility } = usePhotos();
  const [selectedPhotos, setSelectedPhotos] = useState(new Set());
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterView, setFilterView] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [bulkUrls, setBulkUrls] = useState('');
  const fileInputRef = useRef(null);

  // Filter photos
  const filteredPhotos = photos.filter(photo => {
    const matchesSearch =
      photo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      photo.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      filterView === 'all'
        ? true
        : filterView === 'visible'
        ? photo.isVisible
        : filterView === 'hidden'
        ? !photo.isVisible
        : true;
    return matchesSearch && matchesFilter;
  });

  // Sort photos
  const sortedPhotos = [...filteredPhotos].sort((a, b) => {
    if (sortBy === 'date') return b.order - a.order;
    if (sortBy === 'title') return a.title.localeCompare(b.title);
    return 0;
  });

  const handleFileSelect = async (files) => {
    if (!files || files.length === 0) return;

    setIsUploading(true);
    const validFiles = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file.type.startsWith('image/')) {
        toast.error(`${file.name} is not an image file`);
        continue;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`${file.name} is too large (max 5MB)`);
        continue;
      }
      validFiles.push(file);
    }

    if (validFiles.length === 0) {
      setIsUploading(false);
      return;
    }

    const newPhotos = [];

    for (const file of validFiles) {
      const reader = new FileReader();
      await new Promise((resolve) => {
        reader.onload = (e) => {
          const url = e.target?.result;
          newPhotos.push({
            url,
            title: file.name.replace(/\.[^/.]+$/, ''),
            description: '',
            isVisible: false,
          });
          resolve(null);
        };
        reader.readAsDataURL(file);
      });
    }

    addPhotos(newPhotos);
    toast.success(`Added ${validFiles.length} photo${validFiles.length > 1 ? 's' : ''}`);
    setIsUploading(false);
    setUploadDialogOpen(false);
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e) => {
    e.preventDefault();
    handleFileSelect(e.dataTransfer.files);
  };

  const handleBulkUrlUpload = () => {
    const urls = bulkUrls
      .split('\n')
      .map(url => url.trim())
      .filter(url => url.length > 0);

    if (urls.length === 0) {
      toast.error('Please enter at least one image URL');
      return;
    }

    const newPhotos = urls.map((url, index) => ({
      url,
      title: `Image ${photos.length + index + 1}`,
      description: '',
      isVisible: false,
    }));

    addPhotos(newPhotos);
    setBulkUrls('');
    toast.success(`Added ${urls.length} photo${urls.length > 1 ? 's' : ''}`);
    setUploadDialogOpen(false);
  };

  const handleSelectPhoto = (id) => {
    const newSelection = new Set(selectedPhotos);
    if (newSelection.has(id)) newSelection.delete(id);
    else newSelection.add(id);
    setSelectedPhotos(newSelection);
  };

  const handleBulkAction = (action) => {
    if (selectedPhotos.size === 0) return;

    if (action === 'delete') {
      if (!window.confirm(`Delete ${selectedPhotos.size} photo(s)?`)) return;
      selectedPhotos.forEach(id => deletePhoto(id));
      toast.success(`Deleted ${selectedPhotos.size} photo(s)`);
    } else {
      selectedPhotos.forEach(id => {
        const photo = photos.find(p => p.id === id);
        if (photo && photo.isVisible !== (action === 'show')) toggleVisibility(id);
      });
      toast.success(`${action === 'show' ? 'Showed' : 'Hid'} ${selectedPhotos.size} photo(s)`);
    }
    setSelectedPhotos(new Set());
  };

  const handleEditPhoto = (photo) => {
    setCurrentPhoto(photo);
    setEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (!currentPhoto) return;
    updatePhoto(currentPhoto.id, {
      title: currentPhoto.title,
      description: currentPhoto.description,
    });
    toast.success('Photo updated');
    setEditDialogOpen(false);
    setCurrentPhoto(null);
  };

  const handleDeletePhoto = (id, title) => {
    if (window.confirm(`Delete "${title}"?`)) {
      deletePhoto(id);
      toast.success('Photo deleted');
    }
  };

  const visiblePhotos = photos.filter(p => p.isVisible);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-slate-900 dark:text-white mb-2">Media Library</h1>
          <p className="text-slate-600 dark:text-slate-400">Manage your photos and images</p>
        </div>
        <Button onClick={() => setUploadDialogOpen(true)} className="bg-green-600 hover:bg-green-700 text-white gap-2">
          <Upload className="w-4 h-4" /> Upload Photos
        </Button>
      </div>

      {/* Filters, Grid, Dialogs */}
      {/* (rest of your JSX content stays unchanged) */}
    </div>
  );
}
