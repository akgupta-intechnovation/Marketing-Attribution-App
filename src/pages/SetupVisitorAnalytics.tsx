import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Target,
  ArrowLeft,
  Copy,
  X,
  AlertTriangle,
  Send,
  Loader2,
  CheckCircle2,
  LineChart,
  BarChart2,
  Filter,
  Calendar,
  MousePointer2,
  Sparkles,
  Users,
  Mail
} from 'lucide-react';
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';

const TRACKING_SCRIPT = `<script>
  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://cdn.thrivestack.io/ts.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','tsLayer','TS-XXXXX');
</script>`;

const valuePropositions = [
  {
    id: 'traffic',
    title: 'Visitors by Campaigns',
    description: 'Track visitors from different marketing campaigns',
    icon: <Target className="w-5 h-5" />,
    image: 'https://placehold.co/400x300?text=Campaign+Tracking',
    impact: 'Optimize marketing spend and increase ROI by 35%'
  },
  {
    id: 'channels',
    title: 'Visitors by Channels',
    description: 'Analyze traffic sources and channels',
    icon: <LineChart className="w-5 h-5" />,
    image: 'https://placehold.co/400x300?text=Channel+Analysis',
    impact: 'Identify top-performing channels and reduce CAC by 25%'
  },
  {
    id: 'engagement',
    title: 'Page Engagement',
    description: 'Measure how visitors interact with your content',
    icon: <MousePointer2 className="w-5 h-5" />,
    image: 'https://placehold.co/400x300?text=Page+Engagement',
    impact: 'Improve conversion rates by understanding user behavior'
  },
  {
    id: 'conversion',
    title: 'Conversions',
    description: 'Track signup and conversion rates',
    icon: <Sparkles className="w-5 h-5" />,
    image: 'https://placehold.co/400x300?text=Conversion+Tracking',
    impact: 'Increase conversion rates by up to 45%'
  }
];

