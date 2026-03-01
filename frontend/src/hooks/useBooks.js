import { useState, useEffect } from "react";
import { api } from "../api/client";

export function useBooks({ search = "", category = "" } = {}) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    api
      .getBooks({ search: search || undefined, category: category || undefined })
      .then((data) => {
        if (!cancelled) {
          setBooks(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [search, category]);

  return { books, loading, error };
}
