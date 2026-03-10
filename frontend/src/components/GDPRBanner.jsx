import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function GDPRConsent() {
  const [visible, setVisible] = useState(false); // Show consent banner
  const [accepted, setAccepted] = useState(null); // true/false/null
  const [showIcon, setShowIcon] = useState(false); // Show cookie icon

  useEffect(() => {
    const consent = localStorage.getItem("gdprConsent");
    if (consent === "true" || consent === "false") {
      setAccepted(consent === "true");
      setShowIcon(true); // show cookie icon if previously chosen
    } else {
      setVisible(true); // no previous choice
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("gdprConsent", "true");
    setAccepted(true);
    setVisible(false);
    setShowIcon(true);
  };

  const handleReject = () => {
    localStorage.setItem("gdprConsent", "false");
    setAccepted(false);
    setVisible(false);
    setShowIcon(true);
  };

  const handleIconClick = () => {
    setVisible(true);
    setShowIcon(false);
  };

  return (
    <>
      {/* Cookie Consent Banner */}
      {visible && (
        <div className="fixed bottom-6 right-6 max-w-xs p-5 rounded-lg bg-[#0B1120] text-white z-50 shadow-lg border border-gray-700">
          <p className="text-sm mb-4 text-gray-300 leading-relaxed text-center">
            We use cookies to improve your experience.{" "}
            <Link
              to="/privacy"
              className="underline font-semibold text-[#317F21] hover:text-[#4cb338] transition-colors"
            >
              See our Privacy Policy
            </Link>
          </p>
          <div className="flex justify-center gap-3">
            <button
              onClick={handleReject}
              className="px-5 py-2 rounded-md bg-gray-600 text-white text-sm hover:bg-gray-500 transition"
            >
              Reject
            </button>
            <button
              onClick={handleAccept}
              className="px-5 py-2 rounded-md text-sm text-white bg-[#317F21] hover:opacity-90 transition"
            >
              Accept
            </button>
          </div>
        </div>
      )}

      {/* Cookie Icon */}
      {showIcon && !visible && (
        <div className="fixed bottom-6 right-6 z-40">
          <button
            onClick={handleIconClick}
            className="w-10 h-10 rounded-full bg-[#317F21] shadow-lg border border-white flex items-center justify-center hover:scale-105 transition cursor-pointer"
            title="Cookie Preferences"
          >
            <img
              src="/revisit.svg"
              alt="Cookie Icon"
              className="w-5 h-5 object-contain"
              loading="lazy"
            />
          </button>
        </div>
      )}
    </>
  );
}
