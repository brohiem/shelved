import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { api } from "../api/client";
import { useToast } from "./ToastContext";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    const savedToken = localStorage.getItem("shelved_token");
    const savedUser = localStorage.getItem("shelved_user");
    if (savedToken && savedUser) {
      try {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem("shelved_token");
        localStorage.removeItem("shelved_user");
      }
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (email, password) => {
    const data = await api.login(email, password);
    setToken(data.token);
    setUser(data.user);
    localStorage.setItem("shelved_token", data.token);
    localStorage.setItem("shelved_user", JSON.stringify(data.user));
    showToast(`Welcome back, ${data.user.name}!`, "success");
    return data;
  }, [showToast]);

  const register = useCallback(async (email, name, password) => {
    await api.register(email, name, password);
    const data = await api.login(email, password);
    setToken(data.token);
    setUser(data.user);
    localStorage.setItem("shelved_token", data.token);
    localStorage.setItem("shelved_user", JSON.stringify(data.user));
    showToast(`Welcome to Shelved, ${data.user.name}!`, "success");
    return data;
  }, [showToast]);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("shelved_token");
    localStorage.removeItem("shelved_user");
    showToast("Signed out successfully", "info");
  }, [showToast]);

  const isAuthenticated = !!token && !!user;

  return (
    <AuthContext.Provider value={{ user, token, loading, isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
