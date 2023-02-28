import {
  FC, createContext, useContext, useState, useEffect,
} from 'react';

interface IAppWrapperProps {
  children: React.ReactNode;
}

interface IUser {
  email: string;
  name?: string;
  id: string;
}

interface ISession {
  accessToken: string;
  user: IUser;
}

interface IStateContext {
  userData: IUser;
  storeSession: (data: ISession) => void;
  token: string;
}

const AppContext = createContext<IStateContext>({
  userData: {} as IUser,
  storeSession: () => {},
  token: '',
});

export const AppWrapper: FC<IAppWrapperProps> = ({ children }) => {
  const [userData, setUserData] = useState({} as IUser);
  const [token, setToken] = useState('');

  useEffect(() => {
    // get token onload
    const tokenString = localStorage.getItem('token');
    setToken(tokenString || '');
  }, []);

  const storeSession = (data: ISession) => {
    const { accessToken, user } = data;
    const tokenString = JSON.stringify(accessToken);
    localStorage.setItem('token', tokenString);
    setToken(tokenString);
    setUserData(user);
  };

  return (
    <AppContext.Provider value={{ userData, storeSession, token }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
