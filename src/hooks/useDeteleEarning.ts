import { deleteEarning } from '../services/earningService';

export const useDeleteEarning = (refreshCallback: () => void) => {
  const deleteEarningHandler = async (id: string) => {
    try {
      await deleteEarning(id);
      refreshCallback();
    } catch (err: any) {
      throw new Error(err.message);
    }
  };

  return { deleteEarningHandler };
};
