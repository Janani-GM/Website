import { useState, useRef, useEffect } from 'react';
import { X, RotateCw, Crop, Save } from 'lucide-react';
import Cropper from 'cropperjs';
import { Image } from '../../types';

interface ImageEditorProps {
  image: Image;
  onClose: () => void;
  onSave: (editedImageBlob: Blob, edits: Record<string, any>) => void;
}

export default function ImageEditor({ image, onClose, onSave }: ImageEditorProps) {
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [rotation, setRotation] = useState(0);
  const [isCropping, setIsCropping] = useState(false);
  const [saving, setSaving] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  const cropperRef = useRef<Cropper | null>(null);

  useEffect(() => {
    return () => {
      if (cropperRef.current) {
        const cropperInstance = cropperRef.current as any;
        cropperInstance.destroy();
      }
    };
  }, []);

  const toggleCrop = () => {
    if (!imageRef.current) return;

    if (isCropping) {
      if (cropperRef.current) {
        const cropperInstance = cropperRef.current as any;
        cropperInstance.destroy();
        cropperRef.current = null;
      }
      setIsCropping(false);
    } else {
      cropperRef.current = new Cropper(imageRef.current, {
        aspectRatio: NaN,
        autoCropArea: 1,
        guides: true,
        center: true,
        highlight: false,
        cropBoxMovable: true,
        cropBoxResizable: true,
      } as any);
      setIsCropping(true);
    }
  };

  const handleRotate = () => {
    const newRotation = (rotation + 90) % 360;
    setRotation(newRotation);
    if (cropperRef.current) {
      const cropperInstance = cropperRef.current as any;
      cropperInstance.rotate(90);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      let canvas: HTMLCanvasElement;

      if (cropperRef.current) {
        const cropperInstance = cropperRef.current as any;
        canvas = cropperInstance.getCroppedCanvas();
      } else if (imageRef.current) {
        canvas = document.createElement('canvas');
        const img = imageRef.current;
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.filter = `brightness(${brightness}%) contrast(${contrast}%)`;
          ctx.translate(canvas.width / 2, canvas.height / 2);
          ctx.rotate((rotation * Math.PI) / 180);
          ctx.drawImage(img, -canvas.width / 2, -canvas.height / 2);
        }
      } else {
        return;
      }

      canvas.toBlob((blob) => {
        if (blob) {
          const edits = {
            brightness,
            contrast,
            rotation,
            cropped: isCropping,
            timestamp: new Date().toISOString(),
          };
          onSave(blob, edits);
        }
        setSaving(false);
      }, 'image/jpeg', 0.95);
    } catch (error) {
      console.error('Error saving image:', error);
      setSaving(false);
    }
  };

  const filterStyle = isCropping
    ? undefined
    : {
        filter: `brightness(${brightness}%) contrast(${contrast}%)`,
        transform: `rotate(${rotation}deg)`,
      };

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      <div className="flex items-center justify-between p-4 bg-slate-900">
        <h2 className="text-white font-semibold text-lg">Edit Image</h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50"
          >
            <Save className="w-4 h-4 mr-2" />
            {saving ? 'Saving...' : 'Save'}
          </button>
          <button
            onClick={onClose}
            className="p-2 text-white hover:bg-white/10 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 flex items-center justify-center p-8 bg-slate-950">
          <img
            ref={imageRef}
            src={image.storage_path}
            alt={image.caption || image.filename}
            style={filterStyle}
            className="max-w-full max-h-full object-contain"
          />
        </div>

        <div className="w-80 bg-slate-900 p-6 overflow-y-auto space-y-6">
          <div>
            <h3 className="text-white font-medium mb-4">Tools</h3>
            <div className="space-y-3">
              <button
                onClick={toggleCrop}
                className={`w-full flex items-center px-4 py-3 rounded-lg transition ${
                  isCropping
                    ? 'bg-slate-700 text-white'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <Crop className="w-5 h-5 mr-3" />
                {isCropping ? 'Apply Crop' : 'Crop'}
              </button>

              <button
                onClick={handleRotate}
                disabled={isCropping}
                className="w-full flex items-center px-4 py-3 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700 transition disabled:opacity-50"
              >
                <RotateCw className="w-5 h-5 mr-3" />
                Rotate 90°
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-white font-medium mb-4">Adjustments</h3>
            <div className="space-y-4">
              <div>
                <label className="text-slate-300 text-sm mb-2 block">
                  Brightness: {brightness}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={brightness}
                  onChange={(e) => setBrightness(Number(e.target.value))}
                  disabled={isCropping}
                  className="w-full accent-slate-600 disabled:opacity-50"
                />
              </div>

              <div>
                <label className="text-slate-300 text-sm mb-2 block">
                  Contrast: {contrast}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={contrast}
                  onChange={(e) => setContrast(Number(e.target.value))}
                  disabled={isCropping}
                  className="w-full accent-slate-600 disabled:opacity-50"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-700">
            <button
              onClick={() => {
                setBrightness(100);
                setContrast(100);
                setRotation(0);
                if (cropperRef.current) {
                  const cropperInstance = cropperRef.current as any;
                  cropperInstance.destroy();
                  cropperRef.current = null;
                  setIsCropping(false);
                }
              }}
              className="w-full px-4 py-3 text-slate-300 hover:bg-slate-800 rounded-lg transition"
            >
              Reset All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
