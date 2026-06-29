"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Upload, X, GripVertical } from "lucide-react";

const PROPERTY_TYPES = [
  { value: "VILLA", label: "Villa" },
  { value: "RIAD", label: "Riad" },
  { value: "APARTMENT", label: "Appartement" },
  { value: "HOUSE", label: "Maison" },
  { value: "LAND", label: "Terrain" },
  { value: "COMMERCIAL", label: "Commercial" },
];

const PROPERTY_STATUSES = [
  { value: "AVAILABLE", label: "Disponible" },
  { value: "SOLD", label: "Vendu" },
  { value: "RENTED", label: "Loué" },
  { value: "PENDING", label: "En attente" },
];

const CURRENCIES = [
  { value: "EUR", label: "EUR" },
  { value: "MAD", label: "MAD" },
  { value: "USD", label: "USD" },
];

const PRICE_PERIODS = [
  { value: "nightly", label: "Par nuit" },
  { value: "weekly", label: "Par semaine" },
  { value: "monthly", label: "Par mois" },
  { value: "yearly", label: "Par an" },
  { value: "sale", label: "Vente" },
];

const FEATURES = [
  "Pool", "Garden", "WiFi", "AC", "Gym", "Fireplace", "BBQ", "Cinema",
  "Tennis", "Parking", "Jacuzzi", "Hammam", "Terrace", "Balcony",
  "Washer", "Dryer", "Kitchen", "Security",
];

const FEATURE_LABELS: Record<string, string> = {
  Pool: "Piscine", Garden: "Jardin", WiFi: "WiFi", AC: "Climatisation",
  Gym: "Salle de sport", Fireplace: "Cheminée", BBQ: "BBQ", Cinema: "Cinéma",
  Tennis: "Tennis", Parking: "Parking", Jacuzzi: "Jacuzzi", Hammam: "Hammam",
  Terrace: "Terrasse", Balcony: "Balcon", Washer: "Lave-linge",
  Dryer: "Sèche-linge", Kitchen: "Cuisine", Security: "Sécurité",
};

