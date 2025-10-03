import { MoreVertical, Trash2, Edit, Share2, Download } from 'lucide-react';
import { Image } from '../../types';
import { useState } from 'react';

interface ImageCardProps {
  image: Image;
  onSelect: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onShare: () => void;
}

export default function ImageCard({ image, onSelect, onEdit, onDelete, onShare }: ImageCardProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-200">
      <div
        onClick={onSelect}
        className="cursor-pointer aspect-square overflow-hidden bg-slate-100"
      >
        <img
          src={image.thumbnail_path}
          alt={image.caption || image.filename}
          className={`w-full h-full object-cover transition-all duration-300 ${
            isLoading ? 'opacity-0' : 'opacity-100 group-hover:scale-105'
          }`}
          onLoad={() => setIsLoading(false)}
        />
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-slate-300 border-t-slate-600 rounded-full animate-spin" />
          </div>
        )}
      </div>

      <div className="absolute top-2 right-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowMenu(!showMenu);
          }}
          className="p-2 bg-white rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition hover:bg-slate-50"
        >
          <MoreVertical className="w-4 h-4 text-slate-600" />
        </button>

        {showMenu && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setShowMenu(false)}
            />
            <div className="absolute right-0 top-10 bg-white rounded-lg shadow-lg border border-slate-200 py-1 z-20 w-40">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit();
                  setShowMenu(false);
                }}
                className="w-full flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onShare();
                  setShowMenu(false);
                }}
                className="w-full flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(image.storage_path, '_blank');
                  setShowMenu(false);
                }}
                className="w-full flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete();
                  setShowMenu(false);
                }}
                className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </button>
            </div>
          </>
        )}
      </div>

      {image.caption && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 opacity-0 group-hover:opacity-100 transition">
          <p className="text-white text-sm truncate">{image.caption}</p>
        </div>
      )}
    </div>
  );
}
