import { useMutation } from '@tanstack/react-query';
import { sendMessage } from '../services/ContactService';

export const useSendMessage = () => {
  return useMutation<any, Error, any>({
    mutationKey: ['CONTACT'],
    mutationFn: async (message) => await sendMessage(message),
  });
};
