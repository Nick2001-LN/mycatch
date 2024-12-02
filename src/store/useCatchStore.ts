import { create } from 'zustand';
import type { Catch, ImageUploadResponse } from '../types/catch';

interface CatchStore {
  catches: Catch[];
  isLoading: boolean;
  error: string | null;
  fetchCatches: () => Promise<void>;
  addCatch: (newCatch: Omit<Catch, 'id' | 'createdAt' | 'updatedAt'> & { image?: File }) => Promise<void>;
  updateCatch: (id: string, catchData: Partial<Catch> & { image?: File }) => Promise<void>;
  deleteCatch: (id: string) => Promise<void>;
  toggleLike: (catchId: string, userId: string) => Promise<void>;
  addComment: (catchId: string, comment: Omit<Comment, 'id' | 'createdAt'>) => Promise<void>;
  uploadImage: (file: File) => Promise<ImageUploadResponse>;
}

export const useCatchStore = create<CatchStore>((set, get) => ({
  catches: [],
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

  fetchCatches: async () => {
    set({ isLoading: true });
    try {
      // TODO: Replace with actual API call
      const response = await fetch('/api/catches');
      const data = await response.json();
      set({ catches: data, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch catches', isLoading: false });
    }
  },

  addCatch: async (newCatch) => {
    set({ isLoading: true });
    try {
      let imageUrl = '';
      if (newCatch.image) {
        const uploadResponse = await get().uploadImage(newCatch.image);
        imageUrl = uploadResponse.url;
      }

      const catchData = {
        ...newCatch,
        imageUrl,
      };

      // TODO: Replace with actual API call
      const response = await fetch('/api/catches', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(catchData),
      });
      const data = await response.json();
      set((state) => ({
        catches: [...state.catches, data],
        isLoading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to add catch', isLoading: false });
    }
  },

  updateCatch: async (id, catchData) => {
    set({ isLoading: true });
    try {
      let imageUrl = catchData.imageUrl;
      if (catchData.image) {
        const uploadResponse = await get().uploadImage(catchData.image);
        imageUrl = uploadResponse.url;
      }

      const updatedData = {
        ...catchData,
        imageUrl,
      };

      // TODO: Replace with actual API call
      const response = await fetch(`/api/catches/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
      const data = await response.json();
      set((state) => ({
        catches: state.catches.map((c) => (c.id === id ? data : c)),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to update catch', isLoading: false });
    }
  },

  deleteCatch: async (id) => {
    set({ isLoading: true });
    try {
      // TODO: Replace with actual API call
      await fetch(`/api/catches/${id}`, { method: 'DELETE' });
      set((state) => ({
        catches: state.catches.filter((c) => c.id !== id),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to delete catch', isLoading: false });
    }
  },

  toggleLike: async (catchId, userId) => {
    try {
      const catch_ = get().catches.find((c) => c.id === catchId);
      if (!catch_) return;

      const isLiked = catch_.likes.includes(userId);
      const method = isLiked ? 'DELETE' : 'POST';

      // TODO: Replace with actual API call
      await fetch(`/api/catches/${catchId}/likes`, { method });

      set((state) => ({
        catches: state.catches.map((c) => {
          if (c.id === catchId) {
            return {
              ...c,
              likes: isLiked
                ? c.likes.filter((id) => id !== userId)
                : [...c.likes, userId],
            };
          }
          return c;
        }),
      }));
    } catch (error) {
      set({ error: 'Failed to toggle like' });
    }
  },

  addComment: async (catchId, comment) => {
    try {
      // TODO: Replace with actual API call
      const response = await fetch(`/api/catches/${catchId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(comment),
      });
      const newComment = await response.json();

      set((state) => ({
        catches: state.catches.map((c) => {
          if (c.id === catchId) {
            return {
              ...c,
              comments: [...c.comments, newComment],
            };
          }
          return c;
        }),
      }));
    } catch (error) {
      set({ error: 'Failed to add comment' });
    }
  },
}));