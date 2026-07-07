import { z } from "zod";

const fr = {
  required: "est requis",
  emailInvalid: "Format d'email invalide",
  messageMin: "Le message doit contenir au moins 10 caractères",
  propertyRequired: "Propriété requise",
  dateRequired: "requise",
  minGuests: "Minimum 1 voyageur",
  titleRequired: "Le titre est requis",
  imageRequired: "L'image est requise",
  contentRequired: "Le contenu est requis",
  nameRequired: "Le nom est requis",
  invalidData: "Données invalides",
  maxImages: "Maximum 20 images par propriété",
};

const en = {
  required: "is required",
  emailInvalid: "Invalid email format",
  messageMin: "Message must contain at least 10 characters",
  propertyRequired: "Property required",
  dateRequired: "required",
  minGuests: "Minimum 1 guest",
  titleRequired: "Title is required",
  imageRequired: "Image is required",
  contentRequired: "Content is required",
  nameRequired: "Name is required",
  invalidData: "Invalid data",
  maxImages: "Maximum 20 images per property",
};

function t(locale: string, key: keyof typeof fr): string {
  return (locale === 'en' ? en : fr)[key];
}

function _contactSchema(locale: string = 'fr') {
  return z.object({
    name: z.string().min(1, t(locale, 'nameRequired')).max(200),
    email: z.string().email(t(locale, 'emailInvalid')),
    phone: z.string().max(50).optional().nullable(),
    subject: z.string().max(200).optional().nullable(),
    message: z.string().min(10, t(locale, 'messageMin')).max(5000),
    propertyId: z.string().optional().nullable(),
  });
}

function _newsletterSchema(locale: string = 'fr') {
  return z.object({
    email: z.string().email(t(locale, 'emailInvalid')),
    name: z.string().max(200).optional().nullable(),
  });
}

function _bookingSchema(locale: string = 'fr') {
  return z.object({
    propertyId: z.string().min(1, t(locale, 'propertyRequired')),
    guestName: z.string().min(1, t(locale, 'nameRequired')).max(200),
    guestEmail: z.string().email(t(locale, 'emailInvalid')),
    guestPhone: z.string().max(50).optional().nullable(),
    checkIn: z.string().min(1, t(locale, 'dateRequired')),
    checkOut: z.string().min(1, t(locale, 'dateRequired')),
    guestsCount: z.coerce.number().int().min(1, t(locale, 'minGuests')).max(50),
    message: z.string().max(2000).optional().nullable(),
  });
}

function _testimonialSchema(_locale: string = 'fr') {
  return z.object({
    guestName: z.string().min(1).max(200),
    guestCountry: z.string().max(100).optional().nullable(),
    propertyName: z.string().max(200).optional().nullable(),
    duration: z.string().max(50).optional().nullable(),
    year: z.coerce.number().int().min(2000).max(2099).optional().nullable(),
    rating: z.coerce.number().int().min(1).max(5),
    reviewText: z.string().min(10).max(5000),
    isApproved: z.boolean().optional(),
    propertyNameEn: z.string().max(200).optional().nullable(),
    reviewTextEn: z.string().max(5000).optional().nullable(),
  });
}

function _heroSlideSchema(locale: string = 'fr') {
  return z.object({
    title: z.string().min(1, t(locale, 'titleRequired')).max(200),
    subtitle: z.string().max(500).optional().nullable(),
    image: z.string().min(1, t(locale, 'imageRequired')),
    link: z.string().max(500).optional().nullable(),
    buttonText: z.string().max(100).optional().nullable(),
    sortOrder: z.coerce.number().int().min(0).optional(),
    isActive: z.boolean().optional(),
    titleEn: z.string().max(200).optional().nullable(),
    subtitleEn: z.string().max(500).optional().nullable(),
    buttonTextEn: z.string().max(100).optional().nullable(),
  });
}

function _blogPostSchema(locale: string = 'fr') {
  return z.object({
    title: z.string().min(1, t(locale, 'titleRequired')).max(300),
    slug: z.string().max(300).optional().nullable(),
    excerpt: z.string().max(1000).optional().nullable(),
    content: z.string().min(1, t(locale, 'contentRequired')),
    image: z.string().max(500).optional().nullable(),
    author: z.string().max(100).optional().nullable(),
    category: z.string().max(100).optional().nullable(),
    isPublished: z.boolean().optional(),
    publishedAt: z.string().optional().nullable(),
    titleEn: z.string().max(300).optional().nullable(),
    excerptEn: z.string().max(1000).optional().nullable(),
    contentEn: z.string().optional().nullable(),
  });
}

function _serviceSchema(locale: string = 'fr') {
  return z.object({
    title: z.string().min(1, t(locale, 'titleRequired')).max(200),
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
    titleEn: z.string().max(200).optional().nullable(),
    descriptionEn: z.string().max(2000).optional().nullable(),
    longDescriptionEn: z.string().optional().nullable(),
    metaDescriptionEn: z.string().max(500).optional().nullable(),
    featuresEn: z.string().max(2000).optional().nullable(),
  });
}

