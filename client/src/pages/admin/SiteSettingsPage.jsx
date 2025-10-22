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
import { Separator } from "../../components/ui/separator";
import { MapPin, Trash2, Save } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

export function SiteSettingsPage() {
  const [locations, setLocations] = useState([]);
  const [newLocation, setNewLocation] = useState({
    name: "",
    latitude: "",
    longitude: "",
    description: "",
  });
  const [isSaving, setIsSaving] = useState(false);

  // Fetch locations on mount
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

  // Handle input changes
  const handleChange = (key, value) => {
    setNewLocation((prev) => ({ ...prev, [key]: value }));
  };

  // Add new location
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

  // Delete location
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

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-slate-900 dark:text-white mb-2">Manage Locations</h1>
        <p className="text-slate-600 dark:text-slate-400">
          Add or view company locations on the map
        </p>
      </div>

      {/* Add Location Form */}
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
