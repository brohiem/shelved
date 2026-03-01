import { useState, useEffect } from "react";
import Modal from "../ui/Modal";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function AuthModal({ isOpen, onClose, initialTab = "login" }) {
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);

  const handleSuccess = () => {
    onClose();
  };

  const isLogin = activeTab === "login";

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="" size="sm">
      {/* Header */}
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-dark">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h3>
        <p className="text-body text-sm mt-1">
          {isLogin
            ? "Sign in to your account"
            : "Join Shelved today"}
        </p>
      </div>

      {/* Tab switcher */}
      <div className="flex border-b border-border mb-6">
        <button
          onClick={() => setActiveTab("login")}
          className={`flex-1 pb-3 text-sm font-medium transition-colors cursor-pointer ${
            isLogin
              ? "border-b-2 border-primary text-dark"
              : "text-body hover:text-dark"
          }`}
        >
          Sign In
        </button>
        <button
          onClick={() => setActiveTab("register")}
          className={`flex-1 pb-3 text-sm font-medium transition-colors cursor-pointer ${
            !isLogin
              ? "border-b-2 border-primary text-dark"
              : "text-body hover:text-dark"
          }`}
        >
          Create Account
        </button>
      </div>

      {/* Form */}
      {isLogin ? (
        <LoginForm onSuccess={handleSuccess} />
      ) : (
        <RegisterForm onSuccess={handleSuccess} />
      )}

      {/* Bottom toggle text */}
      <p className="text-center text-sm text-body mt-6">
        {isLogin ? (
          <>
            Don&apos;t have an account?{" "}
            <button
              onClick={() => setActiveTab("register")}
              className="text-primary-dark hover:text-dark font-medium cursor-pointer"
            >
              Sign Up
            </button>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <button
              onClick={() => setActiveTab("login")}
              className="text-primary-dark hover:text-dark font-medium cursor-pointer"
            >
              Sign In
            </button>
          </>
        )}
      </p>
    </Modal>
  );
}
