'use client';

import { useState, useEffect } from 'react';
import { User, Assignment, UserData } from '@/types';
import { PastefyService } from '@/lib/pastefy';
import UserSelector from '@/components/UserSelector';
import AssignmentList from '@/components/AssignmentList';
import AssignmentForm from '@/components/AssignmentForm';
import { Plus, BookOpen, Loader2 } from 'lucide-react';

export default function Home() {
  const [currentUser, setCurrentUser] = useState<User>('dindin');
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState<Assignment | undefined>();
  const [error, setError] = useState<string | null>(null);

  const loadUserData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await PastefyService.getUserData(currentUser);
      setUserData(data);
    } catch (err) {
      setError('Failed to load assignments. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUserData();
  }, [currentUser]);

  const handleAddAssignment = async (assignment: Omit<Assignment, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const updatedData = await PastefyService.addAssignment(currentUser, assignment);
      setUserData(updatedData);
      setShowForm(false);
    } catch (err) {
      setError('Failed to add assignment. Please try again.');
      console.error(err);
    }
  };

  const handleEditAssignment = async (assignment: Omit<Assignment, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!editingAssignment) return;
    try {
      const updatedData = await PastefyService.updateAssignment(currentUser, editingAssignment.id, assignment);
      setUserData(updatedData);
      setEditingAssignment(undefined);
    } catch (err) {
      setError('Failed to update assignment. Please try again.');
      console.error(err);
    }
  };

  const handleDeleteAssignment = async (id: string) => {
    try {
      const updatedData = await PastefyService.deleteAssignment(currentUser, id);
      setUserData(updatedData);
    } catch (err) {
      setError('Failed to delete assignment. Please try again.');
      console.error(err);
    }
  };

  const handleToggleComplete = async (id: string) => {
    try {
      const updatedData = await PastefyService.toggleAssignmentComplete(currentUser, id);
      setUserData(updatedData);
    } catch (err) {
      setError('Failed to update assignment. Please try again.');
      console.error(err);
    }
  };

  const handleEditClick = (assignment: Assignment) => {
    setEditingAssignment(assignment);
  };

  const completedCount = userData?.assignments.filter(a => a.completed).length || 0;
  const totalCount = userData?.assignments.length || 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <BookOpen size={32} className="text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">Homework Tracker</h1>
          </div>
          <p className="text-gray-600">Track your assignments and stay organized</p>
        </header>

        <UserSelector currentUser={currentUser} onUserChange={setCurrentUser} />

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {userData?.name || currentUser === 'dindin' ? 'Dindin' : 'Bebi Elai'}'s Assignments
              </h2>
              <p className="text-sm text-gray-600">
                {completedCount} of {totalCount} completed
              </p>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors shadow-md"
            >
              <Plus size={20} />
              Add Assignment
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 size={32} className="animate-spin text-blue-500" />
            </div>
          ) : (
            <AssignmentList
              assignments={userData?.assignments || []}
              onToggleComplete={handleToggleComplete}
              onDelete={handleDeleteAssignment}
              onEdit={handleEditClick}
            />
          )}
        </div>

        {showForm && (
          <AssignmentForm
            onSave={handleAddAssignment}
            onCancel={() => setShowForm(false)}
          />
        )}

        {editingAssignment && (
          <AssignmentForm
            assignment={editingAssignment}
            onSave={handleEditAssignment}
            onCancel={() => setEditingAssignment(undefined)}
          />
        )}
      </div>
    </div>
  );
}
