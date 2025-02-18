import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  ArrowUpRight,
  ArrowDownRight,
  Users,
  Building2,
  Clock,
  Zap,
  Activity,
  BarChart2,
  Target,
  Rocket,
  UserMinus,
  DollarSign,
  ExternalLink,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';

const COLORS = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444'];

const sections = [
  { 
    id: 'acquisition', 
    label: 'Acquisition', 
    icon: Target,
    trend: 'up',
    change: '+12.5%',
    description: 'Growing steadily'
  },
  { 
    id: 'activation', 
    label: 'Activation', 
    icon: Rocket,
    trend: 'up',
    change: '+8.1%',
    description: 'Improving'
  },
  { 
    id: 'engagement', 
    label: 'Engagement', 
    icon: Activity,
    trend: 'flat',
    change: '+0.2%',
    description: 'Stable'
  },
  { 
    id: 'retention', 
    label: 'Retention', 
    icon: UserMinus,
    trend: 'down',
    change: '-2.4%',
    description: 'Needs attention'
  },
  { 
    id: 'monetization', 
    label: 'Monetization', 
    icon: DollarSign,
    trend: 'up',
    change: '+15.8%',
    description: 'Strong growth'
  },
  { 
    id: 'expansion', 
    label: 'Expansion', 
    icon: TrendingUp,
    trend: 'up',
    change: '+24.8%',
    description: 'Rapid growth'
  }
] as const;

interface MetricCardProps {
  title: string;
  value: string;
  change: number;
  trend: 'up' | 'down';
  icon: React.ReactNode;
}