export default function NewPropertyPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("VILLA");
  const [status, setStatus] = useState("AVAILABLE");
  const [isFeatured, setIsFeatured] = useState(false);

  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("EUR");
  const [pricePeriod, setPricePeriod] = useState("nightly");
  const [cleaningFee, setCleaningFee] = useState("");
  const [serviceFee, setServiceFee] = useState("");

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("Marrakech");
  const [quarter, setQuarter] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [garages, setGarages] = useState("");
  const [maxGuests, setMaxGuests] = useState("");
  const [plotArea, setPlotArea] = useState("");
  const [builtArea, setBuiltArea] = useState("");
  const [yearBuilt, setYearBuilt] = useState("");
  const [minStay, setMinStay] = useState("");
  const [maxStay, setMaxStay] = useState("");
  const [checkInTime, setCheckInTime] = useState("");
  const [checkOutTime, setCheckOutTime] = useState("");

  const [features, setFeatures] = useState<Record<string, boolean>>(
    Object.fromEntries(FEATURES.map((f) => [f, false]))
  );

  const [images, setImages] = useState<{ file?: File; url: string; alt: string }[]>([]);

  const toggleFeature = (key: string) => {
    setFeatures((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleImageUpload = async (files: FileList | null) => {
    if (!files) return;
    setUploading(true);
    for (const file of Array.from(files)) {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      if (res.ok) {
        const data = await res.json();
        setImages((prev) => [...prev, { file, url: data.url, alt: "" }]);
      }
    }
    setUploading(false);
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const updateImageAlt = (index: number, alt: string) => {
    setImages((prev) => prev.map((img, i) => (i === index ? { ...img, alt } : img)));
  };

  const moveImage = (index: number, direction: "up" | "down") => {
    setImages((prev) => {
      const newImages = [...prev];
      const targetIndex = direction === "up" ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= newImages.length) return prev;
      [newImages[index], newImages[targetIndex]] = [newImages[targetIndex], newImages[index]];
      return newImages;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const selectedFeatures = Object.entries(features)
      .filter(([, v]) => v)
      .map(([k]) => k);

    const body = {
      title,
      description,
      type,
      status,
      isFeatured,
      price: parseFloat(price) || 0,
      currency,
      pricePeriod,
      cleaningFee: cleaningFee ? parseFloat(cleaningFee) : null,
      serviceFee: serviceFee ? parseFloat(serviceFee) : null,
      address,
      city,
      quarter: quarter || null,
      latitude: latitude ? parseFloat(latitude) : null,
      longitude: longitude ? parseFloat(longitude) : null,
      bedrooms: parseInt(bedrooms) || 0,
      bathrooms: parseInt(bathrooms) || 0,
      garages: parseInt(garages) || 0,
      maxGuests: maxGuests ? parseInt(maxGuests) : null,
      plotArea: plotArea ? parseFloat(plotArea) : null,
      builtArea: builtArea ? parseFloat(builtArea) : null,
      yearBuilt: yearBuilt ? parseInt(yearBuilt) : null,
      minStay: minStay ? parseInt(minStay) : null,
      maxStay: maxStay ? parseInt(maxStay) : null,
      checkInTime: checkInTime || null,
      checkOutTime: checkOutTime || null,
      features: selectedFeatures,
      images: images.map((img) => ({ url: img.url, alt: img.alt })),
    };

    const res = await fetch("/api/properties", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      router.push("/admin/properties");
    } else {
      setError("Erreur lors de la création");
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/properties">
          <Button variant="ghost" size="icon-sm">
            <ArrowLeft className="size-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Nouvelle propriété</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="flex items-center gap-2 text-sm px-3 py-2.5 rounded-xl text-red-600 bg-red-50 border border-red-100">
            {error}
          </div>
        )}
        {/* Section 1 - Infos générales */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Infos générales</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Titre *</Label>
              <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="description">Description *</Label>
              <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required rows={4} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="type">Type</Label>
                <select id="type" value={type} onChange={(e) => setType(e.target.value)} className="flex h-8 w-full rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50">
                  {PROPERTY_TYPES.map((t) => (<option key={t.value} value={t.value}>{t.label}</option>))}
                </select>
              </div>
              <div>
                <Label htmlFor="status">Statut</Label>
                <select id="status" value={status} onChange={(e) => setStatus(e.target.value)} className="flex h-8 w-full rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50">
                  {PROPERTY_STATUSES.map((s) => (<option key={s.value} value={s.value}>{s.label}</option>))}
                </select>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Label>En vedette</Label>
              <Switch checked={isFeatured} onCheckedChange={setIsFeatured} />
            </div>
          </CardContent>
        </Card>

        {/* Section 2 - Prix */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Prix</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="price">Prix *</Label>
                <Input id="price" type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} required />
              </div>
              <div>
                <Label htmlFor="currency">Devise</Label>
                <select id="currency" value={currency} onChange={(e) => setCurrency(e.target.value)} className="flex h-8 w-full rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50">
                  {CURRENCIES.map((c) => (<option key={c.value} value={c.value}>{c.label}</option>))}
                </select>
              </div>
              <div>
                <Label htmlFor="pricePeriod">Période</Label>
                <select id="pricePeriod" value={pricePeriod} onChange={(e) => setPricePeriod(e.target.value)} className="flex h-8 w-full rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50">
                  {PRICE_PERIODS.map((p) => (<option key={p.value} value={p.value}>{p.label}</option>))}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="cleaningFee">Frais de nettoyage</Label>
                <Input id="cleaningFee" type="number" step="0.01" value={cleaningFee} onChange={(e) => setCleaningFee(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="serviceFee">Frais de service</Label>
                <Input id="serviceFee" type="number" step="0.01" value={serviceFee} onChange={(e) => setServiceFee(e.target.value)} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 3 - Localisation */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Localisation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="address">Adresse *</Label>
              <Input id="address" value={address} onChange={(e) => setAddress(e.target.value)} required />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city">Ville</Label>
                <Input id="city" value={city} onChange={(e) => setCity(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="quarter">Quartier</Label>
                <Input id="quarter" value={quarter} onChange={(e) => setQuarter(e.target.value)} />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="latitude">Latitude</Label>
                <Input id="latitude" type="number" step="any" value={latitude} onChange={(e) => setLatitude(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="longitude">Longitude</Label>
                <Input id="longitude" type="number" step="any" value={longitude} onChange={(e) => setLongitude(e.target.value)} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 4 - Caractéristiques */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Caractéristiques</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="bedrooms">Chambres</Label>
                <Input id="bedrooms" type="number" min="0" value={bedrooms} onChange={(e) => setBedrooms(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="bathrooms">Salles de bain</Label>
                <Input id="bathrooms" type="number" min="0" value={bathrooms} onChange={(e) => setBathrooms(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="garages">Garages</Label>
                <Input id="garages" type="number" min="0" value={garages} onChange={(e) => setGarages(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="maxGuests">Max voyageurs</Label>
                <Input id="maxGuests" type="number" min="0" value={maxGuests} onChange={(e) => setMaxGuests(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="plotArea">Terrain (m²)</Label>
                <Input id="plotArea" type="number" step="0.01" value={plotArea} onChange={(e) => setPlotArea(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="builtArea">Surface bâtie (m²)</Label>
                <Input id="builtArea" type="number" step="0.01" value={builtArea} onChange={(e) => setBuiltArea(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="yearBuilt">Année construction</Label>
                <Input id="yearBuilt" type="number" min="1900" max="2099" value={yearBuilt} onChange={(e) => setYearBuilt(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="minStay">Séjour min (nuits)</Label>
                <Input id="minStay" type="number" min="0" value={minStay} onChange={(e) => setMinStay(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="maxStay">Séjour max (nuits)</Label>
                <Input id="maxStay" type="number" min="0" value={maxStay} onChange={(e) => setMaxStay(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="checkInTime">Check-in</Label>
                <Input id="checkInTime" type="time" value={checkInTime} onChange={(e) => setCheckInTime(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="checkOutTime">Check-out</Label>
                <Input id="checkOutTime" type="time" value={checkOutTime} onChange={(e) => setCheckOutTime(e.target.value)} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 5 - Features */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Équipements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {FEATURES.map((feature) => (
                <label
                  key={feature}
                  className={`flex items-center gap-2 p-2.5 rounded-lg border cursor-pointer transition-colors ${
                    features[feature]
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-border hover:border-primary/30"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={features[feature]}
                    onChange={() => toggleFeature(feature)}
                    className="rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <span className="text-sm">{FEATURE_LABELS[feature]}</span>
                </label>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Section 6 - Images */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Images</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
              onDrop={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleImageUpload(e.dataTransfer.files);
              }}
              className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
            >
              <Upload className="mx-auto size-8 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">
                {uploading ? "Upload en cours..." : "Glissez vos images ici ou cliquez pour parcourir"}
              </p>
              <p className="text-xs text-muted-foreground mt-1">JPG, PNG, WebP — Max 10 Mo</p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={(e) => handleImageUpload(e.target.files)}
            />

            {images.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {images.map((image, index) => (
                  <div key={index} className="relative group rounded-lg border overflow-hidden">
                    <Image src={image.url} alt={image.alt} width={192} height={128} unoptimized className="object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
                      {index > 0 && (
                        <button type="button" onClick={() => moveImage(index, "up")} className="p-1 bg-white/20 rounded hover:bg-white/30">
                          <GripVertical className="size-4 text-white" />
                        </button>
                      )}
                      <button type="button" onClick={() => removeImage(index)} className="p-1 bg-red-500/60 rounded hover:bg-red-500/80">
                        <X className="size-4 text-white" />
                      </button>
                    </div>
                    <input
                      type="text"
                      placeholder="Texte alternatif"
                      value={image.alt}
                      onChange={(e) => updateImageAlt(index, e.target.value)}
                      className="w-full px-2 py-1 text-xs border-t border-border outline-none"
                    />
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Submit */}
        <div className="flex items-center gap-3">
          <Button type="submit" disabled={submitting}>
            {submitting ? "Création en cours..." : "Créer la propriété"}
          </Button>
          <Link href="/admin/properties">
            <Button type="button" variant="outline">Annuler</Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
