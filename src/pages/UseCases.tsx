import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Target, 
  BarChart2, 
  DollarSign, 
  Users, 
  ArrowRight,
  Sparkles,
  LineChart,
  TrendingUp,
  Rocket,
  ChevronDown,
  CheckCircle2,
  Users2,
  ArrowLeft,
  X,
  AlertCircle,
  Clock
} from 'lucide-react';

type Team = 'Marketing teams' | 'Product teams' | 'Sales teams' | 'RevOps teams' | 'Engineering teams' | 'Customer Success teams';
type SetupStatus = 'not_started' | 'in_progress' | 'completed' | 'coming_soon';

export function UseCases() {
  const navigate = useNavigate();
  const [selectedCase, setSelectedCase] = React.useState<string | null>(null);
  const [expandedCase, setExpandedCase] = React.useState<string | null>(null);
  const [selectedTeams, setSelectedTeams] = React.useState<Team[]>([]);

  const teams: Team[] = [
    'Marketing teams',
    'Product teams',
    'Sales teams',
    'RevOps teams',
    'Engineering teams',
    'Customer Success teams'
  ];

  const useCases = [
    {
      id: 'marketing',
      title: 'Marketing Attribution',
      icon: <Target className="w-8 h-8" />,
      shortDesc: 'Connect every touchpoint to revenue',
      metrics: ['Lead Sources', 'Conversion Paths', 'Campaign ROI'],
      challenge: 'Measure attribution but don\'t know which leads convert',
      solution: 'Track the complete journey from first touch to revenue',
      benefitIcon: <LineChart className="w-5 h-5" />,
      benefit: '38% improvement in campaign ROI on average',
      features: [
        'Multi-touch attribution modeling',
        'Campaign performance analytics',
        'Revenue impact tracking',
        'Custom attribution models'
      ],
      teams: ['Marketing teams'],
      setupStatus: 'not_started' as const,
      setupTime: 10,
      steps: 5
    },
    {
      id: 'product',
      title: 'Product Analytics',
      icon: <BarChart2 className="w-8 h-8" />,
      shortDesc: 'Turn usage data into revenue insights',
      metrics: ['Feature Usage', 'User Engagement', 'Revenue Impact'],
      challenge: 'Track usage but lack visibility into revenue impact',
      solution: 'Connect product usage directly to revenue metrics',
      benefitIcon: <Sparkles className="w-5 h-5" />,
      benefit: '52% better feature adoption rates',
      features: [
        'Feature usage tracking',
        'User journey mapping',
        'Engagement scoring',
        'Revenue correlation'
      ],
      teams: ['Product teams', 'Engineering teams'],
      setupStatus: 'in_progress' as const,
      setupTime: 10,
      steps: 3
    },
    {
      id: 'revenue',
      title: 'Revenue Optimization',
      icon: <DollarSign className="w-8 h-8" />,
      shortDesc: 'Maximize conversion and revenue',
      metrics: ['Conversion Drivers', 'Upgrade Patterns', 'Revenue Forecasting'],
      challenge: 'Focus on Revenue ($) but don\'t know what drives conversions',
      solution: 'Identify key behaviors that lead to upgrades',
      benefitIcon: <TrendingUp className="w-5 h-5" />,
      benefit: '45% increase in upgrade conversion rate',
      features: [
        'Conversion path analysis',
        'Upgrade trigger identification',
        'Revenue forecasting',
        'Pricing optimization'
      ],
      teams: ['Sales teams', 'RevOps teams'],
      setupStatus: 'coming_soon' as const,
      setupTime: 12,
      steps: 4
    },
    {
      id: 'success',
      title: 'Predict and prevent churn',
      icon: <Users className="w-8 h-8" />,
      shortDesc: 'Retention and Expansion',
      metrics: ['Health Scores', 'Engagement Trends', 'Churn Predictors'],
      challenge: 'Focus on retention but don\'t know the \'why\' behind churn',
      solution: 'Predict and prevent churn before it happens',
      benefitIcon: <Rocket className="w-5 h-5" />,
      benefit: '64% reduction in customer churn',
      features: [
        'Customer health scoring',
        'Early warning system',
        'Engagement analytics',
        'Automated interventions'
      ],
      teams: ['Customer Success teams'],
      setupStatus: 'coming_soon' as const,
      setupTime: 18,
      steps: 6
    }
  ];

  const handleContinue = () => {
    // Only allow continue for non-coming-soon items
    if (selectedCase) {
      const selectedUseCase = useCases.find(uc => uc.id === selectedCase);
      if (selectedUseCase && selectedUseCase.setupStatus !== 'coming_soon') {
        if (selectedCase === 'marketing') {
          navigate('/setup-acquisition');
        } else if (selectedCase === 'product') {
          navigate('/setup-product');
        } else {
          navigate('/connect');
        }
      }
    }
  };

  const handleSelect = (id: string) => {
    setSelectedCase(id);
  };

  const handleExpand = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedCase(expandedCase === id ? null : id);
  };

  const handleTeamToggle = (team: Team) => {
    setSelectedTeams(prev => 
      prev.includes(team)
        ? prev.filter(t => t !== team)
        : [...prev, team]
    );
    setSelectedCase(null);
  };

  const getStatusBadge = (status: SetupStatus, setupTime: number, steps: number) => {
    const setupInfo = (
      <div className="flex items-center text-xs text-gray-500 ml-2">
        <Clock className="w-3.5 h-3.5 mr-1" />
        <span>{setupTime} mins</span>
        <span className="mx-1">•</span>
        <span>{steps} steps</span>
      </div>
    );

    switch (status) {
      case 'completed':
        return (
          <div className="flex items-center">
            {setupInfo}
            <div className="ml-3 flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
              <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
              Setup Complete
            </div>
          </div>
        );
      case 'in_progress':
        return (
          <div className="flex items-center">
            {setupInfo}
            <div className="ml-3 flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
              <Sparkles className="w-3.5 h-3.5 mr-1" />
              In Progress
            </div>
          </div>
        );
      case 'coming_soon':
        return (
          <div className="flex items-center">
            {setupInfo}
            <div className="ml-3 flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
              <Rocket className="w-3.5 h-3.5 mr-1" />
              Coming Soon
            </div>
          </div>
        );
      case 'not_started':
        return (
          <div className="flex items-center">
            {setupInfo}
            <div className="ml-3 flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
              <AlertCircle className="w-3.5 h-3.5 mr-1" />
              Setup Required
            </div>
          </div>
        );
    }
  };

  const filteredUseCases = selectedTeams.length === 0
    ? useCases
    : useCases.filter(useCase => 
        useCase.teams.some(team => selectedTeams.includes(team as Team))
      );

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Left Panel - Now with light blue gradient */}
        <div className="w-1/4 bg-gradient-to-br from-indigo-100 via-blue-50 to-indigo-50 text-gray-900 min-h-screen p-8 sticky top-0">
          <div className="h-full flex flex-col justify-between">
            <div>
              <button
                onClick={() => navigate('/enrichment-results')}
                className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-12"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                <span>Back to Profile</span>
              </button>

              <h1 className="text-4xl font-bold mb-6">
                Choose Your Focus Area
              </h1>
              <p className="text-xl text-gray-600">
                ThriveStack helps teams like yours solve specific challenges. 
                Select the use case that best matches your needs, and we'll personalize 
                your experience accordingly.
              </p>

              <div className="mt-12 space-y-6">
                <div className="p-4 bg-white/80 rounded-lg backdrop-blur-sm">
                  <div className="flex items-center space-x-3 text-gray-900 mb-2">
                    <Sparkles className="w-5 h-5 text-indigo-600" />
                    <h3 className="font-semibold">Personalized Setup</h3>
                  </div>
                  <p className="text-gray-600">
                    We'll customize your experience based on your selected focus area.
                  </p>
                </div>

                <div className="p-4 bg-white/80 rounded-lg backdrop-blur-sm">
                  <div className="flex items-center space-x-3 text-gray-900 mb-2">
                    <Target className="w-5 h-5 text-indigo-600" />
                    <h3 className="font-semibold">Targeted Insights</h3>
                  </div>
                  <p className="text-gray-600">
                    Get insights and recommendations specific to your goals.
                  </p>
                </div>
              </div>
            </div>

            {selectedCase && (
              <div className="fixed bottom-6 right-6 z-50">
                <button
                  onClick={handleContinue}
                  disabled={useCases.find(uc => uc.id === selectedCase)?.setupStatus === 'coming_soon'}
                  className={`
                    inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-colors
                    shadow-lg hover:shadow-xl
                    ${useCases.find(uc => uc.id === selectedCase)?.setupStatus === 'coming_soon'
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700'
                    }
                  `}
                >
                  <span>
                    {useCases.find(uc => uc.id === selectedCase)?.setupStatus === 'coming_soon'
                      ? 'Coming Soon'
                      : 'Continue Setup'
                    }
                  </span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel - Expanded */}
        <div className="w-3/4 p-8">
          {/* Team Filters */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Filter by Team</h2>
              {selectedTeams.length > 0 && (
                <button
                  onClick={() => setSelectedTeams([])}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Clear filters
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {teams.map((team) => (
                <button
                  key={team}
                  onClick={() => handleTeamToggle(team)}
                  className={`
                    inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium
                    transition-colors duration-200
                    ${selectedTeams.includes(team)
                      ? 'bg-indigo-100 text-indigo-800 hover:bg-indigo-200'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }
                  `}
                >
                  <Users2 className="w-4 h-4 mr-1.5" />
                  {team}
                  {selectedTeams.includes(team) && (
                    <X className="w-4 h-4 ml-1.5 hover:text-indigo-900" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Use Cases Grid - More Compact */}
          <div className="grid grid-cols-1 gap-3">
            {filteredUseCases.map((useCase) => (
              <div
                key={useCase.id}
                className={`
                  bg-white rounded-xl shadow-sm transition-all duration-300
                  ${selectedCase === useCase.id 
                    ? 'ring-2 ring-indigo-600' 
                    : 'hover:shadow-md'
                  }
                  cursor-pointer group
                `}
              >
                <div 
                  className="p-4"
                  onClick={() => handleSelect(useCase.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className={`
                        p-3 rounded-lg transition-colors duration-200 flex-shrink-0
                        ${selectedCase === useCase.id ? 'bg-indigo-600 text-white' : 'bg-indigo-50 text-indigo-600'}
                        group-hover:${selectedCase !== useCase.id ? 'bg-indigo-100' : ''}
                      `}>
                        {useCase.icon}
                      </div>
                      <div>
                        <div className="flex items-center justify-between">
                          <h3 className="text-xl font-semibold text-gray-900">
                            {useCase.title}
                          </h3>
                        </div>
                        <p className="text-gray-600 mb-2">{useCase.shortDesc}</p>
                        <div className="flex flex-wrap gap-2">
                          {useCase.teams.map((team, index) => (
                            <div
                              key={index}
                              className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100"
                            >
                              <Users2 className="w-3 h-3 mr-1" />
                              {team}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      {getStatusBadge(useCase.setupStatus, useCase.setupTime, useCase.steps)}
                      <button
                        onClick={(e) => handleExpand(useCase.id, e)}
                        className={`
                          p-1 rounded-full hover:bg-gray-100 transition-transform duration-200
                          ${expandedCase === useCase.id ? 'rotate-180' : ''}
                        `}
                      >
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                      </button>
                    </div>
                  </div>

                  <div className={`
                    grid transition-all duration-300 ease-in-out
                    ${expandedCase === useCase.id ? 'grid-rows-[1fr] mt-4' : 'grid-rows-[0fr]'}
                  `}>
                    <div className="overflow-hidden">
                      <div className="border-t pt-4 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Challenge</h4>
                            <p className="text-gray-600 text-sm">{useCase.challenge}</p>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Solution</h4>
                            <p className="text-gray-600 text-sm">{useCase.solution}</p>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Key Features</h4>
                          <div className="grid grid-cols-2 gap-2">
                            {useCase.features.map((feature, index) => (
                              <div key={index} className="flex items-center text-sm text-gray-600">
                                <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 mr-2" />
                                {feature}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center text-sm text-indigo-600 font-medium">
                          {useCase.benefitIcon}
                          <span className="ml-2">{useCase.benefit}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}