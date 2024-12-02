import React from 'react';
import type { UseFormRegister, FieldErrors, Control } from 'react-hook-form';

interface HuntingFormProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  control: Control<any>;
}

export function HuntingForm({ register, errors }: HuntingFormProps) {
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
            {...register('details.weight.value', { valueAsNumber: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Weight Unit
          </label>
          <select
            {...register('details.weight.unit')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="kg">Kilograms (kg)</option>
            <option value="lbs">Pounds (lbs)</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Hunting Method
        </label>
        <select
          {...register('details.method.type')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="bow">Bow</option>
          <option value="rifle">Rifle</option>
          <option value="shotgun">Shotgun</option>
          <option value="muzzleloader">Muzzleloader</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Weapon Details
        </label>
        <input
          type="text"
          {...register('details.method.weapon')}
          placeholder="e.g., Compound Bow, .308 Winchester..."
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Season</label>
        <input
          type="text"
          {...register('details.season')}
          placeholder="e.g., Fall 2023, Spring Turkey..."
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
    </>
  );
}