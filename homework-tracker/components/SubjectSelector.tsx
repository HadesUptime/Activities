'use client';

import { SUBJECTS } from '@/constants/subjects';

interface SubjectSelectorProps {
  selectedSubject: string | null;
  onSubjectChange: (subject: string | null) => void;
}

export default function SubjectSelector({ selectedSubject, onSubjectChange }: SubjectSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <button
        onClick={() => onSubjectChange(null)}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
          selectedSubject === null
            ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg scale-105'
            : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
        }`}
      >
        All Subjects
      </button>
      {SUBJECTS.map((subject) => (
        <button
          key={subject}
          onClick={() => onSubjectChange(subject)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            selectedSubject === subject
              ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg scale-105'
              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          {subject}
        </button>
      ))}
    </div>
  );
}