// Mock data generators
const generateCampaignData = (days: number) => {
  const campaigns = ['Google Ads', 'Twitter Ads', 'Blog Posts'];
  return Array.from({ length: days }).map((_, i) => ({
    date: new Date(Date.now() - (days - i - 1) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    'Google Ads': Math.floor(Math.random() * 1000 + 500),
    'Twitter Ads': Math.floor(Math.random() * 800 + 300),
    'Blog Posts': Math.floor(Math.random() * 600 + 200)
  }));
};

const generatePageData = () => {
  const pages = ['/features', '/pricing', '/about', '/blog', '/contact'];
  return pages.map(page => ({
    page,
    views: Math.floor(Math.random() * 5000),
    visitors: Math.floor(Math.random() * 2000)
  }));
};

export function SetupVisitorAnalytics() {
  const navigate = useNavigate();
  const [scriptCopied, setScriptCopied] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [showValueImage, setShowValueImage] = useState<string | null>(null);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [showInviteSent, setShowInviteSent] = useState(false);
  const [selectedTimeRange, setSelectedTimeRange] = useState('30');
  const [selectedCampaign, setSelectedCampaign] = useState('all');

  const campaignData = generateCampaignData(parseInt(selectedTimeRange));
  const pageData = generatePageData();

  const handleCopyScript = () => {
    navigator.clipboard.writeText(TRACKING_SCRIPT);
    setScriptCopied(true);
    setShowTooltip(true);
    setIsVerifying(true);

    // Simulate verification after 30 seconds
    setTimeout(() => {
      setIsVerifying(false);
      setIsVerified(true);
    }, 30000);
  };

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    setShowInviteSent(true);
    setTimeout(() => {
      setShowInviteModal(false);
      setShowInviteSent(false);
      setInviteEmail('');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate('/customize')}
            className="inline-flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span>Back to Use Cases</span>
          </button>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Target className="w-8 h-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-900">
              Setup Visitor Analytics
            </h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Track and analyze visitor behavior on your website, and connect it with user signups and conversions
          </p>

          {/* Value Propositions */}
          <div className="grid grid-cols-4 gap-4 mb-12">
            {valuePropositions.map((value) => (
              <div
                key={value.id}
                className="relative p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                onMouseEnter={() => setShowValueImage(value.id)}
                onMouseLeave={() => setShowValueImage(null)}
              >
                <div className="flex items-center space-x-2 text-indigo-600 mb-2">
                  {value.icon}
                  <h3 className="font-medium">{value.title}</h3>
                </div>
                <p className="text-sm text-gray-600">{value.description}</p>

                {/* Hover Image */}
                {showValueImage === value.id && (
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-50">
                    <div className="bg-white rounded-lg shadow-lg p-4 w-80">
                      <img src={value.image} alt={value.title} className="w-full h-40 object-cover rounded mb-2" />
                      <p className="text-sm font-medium text-indigo-600">{value.impact}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Script Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-start space-x-3 mb-4">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <Target className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-1">
                Track Visitors from Different Campaigns
              </h2>
              <p className="text-gray-600">
                Copy and paste the following script in the <code>&lt;head&gt;</code> section of your website's HTML.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute right-4 top-4">
              <button
                onClick={handleCopyScript}
                className="inline-flex items-center space-x-1 px-3 py-1 bg-white rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 border border-gray-200 hover:border-gray-300 transition-colors"
              >
                <Copy className="w-4 h-4" />
                <span>{scriptCopied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
            <div className="bg-gray-900 rounded-lg p-4">
              <div className="text-sm text-gray-400 mb-2">Tracking Script</div>
              <pre className="font-mono text-sm text-gray-300 overflow-x-auto">
                {TRACKING_SCRIPT}
              </pre>
            </div>
          </div>

          {/* Verification Status */}
          <div className="mt-6 flex items-center justify-center">
            {isVerifying ? (
              <div className="flex items-center space-x-2 text-indigo-600">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Waiting for events from your website...</span>
              </div>
            ) : isVerified ? (
              <div className="flex items-center space-x-2 text-green-600">
                <CheckCircle2 className="w-5 h-5" />
                <span>Tracking verified! View your analytics below.</span>
              </div>
            ) : null}
          </div>
        </div>

        {/* Tooltip */}
        {showTooltip && (
          <div className="fixed bottom-8 left-8 bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg text-sm animate-fade-in flex items-center space-x-2">
            <span>Please refresh your page and interact with that</span>
            <button
              onClick={() => setShowTooltip(false)}
              className="text-gray-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {isVerified && (
          <>
            {/* Analytics Dashboard */}
            <div className="space-y-6">
              {/* Filters */}
              <div className="flex items-center justify-end space-x-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <select
                    value={selectedTimeRange}
                    onChange={(e) => setSelectedTimeRange(e.target.value)}
                    className="text-sm border-gray-200 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="7">Last 7 days</option>
                    <option value="30">Last 30 days</option>
                    <option value="90">Last 90 days</option>
                  </select>
                </div>
                <div className="flex items-center space-x-2">
                  <Filter className="w-4 h-4 text-gray-500" />
                  <select
                    value={selectedCampaign}
                    onChange={(e) => setSelectedCampaign(e.target.value)}
                    className="text-sm border-gray-200 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="all">All Campaigns</option>
                    <option value="google">Google Ads</option>
                    <option value="twitter">Twitter Ads</option>
                    <option value="blog">Blog Posts</option>
                  </select>
                </div>
              </div>

              {/* Visitor Traffic by Campaign */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  Visitor Traffic by Campaign
                </h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsLineChart data={campaignData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="Google Ads" stroke="#4F46E5" />
                      <Line type="monotone" dataKey="Twitter Ads" stroke="#10B981" />
                      <Line type="monotone" dataKey="Blog Posts" stroke="#F59E0B" />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Page Engagement */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  Page Engagement
                </h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={pageData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="page" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="views" fill="#4F46E5" name="Page Views" />
                      <Bar dataKey="visitors" fill="#10B981" name="Unique Visitors" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Conversion Widget */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  Conversion Tracking
                </h3>
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-6">Not Configured</div>
                  <div className="flex items-center justify-center space-x-4">
                    <button
                      onClick={() => setShowInviteModal(true)}
                      className="inline-flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                    >
                      <Send className="w-5 h-5" />
                      <span>Invite Developer</span>
                    </button>
                    <button
                      onClick={() => navigate('/setup-product')}
                      className="inline-flex items-center space-x-2 px-4 py-2 bg-white text-indigo-600 rounded-lg border border-indigo-600 hover:bg-indigo-50"
                    >
                      <Target className="w-5 h-5" />
                      <span>Setup Product Analytics</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
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
                  We'll notify you when they accept the invitation.
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