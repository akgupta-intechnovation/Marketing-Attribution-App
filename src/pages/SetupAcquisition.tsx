import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Code2,
  CheckCircle2,
  ArrowRight,
  Terminal,
  Sparkles,
  BarChart2,
  ArrowLeft,
  Copy,
  ExternalLink,
  UserPlus,
  Building2,
  Link,
  Bell,
  Users,
  Slack,
  MessageSquare,
  Mail,
} from "lucide-react";

const TRACKING_SCRIPT = `<script>
  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://cdn.thrivestack.io/ts.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','tsLayer','TS-XXXXX');
</script>`;

const SIGNUP_TRACKING = `// Track signup event
thrivestack.track('user_signed_up', {
  userId: user.id,
  email: user.email,
  source: source,
  referrer: document.referrer,
  utm_source: params.get('utm_source'),
  utm_medium: params.get('utm_medium'),
  utm_campaign: params.get('utm_campaign')
});`;

const USER_IDENTIFY = `// Identify and enrich user
thrivestack.identify(user.id, {
  email: user.email,
  name: user.name,
  role: user.role,
  created_at: new Date().toISOString()
});`;

const COMPANY_IDENTIFY = `// Identify and enrich company
thrivestack.company(company.id, {
  name: company.name,
  domain: company.domain,
  industry: company.industry,
  size: company.employeeCount,
  plan: company.plan
});`;

const USER_COMPANY_LINK = `// Associate user with company
thrivestack.link({
  userId: user.id,
  companyId: company.id,
  role: 'member'
});`;

interface NotificationChannel {
  id: string;
  name: string;
  icon: React.ReactNode;
  configured: boolean;
}

