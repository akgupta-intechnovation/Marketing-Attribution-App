import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  Mail,
  ArrowRight,
} from "lucide-react";

const TRACKING_SCRIPT = `<script>
  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://cdn.thrivestack.io/ts.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','tsLayer','TS-XXXXX');
</script>`;

const valuePropositions = [
  {
    id: "traffic",
    title: "Visitors by Campaigns",
    description: "Track visitors from different marketing campaigns",
    icon: <Target className="w-5 h-5" />,
    image: "https://placehold.co/400x300?text=Campaign+Tracking",
    impact: "Optimize marketing spend and increase ROI by 35%",
  },
  {
    id: "channels",
    title: "Visitors by Channels",
    description: "Analyze traffic sources and channels",
    icon: <LineChart className="w-5 h-5" />,
    image: "https://placehold.co/400x300?text=Channel+Analysis",
    impact: "Identify top-performing channels and reduce CAC by 25%",
  },
  {
    id: "engagement",
    title: "Page Engagement",
    description: "Measure how visitors interact with your content",
    icon: <MousePointer2 className="w-5 h-5" />,
    image: "https://placehold.co/400x300?text=Page+Engagement",
    impact: "Improve conversion rates by understanding user behavior",
  },
  {
    id: "conversion",
    title: "Conversions",
    description: "Track signup and conversion rates",
    icon: <Sparkles className="w-5 h-5" />,
    image: "https://placehold.co/400x300?text=Conversion+Tracking",
    impact: "Increase conversion rates by up to 45%",
  },
];

export function SetupVisitorAnalytics() {
  const navigate = useNavigate();
  const [scriptCopied, setScriptCopied] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isVerifying, setIsVerifying] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  const [showValueImage, setShowValueImage] = useState<string | null>(null);

  const handleCopyScript = () => {
    navigator.clipboard.writeText(TRACKING_SCRIPT);
    setScriptCopied(true);
    setShowTooltip(true);
    setIsVerifying(true);

    // Simulate verification after 30 seconds
    setTimeout(() => {
      setIsVerifying(false);
      setIsVerified(true);
    }, 10000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate("/customize")}
            className="inline-flex items-center text-gray-600 hover:text-gray-900">
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
            Track and analyze visitor behavior on your website, and connect it
            with user signups and conversions
          </p>

          {/* Value Propositions */}
          <div className="grid grid-cols-4 gap-4 mb-12">
            {valuePropositions.map((value) => (
              <div
                key={value.id}
                className="relative p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                onMouseEnter={() => setShowValueImage(value.id)}
                onMouseLeave={() => setShowValueImage(null)}>
                <div className="flex items-center space-x-2 text-indigo-600 mb-2">
                  {value.icon}
                  <h3 className="font-medium">{value.title}</h3>
                </div>
                <p className="text-sm text-gray-600">{value.description}</p>

                {/* Hover Image */}
                {showValueImage === value.id && (
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-50">
                    <div className="bg-white rounded-lg shadow-lg p-4 w-80">
                      <img
                        src={value.image}
                        alt={value.title}
                        className="w-full h-40 object-cover rounded mb-2"
                      />
                      <p className="text-sm font-medium text-indigo-600">
                        {value.impact}
                      </p>
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
                Copy and paste the following script in the{" "}
                <code>&lt;head&gt;</code> section of your marketing website's
                HTML.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute right-4 top-4">
              <button
                onClick={handleCopyScript}
                className={`
                  inline-flex items-center space-x-1 px-3 py-1 rounded-md text-sm font-medium
                  transition-all duration-200
                  ${
                    scriptCopied
                      ? "bg-green-100 text-green-700"
                      : "bg-white text-gray-600 hover:text-gray-900 border border-gray-200 hover:border-gray-300"
                  }
                  ${
                    !scriptCopied && !isVerified
                      ? "animate-pulse ring-2 ring-indigo-400"
                      : ""
                  }
                `}>
                <Copy className="w-4 h-4" />
                <span>{scriptCopied ? "Copied!" : "Copy"}</span>
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
            <span>
              Please refresh your marketing page after script installation
            </span>
            <button
              onClick={() => setShowTooltip(false)}
              className="text-gray-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* CTAs */}
        {isVerified && (
          <div className="fixed bottom-6 right-6 flex items-center space-x-4">
            <button
              onClick={() => navigate("/setup-product")}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-white text-indigo-600 rounded-lg font-semibold border border-indigo-600 hover:bg-indigo-50 transition-colors shadow-lg">
              <span>Setup Product Analytics</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => navigate("/visitor-analytics")}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow-lg">
              <span>View Analytics Dashboard</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
