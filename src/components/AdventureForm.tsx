import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { AdventureType } from '../types/adventure';
import { AdventureTypeSelector } from './AdventureTypeSelector';
import { FishingForm } from './forms/FishingForm';
import { HuntingForm } from './forms/HuntingForm';
import { ClimbingForm } from './forms/ClimbingForm';

const baseSchema = z.object({
  type: z.enum(['fishing', 'hunting', 'climbing']),
  date: z.string(),
  location: z.object({
    name: z.string().min(1, 'Location is required'),
    coordinates: z.object({
      lat: z.number(),
      lng: z.number(),
    }),
    elevation: z.number().optional(),
  }),
  description: z.string(),
});

interface AdventureFormProps {
  onSubmit: (data: any) => void;
  initialData?: any;
}

export function AdventureForm({ onSubmit, initialData }: AdventureFormProps) {
  const [adventureType, setAdventureType] = React.useState<AdventureType>(
    initialData?.type || 'fishing'
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: zodResolver(baseSchema),
    defaultValues: initialData,
  });

  const renderForm = () => {
    switch (adventureType) {
      case 'fishing':
        return <FishingForm register={register} errors={errors} control={control} />;
      case 'hunting':
        return <HuntingForm register={register} errors={errors} control={control} />;
      case 'climbing':
        return <ClimbingForm register={register} errors={errors} control={control} />;
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <AdventureTypeSelector
        value={adventureType}
        onChange={(type) => setAdventureType(type)}
      />

      <div>
        <label className="block text-sm font-medium text-gray-700">Date</label>
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
        <label className="block text-sm font-medium text-gray-700">Location</label>
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

      {adventureType === 'climbing' && (
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Elevation (m)
          </label>
          <input
            type="number"
            {...register('location.elevation', { valueAsNumber: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      )}

      {renderForm()}

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
    </form>
  );
}