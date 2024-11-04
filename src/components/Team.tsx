import React from 'react';
import { UserPlus, Mail, Shield, Star } from 'lucide-react';
import useStore from '../store/useStore';

const TeamMember = ({ member }: { member: any }) => (
  <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
    <div className="flex items-center space-x-4">
      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
        {member.name.charAt(0)}
      </div>
      <div>
        <h3 className="font-medium text-gray-900">{member.name}</h3>
        <p className="text-sm text-gray-500">{member.email}</p>
      </div>
    </div>
    <div className="flex items-center space-x-2">
      {member.role === 'Admin' && <Shield className="w-5 h-5 text-blue-600" />}
      {member.role === 'Editor' && <Star className="w-5 h-5 text-yellow-500" />}
      <span className="text-sm text-gray-600">{member.role}</span>
    </div>
  </div>
);

const InviteForm = () => {
  const { inviteTeamMember } = useStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const role = (form.elements.namedItem('role') as HTMLSelectElement).value;
    
    inviteTeamMember(email, role);
    form.reset();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email Address
        </label>
        <div className="mt-1 relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="email"
            name="email"
            id="email"
            required
            className="pl-10 block w-full rounded-lg border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="colleague@company.com"
          />
        </div>
      </div>
      <div>
        <label htmlFor="role" className="block text-sm font-medium text-gray-700">
          Role
        </label>
        <select
          id="role"
          name="role"
          className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="Editor">Editor</option>
          <option value="Admin">Admin</option>
          <option value="Viewer">Viewer</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
      >
        <UserPlus className="w-5 h-5 mr-2" />
        Send Invitation
      </button>
    </form>
  );
};

export default function Team() {
  const { teamMembers } = useStore();

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Team Management</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-medium mb-4">Team Members</h3>
            <div className="space-y-4">
              {teamMembers.map((member) => (
                <TeamMember key={member.id} member={member} />
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-medium mb-4">Invite Team Member</h3>
          <InviteForm />
        </div>
      </div>
    </div>
  );
}