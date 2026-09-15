'use client';

import { useState, useEffect } from 'react';
import { User, Assignment, UserData } from '@/types';
import { PastefyService } from '@/lib/pastefy';
import UserSelector from '@/components/UserSelector';
import SubjectSelector from '@/components/SubjectSelector';
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
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

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

  const filteredAssignments = selectedSubject
    ? userData?.assignments.filter((a: Assignment) => a.subject === selectedSubject) || []
    : userData?.assignments || [];

  const completedCount = filteredAssignments.filter(a => a.completed).length || 0;
  const totalCount = filteredAssignments.length || 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-2xl shadow-lg">
              <BookOpen size={36} className="text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Homework Tracker
            </h1>
          </div>
          <p className="text-gray-600 text-lg">Track your assignments and stay organized</p>
        </header>

        <UserSelector currentUser={currentUser} onUserChange={setCurrentUser} />

        <SubjectSelector 
          selectedSubject={selectedSubject} 
          onSubjectChange={setSelectedSubject} 
        />

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 shadow-md">
            {error}
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                {userData?.name || currentUser === 'dindin' ? 'Dindin' : 'Bebi Elai'}'s Assignments
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                {completedCount} of {totalCount} completed
              </p>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold"
            >
              <Plus size={20} />
              Add Assignment
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center py-16">
              <Loader2 size={40} className="animate-spin text-blue-500" />
            </div>
          ) : (
            <AssignmentList
              assignments={filteredAssignments}
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
