export interface Villa {
  id: string;
  title: string;
  slug: string;
  image: string;
  terrain: string;
  surface: string;
  chambres: number;
  pax: number;
  link: string;
}

export interface Quartier {
  id: string;
  name: string;
  image: string;
  slug: string;
}

export interface Activity {
  id: string;
  name: string;
  image: string;
  slug: string;
}

export interface BlogPost {
  id: string;
  title: string;
  image: string;
  excerpt: string;
  date: string;
  slug: string;
}

export interface NavLink {
  text: string;
  href: string;
  children?: NavLink[];
}

export interface FooterSection {
  title: string;
  links: { text: string; href: string }[];
}

export interface ContactInfo {
  phone1: string;
  phone2: string;
  email: string;
  address: string;
  website: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}
