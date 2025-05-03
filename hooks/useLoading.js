// hooks/useLoading.js
import { useState } from "react";

const useLoading = (initialState = false) => {
  const [loading, setLoading] = useState(initialState);
  const [loadingMessage, setLoadingMessage] = useState("");

  const startLoading = (message = "") => {
    setLoading(true);
    setLoadingMessage(message);
  };

  const stopLoading = () => {
    setLoading(false);
    setLoadingMessage("");
  };

  return {
    loading,
    loadingMessage,
    startLoading,
    stopLoading,
    isLoading: loading, // Alias for loading
    withLoading: async (fn, message = "") => {
      startLoading(message);
      try {
        return await fn();
      } finally {
        stopLoading();
      }
    },
  };
};

export default useLoading;
