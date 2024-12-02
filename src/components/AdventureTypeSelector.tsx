import React from 'react';
import { Fish, Crosshair, Mountain } from 'lucide-react';
import type { AdventureType } from '../types/adventure';

interface AdventureTypeSelectorProps {
  value: AdventureType;
  onChange: (type: AdventureType) => void;
}

export function AdventureTypeSelector({ value, onChange }: AdventureTypeSelectorProps) {
  return (
    <div className="flex space-x-4">
      <button
        onClick={() => onChange('fishing')}
        className={`flex flex-col items-center p-4 rounded-lg border-2 transition-colors ${
          value === 'fishing'
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-200 hover:border-gray-300'
        }`}
      >
        <Fish className={`h-8 w-8 ${value === 'fishing' ? 'text-blue-500' : 'text-gray-500'}`} />
        <span className={`mt-2 text-sm font-medium ${value === 'fishing' ? 'text-blue-500' : 'text-gray-500'}`}>
          Fishing
        </span>
      </button>

      <button
        onClick={() => onChange('hunting')}
        className={`flex flex-col items-center p-4 rounded-lg border-2 transition-colors ${
          value === 'hunting'
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-200 hover:border-gray-300'
        }`}
      >
        <Crosshair className={`h-8 w-8 ${value === 'hunting' ? 'text-blue-500' : 'text-gray-500'}`} />
        <span className={`mt-2 text-sm font-medium ${value === 'hunting' ? 'text-blue-500' : 'text-gray-500'}`}>
          Hunting
        </span>
      </button>

      <button
        onClick={() => onChange('climbing')}
        className={`flex flex-col items-center p-4 rounded-lg border-2 transition-colors ${
          value === 'climbing'
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-200 hover:border-gray-300'
        }`}
      >
        <Mountain className={`h-8 w-8 ${value === 'climbing' ? 'text-blue-500' : 'text-gray-500'}`} />
        <span className={`mt-2 text-sm font-medium ${value === 'climbing' ? 'text-blue-500' : 'text-gray-500'}`}>
          Climbing
        </span>
      </button>
    </div>
  );
}