-- Populate English translations for services, locations, hero slides, blog posts, static pages
-- Run this in Supabase SQL Editor

-- Services: copy French to English as placeholders (update with real translations via Admin)
UPDATE "services" SET "title_en" = "title" WHERE "title_en" IS NULL;
UPDATE "services" SET "description_en" = "description" WHERE "description_en" IS NULL;
UPDATE "services" SET "long_description_en" = "longDescription" WHERE "long_description_en" IS NULL;

-- Locations: copy French to English as placeholders
UPDATE "locations" SET "name_en" = "name" WHERE "name_en" IS NULL;
UPDATE "locations" SET "description_en" = "description" WHERE "description_en" IS NULL;

-- Hero slides: copy French to English as placeholders
UPDATE "hero_slides" SET "title_en" = "title" WHERE "title_en" IS NULL;

-- Blog posts: copy French to English as placeholders
UPDATE "blog_posts" SET "title_en" = "title" WHERE "title_en" IS NULL;
UPDATE "blog_posts" SET "excerpt_en" = "excerpt" WHERE "excerpt_en" IS NULL;
UPDATE "blog_posts" SET "content_en" = "content" WHERE "content_en" IS NULL;

-- Static pages: copy French to English as placeholders
UPDATE "static_pages" SET "title_en" = "title" WHERE "title_en" IS NULL;
UPDATE "static_pages" SET "content_en" = "content" WHERE "content_en" IS NULL;
