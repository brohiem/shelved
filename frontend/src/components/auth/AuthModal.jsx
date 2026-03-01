import { useState, useEffect } from "react";
import Modal from "../ui/Modal";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function AuthModal({ isOpen, onClose, initialTab = "login" }) {
  const [activeTab, setActiveTab] = useState(initialTab);

  // Reset to initial tab when modal opens
  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);

  const handleSuccess = () => {
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="" size="sm">
      {/* Title */}
      <h3 className="text-2xl font-display font-semibold text-forest-900 text-center mb-6">
        Welcome to Shelved
      </h3>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab("login")}
          className={`flex-1 pb-3 text-sm font-medium transition-colors cursor-pointer ${
            activeTab === "login"
              ? "text-forest-700 border-b-2 border-forest-700"
              : "text-bark-300 hover:text-bark-500"
          }`}
        >
          Sign In
        </button>
        <button
          onClick={() => setActiveTab("register")}
          className={`flex-1 pb-3 text-sm font-medium transition-colors cursor-pointer ${
            activeTab === "register"
              ? "text-forest-700 border-b-2 border-forest-700"
              : "text-bark-300 hover:text-bark-500"
          }`}
        >
          Create Account
        </button>
      </div>

      {/* Form */}
      {activeTab === "login" ? (
        <LoginForm onSuccess={handleSuccess} />
      ) : (
        <RegisterForm onSuccess={handleSuccess} />
      )}

      {/* Toggle link */}
      <p className="text-center text-sm text-bark-300 mt-6">
        {activeTab === "login" ? (
          <>
            Don&apos;t have an account?{" "}
            <button
              onClick={() => setActiveTab("register")}
              className="text-forest-700 hover:text-forest-800 font-medium underline underline-offset-2 cursor-pointer"
            >
              Create one
            </button>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <button
              onClick={() => setActiveTab("login")}
              className="text-forest-700 hover:text-forest-800 font-medium underline underline-offset-2 cursor-pointer"
            >
              Sign in
            </button>
          </>
        )}
      </p>
    </Modal>
  );
}
