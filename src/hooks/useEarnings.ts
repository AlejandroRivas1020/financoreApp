import { useEffect, useState } from 'react';
import { getEarnings ,EarningResponse} from '../services/earningService';


export const useEarnings = () => {
  const [earnings, setEarnings] = useState<EarningResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEarnings = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getEarnings();
      setEarnings(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEarnings();
  }, []);

  return { earnings, isLoading, error, fetchEarnings };
};
