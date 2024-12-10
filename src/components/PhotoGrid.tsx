import { useState } from 'react';

interface Photo {
  url: string;
  alt: string;
  span?: 'row' | 'col' | 'both';
}

const photos: Photo[] = [
  {
    url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80",
    alt: "Interior del restaurante",
    span: "both"
  },
  {
    url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80",
    alt: "Plato gourmet",
  },
  {
    url: "https://images.unsplash.com/photo-1551326844-4df70f78d0e9?auto=format&fit=crop&q=80",
    alt: "Chef preparando un plato",
    span: "row"
  },
  {
    url: "https://images.unsplash.com/photo-1560717845-968823efbee1?auto=format&fit=crop&q=80",
    alt: "Detalle de plato",
  },
  {
    url: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80",
    alt: "Vista de la cocina",
    span: "col"
  },
  {
    url: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80",
    alt: "Ambiente nocturno",
  }
];

export function PhotoGrid() {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {photos.map((photo, index) => (
          <div
            key={photo.url}
            className={`relative cursor-pointer overflow-hidden rounded-lg ${
              photo.span === 'row' ? 'md:col-span-2' :
              photo.span === 'col' ? 'md:row-span-2' :
              photo.span === 'both' ? 'md:col-span-2 md:row-span-2' : ''
            }`}
            onClick={() => setSelectedPhoto(photo.url)}
          >
            <img
              src={photo.url}
              alt={photo.alt}
              className="w-full h-full object-cover aspect-square transition-transform duration-300 hover:scale-110"
            />
          </div>
        ))}
      </div>

      {/* Modal para vista ampliada */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <img
            src={selectedPhoto}
            alt="Vista ampliada"
            className="max-w-full max-h-[90vh] object-contain"
          />
        </div>
      )}
    </>
  );
}