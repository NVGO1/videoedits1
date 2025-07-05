import { useNavigate } from 'react-router-dom';

export function LandingFooter() {
  const navigate = useNavigate();

  const handleTermsClick = () => {
    navigate('/terms');
  };

  const handlePrivacyClick = () => {
    navigate('/privacy');
  };

  return (
    <footer className="bg-gradient-to-r from-gray-900 to-black text-white py-12">
      <div className="container mx-auto px-6">
        <div className="text-center space-y-4">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            NVGO
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <button
              onClick={handleTermsClick}
              className="hover:text-blue-400 transition-colors cursor-pointer"
            >
              Terms and Conditions
            </button>
            <span className="text-gray-500">|</span>
            <button
              onClick={handlePrivacyClick}
              className="hover:text-blue-400 transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
          </div>

          <p className="text-sm text-gray-400">
            Copyright © 2025 NVGO LLC - All Rights Reserved
          </p>

          <p className="text-xs text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Disclaimer: Service delivery times and payment terms are subject to our Terms and Conditions.
            All pricing is in USD and subject to change. Quality guarantee applies to initial delivery only.
          </p>
        </div>
      </div>
    </footer>
  );
}