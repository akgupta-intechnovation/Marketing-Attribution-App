import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Code2, 
  CheckCircle2, 
  ArrowRight, 
  Terminal,
  Sparkles,
  BarChart2,
  ArrowLeft,
  Copy,
  Bell,
  Slack,
  MessageSquare,
  Mail,
  MousePointer2,
  Gauge,
  AlertTriangle,
  Rocket
} from 'lucide-react';

const FEATURE_TRACKING = `// Track feature usage
thrivestack.track('feature_used', {
  companyId: 'company_123', // Required
  featureName: 'export_report',
  userId: 'user_456',
  userRole: 'admin',
  planTier: 'enterprise',
  success: true,
  duration: 45, // seconds
  customAttributes: {
    reportType: 'analytics',
    exportFormat: 'csv',
    rowCount: 1000
  }
});`;

const VERIFY_EVENT = `// Send a test event
thrivestack.track('feature_used', {
  companyId: 'your_company_id',
  featureName: 'test_event',
  userId: 'current_user_id'
});`;

interface NotificationChannel {
  id: string;
  name: string;
  icon: React.ReactNode;
  configured: boolean;
}

export function SetupProductAnalytics() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [scriptCopied, setScriptCopied] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [notificationChannels, setNotificationChannels] = useState<NotificationChannel[]>([
    { id: 'email', name: 'Email Notifications', icon: <Mail className="w-5 h-5" />, configured: false },
    { id: 'slack', name: 'Slack Integration', icon: <Slack className="w-5 h-5" />, configured: false },
    { id: 'teams', name: 'Microsoft Teams', icon: <MessageSquare className="w-5 h-5" />, configured: false }
  ]);
  const [emails, setEmails] = useState('');

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setScriptCopied(true);
    setTimeout(() => setScriptCopied(false), 2000);
  };

  const handleVerifyEvent = () => {
    setIsVerified(true);
  };

  const handleConfigureChannel = (channelId: string) => {
    setNotificationChannels(prev => prev.map(channel => 
      channel.id === channelId 
        ? { ...channel, configured: true }
        : channel
    ));
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(prev => prev + 1);
    } else {
      navigate('/dashboard');
    }
  };

  const renderCodeBlock = (code: string, title: string) => (
    <div className="relative">
      <div className="absolute right-4 top-4 flex items-center space-x-2">
        <button
          onClick={() => handleCopyCode(code)}
          className="inline-flex items-center space-x-1 px-3 py-1 bg-white rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 border border-gray-200 hover:border-gray-300 transition-colors"
        >
          <Copy className="w-4 h-4" />
          <span>{scriptCopied ? 'Copied!' : 'Copy'}</span>
        </button>
      </div>
      <div className="bg-gray-900 rounded-lg p-4">
        <div className="text-sm text-gray-400 mb-2">{title}</div>
        <pre className="font-mono text-sm text-gray-300 overflow-x-auto">
          {code}
        </pre>
      </div>
    </div>
  );

  const steps = [
    { id: 1, title: 'Page Visit Tracking', icon: <MousePointer2 className="w-6 h-6" /> },
    { id: 2, title: 'Feature Tracking', icon: <Gauge className="w-6 h-6" /> },
    { id: 3, title: 'Setup Alerts', icon: <Bell className="w-6 h-6" /> }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
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
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Setup Product Analytics
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Follow these steps to start tracking product usage and understand how your 
            features drive value for customers.
          </p>
        </div>

        <div className="flex gap-8">
          {/* Left Sidebar - Progress */}
          <div className="w-64 flex-shrink-0">
            <div className="sticky top-8 space-y-4">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className={`
                    relative flex items-center p-3 rounded-lg transition-all duration-200
                    ${step.id === currentStep
                      ? 'bg-white shadow-md border border-gray-200'
                      : step.id < currentStep
                        ? 'text-indigo-600'
                        : 'text-gray-400'
                    }
                  `}
                >
                  {/* Progress Line */}
                  {index < steps.length - 1 && (
                    <div 
                      className={`
                        absolute left-5 top-12 w-0.5 h-8 -z-10
                        ${step.id < currentStep ? 'bg-indigo-600' : 'bg-gray-200'}
                      `}
                    />
                  )}

                  <div
                    className={`
                      w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0
                      ${step.id === currentStep
                        ? 'bg-indigo-600 text-white'
                        : step.id < currentStep
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-100 text-gray-400'
                      }
                    `}
                  >
                    {step.id < currentStep ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : (
                      step.icon
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">
                      {step.title}
                    </span>
                    {step.id === currentStep && (
                      <span className="text-xs text-indigo-600">Current Step</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-indigo-100 rounded-lg">
                      <MousePointer2 className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900 mb-1">
                        Page Visit Tracking
                      </h2>
                      <p className="text-gray-600">
                        Great news! The base tracking script is already installed from your 
                        marketing setup. We're automatically tracking:
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-green-50 rounded-lg p-4">
                      <h3 className="font-medium text-green-800 mb-2">Automatic Tracking</h3>
                      <ul className="space-y-2">
                        <li className="flex items-center text-green-700">
                          <CheckCircle2 className="w-4 h-4 mr-2" />
                          Page visits and views
                        </li>
                        <li className="flex items-center text-green-700">
                          <CheckCircle2 className="w-4 h-4 mr-2" />
                          Button clicks
                        </li>
                        <li className="flex items-center text-green-700">
                          <CheckCircle2 className="w-4 h-4 mr-2" />
                          Link interactions
                        </li>
                        <li className="flex items-center text-green-700">
                          <CheckCircle2 className="w-4 h-4 mr-2" />
                          Form submissions
                        </li>
                      </ul>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-4">
                      <h3 className="font-medium text-blue-800 mb-2">Real-time Analytics</h3>
                      <ul className="space-y-2">
                        <li className="flex items-center text-blue-700">
                          <CheckCircle2 className="w-4 h-4 mr-2" />
                          User flow analysis
                        </li>
                        <li className="flex items-center text-blue-700">
                          <CheckCircle2 className="w-4 h-4 mr-2" />
                          Feature adoption
                        </li>
                        <li className="flex items-center text-blue-700">
                          <CheckCircle2 className="w-4 h-4 mr-2" />
                          Drop-off points
                        </li>
                        <li className="flex items-center text-blue-700">
                          <CheckCircle2 className="w-4 h-4 mr-2" />
                          Session recordings
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-indigo-100 rounded-lg">
                      <Gauge className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900 mb-1">
                        Track Feature Usage
                      </h2>
                      <p className="text-gray-600">
                        Add this code to track specific feature usage in your application.
                      </p>
                    </div>
                  </div>

                  {renderCodeBlock(FEATURE_TRACKING, 'Feature Tracking Code')}

                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                      <div className="text-sm text-amber-800">
                        <strong>Important:</strong> Always include the <code>companyId</code> parameter 
                        to enable account-level analytics.
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Verify Your Implementation
                    </h3>
                    {renderCodeBlock(VERIFY_EVENT, 'Test Event')}
                    
                    <button
                      onClick={handleVerifyEvent}
                      className={`
                        mt-4 inline-flex items-center space-x-2 px-4 py-2 rounded-lg font-medium
                        ${isVerified
                          ? 'bg-green-100 text-green-700'
                          : 'bg-indigo-600 text-white hover:bg-indigo-700'
                        }
                      `}
                    >
                      {isVerified ? (
                        <>
                          <CheckCircle2 className="w-5 h-5 mr-2" />
                          Event Verified
                        </>
                      ) : (
                        <>
                          <Terminal className="w-5 h-5 mr-2" />
                          Verify Event
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-indigo-100 rounded-lg">
                      <Bell className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900 mb-1">
                        Setup Notifications
                      </h2>
                      <p className="text-gray-600">
                        Configure alerts for your product management team.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Recipients
                      </label>
                      <input
                        type="text"
                        value={emails}
                        onChange={(e) => setEmails(e.target.value)}
                        placeholder="Enter comma-separated email addresses"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      {notificationChannels.map(channel => (
                        <div
                          key={channel.id}
                          className={`
                            p-4 rounded-lg border-2 transition-colors
                            ${channel.configured
                              ? 'border-green-200 bg-green-50'
                              : 'border-gray-200 hover:border-indigo-200'
                            }
                          `}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-2">
                              {channel.icon}
                              <span className="font-medium">{channel.name}</span>
                            </div>
                            {channel.configured && (
                              <CheckCircle2 className="w-5 h-5 text-green-500" />
                            )}
                          </div>
                          <button
                            onClick={() => handleConfigureChannel(channel.id)}
                            disabled={channel.configured}
                            className={`
                              w-full px-3 py-1.5 rounded text-sm font-medium
                              ${channel.configured
                                ? 'bg-green-100 text-green-700 cursor-not-allowed'
                                : 'bg-indigo-600 text-white hover:bg-indigo-700'
                              }
                            `}
                          >
                            {channel.configured ? 'Configured' : 'Configure'}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Success Message */}
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-6">
                    <div className="flex items-start space-x-3">
                      <Rocket className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <div className="text-green-800">
                        <strong className="font-medium block mb-1">
                          Congratulations! 🎉
                        </strong>
                        <p className="text-sm">
                          Your product analytics setup is complete. Engagement and Feature Usage 
                          reports are now ready to use in your dashboard.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <button
                onClick={handleNext}
                className="fixed-cta"
              >
                <span>{currentStep === steps.length ? 'Go to Dashboard' : 'Next Step'}</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}