function _propertySchema(locale: string = 'fr') {
  return z.object({
    title: z.string().min(1, t(locale, 'titleRequired')).max(200),
    slug: z.string().max(200).optional().nullable(),
    description: z.string().max(5000).optional().nullable(),
    type: z.enum(["VILLA", "RIAD", "APARTMENT", "HOUSE", "LAND", "COMMERCIAL"]).optional(),
    status: z.enum(["AVAILABLE", "SOLD", "RENTED", "PENDING", "MAINTENANCE"]).optional(),
    price: z.coerce.number().min(0).optional().nullable(),
    currency: z.string().max(10).optional().nullable(),
    pricePeriod: z.string().max(50).optional().nullable(),
    cleaningFee: z.coerce.number().min(0).optional().nullable(),
    serviceFee: z.coerce.number().min(0).optional().nullable(),
    address: z.string().max(500).optional().nullable(),
    city: z.string().max(100).optional().nullable(),
    quarter: z.string().max(100).optional().nullable(),
    latitude: z.coerce.number().optional().nullable(),
    longitude: z.coerce.number().optional().nullable(),
    bedrooms: z.coerce.number().int().min(0).optional().nullable(),
    bathrooms: z.coerce.number().int().min(0).optional().nullable(),
    garages: z.coerce.number().int().min(0).optional().nullable(),
    maxGuests: z.coerce.number().int().min(0).optional().nullable(),
    plotArea: z.coerce.number().min(0).optional().nullable(),
    builtArea: z.coerce.number().min(0).optional().nullable(),
    yearBuilt: z.coerce.number().int().min(1900).max(2099).optional().nullable(),
    minStay: z.coerce.number().int().min(0).optional().nullable(),
    maxStay: z.coerce.number().int().min(0).optional().nullable(),
    checkInTime: z.string().max(10).optional().nullable(),
    checkOutTime: z.string().max(10).optional().nullable(),
    features: z.array(z.string()).optional(),
    isFeatured: z.boolean().optional(),
    images: z.array(z.object({ url: z.string(), alt: z.string().optional() })).max(20, t(locale, 'maxImages')).optional(),
    titleEn: z.string().max(200).optional().nullable(),
    descriptionEn: z.string().max(5000).optional().nullable(),
    quarterEn: z.string().max(100).optional().nullable(),
    addressEn: z.string().max(500).optional().nullable(),
  });
}

function _locationSchema(locale: string = 'fr') {
  return z.object({
    name: z.string().min(1, t(locale, 'nameRequired')).max(200),
    slug: z.string().max(200).optional().nullable(),
    description: z.string().max(5000).optional().nullable(),
    metaDescription: z.string().max(500).optional().nullable(),
    image: z.string().max(500).optional().nullable(),
    isActive: z.boolean().optional(),
    sortOrder: z.coerce.number().int().min(0).optional(),
    nameEn: z.string().max(200).optional().nullable(),
    descriptionEn: z.string().max(5000).optional().nullable(),
    metaDescriptionEn: z.string().max(500).optional().nullable(),
  });
}

function _pageSchema(_locale: string = 'fr') {
  return z.object({
    title: z.string().min(1).max(300),
    slug: z.string().max(300).optional().nullable(),
    content: z.string().optional().nullable(),
    metaDescription: z.string().max(500).optional().nullable(),
    isPublished: z.boolean().optional(),
    titleEn: z.string().max(300).optional().nullable(),
    contentEn: z.string().optional().nullable(),
    metaDescriptionEn: z.string().max(500).optional().nullable(),
  });
}

// Backward-compatible static exports (French defaults)
export const contactSchema = _contactSchema();
export const newsletterSchema = _newsletterSchema();
export const bookingSchema = _bookingSchema();
export const testimonialSchema = _testimonialSchema();
export const heroSlideSchema = _heroSlideSchema();
export const blogPostSchema = _blogPostSchema();
export const serviceSchema = _serviceSchema();
export const propertySchema = _propertySchema();
export const locationSchema = _locationSchema();
export const pageSchema = _pageSchema();

// Settings (no locale needed - keys are language-agnostic)
export const settingsSchema = z.record(
  z.string().max(200),
  z.string().max(10000)
);

// Contact ID action (admin update/delete)
export const contactIdSchema = z.object({
  action: z.enum(["delete", "read"]),
});

// Locale-aware factory functions
export const createContactSchema = _contactSchema;
export const createNewsletterSchema = _newsletterSchema;
export const createBookingSchema = _bookingSchema;
export const createTestimonialSchema = _testimonialSchema;
export const createHeroSlideSchema = _heroSlideSchema;
export const createBlogPostSchema = _blogPostSchema;
export const createServiceSchema = _serviceSchema;
export const createPropertySchema = _propertySchema;
export const createLocationSchema = _locationSchema;
export const createPageSchema = _pageSchema;

// Helper: validate and return errors
export function validate<T>(schema: z.ZodSchema<T>, data: unknown, locale: string = 'fr'): { success: true; data: T } | { success: false; error: string } {
  const result = schema.safeParse(data);
  if (result.success) return { success: true, data: result.data };
  const firstError = result.error.issues[0];
  return { success: false, error: firstError?.message || t(locale, 'invalidData') };
}
