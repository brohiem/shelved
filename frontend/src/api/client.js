const API_BASE = import.meta.env.VITE_API_URL || "/api";

class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

class ApiClient {
  constructor() {
    this.baseUrl = API_BASE;
  }

  getToken() {
    return localStorage.getItem("shelved_token");
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    const token = this.getToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(url, { ...options, headers });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: "Request failed" }));
      throw new ApiError(response.status, error.error || "Something went wrong");
    }

    return response.json();
  }

  login(email, password) {
    return this.request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  }

  register(email, name, password) {
    return this.request("/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, name, password }),
    });
  }

  getBooks({ search, category } = {}) {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (category) params.set("category", category);
    const qs = params.toString();
    return this.request(`/books${qs ? `?${qs}` : ""}`);
  }

  getBook(id) {
    return this.request(`/books/${id}`);
  }

  getOrders() {
    return this.request("/orders");
  }

  createOrder(items) {
    return this.request("/orders", {
      method: "POST",
      body: JSON.stringify({ items }),
    });
  }

  healthCheck() {
    return this.request("/health");
  }
}

export const api = new ApiClient();
export { ApiError };
