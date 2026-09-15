'use client';

import { Assignment } from '@/types';
import { Check, X, ExternalLink, Image as ImageIcon, Edit, Trash2 } from 'lucide-react';

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
    <div className="space-y-3">
      {assignments.map((assignment) => (
        <div
          key={assignment.id}
          className={`bg-white rounded-lg shadow-md p-4 border-l-4 transition-all ${
            assignment.completed ? 'border-green-500 opacity-75' : 'border-blue-500'
          }`}
        >
          <div className="flex items-start gap-4">
            <button
              onClick={() => onToggleComplete(assignment.id)}
              className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                assignment.completed
                  ? 'bg-green-500 border-green-500 text-white'
                  : 'border-gray-300 hover:border-green-500'
              }`}
            >
              {assignment.completed && <Check size={14} />}
            </button>

            <div className="flex-1 min-w-0">
              <h3
                className={`font-semibold text-lg ${
                  assignment.completed ? 'line-through text-gray-500' : 'text-gray-900'
                }`}
              >
                {assignment.title}
              </h3>

              {assignment.description && (
                <p className={`text-sm mt-1 ${assignment.completed ? 'text-gray-400' : 'text-gray-600'}`}>
                  {assignment.description}
                </p>
              )}

              <div className="flex gap-2 mt-2">
                {assignment.imageUrl && (
                  <a
                    href={assignment.imageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
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
                    className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
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
