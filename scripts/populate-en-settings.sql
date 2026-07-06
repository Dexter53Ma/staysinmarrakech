-- Populate English translations for site settings
-- Run this in Supabase SQL Editor

-- Hero
UPDATE "site_settings" SET "value_en" = 'Luxury Villas in Marrakech' WHERE "key" = 'hero_title';
UPDATE "site_settings" SET "value_en" = 'Your dream stay in the heart of the red city' WHERE "key" = 'hero_subtitle';

-- Site info
UPDATE "site_settings" SET "value_en" = 'StaysInMarrakech' WHERE "key" = 'site_name';
UPDATE "site_settings" SET "value_en" = 'StaysInMarrakech specializes in luxury and prestige villa rentals and sales in Marrakech' WHERE "key" = 'site_description';
UPDATE "site_settings" SET "value_en" = 'Residence Farah, Camp Mangin, Gueliz, 40000 Marrakech' WHERE "key" = 'address';

-- Location section
UPDATE "site_settings" SET "value_en" = 'StaysInMarrakech: Luxury Villa Rental in Marrakech' WHERE "key" = 'location_title';
UPDATE "site_settings" SET "value_en" = 'StaysInMarrakech specializes in luxury and prestige villa rentals in Marrakech.' WHERE "key" = 'location_description';
UPDATE "site_settings" SET "value_en" = 'Learn more' WHERE "key" = 'location_link_text';

-- Short-term rental
UPDATE "site_settings" SET "value_en" = 'Short-Term Luxury Villa Rental in Marrakech' WHERE "key" = 'shortrental_title';
UPDATE "site_settings" SET "value_en" = 'Our team knows Marrakech perfectly and is passionate about offering charming and characterful villas, ideal for a luxury villa rental in Marrakech. These villas stand out for their exceptional architecture, privileged location, refined furnishings, and careful decoration.' WHERE "key" = 'shortrental_description';
UPDATE "site_settings" SET "value_en" = 'Contact us' WHERE "key" = 'shortrental_link_text';

-- Events
UPDATE "site_settings" SET "value_en" = 'Event Villa Rental in Marrakech' WHERE "key" = 'events_title';
UPDATE "site_settings" SET "value_en" = 'Organize your events in an exceptional setting with our luxury villas in Marrakech. Whether for a party, wedding, birthday in a luxury villa, or a private meeting, StaysInMarrakech offers you an exclusive selection of villas to rent in Marrakech.' WHERE "key" = 'events_description';

-- Vacations
UPDATE "site_settings" SET "value_en" = 'Luxury Vacation Villa Rental in Marrakech' WHERE "key" = 'vacations_title';
UPDATE "site_settings" SET "value_en" = 'Discover our luxury villas in Marrakech, perfect for an unforgettable vacation. Book now and enjoy an exceptional stay with personalized services.' WHERE "key" = 'vacations_description';
