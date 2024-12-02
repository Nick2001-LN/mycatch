import React from 'react';
import type { UseFormRegister, FieldErrors, Control } from 'react-hook-form';

interface ClimbingFormProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  control: Control<any>;
}

export function ClimbingForm({ register, errors }: ClimbingFormProps) {
  return (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Route Name
        </label>
        <input
          type="text"
          {...register('details.routeName')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Grade</label>
        <input
          type="text"
          {...register('details.grade')}
          placeholder="e.g., 5.10a, V5, WI4..."
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Style</label>
        <select
          {...register('details.style')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="sport">Sport</option>
          <option value="trad">Trad</option>
          <option value="bouldering">Bouldering</option>
          <option value="alpine">Alpine</option>
          <option value="ice">Ice</option>
          <option value="mixed">Mixed</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Height</label>
          <input
            type="number"
            step="0.1"
            {...register('details.height.value', { valueAsNumber: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Height Unit
          </label>
          <select
            {...register('details.height.unit')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="m">Meters (m)</option>
            <option value="ft">Feet (ft)</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          First Ascent?
        </label>
        <input
          type="checkbox"
          {...register('details.firstAscent')}
          className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Partners (comma-separated)
        </label>
        <input
          type="text"
          {...register('details.partners')}
          placeholder="e.g., John Doe, Jane Smith..."
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
    </>
  );
}