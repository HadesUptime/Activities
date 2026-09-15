'use client';

import { User } from '@/types';

interface UserSelectorProps {
  currentUser: User;
  onUserChange: (user: User) => void;
}

export default function UserSelector({ currentUser, onUserChange }: UserSelectorProps) {
  return (
    <div className="flex gap-4 mb-8 justify-center">
      <button
        onClick={() => onUserChange('dindin')}
        className={`px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 ${
          currentUser === 'dindin'
            ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-xl ring-2 ring-blue-300'
            : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md border border-gray-200'
        }`}
      >
        Dindin
      </button>
      <button
        onClick={() => onUserChange('bebi-elai')}
        className={`px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 ${
          currentUser === 'bebi-elai'
            ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-xl ring-2 ring-purple-300'
            : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md border border-gray-200'
        }`}
      >
        Bebi Elai
      </button>
    </div>
  );
}
