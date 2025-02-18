import React, { useState, useEffect } from 'react';
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
  Users,
  LineChart,
  MousePointer2,
  Clock,
  Target
} from 'lucide-react';

const TRACKING_SCRIPT = `<script>
  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://cdn.thrivestack.io/ts.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','tsLayer','TS-XXXXX');
</script>`;

export function SetupVisitorAnalytics() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [scriptCopied, setScriptCopied] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const handleCopyScript = () => {
    navigator.clipboard.writeText(TRACKING_SCRIPT);
    setScriptCopied(true);
    setShowTooltip(true);
    setTimeout(() => {
      setScriptCopied(false);
      setShowTooltip(false);
    }, 1000);
  };

  const handleNext = () => {
    if (currentStep === 1) {
      setCurrentStep(2);
    } else {
      navigate('/visitor-analytics');
    }
  };

  const steps = [
    { id: 1, title: 'Track Visitors', icon: <Users className="w-6 h-6" /> },
    { id: 2, title: 'Unlock Analytics', icon: <BarChart2 className="w-6 h-6" /> }
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
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Target className="w-8 h-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-900">
              Setup Visitor Analytics
            </h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Track and analyze visitor behavior on your website, and connect it with user signups and conversions
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
                      <Code2 className="w-6 h-6 text-indigo-600" />
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

                  {showTooltip && (
                    <div className="fixed bottom-8 left-8 bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg text-sm animate-fade-in">
                      After pasting script, please refresh your page and interact with that
                    </div>
                  )}
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-indigo-100 rounded-lg">
                      <BarChart2 className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900 mb-1">
                        Unlock Visitor Analytics
                      </h2>
                      <p className="text-gray-600">
                        Get detailed insights about your website visitors
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="p-4 bg-indigo-50 rounded-lg">
                      <div className="flex items-center space-x-2 text-indigo-600 mb-2">
                        <Target className="w-5 h-5" />
                        <h3 className="font-medium">Visitors by Campaigns</h3>
                      </div>
                      <p className="text-sm text-gray-600">
                        Track visitors from different marketing campaigns
                      </p>
                    </div>

                    <div className="p-4 bg-green-50 rounded-lg">
                      <div className="flex items-center space-x-2 text-green-600 mb-2">
                        <LineChart className="w-5 h-5" />
                        <h3 className="font-medium">Visitors by Channels</h3>
                      </div>
                      <p className="text-sm text-gray-600">
                        Analyze traffic sources and channels
                      </p>
                    </div>

                    <div className="p-4 bg-amber-50 rounded-lg">
                      <div className="flex items-center space-x-2 text-amber-600 mb-2">
                        <MousePointer2 className="w-5 h-5" />
                        <h3 className="font-medium">Page Engagement</h3>
                      </div>
                      <p className="text-sm text-gray-600">
                        Measure how visitors interact with your content
                      </p>
                    </div>

                    <div className="p-4 bg-purple-50 rounded-lg">
                      <div className="flex items-center space-x-2 text-purple-600 mb-2">
                        <Sparkles className="w-5 h-5" />
                        <h3 className="font-medium">Conversions</h3>
                      </div>
                      <p className="text-sm text-gray-600">
                        Track signup and conversion rates
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handleNext}
                    className="w-full py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                  >
                    Unlock Visitor Analytics
                  </button>
                </div>
              )}

              {/* Navigation */}
              {currentStep === 1 && (
                <button
                  onClick={handleNext}
                  className="fixed-cta"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}