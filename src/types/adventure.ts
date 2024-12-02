export type AdventureType = 'fishing' | 'hunting' | 'climbing';

export interface Adventure {
  id: string;
  userId: string;
  type: AdventureType;
  imageUrl: string;
  date: Date;
  location: {
    name: string;
    coordinates: {
      lat: number;
      lng: number;
    };
    elevation?: number; // For climbing
  };
  details: FishingDetails | HuntingDetails | ClimbingDetails;
  description: string;
  likes: string[];
  comments: Comment[];
  createdAt: Date;
  updatedAt: Date;
}

export interface FishingDetails {
  species: string;
  size: Measurement;
  length: Measurement;
  method: {
    type: 'spinning' | 'fly-fishing' | 'bait-casting' | 'trolling' | 'bottom-fishing' | 'other';
    lure?: string;
  };
}

export interface HuntingDetails {
  species: string;
  weight: Measurement;
  method: {
    type: 'bow' | 'rifle' | 'shotgun' | 'muzzleloader' | 'other';
    weapon?: string;
  };
  season: string;
}

export interface ClimbingDetails {
  routeName: string;
  grade: string;
  style: 'sport' | 'trad' | 'bouldering' | 'alpine' | 'ice' | 'mixed';
  height: Measurement;
  firstAscent: boolean;
  partners?: string[];
}

export interface Measurement {
  value: number;
  unit: 'kg' | 'lbs' | 'cm' | 'in' | 'm' | 'ft';
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