import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import GalleryHeader from '../components/Gallery/GalleryHeader';
import AlbumCard from '../components/Gallery/AlbumCard';
import ImageCard from '../components/Gallery/ImageCard';
import Lightbox from '../components/Gallery/Lightbox';
import UploadModal from '../components/Gallery/UploadModal';
import CreateAlbumModal from '../components/Gallery/CreateAlbumModal';
import ImageEditor from '../components/Editor/ImageEditor';
import { Album, Image } from '../types';
import { FolderOpen, ImageIcon } from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();
  const [albums, setAlbums] = useState<Album[]>([]);
  const [images, setImages] = useState<Image[]>([]);
  const [selectedAlbum, setSelectedAlbum] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [editingImage, setEditingImage] = useState<Image | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showAlbumModal, setShowAlbumModal] = useState(false);
  const [editingAlbum, setEditingAlbum] = useState<Album | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'masonry'>('grid');
  const [activeTab, setActiveTab] = useState<'images' | 'albums'>('images');

  useEffect(() => {
    loadData();
  }, [user]);

  const loadData = () => {
    const mockAlbums: Album[] = [
      {
        id: '1',
        user_id: user?.id || '',
        name: 'Vacation 2024',
        description: 'Summer trip to the mountains',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        image_count: 12,
      },
      {
        id: '2',
        user_id: user?.id || '',
        name: 'Family Photos',
        description: 'Precious memories with loved ones',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        image_count: 8,
      },
    ];

    const mockImages: Image[] = [
      {
        id: '1',
        user_id: user?.id || '',
        storage_path: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg',
        thumbnail_path: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?w=400',
        filename: 'mountain-sunset.jpg',
        mime_type: 'image/jpeg',
        size: 2048000,
        width: 3840,
        height: 2160,
        caption: 'Beautiful mountain sunset',
        tags: ['nature', 'sunset', 'mountains'],
        position: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: '2',
        user_id: user?.id || '',
        storage_path: 'https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg',
        thumbnail_path: 'https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg?w=400',
        filename: 'lake-reflection.jpg',
        mime_type: 'image/jpeg',
        size: 1856000,
        width: 3840,
        height: 2560,
        caption: 'Peaceful lake reflection',
        tags: ['nature', 'water', 'landscape'],
        position: 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: '3',
        user_id: user?.id || '',
        storage_path: 'https://images.pexels.com/photos/1834399/pexels-photo-1834399.jpeg',
        thumbnail_path: 'https://images.pexels.com/photos/1834399/pexels-photo-1834399.jpeg?w=400',
        filename: 'forest-path.jpg',
        mime_type: 'image/jpeg',
        size: 2304000,
        width: 4000,
        height: 2667,
        caption: 'Misty forest path',
        tags: ['forest', 'nature', 'trees'],
        position: 2,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: '4',
        user_id: user?.id || '',
        storage_path: 'https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg',
        thumbnail_path: 'https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg?w=400',
        filename: 'beach-waves.jpg',
        mime_type: 'image/jpeg',
        size: 1920000,
        width: 3840,
        height: 2160,
        caption: 'Ocean waves at sunset',
        tags: ['beach', 'ocean', 'sunset'],
        position: 3,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: '5',
        user_id: user?.id || '',
        storage_path: 'https://images.pexels.com/photos/1477166/pexels-photo-1477166.jpeg',
        thumbnail_path: 'https://images.pexels.com/photos/1477166/pexels-photo-1477166.jpeg?w=400',
        filename: 'city-lights.jpg',
        mime_type: 'image/jpeg',
        size: 2176000,
        width: 4032,
        height: 3024,
        caption: 'City skyline at night',
        tags: ['city', 'urban', 'night'],
        position: 4,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: '6',
        user_id: user?.id || '',
        storage_path: 'https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg',
        thumbnail_path: 'https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?w=400',
        filename: 'desert-dunes.jpg',
        mime_type: 'image/jpeg',
        size: 1792000,
        width: 3840,
        height: 2560,
        caption: 'Desert sand dunes',
        tags: ['desert', 'sand', 'landscape'],
        position: 5,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ];

    setAlbums(mockAlbums);
    setImages(mockImages);
  };

  const handleUpload = (files: File[]) => {
    console.log('Uploading files:', files);
  };

  const handleCreateAlbum = (name: string, description: string) => {
    if (editingAlbum) {
      setAlbums(prev =>
        prev.map(a => (a.id === editingAlbum.id ? { ...a, name, description } : a))
      );
      setEditingAlbum(null);
    } else {
      const newAlbum: Album = {
        id: Date.now().toString(),
        user_id: user?.id || '',
        name,
        description,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        image_count: 0,
      };
      setAlbums(prev => [newAlbum, ...prev]);
    }
  };

  const handleDeleteAlbum = (albumId: string) => {
    if (confirm('Delete this album? Images will not be deleted.')) {
      setAlbums(prev => prev.filter(a => a.id !== albumId));
    }
  };

  const handleDeleteImage = (imageId: string) => {
    if (confirm('Delete this image permanently?')) {
      setImages(prev => prev.filter(i => i.id !== imageId));
      setSelectedImage(null);
    }
  };

  const handleSaveEdit = (_blob: Blob, edits: Record<string, any>) => {
    console.log('Saving edited image:', edits);
    setEditingImage(null);
  };

  const displayedImages = selectedAlbum
    ? images.filter(img => img.album_id === selectedAlbum)
    : images;

  const getImageIndex = (imageId: string) => {
    return displayedImages.findIndex(img => img.id === imageId);
  };

  const handleNavigateImage = (direction: 'prev' | 'next') => {
    if (!selectedImage) return;
    const currentIndex = getImageIndex(selectedImage.id);
    const newIndex = direction === 'prev' ? currentIndex - 1 : currentIndex + 1;
    if (newIndex >= 0 && newIndex < displayedImages.length) {
      setSelectedImage(displayedImages[newIndex]);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <GalleryHeader
        onUploadClick={() => setShowUploadModal(true)}
        onCreateAlbum={() => setShowAlbumModal(true)}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex items-center space-x-4 border-b border-slate-200">
          <button
            onClick={() => setActiveTab('images')}
            className={`pb-3 px-1 border-b-2 font-medium text-sm transition ${
              activeTab === 'images'
                ? 'border-slate-800 text-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <ImageIcon className="w-4 h-4 inline mr-2" />
            All Images ({images.length})
          </button>
          <button
            onClick={() => setActiveTab('albums')}
            className={`pb-3 px-1 border-b-2 font-medium text-sm transition ${
              activeTab === 'albums'
                ? 'border-slate-800 text-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <FolderOpen className="w-4 h-4 inline mr-2" />
            Albums ({albums.length})
          </button>
        </div>

        {activeTab === 'albums' ? (
          albums.length === 0 ? (
            <div className="text-center py-16">
              <FolderOpen className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-700 mb-2">No albums yet</h3>
              <p className="text-slate-500 mb-6">Create your first album to organize your photos</p>
              <button
                onClick={() => setShowAlbumModal(true)}
                className="px-6 py-3 bg-slate-800 text-white rounded-lg font-medium hover:bg-slate-700 transition"
              >
                Create Album
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {albums.map(album => (
                <AlbumCard
                  key={album.id}
                  album={album}
                  onSelect={() => {
                    setSelectedAlbum(album.id);
                    setActiveTab('images');
                  }}
                  onEdit={() => {
                    setEditingAlbum(album);
                    setShowAlbumModal(true);
                  }}
                  onDelete={() => handleDeleteAlbum(album.id)}
                />
              ))}
            </div>
          )
        ) : displayedImages.length === 0 ? (
          <div className="text-center py-16">
            <ImageIcon className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-700 mb-2">No images yet</h3>
            <p className="text-slate-500 mb-6">Upload your first photo to get started</p>
            <button
              onClick={() => setShowUploadModal(true)}
              className="px-6 py-3 bg-slate-800 text-white rounded-lg font-medium hover:bg-slate-700 transition"
            >
              Upload Images
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {displayedImages.map(image => (
              <ImageCard
                key={image.id}
                image={image}
                onSelect={() => setSelectedImage(image)}
                onEdit={() => setEditingImage(image)}
                onDelete={() => handleDeleteImage(image.id)}
                onShare={() => console.log('Share:', image.id)}
              />
            ))}
          </div>
        )}
      </div>

      {showUploadModal && (
        <UploadModal
          isOpen={showUploadModal}
          onClose={() => setShowUploadModal(false)}
          onUpload={handleUpload}
          albums={albums}
        />
      )}

      {showAlbumModal && (
        <CreateAlbumModal
          isOpen={showAlbumModal}
          onClose={() => {
            setShowAlbumModal(false);
            setEditingAlbum(null);
          }}
          onSubmit={handleCreateAlbum}
          initialData={
            editingAlbum
              ? { name: editingAlbum.name, description: editingAlbum.description }
              : undefined
          }
        />
      )}

      {selectedImage && (
        <Lightbox
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
          onPrevious={() => handleNavigateImage('prev')}
          onNext={() => handleNavigateImage('next')}
          onEdit={() => {
            setEditingImage(selectedImage);
            setSelectedImage(null);
          }}
          hasPrevious={getImageIndex(selectedImage.id) > 0}
          hasNext={getImageIndex(selectedImage.id) < displayedImages.length - 1}
        />
      )}

      {editingImage && (
        <ImageEditor
          image={editingImage}
          onClose={() => setEditingImage(null)}
          onSave={handleSaveEdit}
        />
      )}
    </div>
  );
}
