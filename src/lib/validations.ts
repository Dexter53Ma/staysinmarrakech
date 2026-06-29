import { z } from "zod";

// Contact form
export const contactSchema = z.object({
  name: z.string().min(1, "Le nom est requis").max(200),
  email: z.string().email("Format d'email invalide"),
  phone: z.string().max(50).optional().nullable(),
  subject: z.string().max(200).optional().nullable(),
  message: z.string().min(10, "Le message doit contenir au moins 10 caractères").max(5000),
  propertyId: z.string().optional().nullable(),
});

// Newsletter
export const newsletterSchema = z.object({
  email: z.string().email("Format d'email invalide"),
  name: z.string().max(200).optional().nullable(),
});

// Booking
export const bookingSchema = z.object({
  propertyId: z.string().min(1, "Propriété requise"),
  guestName: z.string().min(1, "Le nom est requis").max(200),
  guestEmail: z.string().email("Format d'email invalide"),
  guestPhone: z.string().max(50).optional().nullable(),
  checkIn: z.string().min(1, "Date d'arrivée requise"),
  checkOut: z.string().min(1, "Date de départ requise"),
  guestsCount: z.coerce.number().int().min(1, "Minimum 1 voyageur").max(50),
  message: z.string().max(2000).optional().nullable(),
});

// Testimonial (admin create/update)
export const testimonialSchema = z.object({
  guestName: z.string().min(1).max(200),
  guestCountry: z.string().max(100).optional().nullable(),
  propertyName: z.string().max(200).optional().nullable(),
  duration: z.string().max(50).optional().nullable(),
  year: z.coerce.number().int().min(2000).max(2099).optional().nullable(),
  rating: z.coerce.number().int().min(1).max(5),
  reviewText: z.string().min(10).max(5000),
  isApproved: z.boolean().optional(),
});

// Hero slide (admin create/update)
export const heroSlideSchema = z.object({
  title: z.string().min(1, "Le titre est requis").max(200),
  subtitle: z.string().max(500).optional().nullable(),
  image: z.string().min(1, "L'image est requise"),
  link: z.string().max(500).optional().nullable(),
  buttonText: z.string().max(100).optional().nullable(),
  sortOrder: z.coerce.number().int().min(0).optional(),
  isActive: z.boolean().optional(),
});

// Blog post (admin create/update)
export const blogPostSchema = z.object({
  title: z.string().min(1, "Le titre est requis").max(300),
  slug: z.string().max(300).optional().nullable(),
  excerpt: z.string().max(1000).optional().nullable(),
  content: z.string().min(1, "Le contenu est requis"),
  image: z.string().max(500).optional().nullable(),
  author: z.string().max(100).optional().nullable(),
  category: z.string().max(100).optional().nullable(),
  isPublished: z.boolean().optional(),
  publishedAt: z.string().optional().nullable(),
});

// Service (admin create/update)
export const serviceSchema = z.object({
  title: z.string().min(1, "Le titre est requis").max(200),
  slug: z.string().max(200).optional().nullable(),
  description: z.string().max(2000).optional().nullable(),
  longDescription: z.string().optional().nullable(),
  metaDescription: z.string().max(500).optional().nullable(),
  features: z.string().max(2000).optional().nullable(),
  image: z.string().max(500).optional().nullable(),
  category: z.string().max(100).optional().nullable(),
  price: z.coerce.number().min(0).optional().nullable(),
  priceUnit: z.string().max(50).optional().nullable(),
  isActive: z.boolean().optional(),
  sortOrder: z.coerce.number().int().min(0).optional(),
});

// Property (admin create/update)
export const propertySchema = z.object({
  title: z.string().min(1, "Le titre est requis").max(200),
  slug: z.string().max(200).optional().nullable(),
  description: z.string().max(5000).optional().nullable(),
  type: z.enum(["VILLA", "RIAD", "APARTMENT"]).optional(),
  status: z.enum(["AVAILABLE", "SOLD", "RENTED", "PENDING", "MAINTENANCE"]).optional(),
  price: z.coerce.number().min(0).optional().nullable(),
  currency: z.string().max(10).optional().nullable(),
  pricePeriod: z.string().max(50).optional().nullable(),
  address: z.string().max(500).optional().nullable(),
  city: z.string().max(100).optional().nullable(),
  quarter: z.string().max(100).optional().nullable(),
  bedrooms: z.coerce.number().int().min(0).optional().nullable(),
  bathrooms: z.coerce.number().int().min(0).optional().nullable(),
  maxGuests: z.coerce.number().int().min(1).optional().nullable(),
  isFeatured: z.boolean().optional(),
});

// Location (admin create/update)
export const locationSchema = z.object({
  name: z.string().min(1, "Le nom est requis").max(200),
  slug: z.string().max(200).optional().nullable(),
  description: z.string().max(5000).optional().nullable(),
  metaDescription: z.string().max(500).optional().nullable(),
  image: z.string().max(500).optional().nullable(),
  isActive: z.boolean().optional(),
  sortOrder: z.coerce.number().int().min(0).optional(),
});

// Settings
export const settingsSchema = z.record(
  z.string().max(200),
  z.string().max(10000)
);

// Page content (admin create/update)
export const pageSchema = z.object({
  title: z.string().min(1).max(300),
  slug: z.string().max(300).optional().nullable(),
  content: z.string().optional().nullable(),
  metaDescription: z.string().max(500).optional().nullable(),
  isPublished: z.boolean().optional(),
});

// Contact ID action (admin update/delete)
export const contactIdSchema = z.object({
  action: z.enum(["delete", "read"]),
});

// Helper: validate and return errors in French
export function validate<T>(schema: z.ZodSchema<T>, data: unknown): { success: true; data: T } | { success: false; error: string } {
  const result = schema.safeParse(data);
  if (result.success) return { success: true, data: result.data };
  const firstError = result.error.issues[0];
  return { success: false, error: firstError?.message || "Données invalides" };
}