export function SetupAcquisition() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [scriptCopied, setScriptCopied] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [notificationChannels, setNotificationChannels] = useState<
    NotificationChannel[]
  >([
    {
      id: "email",
      name: "Email Notifications",
      icon: <Mail className="w-5 h-5" />,
      configured: false,
    },
    {
      id: "slack",
      name: "Slack Integration",
      icon: <Slack className="w-5 h-5" />,
      configured: false,
    },
    {
      id: "teams",
      name: "Microsoft Teams",
      icon: <MessageSquare className="w-5 h-5" />,
      configured: false,
    },
  ]);
  const [emails, setEmails] = useState("");

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setScriptCopied(true);
    setTimeout(() => setScriptCopied(false), 2000);
  };

  const handleVerifyInstallation = () => {
    setIsVerified(true);
  };

  const handleConfigureChannel = (channelId: string) => {
    setNotificationChannels((prev) =>
      prev.map((channel) =>
        channel.id === channelId ? { ...channel, configured: true } : channel
      )
    );
  };

  const handleNext = () => {
    if (currentStep < 6) {
      setCurrentStep((prev) => prev + 1);
    } else {
      navigate("/dashboard");
    }
  };

  const renderCodeBlock = (code: string, title: string) => (
    <div className="relative">
      <div className="absolute right-4 top-4 flex items-center space-x-2">
        <button
          onClick={() => handleCopyCode(code)}
          className="inline-flex items-center space-x-1 px-3 py-1 bg-white rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 border border-gray-200 hover:border-gray-300 transition-colors">
          <Copy className="w-4 h-4" />
          <span>{scriptCopied ? "Copied!" : "Copy"}</span>
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
    {
      id: 1,
      title: "Install Base Script",
      icon: <Code2 className="w-6 h-6" />,
    },
    { id: 2, title: "Track Signups", icon: <UserPlus className="w-6 h-6" /> },
    { id: 3, title: "Identify Users", icon: <Users className="w-6 h-6" /> },
    {
      id: 4,
      title: "Enrich Companies",
      icon: <Building2 className="w-6 h-6" />,
    },
    { id: 5, title: "Link Users", icon: <Link className="w-6 h-6" /> },
    { id: 6, title: "Setup Alerts", icon: <Bell className="w-6 h-6" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate("/connect")}
            className="inline-flex items-center text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span>Back to Integrations</span>
          </button>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Setup Acquisition Analytics
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Follow these steps to start tracking your marketing attribution and
            understand which channels drive the most valuable customers.
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
                    ${
                      step.id === currentStep
                        ? "bg-white shadow-md border border-gray-200"
                        : step.id < currentStep
                        ? "text-indigo-600"
                        : "text-gray-400"
                    }
                  `}>
                  {/* Progress Line */}
                  {index < steps.length - 1 && (
                    <div
                      className={`
                        absolute left-5 top-12 w-0.5 h-8 -z-10
                        ${
                          step.id < currentStep
                            ? "bg-indigo-600"
                            : "bg-gray-200"
                        }
                      `}
                    />
                  )}

                  <div
                    className={`
                      w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0
                      ${
                        step.id === currentStep
                          ? "bg-indigo-600 text-white"
                          : step.id < currentStep
                          ? "bg-indigo-600 text-white"
                          : "bg-gray-100 text-gray-400"
                      }
                    `}>
                    {step.id < currentStep ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : (
                      step.icon
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{step.title}</span>
                    {step.id === currentStep && (
                      <span className="text-xs text-indigo-600">
                        Current Step
                      </span>
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
                        Install Base Tracking Script
                      </h2>
                      <p className="text-gray-600">
                        Copy and paste the following script in the{" "}
                        <code>&lt;head&gt;</code> section of your website's
                        HTML.
                      </p>
                    </div>
                  </div>

                  {renderCodeBlock(TRACKING_SCRIPT, "Base Tracking Script")}

                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <Terminal className="w-5 h-5 text-amber-600 flex-shrink-0" />
                      <div className="text-sm text-amber-800">
                        <strong>Important:</strong> Place the script in the{" "}
                        <code>&lt;head&gt;</code> section before any other
                        scripts to ensure proper tracking.
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-indigo-100 rounded-lg">
                      <UserPlus className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900 mb-1">
                        Track User Signups
                      </h2>
                      <p className="text-gray-600">
                        Add this code to your signup success handler to track
                        new user registrations.
                      </p>
                    </div>
                  </div>

                  {renderCodeBlock(SIGNUP_TRACKING, "Signup Tracking Code")}

                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <Sparkles className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <div className="text-sm text-green-800">
                        Once added, you'll be able to analyze your acquisition
                        funnel in real-time and understand which channels bring
                        the most valuable users.
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-indigo-100 rounded-lg">
                      <Users className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900 mb-1">
                        Identify and Enrich Users
                      </h2>
                      <p className="text-gray-600">
                        Add user identification to enable segmentation by user
                        attributes.
                      </p>
                    </div>
                  </div>

                  {renderCodeBlock(USER_IDENTIFY, "User Identification Code")}

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <Sparkles className="w-5 h-5 text-blue-600 flex-shrink-0" />
                      <div className="text-sm text-blue-800">
                        User identification enables powerful segmentation
                        capabilities and automatic enrichment of user profiles
                        with additional data.
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-indigo-100 rounded-lg">
                      <Building2 className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900 mb-1">
                        Identify and Enrich Companies
                      </h2>
                      <p className="text-gray-600">
                        Add company identification to enable account-level
                        analytics.
                      </p>
                    </div>
                  </div>

                  {renderCodeBlock(
                    COMPANY_IDENTIFY,
                    "Company Identification Code"
                  )}

                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <Sparkles className="w-5 h-5 text-purple-600 flex-shrink-0" />
                      <div className="text-sm text-purple-800">
                        Company identification enables automatic enrichment with
                        firmographic data like industry, size, and funding
                        information.
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 5 && (
                <div className="space-y-6">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-indigo-100 rounded-lg">
                      <Link className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900 mb-1">
                        Link Users to Companies
                      </h2>
                      <p className="text-gray-600">
                        Associate users with their companies for account-level
                        analytics.
                      </p>
                    </div>
                  </div>

                  {renderCodeBlock(
                    USER_COMPANY_LINK,
                    "User-Company Association Code"
                  )}

                  <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <Sparkles className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                      <div className="text-sm text-indigo-800">
                        Linking users to companies enables powerful
                        account-based analytics and helps you understand team
                        adoption patterns.
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 6 && (
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
                        Configure alerts for your marketing and product teams.
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
                      {notificationChannels.map((channel) => (
                        <div
                          key={channel.id}
                          className={`
                            p-4 rounded-lg border-2 transition-colors
                            ${
                              channel.configured
                                ? "border-green-200 bg-green-50"
                                : "border-gray-200 hover:border-indigo-200"
                            }
                          `}>
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-2">
                              {channel.icon}
                              <span className="font-medium">
                                {channel.name}
                              </span>
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
                              ${
                                channel.configured
                                  ? "bg-green-100 text-green-700 cursor-not-allowed"
                                  : "bg-indigo-600 text-white hover:bg-indigo-700"
                              }
                            `}>
                            {channel.configured ? "Configured" : "Configure"}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <button onClick={handleNext} className="fixed-cta">
                <span>
                  {currentStep === steps.length
                    ? "Go to Dashboard"
                    : "Next Step"}
                </span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
