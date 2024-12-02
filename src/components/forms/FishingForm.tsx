import React from 'react';
import type { UseFormRegister, FieldErrors, Control } from 'react-hook-form';

interface FishingFormProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  control: Control<any>;
}

export function FishingForm({ register, errors }: FishingFormProps) {
  return (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-700">Species</label>
        <input
          type="text"
          {...register('details.species')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Weight</label>
          <input
            type="number"
            step="0.1"
            {...register('details.size.value', { valueAsNumber: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Weight Unit
          </label>
          <select
            {...register('details.size.unit')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="kg">Kilograms (kg)</option>
            <option value="lbs">Pounds (lbs)</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Length</label>
          <input
            type="number"
            step="0.1"
            {...register('details.length.value', { valueAsNumber: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Length Unit
          </label>
          <select
            {...register('details.length.unit')}
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
          {...register('details.method.type')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="spinning">Spinning</option>
          <option value="fly-fishing">Fly Fishing</option>
          <option value="bait-casting">Bait Casting</option>
          <option value="trolling">Trolling</option>
          <option value="bottom-fishing">Bottom Fishing</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Lure/Bait Used
        </label>
        <input
          type="text"
          {...register('details.method.lure')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
    </>
  );
}