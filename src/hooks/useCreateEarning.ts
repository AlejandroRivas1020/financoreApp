import { useState } from 'react';
import { createEarning, CreateEarningPayload, EarningResponse } from '../services/earningService';

export const useCreateEarning = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<EarningResponse | null>(null);

  const createEarningHandler = async (payload: CreateEarningPayload): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await createEarning(payload);
      setData(response);
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { createEarningHandler, data, isLoading, error };
};

