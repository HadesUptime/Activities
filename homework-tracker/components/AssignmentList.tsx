'use client';

import { Assignment } from '@/types';
import { SUBJECTS } from '@/constants/subjects';
import { Check, X, ExternalLink, Image as ImageIcon, Edit, Trash2, Folder } from 'lucide-react';

interface AssignmentListProps {
  assignments: Assignment[];
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (assignment: Assignment) => void;
}

export default function AssignmentList({ assignments, onToggleComplete, onDelete, onEdit }: AssignmentListProps) {
  if (assignments.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p className="text-lg">No assignments yet</p>
        <p className="text-sm">Click "Add Assignment" to get started</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {assignments.map((assignment) => (
        <div
          key={assignment.id}
          className={`bg-white rounded-xl shadow-lg p-5 border-l-4 transition-all hover:shadow-xl ${
            assignment.completed ? 'border-green-500 opacity-75' : 'border-blue-500'
          }`}
        >
          <div className="flex items-start gap-4">
            <button
              onClick={() => onToggleComplete(assignment.id)}
              className={`mt-1 w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all ${
                assignment.completed
                  ? 'bg-green-500 border-green-500 text-white'
                  : 'border-gray-300 hover:border-green-500'
              }`}
            >
              {assignment.completed && <Check size={16} />}
            </button>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 text-xs font-medium rounded-full">
                  <Folder size={12} />
                  {assignment.subject}
                </span>
              </div>
              
              <h3
                className={`font-bold text-xl ${
                  assignment.completed ? 'line-through text-gray-500' : 'text-gray-900'
                }`}
              >
                {assignment.title}
              </h3>

              {assignment.description && (
                <p className={`text-sm mt-2 ${assignment.completed ? 'text-gray-400' : 'text-gray-600'}`}>
                  {assignment.description}
                </p>
              )}

              <div className="flex gap-3 mt-3">
                {assignment.imageUrl && (
                  <a
                    href={assignment.imageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 font-medium"
                  >
                    <ImageIcon size={14} />
                    Image
                  </a>
                )}
                {assignment.linkUrl && (
                  <a
                    href={assignment.linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 font-medium"
                  >
                    <ExternalLink size={14} />
                    Link
                  </a>
                )}
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => onEdit(assignment)}
                className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                title="Edit"
              >
                <Edit size={18} />
              </button>
              <button
                onClick={() => onDelete(assignment.id)}
                className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Delete"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
