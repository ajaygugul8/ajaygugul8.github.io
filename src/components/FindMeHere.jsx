import React from 'react'

export default function FindMeHere() {
  return (
    <div className="max-w-[1100px] mx-auto rounded-[20px] overflow-hidden border border-[#e8e4df] shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
      <div className="h-[480px]">
        {/* Google Maps Embed */}
        <div className="relative h-full">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15225.90211714185!2d79.5284884!3d17.9950581!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a334fa687aa9469:0x2e324021ffcbebc2!2s1-1-220,+Prashanthnagar+Colony,+Hanamkonda,+Telangana+506004!5e0!3m2!1sen!2sin!4v1234567890"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full"
          />
          
          {/* Location Info Card Overlay */}
          <div className="absolute bottom-8 left-8 bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-4 max-w-sm">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">1-1-220, Prashanthnagar Colony, Hanamkonda, Telangana 506004</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Open to remote & on-site opportunities</p>
                <div className="flex items-center gap-4 text-sm">
                  <button 
                    className="text-blue-600 hover:text-blue-700 font-medium"
                    onClick={() => window.open('https://www.google.com/maps/dir/?api=1&destination=1-1-220,+Prashanthnagar+Colony,+Hanamkonda,+Telangana+506004', '_blank')}
                  >
                    Directions
                  </button>
                  <button 
                    className="text-blue-600 hover:text-blue-700 font-medium"
                    onClick={() => {
                      navigator.clipboard.writeText('https://www.google.com/maps/place/1-1-220,+Prashanthnagar+Colony,+Hanamkonda,+Telangana+506004');
                      alert('Location link copied to clipboard!');
                    }}
                  >
                    Share
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
