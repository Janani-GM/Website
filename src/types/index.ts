export interface Album {
  id: string;
  user_id: string;
  name: string;
  description: string;
  cover_image_id?: string;
  created_at: string;
  updated_at: string;
  image_count?: number;
}

export interface Image {
  id: string;
  user_id: string;
  album_id?: string;
  storage_path: string;
  thumbnail_path: string;
  filename: string;
  mime_type: string;
  size: number;
  width?: number;
  height?: number;
  caption: string;
  tags: string[];
  exif_data?: Record<string, any>;
  position: number;
  created_at: string;
  updated_at: string;
}

export interface ImageVersion {
  id: string;
  image_id: string;
  user_id: string;
  storage_path: string;
  edits: Record<string, any>;
  version_number: number;
  created_at: string;
}

export interface Share {
  id: string;
  user_id: string;
  resource_type: 'image' | 'album';
  resource_id: string;
  share_token: string;
  password_hash?: string;
  expires_at?: string;
  view_count: number;
  created_at: string;
}

export interface User {
  id: string;
  email: string;
}
