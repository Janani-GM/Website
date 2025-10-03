import { Folder, MoreVertical, Trash2, Edit } from 'lucide-react';
import { Album } from '../../types';
import { useState } from 'react';

interface AlbumCardProps {
  album: Album;
  onSelect: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export default function AlbumCard({ album, onSelect, onEdit, onDelete }: AlbumCardProps) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="group relative bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-200">
      <div
        onClick={onSelect}
        className="cursor-pointer p-6"
      >
        <div className="flex items-center justify-center w-16 h-16 bg-slate-100 rounded-xl mb-4 group-hover:bg-slate-200 transition">
          <Folder className="w-8 h-8 text-slate-600" />
        </div>
        <h3 className="font-semibold text-slate-900 mb-1 truncate">{album.name}</h3>
        <p className="text-sm text-slate-500 truncate">{album.description || 'No description'}</p>
        <p className="text-xs text-slate-400 mt-2">
          {album.image_count || 0} {album.image_count === 1 ? 'image' : 'images'}
        </p>
      </div>

      <div className="absolute top-3 right-3">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowMenu(!showMenu);
          }}
          className="p-2 bg-white rounded-lg shadow-sm opacity-0 group-hover:opacity-100 transition hover:bg-slate-50"
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
    </div>
  );
}
