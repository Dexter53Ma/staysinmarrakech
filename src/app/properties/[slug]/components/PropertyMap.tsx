"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";

interface PropertyMapProps {
  latitude: number;
  longitude: number;
}

export default function PropertyMap({ latitude, longitude }: PropertyMapProps) {
  const [showMap, setShowMap] = useState(false);

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-4">Emplacement</h2>
      <button
        onClick={() => setShowMap(!showMap)}
        className="text-sm text-[#0d47a1] hover:underline mb-3 flex items-center gap-1"
      >
        <MapPin className="size-4" />
        {showMap ? "Masquer la carte" : "Voir sur la carte"}
      </button>
      {showMap && (
        <div className="h-[350px] rounded-xl overflow-hidden border border-gray-200">
          <iframe
            src={`https://www.openstreetmap.org/export/embed.html?bbox=${longitude - 0.01}%2C${latitude - 0.01}%2C${longitude + 0.01}%2C${latitude + 0.01}&layer=mapnik&marker=${latitude}%2C${longitude}`}
            className="w-full h-full border-0"
            loading="lazy"
            title="Emplacement de la propriété"
          />
        </div>
      )}
    </div>
  );
}
