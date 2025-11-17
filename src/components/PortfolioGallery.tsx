interface PortfolioImage {
  id: string;
  image_url: string;
  title: string | null;
  description: string | null;
}

interface PortfolioGalleryProps {
  images: PortfolioImage[];
}

const PortfolioGallery = ({ images }: PortfolioGalleryProps) => {
  if (images.length === 0) {
    return (
      <p className="text-center text-muted-foreground py-8">
        No portfolio images yet.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {images.map((image) => (
        <div
          key={image.id}
          className="group relative aspect-square overflow-hidden rounded-lg glass-card"
        >
          <img
            src={image.image_url}
            alt={image.title || "Portfolio image"}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          {(image.title || image.description) && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <div className="text-white">
                {image.title && <h4 className="font-semibold">{image.title}</h4>}
                {image.description && (
                  <p className="text-sm text-gray-200">{image.description}</p>
                )}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PortfolioGallery;
