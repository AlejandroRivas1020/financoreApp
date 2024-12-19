import { useState } from 'react';
import { getEarningById ,EarningResponse } from '../services/earningService';


export const useEarningDetails = (id: string) => {
  const [earning, setEarning] = useState<EarningResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEarningDetails = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getEarningById(id);
      setEarning(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { earning, isLoading, error, fetchEarningDetails };
};
