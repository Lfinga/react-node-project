import { useContext } from 'react';
import { LoginContext } from '../context/AuthContextProvider';

export function useLoginContext() {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error('useLoginContext must be used within a loginContextProvider');
  }
  return context;
}
