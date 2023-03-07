import {
  FC, createContext, useContext, useState, useEffect, useMemo,
} from 'react';

interface IAppWrapperProps {
  children: React.ReactNode;
}

interface IUser {
  email: string;
  name?: string;
}

interface ISession extends IUser {
  token: string;
}

export enum ISortValue {
  INC = 'INC',
  DEC = 'DEC',
}

interface IStatusOptions {
  active: boolean;
  finished: boolean;
  unfinished: boolean;
}

interface IFilterOptions {
  status: IStatusOptions
}

interface IStateContext {
  userData: IUser;
  storeSession: (data: any) => void;
  deleteSession: () => void;
  token: string;
  searchValue: string;
  setSearchValue: React.Dispatch<string>;
  sortValue: ISortValue | null;
  toggleSortValue: () => void;
  filterOptions: IFilterOptions;
  setFilterOptions: React.Dispatch<IFilterOptions>;
}

const AppContext = createContext<IStateContext>({
  userData: {} as IUser,
  storeSession: () => {},
  deleteSession: () => {},
  token: '',
  searchValue: '',
  setSearchValue: () => {},
  sortValue: null,
  toggleSortValue: () => {},
  filterOptions: {} as IFilterOptions,
  setFilterOptions: () => {},
});

export const AppWrapper: FC<IAppWrapperProps> = ({ children }) => {
  const [userData, setUserData] = useState({} as IUser);
  const [token, setToken] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [sortValue, setSortValue] = useState(null as ISortValue | null);
  const [filterOptions, setFilterOptions] = useState({
    status: {
      active: false,
      finished: false,
      unfinished: false,
    },
  } as IFilterOptions);

  useEffect(() => {
    // get token onload
    const tokenString = localStorage.getItem('token');
    setToken(tokenString || '');
  }, []);

  const storeSession = (data: ISession) => {
    localStorage.setItem('token', data.token);
    setToken(data.token);
    setUserData({ email: data.email });
  };

  const deleteSession = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
  };

  const toggleSortValue = () => {
    if (sortValue === ISortValue.INC) {
      setSortValue(ISortValue.DEC);
    } else if (sortValue === ISortValue.DEC) {
      setSortValue(ISortValue.INC);
    } else setSortValue(ISortValue.INC);
  };

  const values = useMemo(
    () => ({
      userData,
      storeSession,
      deleteSession,
      token,
      searchValue,
      setSearchValue,
      sortValue,
      toggleSortValue,
      filterOptions,
      setFilterOptions,
    }),
    [
      userData,
      storeSession,
      deleteSession,
      token,
      searchValue,
      setSearchValue,
      sortValue,
      toggleSortValue,
      filterOptions,
      setFilterOptions,
    ],
  );
  return (
    <AppContext.Provider value={values}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
