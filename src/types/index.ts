import type { PropertyType, PropertyStatus, UserRole, BookingStatus, ContactStatus } from "@prisma/client";

export type { PropertyType, PropertyStatus, UserRole, BookingStatus, ContactStatus };

// ─── Property ────────────────────────────────────────────

export interface PropertyImage {
  id?: string;
  url: string;
  alt?: string | null;
  isPrimary?: boolean;
  sortOrder?: number;
}

export interface PropertyListItem {
  id: string;
  title: string;
  slug: string;
  type: string;
  status: string;
  price: number;
  currency: string;
  pricePeriod?: string | null;
  address: string;
  city: string;
  quarter?: string | null;
  bedrooms: number;
  bathrooms: number;
  images: PropertyImage[];
  _count?: { views: number };
}

export interface PropertyData {
  id: string;
  title: string;
  slug: string;
  description: string;
  type: string;
  status: string;
  price: number;
  currency: string;
  pricePeriod?: string;
  address: string;
  city: string;
  quarter?: string;
  latitude?: number;
  longitude?: number;
  bedrooms: number;
  bathrooms: number;
  garages: number;
  maxGuests?: number;
  plotArea?: number;
  builtArea?: number;
  yearBuilt?: number;
  features: string[] | string;
  cleaningFee?: number;
  serviceFee?: number;
  minStay?: number;
  maxStay?: number;
  checkInTime?: string;
  checkOutTime?: string;
  isFeatured: boolean;
  images: PropertyImage[];
  createdAt: string;
  updatedAt: string;
}

export interface SimilarProperty {
  id: string;
  title: string;
  slug: string;
  type: string;
  price: number;
  currency: string;
  pricePeriod?: string;
  bedrooms: number;
  bathrooms: number;
  address: string;
  city: string;
  quarter?: string;
  image: string | null;
  viewCount: number;
}

// ─── Booking ─────────────────────────────────────────────

export interface Booking {
  checkIn: string;
  checkOut: string;
}

// ─── Testimonial ─────────────────────────────────────────

export interface Testimonial {
  id: string;
  guestName: string;
  guestCountry?: string;
  duration?: string;
  year?: number;
  rating?: number;
  reviewText?: string;
}

// ─── UI Constants ────────────────────────────────────────

export const TYPE_LABELS: Record<string, string> = {
  VILLA: "Villa",
  APARTMENT: "Appartement",
  HOUSE: "Maison",
  LAND: "Terrain",
  COMMERCIAL: "Commercial",
};

export const TYPE_COLORS: Record<string, string> = {
  VILLA: "bg-purple-100 text-purple-800",
  APARTMENT: "bg-blue-100 text-blue-800",
  HOUSE: "bg-green-100 text-green-800",
  LAND: "bg-yellow-100 text-yellow-800",
  COMMERCIAL: "bg-red-100 text-red-800",
};

export const STATUS_LABELS: Record<string, string> = {
  AVAILABLE: "Disponible",
  SOLD: "Vendu",
  RENTED: "Loué",
  PENDING: "En attente",
  MAINTENANCE: "Maintenance",
};

export const STATUS_COLORS: Record<string, string> = {
  AVAILABLE: "bg-green-100 text-green-800",
  SOLD: "bg-red-100 text-red-800",
  RENTED: "bg-blue-100 text-blue-800",
  PENDING: "bg-yellow-100 text-yellow-800",
  MAINTENANCE: "bg-orange-100 text-orange-800",
};

// ─── Utilities ───────────────────────────────────────────

export function formatPrice(price: number, currency: string): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(price);
}
