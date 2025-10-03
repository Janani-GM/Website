import { useAuth } from '../../contexts/AuthContext';
import { LogOut, Upload, FolderPlus, Grid, LayoutGrid } from 'lucide-react';

interface GalleryHeaderProps {
  onUploadClick: () => void;
  onCreateAlbum: () => void;
  viewMode: 'grid' | 'masonry';
  onViewModeChange: (mode: 'grid' | 'masonry') => void;
}

export default function GalleryHeader({
  onUploadClick,
  onCreateAlbum,
  viewMode,
  onViewModeChange,
}: GalleryHeaderProps) {
  const { user, signOut } = useAuth();

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center">
              <LayoutGrid className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Personal Gallery</h1>
              <p className="text-xs text-slate-500">{user?.email}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => onViewModeChange(viewMode === 'grid' ? 'masonry' : 'grid')}
              className="hidden sm:flex items-center px-3 py-2 text-sm font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition"
            >
              <Grid className="w-4 h-4 mr-2" />
              {viewMode === 'grid' ? 'Grid' : 'Masonry'}
            </button>

            <button
              onClick={onCreateAlbum}
              className="flex items-center px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition"
            >
              <FolderPlus className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Album</span>
            </button>

            <button
              onClick={onUploadClick}
              className="flex items-center px-4 py-2 text-sm font-medium text-white bg-slate-800 rounded-lg hover:bg-slate-700 transition"
            >
              <Upload className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Upload</span>
            </button>

            <button
              onClick={signOut}
              className="flex items-center px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
