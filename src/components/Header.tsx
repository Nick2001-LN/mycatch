import React from 'react';
import { PlusCircle, Fish } from 'lucide-react';

interface HeaderProps {
  onAddClick: () => void;
}

export function Header({ onAddClick }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Fish className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">My Catches</h1>
          </div>
          <button
            onClick={onAddClick}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <PlusCircle className="h-5 w-5 mr-2" />
            Add Catch
          </button>
        </div>
      </div>
    </header>
  );
}