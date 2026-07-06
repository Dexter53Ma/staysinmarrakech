-- AlterTable: Add _en columns for i18n support

-- SiteSetting
ALTER TABLE "site_settings" ADD COLUMN "value_en" TEXT;

-- Service
ALTER TABLE "services" ADD COLUMN "title_en" TEXT;
ALTER TABLE "services" ADD COLUMN "description_en" TEXT;
ALTER TABLE "services" ADD COLUMN "long_description_en" TEXT;
ALTER TABLE "services" ADD COLUMN "meta_description_en" TEXT;
ALTER TABLE "services" ADD COLUMN "features_en" TEXT;

-- Location
ALTER TABLE "locations" ADD COLUMN "name_en" TEXT;
ALTER TABLE "locations" ADD COLUMN "description_en" TEXT;

-- HeroSlide
ALTER TABLE "hero_slides" ADD COLUMN "title_en" TEXT;
ALTER TABLE "hero_slides" ADD COLUMN "subtitle_en" TEXT;
ALTER TABLE "hero_slides" ADD COLUMN "button_text_en" TEXT;

-- StaticPage
ALTER TABLE "static_pages" ADD COLUMN "title_en" TEXT;
ALTER TABLE "static_pages" ADD COLUMN "content_en" TEXT;
ALTER TABLE "static_pages" ADD COLUMN "meta_desc_en" TEXT;

-- BlogPost
ALTER TABLE "blog_posts" ADD COLUMN "title_en" TEXT;
ALTER TABLE "blog_posts" ADD COLUMN "excerpt_en" TEXT;
ALTER TABLE "blog_posts" ADD COLUMN "content_en" TEXT;
