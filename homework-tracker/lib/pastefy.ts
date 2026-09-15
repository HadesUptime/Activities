import { Assignment, UserData, PastefyPaste } from '@/types';
import { SUBJECTS } from '@/constants/subjects';

const PASTEFY_API_BASE = 'https://pastefy.app/api/v2';
const API_KEY = 'SU51czLG80VpbMBUGevRgSUVx1lIEZGt5Oe6qjhVktIaXx94moESHANBJL26';

const PASTE_IDS = {
  'dindin': 'X5QPvOhB',
  'bebi-elai': 'p6XgH41m'
};

async function pastefyRequest(endpoint: string, options: RequestInit = {}) {
  const url = `${PASTEFY_API_BASE}${endpoint}`;
  const headers = {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error(`Pastefy API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export const PastefyService = {
  async getUserData(user: string): Promise<UserData> {
    try {
      const paste: PastefyPaste = await pastefyRequest(`/paste/${PASTE_IDS[user as keyof typeof PASTE_IDS]}`);
      const userData: UserData = JSON.parse(paste.content);
      
      // Migrate existing assignments to include subject field
      userData.assignments = userData.assignments.map((assignment: Assignment) => ({
        ...assignment,
        subject: assignment.subject || SUBJECTS[0] // Default to first subject if missing
      }));
      
      return userData;
    } catch (error) {
      // If paste doesn't exist, return empty user data
      return {
        name: user === 'dindin' ? 'Dindin' : 'Bebi Elai',
        assignments: []
      };
    }
  },

  async saveUserData(user: string, userData: UserData): Promise<void> {
    const content = JSON.stringify(userData, null, 2);
    
    try {
      // Try to update existing paste
      const response = await pastefyRequest(`/paste/${PASTE_IDS[user as keyof typeof PASTE_IDS]}`, {
        method: 'PATCH',
        body: JSON.stringify({ content }),
      });
      console.log('Paste updated successfully:', response);
    } catch (error) {
      console.error('Failed to update paste, creating new one:', error);
      // If paste doesn't exist, create new one
      const newPaste = await pastefyRequest('/paste', {
        method: 'POST',
        body: JSON.stringify({
          title: `${user}-assignments`,
          content,
        }),
      });
      // Store the new paste ID (you'll need to update PASTE_IDS)
      console.log('Created new paste with ID:', newPaste.id);
    }
  },

  async addAssignment(user: string, assignment: Omit<Assignment, 'id' | 'createdAt' | 'updatedAt'>): Promise<UserData> {
    console.log('Adding assignment for user:', user, 'assignment:', assignment);
    const userData = await this.getUserData(user);
    console.log('Current user data:', userData);
    
    const newAssignment: Assignment = {
      ...assignment,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    userData.assignments.push(newAssignment);
    console.log('After push, assignments count:', userData.assignments.length);
    
    await this.saveUserData(user, userData);
    
    // Verify the save by reloading
    const verifiedData = await this.getUserData(user);
    console.log('Verified data after save:', verifiedData);
    
    return verifiedData;
  },

  async updateAssignment(user: string, assignmentId: string, updates: Partial<Assignment>): Promise<UserData> {
    const userData = await this.getUserData(user);
    const assignmentIndex = userData.assignments.findIndex(a => a.id === assignmentId);
    
    if (assignmentIndex === -1) {
      throw new Error('Assignment not found');
    }

    userData.assignments[assignmentIndex] = {
      ...userData.assignments[assignmentIndex],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    await this.saveUserData(user, userData);
    return userData;
  },

  async deleteAssignment(user: string, assignmentId: string): Promise<UserData> {
    const userData = await this.getUserData(user);
    userData.assignments = userData.assignments.filter((a: Assignment) => a.id !== assignmentId);
    await this.saveUserData(user, userData);
    return userData;
  },

  async toggleAssignmentComplete(user: string, assignmentId: string): Promise<UserData> {
    const userData = await this.getUserData(user);
    const assignment = userData.assignments.find((a: Assignment) => a.id === assignmentId);
    
    if (!assignment) {
      throw new Error('Assignment not found');
    }

    assignment.completed = !assignment.completed;
    assignment.updatedAt = new Date().toISOString();

    await this.saveUserData(user, userData);
    return userData;
  }
};
