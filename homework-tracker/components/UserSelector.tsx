'use client';

import { User } from '@/types';

interface UserSelectorProps {
  currentUser: User;
  onUserChange: (user: User) => void;
}

export default function UserSelector({ currentUser, onUserChange }: UserSelectorProps) {
  return (
    <div className="flex gap-4 mb-8">
      <button
        onClick={() => onUserChange('dindin')}
        className={`px-6 py-3 rounded-lg font-medium transition-all ${
          currentUser === 'dindin'
            ? 'bg-blue-500 text-white shadow-lg scale-105'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        Dindin
      </button>
      <button
        onClick={() => onUserChange('bebi-elai')}
        className={`px-6 py-3 rounded-lg font-medium transition-all ${
          currentUser === 'bebi-elai'
            ? 'bg-purple-500 text-white shadow-lg scale-105'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        Bebi Elai
      </button>
    </div>
  );
}
