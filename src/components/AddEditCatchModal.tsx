import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X } from 'lucide-react';
import { ImageUpload } from './ImageUpload';

const catchSchema = z.object({
  date: z.string(),
  location: z.object({
    name: z.string().min(1, 'Location is required'),
    coordinates: z.object({
      lat: z.number(),
      lng: z.number(),
    }),
  }),
  species: z.string().min(1, 'Species is required'),
  size: z.object({
    value: z.number().positive('Size must be positive'),
    unit: z.enum(['kg', 'lbs', 'cm', 'in']),
  }),
  length: z.object({
    value: z.number().positive('Length must be positive'),
    unit: z.enum(['cm', 'in']),
  }),
  method: z.object({
    type: z.enum(['spinning', 'fly-fishing', 'bait-casting', 'trolling', 'bottom-fishing', 'other']),
    lure: z.string().optional(),
  }),
  description: z.string(),
});

type CatchFormData = z.infer<typeof catchSchema>;

interface AddEditCatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CatchFormData & { image?: File }) => void;
  initialData?: Partial<CatchFormData>;
}

export function AddEditCatchModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}: AddEditCatchModalProps) {
  const [selectedImage, setSelectedImage] = React.useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<CatchFormData>({
    resolver: zodResolver(catchSchema),
    defaultValues: initialData,
  });

  const selectedMethod = watch('method.type');

  React.useEffect(() => {
    if (isOpen) {
      reset(initialData);
      setSelectedImage(null);
    }
  }, [isOpen, initialData, reset]);

  const onFormSubmit = (data: CatchFormData) => {
    onSubmit({
      ...data,
      image: selectedImage || undefined,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              {initialData ? 'Edit Catch' : 'Add New Catch'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image
              </label>
              <ImageUpload
                onImageSelect={(file) => setSelectedImage(file)}
                previewUrl={initialData?.imageUrl}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Date
              </label>
              <input
                type="date"
                {...register('date')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.date && (
                <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                type="text"
                {...register('location.name')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.location?.name && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.location.name.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Species
              </label>
              <input
                type="text"
                {...register('species')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.species && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.species.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Weight
                </label>
                <input
                  type="number"
                  step="0.1"
                  {...register('size.value', { valueAsNumber: true })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                {errors.size?.value && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.size.value.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Weight Unit
                </label>
                <select
                  {...register('size.unit')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="kg">Kilograms (kg)</option>
                  <option value="lbs">Pounds (lbs)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Length
                </label>
                <input
                  type="number"
                  step="0.1"
                  {...register('length.value', { valueAsNumber: true })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                {errors.length?.value && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.length.value.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Length Unit
                </label>
                <select
                  {...register('length.unit')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="cm">Centimeters (cm)</option>
                  <option value="in">Inches (in)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Fishing Method
              </label>
              <select
                {...register('method.type')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="spinning">Spinning</option>
                <option value="fly-fishing">Fly Fishing</option>
                <option value="bait-casting">Bait Casting</option>
                <option value="trolling">Trolling</option>
                <option value="bottom-fishing">Bottom Fishing</option>
                <option value="other">Other</option>
              </select>
              {errors.method?.type && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.method.type.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Lure/Bait Used
              </label>
              <input
                type="text"
                {...register('method.lure')}
                placeholder="e.g., Rapala, Worm, Fly pattern..."
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                {...register('description')}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {initialData ? 'Save Changes' : 'Add Catch'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}