import { X, ChevronLeft, ChevronRight, Edit, Download } from 'lucide-react';
import { Image } from '../../types';
import { useEffect } from 'react';

interface LightboxProps {
  image: Image;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onEdit: () => void;
  hasPrevious: boolean;
  hasNext: boolean;
}

export default function Lightbox({
  image,
  onClose,
  onPrevious,
  onNext,
  onEdit,
  hasPrevious,
  hasNext,
}: LightboxProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && hasPrevious) onPrevious();
      if (e.key === 'ArrowRight' && hasNext) onNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrevious, onNext, hasPrevious, hasNext]);

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      <div className="flex items-center justify-between p-4 bg-black/80">
        <div className="flex-1">
          <h3 className="text-white font-medium truncate">{image.filename}</h3>
          {image.caption && (
            <p className="text-slate-300 text-sm truncate">{image.caption}</p>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={onEdit}
            className="p-2 text-white hover:bg-white/10 rounded-lg transition"
          >
            <Edit className="w-5 h-5" />
          </button>
          <button
            onClick={() => window.open(image.storage_path, '_blank')}
            className="p-2 text-white hover:bg-white/10 rounded-lg transition"
          >
            <Download className="w-5 h-5" />
          </button>
          <button
            onClick={onClose}
            className="p-2 text-white hover:bg-white/10 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex-1 relative flex items-center justify-center p-4">
        <img
          src={image.storage_path}
          alt={image.caption || image.filename}
          className="max-w-full max-h-full object-contain"
        />

        {hasPrevious && (
          <button
            onClick={onPrevious}
            className="absolute left-4 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {hasNext && (
          <button
            onClick={onNext}
            className="absolute right-4 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>

      <div className="p-4 bg-black/80">
        <div className="flex items-center justify-between text-sm text-slate-300">
          <div className="flex items-center space-x-6">
            {image.width && image.height && (
              <span>{image.width} x {image.height}</span>
            )}
            <span>{(image.size / 1024 / 1024).toFixed(2)} MB</span>
            {image.tags.length > 0 && (
              <div className="flex items-center space-x-2">
                {image.tags.slice(0, 3).map(tag => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-white/10 rounded text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          <span>{new Date(image.created_at).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
}
