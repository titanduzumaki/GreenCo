import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Label } from "../../components/ui/label";
import { MapPin, Trash2, Save } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

const SOCIAL_PLATFORMS = ["Facebook", "Twitter", "Instagram", "LinkedIn"];


export function SiteSettingsPage() {
  const [locations, setLocations] = useState([]);
  const [newLocation, setNewLocation] = useState({
    name: "",
    latitude: "",
    longitude: "",
    description: "",
  });
  const [isSaving, setIsSaving] = useState(false);

  const [contact, setContact] = useState({
    phoneNumbers: [""],
    emails: [""],
    socialLinks: [{ platform: "", url: "" }],
  });
  const [isContactSaving, setIsContactSaving] = useState(false);

  // Fetch locations
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/locations");
        setLocations(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load locations");
      }
    };
    fetchLocations();
  }, []);

  // Fetch contact details
  useEffect(() => {
    const fetchContact = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/site-settings");
        if (res.data) {
          setContact({
            phoneNumbers: res.data.phoneNumbers.length
              ? res.data.phoneNumbers
              : [""],
            emails: res.data.emails.length ? res.data.emails : [""],
            socialLinks: res.data.socialLinks?.length
              ? res.data.socialLinks
              : [{ platform: "", url: "" }],
          });
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to load contact info");
      }
    };
    fetchContact();
  }, []);

  // Location handlers
  const handleChange = (key, value) =>
    setNewLocation((prev) => ({ ...prev, [key]: value }));

  const addLocation = async () => {
    const { name, latitude, longitude, description } = newLocation;
    if (!name || !latitude || !longitude) {
      toast.error("Please fill in name, latitude, and longitude");
      return;
    }
    try {
      const res = await axios.post("http://localhost:3001/api/locations", {
        name,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        description,
      });
      setLocations((prev) => [...prev, res.data]);
      setNewLocation({ name: "", latitude: "", longitude: "", description: "" });
      toast.success("Location added successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add location");
    }
  };

  const deleteLocation = async (id) => {
    if (!id) return;
    try {
      await axios.delete(`http://localhost:3001/api/locations/${id}`);
      setLocations((prev) => prev.filter((loc) => loc._id !== id));
      toast.success("Location deleted!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete location");
    }
  };

  // Contact handlers
  const handleContactChange = (type, index, value) => {
    setContact((prev) => {
      const updated = [...prev[type]];
      updated[index] = value;
      return { ...prev, [type]: updated };
    });
  };

  const addContactField = (type) =>
    setContact((prev) => ({ ...prev, [type]: [...prev[type], ""] }));

  const removeContactField = (type, index) =>
    setContact((prev) => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index),
    }));

  // Social links handlers
  const handleSocialChange = (index, key, value) => {
    setContact((prev) => {
      const updated = [...prev.socialLinks];
      updated[index][key] = value;
      return { ...prev, socialLinks: updated };
    });
  };

  const addSocialField = () =>
    setContact((prev) => ({
      ...prev,
      socialLinks: [...prev.socialLinks, { platform: "", url: "" }],
    }));

  const removeSocialField = (index) =>
    setContact((prev) => ({
      ...prev,
      socialLinks: prev.socialLinks.filter((_, i) => i !== index),
    }));

  const saveContact = async () => {
    try {
      setIsContactSaving(true);
      await axios.post("http://localhost:3001/api/site-settings", contact);
      toast.success("Contact info saved successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save contact info");
    } finally {
      setIsContactSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Contact Details */}
      <Card className="border-slate-200 dark:border-slate-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Save className="text-green-500" /> Contact Details
          </CardTitle>
          <CardDescription>
            Update your company’s phone numbers, emails, and social links
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Phones */}
          <div className="space-y-2">
            <Label>Phone Numbers</Label>
            {contact.phoneNumbers.map((phone, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <Input
                  placeholder="e.g. +91 9876543210"
                  value={phone}
                  onChange={(e) =>
                    handleContactChange("phoneNumbers", idx, e.target.value)
                  }
                />
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeContactField("phoneNumbers", idx)}
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            ))}
            <Button size="sm" onClick={() => addContactField("phoneNumbers")}>
              + Add Phone
            </Button>
          </div>

          {/* Emails */}
          <div className="space-y-2">
            <Label>Emails</Label>
            {contact.emails.map((email, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <Input
                  placeholder="e.g. contact@greenco.com"
                  value={email}
                  onChange={(e) =>
                    handleContactChange("emails", idx, e.target.value)
                  }
                />
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeContactField("emails", idx)}
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            ))}
            <Button size="sm" onClick={() => addContactField("emails")}>
              + Add Email
            </Button>
          </div>

          {/* Social Links */}
          <div className="space-y-2">
            <Label>Social Links</Label>
            {contact.socialLinks.map((social, idx) => (
              <div key={idx} className="flex items-center gap-2">
                {/* Dropdown for Platform */}
                <select
                  value={social.platform}
                  onChange={(e) => handleSocialChange(idx, "platform", e.target.value)}
                  className="bg-white/5 border border-white/20 text-white text-sm rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400"
                >
                  <option value="" className="text-black">Select Platform</option>
                  {SOCIAL_PLATFORMS.map((platform) => (
                    <option key={platform} value={platform} className="text-black">
                      {platform}
                    </option>
                  ))}
                </select>


                {/* URL input */}
                <Input
                  placeholder="Enter URL"
                  value={social.url}
                  onChange={(e) => handleSocialChange(idx, "url", e.target.value)}
                />

                {/* Remove button */}
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeSocialField(idx)}
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            ))}
            <Button size="sm" onClick={addSocialField}>
              + Add Social Link
            </Button>
          </div>


          <Button
            onClick={saveContact}
            disabled={isContactSaving}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            {isContactSaving ? "Saving..." : "Save Contact Info"}
          </Button>
        </CardContent>
      </Card>

      {/* Add Location */}
      <Card className="border-slate-200 dark:border-slate-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="text-green-500" /> Add New Location
          </CardTitle>
          <CardDescription>Enter details for your company locations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label>Location Name</Label>
              <Input
                placeholder="e.g. Mumbai Substation"
                value={newLocation.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </div>
            <div>
              <Label>Latitude</Label>
              <Input
                type="number"
                step="any"
                value={newLocation.latitude}
                onChange={(e) => handleChange("latitude", e.target.value)}
              />
            </div>
            <div>
              <Label>Longitude</Label>
              <Input
                type="number"
                step="any"
                value={newLocation.longitude}
                onChange={(e) => handleChange("longitude", e.target.value)}
              />
            </div>
            <div className="sm:col-span-2">
              <Label>Description</Label>
              <Textarea
                placeholder="Optional details"
                value={newLocation.description}
                onChange={(e) => handleChange("description", e.target.value)}
              />
            </div>
          </div>
          <Button
            onClick={addLocation}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            Add Location
          </Button>
        </CardContent>
      </Card>

      {/* Saved Locations */}
      <Card className="border-slate-200 dark:border-slate-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="text-green-500" /> Saved Locations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {locations.length > 0 ? (
            locations.map((loc) => (
              <div
                key={loc._id || loc.name}
                className="flex justify-between items-center bg-slate-100 dark:bg-slate-800 p-2 rounded-md"
              >
                <div>
                  <p className="font-medium">{loc.name}</p>
                  <p className="text-xs text-slate-500">
                    ({loc.latitude}, {loc.longitude})
                  </p>
                  {loc.description && (
                    <p className="text-xs text-slate-400">{loc.description}</p>
                  )}
                </div>
                <button
                  onClick={() => deleteLocation(loc._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))
          ) : (
            <p className="text-sm text-slate-500">No locations yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
