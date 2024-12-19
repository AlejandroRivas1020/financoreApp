import apiFinancore from '../api/Api-Financore';

export interface CreateEarningPayload {
  name: string;
  startDate: string;
  endDate: string;
  generalAmount: number;
}

export interface EarningResponse {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  generalAmount: number;
  amountBudgeted: number;
}

export const createEarning = async (payload: CreateEarningPayload): Promise<EarningResponse> => {
  try {
    const response = await apiFinancore.post('/earnings', payload);
    return response.data.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to create earning');
  }
};

export const getEarnings = async (): Promise<EarningResponse[]> => {
  try {
    const response = await apiFinancore.get('/earnings');
    return response.data.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch earnings');
  }
};

export const getEarningById = async (id: string): Promise<EarningResponse> => {
  try {
    const response = await apiFinancore.get(`/earnings/${id}`);
    return response.data.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch earning details');
  }
};

export const deleteEarning = async (id: string): Promise<void> => {
  try {
    await apiFinancore.delete(`/earnings/${id}`);
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to delete earning');
  }
};
