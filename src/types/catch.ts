export interface Catch {
  id: string;
  userId: string;
  imageUrl: string;
  date: Date;
  location: {
    name: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  species: string;
  size: {
    value: number;
    unit: 'kg' | 'lbs' | 'cm' | 'in';
  };
  length: {
    value: number;
    unit: 'cm' | 'in';
  };
  method: {
    type: 'spinning' | 'fly-fishing' | 'bait-casting' | 'trolling' | 'bottom-fishing' | 'other';
    lure?: string;
  };
  description: string;
  likes: string[];
  comments: Comment[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Comment {
  id: string;
  userId: string;
  text: string;
  createdAt: Date;
}

export interface User {
  id: string;
  username: string;
  profilePicture: string;
}

export interface ImageUploadResponse {
  url: string;
}