function MetricCard({ title, value, change, trend, icon }: MetricCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <span className="text-gray-500 text-sm">{title}</span>
        <div className="p-2 bg-indigo-50 rounded-lg">
          {icon}
        </div>
      </div>
      <div className="flex items-end justify-between">
        <div>
          <div className="text-2xl font-semibold mb-1">{value}</div>
          <div className={`flex items-center text-sm ${
            trend === 'up' ? 'text-green-600' : 'text-red-600'
          }`}>
            {trend === 'up' ? (
              <ArrowUpRight className="w-4 h-4 mr-1" />
            ) : (
              <ArrowDownRight className="w-4 h-4 mr-1" />
            )}
            {Math.abs(change)}%
          </div>
        </div>
        <div className="h-16 w-32">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={[
                { value: 400 },
                { value: 300 },
                { value: 600 },
                { value: 200 },
                { value: 700 },
                { value: 400 },
                { value: 500 }
              ]}
            >
              <Area
                type="monotone"
                dataKey="value"
                stroke={trend === 'up' ? '#10B981' : '#EF4444'}
                fill={trend === 'up' ? '#D1FAE5' : '#FEE2E2'}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function TrendIndicator({ trend, change }: { trend: 'up' | 'down' | 'flat', change: string }) {
  if (trend === 'flat') {
    return (
      <div className="flex items-center text-gray-500 text-xs">
        <ArrowRight className="w-3 h-3 mr-1" />
        <span>{change}</span>
      </div>
    );
  }

  return (
    <div className={`flex items-center text-xs ${
      trend === 'up' ? 'text-green-600' : 'text-red-600'
    }`}>
      {trend === 'up' ? (
        <TrendingUp className="w-3 h-3 mr-1" />
      ) : (
        <TrendingDown className="w-3 h-3 mr-1" />
      )}
      <span>{change}</span>
    </div>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<string>(sections[0].id);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { top, bottom } = element.getBoundingClientRect();
          if (top <= scrollPosition && bottom > scrollPosition) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Trial Banner */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="py-3 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">
                Trial Period: <span className="font-bold">7 days remaining</span>
              </span>
              <span className="text-xs px-2 py-0.5 bg-white/20 rounded-full">
                Free Plan
              </span>
            </div>
            <button
              onClick={() => {/* Handle upgrade click */}}
              className="inline-flex items-center px-4 py-1.5 bg-white text-indigo-600 rounded-full text-sm font-medium hover:bg-indigo-50 transition-colors"
            >
              <span>Upgrade to Pro</span>
              <ExternalLink className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center space-x-1 h-16">
            {sections.map((section, index) => (
              <React.Fragment key={section.id}>
                <button
                  onClick={() => {
                    const element = document.getElementById(section.id);
                    if (element) {
                      const y = element.getBoundingClientRect().top + window.pageYOffset - 100;
                      window.scrollTo({ top: y, behavior: 'smooth' });
                    }
                  }}
                  className={`
                    group relative flex flex-col px-4 py-2 rounded-lg
                    transition-colors duration-200
                    ${activeSection === section.id
                      ? 'text-indigo-600 bg-indigo-50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }
                  `}
                >
                  <div className="flex items-center text-sm font-medium">
                    <section.icon className="w-4 h-4 mr-2" />
                    {section.label}
                  </div>
                  <div className="mt-1">
                    <TrendIndicator trend={section.trend} change={section.change} />
                  </div>
                  
                  {/* Tooltip */}
                  <div className="absolute left-1/2 -bottom-12 transform -translate-x-1/2 
                                opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50">
                    <div className="bg-gray-900 text-white text-xs rounded-lg py-1 px-2 whitespace-nowrap">
                      {section.description}
                    </div>
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 
                                  border-4 border-transparent border-b-gray-900" />
                  </div>
                </button>
                {index < sections.length - 1 && (
                  <div className="w-px h-12 bg-gray-200 my-auto" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Links Navigation */}
      <div className="bg-white border-b border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center space-x-6">
            <a 
              href="#acquisition" 
              className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600 transition-colors"
            >
              <Target className="w-5 h-5" />
              <span>Acquisition</span>
            </a>
            <a 
              href="#activation" 
              className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600 transition-colors"
            >
              <Rocket className="w-5 h-5" />
              <span>Activation</span>
            </a>
            <a 
              href="#engagement" 
              className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600 transition-colors"
            >
              <Activity className="w-5 h-5" />
              <span>Engagement</span>
            </a>
            <a 
              href="#retention" 
              className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600 transition-colors"
            >
              <UserMinus className="w-5 h-5" />
              <span>Retention</span>
            </a>
            <a 
              href="#monetization" 
              className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600 transition-colors"
            >
              <DollarSign className="w-5 h-5" />
              <span>Monetization</span>
            </a>
            <a 
              href="#expansion" 
              className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600 transition-colors"
            >
              <TrendingUp className="w-5 h-5" />
              <span>Expansion</span>
            </a>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-12">
        {/* Acquisition Section */}
        <div id="acquisition" className="space-y-6">
          <div className="flex items-center space-x-3">
            <Target className="w-6 h-6 text-indigo-600" />
            <h2 className="text-2xl font-semibold">Acquisition Insights</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <MetricCard
              title="Total Signups"
              value="2,847"
              change={12.5}
              trend="up"
              icon={<Users className="w-5 h-5 text-indigo-600" />}
            />
            <MetricCard
              title="Conversion Rate"
              value="3.2%"
              change={-0.8}
              trend="down"
              icon={<Target className="w-5 h-5 text-indigo-600" />}
            />
            <MetricCard
              title="CAC"
              value="$42"
              change={-5.2}
              trend="up"
              icon={<DollarSign className="w-5 h-5 text-indigo-600" />}
            />
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Acquisition Channels</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={acquisitionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="organic"
                    stackId="1"
                    stroke="#4F46E5"
                    fill="#4F46E5"
                  />
                  <Area
                    type="monotone"
                    dataKey="paid"
                    stackId="1"
                    stroke="#10B981"
                    fill="#10B981"
                  />
                  <Area
                    type="monotone"
                    dataKey="referral"
                    stackId="1"
                    stroke="#F59E0B"
                    fill="#F59E0B"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Activation Section */}
        <div id="activation" className="space-y-6">
          <div className="flex items-center space-x-3">
            <Rocket className="w-6 h-6 text-indigo-600" />
            <h2 className="text-2xl font-semibold">Activation Metrics</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <MetricCard
              title="Activation Rate"
              value="68%"
              change={8.1}
              trend="up"
              icon={<Zap className="w-5 h-5 text-indigo-600" />}
            />
            <MetricCard
              title="Time to Value"
              value="2.4 days"
              change={-15.3}
              trend="up"
              icon={<Clock className="w-5 h-5 text-indigo-600" />}
            />
            <MetricCard
              title="Key Actions"
              value="3.8"
              change={4.2}
              trend="up"
              icon={<Activity className="w-5 h-5 text-indigo-600" />}
            />
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Activation Funnel</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={activationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="stage" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="users" fill="#4F46E5" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Engagement Section */}
        <div id="engagement" className="space-y-6">
          <div className="flex items-center space-x-3">
            <Activity className="w-6 h-6 text-indigo-600" />
            <h2 className="text-2xl font-semibold">Engagement Overview</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <MetricCard
              title="Active Users"
              value="1,847"
              change={0.2}
              trend="up"
              icon={<Users className="w-5 h-5 text-indigo-600" />}
            />
            <MetricCard
              title="Session Duration"
              value="24m"
              change={5.8}
              trend="up"
              icon={<Clock className="w-5 h-5 text-indigo-600" />}
            />
            <MetricCard
              title="Actions/Session"
              value="8.3"
              change={-2.1}
              trend="down"
              icon={<Activity className="w-5 h-5 text-indigo-600" />}
            />
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Feature Usage</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={featureData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {featureData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Retention Section */}
        <div id="retention" className="space-y-6">
          <div className="flex items-center space-x-3">
            <UserMinus className="w-6 h-6 text-indigo-600" />
            <h2 className="text-2xl font-semibold">Retention Analysis</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <MetricCard
              title="Churn Rate"
              value="2.4%"
              change={0.8}
              trend="down"
              icon={<UserMinus className="w-5 h-5 text-indigo-600" />}
            />
            <MetricCard
              title="Retention Rate"
              value="84%"
              change={-2.4}
              trend="down"
              icon={<Users className="w-5 h-5 text-indigo-600" />}
            />
            <MetricCard
              title="At Risk"
              value="124"
              change={15.7}
              trend="down"
              icon={<AlertTriangle className="w-5 h-5 text-indigo-600" />}
            />
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Cohort Retention</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={retentionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="current"
                    stroke="#4F46E5"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="previous"
                    stroke="#10B981"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Monetization Section */}
        <div id="monetization" className="space-y-6">
          <div className="flex items-center space-x-3">
            <DollarSign className="w-6 h-6 text-indigo-600" />
            <h2 className="text-2xl font-semibold">Revenue Metrics</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <MetricCard
              title="MRR"
              value="$48.2k"
              change={15.8}
              trend="up"
              icon={<DollarSign className="w-5 h-5 text-indigo-600" />}
            />
            <MetricCard
              title="ARPU"
              value="$108"
              change={4.2}
              trend="up"
              icon={<Users className="w-5 h-5 text-indigo-600" />}
            />
            <MetricCard
              title="LTV"
              value="$2,847"
              change={8.4}
              trend="up"
              icon={<Activity className="w-5 h-5 text-indigo-600" />}
            />
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Revenue Growth</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="mrr"
                    stackId="1"
                    stroke="#4F46E5"
                    fill="#4F46E5"
                  />
                  <Area
                    type="monotone"
                    dataKey="expansion"
                    stackId="1"
                    stroke="#10B981"
                    fill="#10B981"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Expansion Section */}
        <div id="expansion" className="space-y-6">
          <div className="flex items-center space-x-3">
            <TrendingUp className="w-6 h-6 text-indigo-600" />
            <h2 className="text-2xl font-semibold">Expansion Revenue</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <MetricCard
              title="Expansion MRR"
              value="$12.4k"
              change={24.8}
              trend="up"
              icon={<TrendingUp className="w-5 h-5 text-indigo-600" />}
            />
            <MetricCard
              title="Upgrade Rate"
              value="18%"
              change={5.2}
              trend="up"
              icon={<Users className="w-5 h-5 text-indigo-600" />}
            />
            <MetricCard
              title="Expansion Revenue"
              value="$148k"
              change={12.4}
              trend="up"
              icon={<DollarSign className="w-5 h-5 text-indigo-600" />}
            />
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Expansion Trends</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={expansionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="upgrades"
                    stroke="#4F46E5"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="addOns"
                    stroke="#10B981"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Focus Area Link */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
        <button
          onClick={() => navigate('/customize')}
          className="inline-flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Target className="w-5 h-5" />
          <span>Change Focus Area</span>
        </button>
      </div>
    </div>
  );
}

const acquisitionData = [
  { date: '2024-01', organic: 400, paid: 240, referral: 180 },
  { date: '2024-02', organic: 500, paid: 280, referral: 220 },
  { date: '2024-03', organic: 450, paid: 320, referral: 260 },
  { date: '2024-04', organic: 600, paid: 380, referral: 300 },
  { date: '2024-05', organic: 550, paid: 420, referral: 340 },
  { date: '2024-06', organic: 700, paid: 480, referral: 380 }
];

const activationData = [
  { stage: 'Signup', users: 1000 },
  { stage: 'Email Verified', users: 800 },
  { stage: 'Profile Complete', users: 600 },
  { stage: 'First Action', users: 400 },
  { stage: 'Key Milestone', users: 200 }
];

const featureData = [
  { name: 'Analytics', value: 400 },
  { name: 'Reporting', value: 300 },
  { name: 'Automation', value: 300 },
  { name: 'Integration', value: 200 }
];

const retentionData = [
  { week: 'Week 1', current: 100, previous: 100 },
  { week: 'Week 2', current: 85, previous: 80 },
  { week: 'Week 3', current: 75, previous: 70 },
  { week: 'Week 4', current: 70, previous: 65 },
  { week: 'Week 5', current: 65, previous: 60 },
  { week: 'Week 6', current: 62, previous: 55 }
];

const revenueData = [
  { date: '2024-01', mrr: 30000, expansion: 5000 },
  { date: '2024-02', mrr: 32000, expansion: 5500 },
  { date: '2024-03', mrr: 35000, expansion: 6000 },
  { date: '2024-04', mrr: 37000, expansion: 6500 },
  { date: '2024-05', mrr: 40000, expansion: 7000 },
  { date: '2024-06', mrr: 42000, expansion: 7500 }
];

const expansionData = [
  { date: '2024-01', upgrades: 25000, addOns: 8000 },
  { date: '2024-02', upgrades: 28000, addOns: 9500 },
  { date: '2024-03', upgrades: 32000, addOns: 11000 },
  { date: '2024-04', upgrades: 35000, addOns: 12500 },
  { date: '2024-05', upgrades: 38000, addOns: 14000 },
  { date: '2024-06', upgrades: 42000, addOns: 16000 }
];