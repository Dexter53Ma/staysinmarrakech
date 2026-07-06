"use client";

import {useLocale} from 'next-intl';
import {useRouter, usePathname} from '@/i18n/navigation';
import {Icon, faLanguage, faChevronDown} from "@/components/icons";
import {useState, useRef, useEffect} from "react";

const languages = [
  {code: 'fr', label: 'Français'},
  {code: 'en', label: 'English'},
];

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSwitch = (newLocale: string) => {
    router.push(pathname, {locale: newLocale});
    setOpen(false);
  };

  const current = languages.find(l => l.code === locale) ?? languages[0];

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 text-sm hover:text-[#d4a853] transition-colors"
      >
        <Icon icon={faLanguage} className="w-4 h-4" />
        <span>{current.label}</span>
        <Icon icon={faChevronDown} className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1 bg-white shadow-lg rounded-lg py-1 z-50 min-w-[120px]">
          {languages.map(lang => (
            <button
              key={lang.code}
              onClick={() => handleSwitch(lang.code)}
              className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors ${locale === lang.code ? 'text-[#d4a853] font-semibold' : 'text-gray-700'}`}
            >
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
