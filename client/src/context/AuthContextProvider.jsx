import { createContext, useState } from 'react';

export const LoginContext = createContext({ isLoggedIn: null, setIsLoggedIn: () => {} });

export default function LoginContextProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  return <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>{children}</LoginContext.Provider>;
}
