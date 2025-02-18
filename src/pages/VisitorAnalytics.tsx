import React, { useState } from 'react';
import {
  Users,
  Eye,
  ArrowUp,
  LineChart,
  BarChart2,
  Filter,
  Mail,
  X,
  AlertTriangle,
  Send
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const campaigns = ['Google Ads', 'Facebook Ads', 'Organic Search', 'Direct', 'Referral'];
const pages = ['/features', '/pricing', '/about', '/blog', '/contact'];

const generateRandomData = (days: number) => {
  return Array.from({ length: days }).map((_, i) => ({
    date: new Date(Date.now() - (days - i - 1) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    ...campaigns.reduce((acc, campaign) => ({
      ...acc,
      [campaign]: Math.floor(Math.random() * 1000)
    }), {})
  }));
};

const generatePageData = () => {
  return pages.map(page => ({
    page,
    views: Math.floor(Math.random() * 5000),
    visitors: Math.floor(Math.random() * 2000)
  }));
};

export function VisitorAnalytics() {
  const navigate = useNavigate();
  const [selectedCampaign, setSelectedCampaign] = useState('All');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [showInviteSent, setShowInviteSent] = useState(false);

  const visitorData = generateRandomData(30);
  const pageData = generatePageData();

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    setShowInviteSent(true);
    setTimeout(() => {
      setShowInviteModal(false);
      setShowInviteSent(false);
      setInviteEmail('');
      navigate('/customize');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sticky Info Label */}
      <div className="sticky top-0 z-50 bg-indigo-600 text-white px-4 py-2">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5" />
            <span>Want to know who these visitors are? Set up identity resolution.</span>
          </div>
          <button
            onClick={() => setShowInviteModal(true)}
            className="px-4 py-1 bg-white text-indigo-600 rounded-full text-sm font-medium hover:bg-indigo-50"
          >
            Invite Developer
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Visitors</p>
                <h3 className="text-2xl font-bold text-gray-900">24,521</h3>
              </div>
              <div className="p-3 bg-indigo-50 rounded-lg">
                <Users className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
            <div className="flex items-center mt-2 text-sm text-green-600">
              <ArrowUp className="w-4 h-4 mr-1" />
              <span>12.5% vs last month</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Page Views</p>
                <h3 className="text-2xl font-bold text-gray-900">89,732</h3>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <Eye className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="flex items-center mt-2 text-sm text-green-600">
              <ArrowUp className="w-4 h-4 mr-1" />
              <span>8.2% vs last month</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg. Session Duration</p>
                <h3 className="text-2xl font-bold text-gray-900">2m 45s</h3>
              </div>
              <div className="p-3 bg-amber-50 rounded-lg">
                <LineChart className="w-6 h-6 text-amber-600" />
              </div>
            </div>
            <div className="flex items-center mt-2 text-sm text-green-600">
              <ArrowUp className="w-4 h-4 mr-1" />
              <span>5.3% vs last month</span>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-2 gap-6">
          {/* Visitors by Campaign */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Visitors by Campaign</h3>
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <select
                  value={selectedCampaign}
                  onChange={(e) => setSelectedCampaign(e.target.value)}
                  className="text-sm border-gray-200 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="All">All Campaigns</option>
                  {campaigns.map(campaign => (
                    <option key={campaign} value={campaign}>{campaign}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="h-80 relative">
              {/* Placeholder for LineChart - In a real app, use Recharts or similar */}
              <div className="absolute inset-0 flex items-center justify-center">
                <LineChart className="w-12 h-12 text-gray-300" />
              </div>
            </div>
          </div>

          {/* Page Views */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Page Views</h3>
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <select
                  value={selectedCampaign}
                  onChange={(e) => setSelectedCampaign(e.target.value)}
                  className="text-sm border-gray-200 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="All">All Campaigns</option>
                  {campaigns.map(campaign => (
                    <option key={campaign} value={campaign}>{campaign}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="h-80 relative">
              {/* Placeholder for BarChart - In a real app, use Recharts or similar */}
              <div className="absolute inset-0 flex items-center justify-center">
                <BarChart2 className="w-12 h-12 text-gray-300" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900">
                Invite Developer
              </h3>
              <button
                onClick={() => setShowInviteModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {showInviteSent ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="text-lg font-medium text-gray-900 mb-2">
                  Invitation Sent!
                </h4>
                <p className="text-gray-600">
                  Redirecting you back to use cases...
                </p>
              </div>
            ) : (
              <form onSubmit={handleInvite}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Developer's Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                      placeholder="developer@company.com"
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                >
                  Send Invitation
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}