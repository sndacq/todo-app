import { FC, createContext, useContext, useState } from 'react';

interface IAppWrapperProps {
  children: React.ReactNode;
}

interface IStateContext {
  session: boolean;
  setSession: React.Dispatch<boolean>;
}

const AppContext = createContext<IStateContext>({
  session: false,
  setSession: () => {},
});

export const AppWrapper: FC<IAppWrapperProps> = ({ children }) => {
  const [session, setSession] = useState(false);

  return (
    <AppContext.Provider value={{session, setSession}}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => {
  return useContext(AppContext);
}