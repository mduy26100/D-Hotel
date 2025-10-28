import { useState } from "react";
import { askAsyncAPI } from "../../api/assistants/assistants";

export const useAskAssistant = () => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const ask = async (prompt) => {
    setLoading(true);
    setError(null);

    try {
      const data = await askAsyncAPI({ prompt });
      setResponse(data);
      setLoading(false);
      return data;
    } catch (err) {
      setError(err);
      setLoading(false);
      throw err;
    }
  };

  return { response, loading, error, ask };
};
