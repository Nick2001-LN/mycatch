import { create } from 'zustand';
import type { Adventure, ImageUploadResponse } from '../types/adventure';

interface AdventureStore {
  adventures: Adventure[];
  isLoading: boolean;
  error: string | null;
  fetchAdventures: () => Promise<void>;
  addAdventure: (newAdventure: Omit<Adventure, 'id' | 'createdAt' | 'updatedAt'> & { image?: File }) => Promise<void>;
  updateAdventure: (id: string, adventureData: Partial<Adventure> & { image?: File }) => Promise<void>;
  deleteAdventure: (id: string) => Promise<void>;
  toggleLike: (adventureId: string, userId: string) => Promise<void>;
  addComment: (adventureId: string, comment: Omit<Comment, 'id' | 'createdAt'>) => Promise<void>;
  uploadImage: (file: File) => Promise<ImageUploadResponse>;
}

export const useAdventureStore = create<AdventureStore>((set, get) => ({
  adventures: [],
  isLoading: false,
  error: null,

  uploadImage: async (file: File) => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      // TODO: Replace with actual API call
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      return await response.json();
    } catch (error) {
      throw new Error('Failed to upload image');
    }
  },

  fetchAdventures: async () => {
    set({ isLoading: true });
    try {
      // TODO: Replace with actual API call
      const response = await fetch('/api/adventures');
      const data = await response.json();
      set({ adventures: data, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch adventures', isLoading: false });
    }
  },

  addAdventure: async (newAdventure) => {
    set({ isLoading: true });
    try {
      let imageUrl = '';
      if (newAdventure.image) {
        const uploadResponse = await get().uploadImage(newAdventure.image);
        imageUrl = uploadResponse.url;
      }

      const adventureData = {
        ...newAdventure,
        imageUrl,
      };

      // TODO: Replace with actual API call
      const response = await fetch('/api/adventures', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(adventureData),
      });
      const data = await response.json();
      set((state) => ({
        adventures: [...state.adventures, data],
        isLoading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to add adventure', isLoading: false });
    }
  },

  updateAdventure: async (id, adventureData) => {
    set({ isLoading: true });
    try {
      let imageUrl = adventureData.imageUrl;
      if (adventureData.image) {
        const uploadResponse = await get().uploadImage(adventureData.image);
        imageUrl = uploadResponse.url;
      }

      const updatedData = {
        ...adventureData,
        imageUrl,
      };

      // TODO: Replace with actual API call
      const response = await fetch(`/api/adventures/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
      const data = await response.json();
      set((state) => ({
        adventures: state.adventures.map((a) => (a.id === id ? data : a)),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to update adventure', isLoading: false });
    }
  },

  deleteAdventure: async (id) => {
    set({ isLoading: true });
    try {
      // TODO: Replace with actual API call
      await fetch(`/api/adventures/${id}`, { method: 'DELETE' });
      set((state) => ({
        adventures: state.adventures.filter((a) => a.id !== id),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to delete adventure', isLoading: false });
    }
  },

  toggleLike: async (adventureId, userId) => {
    try {
      const adventure = get().adventures.find((a) => a.id === adventureId);
      if (!adventure) return;

      const isLiked = adventure.likes.includes(userId);
      const method = isLiked ? 'DELETE' : 'POST';

      // TODO: Replace with actual API call
      await fetch(`/api/adventures/${adventureId}/likes`, { method });

      set((state) => ({
        adventures: state.adventures.map((a) => {
          if (a.id === adventureId) {
            return {
              ...a,
              likes: isLiked
                ? a.likes.filter((id) => id !== userId)
                : [...a.likes, userId],
            };
          }
          return a;
        }),
      }));
    } catch (error) {
      set({ error: 'Failed to toggle like' });
    }
  },

  addComment: async (adventureId, comment) => {
    try {
      // TODO: Replace with actual API call
      const response = await fetch(`/api/adventures/${adventureId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(comment),
      });
      const newComment = await response.json();

      set((state) => ({
        adventures: state.adventures.map((a) => {
          if (a.id === adventureId) {
            return {
              ...a,
              comments: [...a.comments, newComment],
            };
          }
          return a;
        }),
      }));
    } catch (error) {
      set({ error: 'Failed to add comment' });
    }
  },
}));