import { createContext, useReducer, ReactNode } from 'react';
import jwtDecode from 'jwt-decode';

import { User } from '../types/types';

interface AuthProviderProps {
  children: ReactNode;
}

interface DecodedToken {
  username?: string;
  email?: string;
  exp: number;
  iat: number;
  id?: string;
}

interface InitialState {
  user: DecodedToken | null;
}

const initialState: InitialState = {
  user: null,
};

interface AuthState<T> {
  user: T;
}

type AuthAction<T> =
  | { type: 'LOGIN'; payload?: T }
  | { type: 'LOGOUT'; payload?: T };

type AuthContextValue = {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
};

if (localStorage.getItem('jwtToken')) {
  const decodedToken = jwtDecode<DecodedToken>(
    localStorage.getItem('jwtToken') || '{}'
  );
  // Check if jwt Token is expired
  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem('jwtToken');
  } else {
    initialState.user = decodedToken;
  }
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  login: (userData: User) => {},
  logout: () => {},
});

function authReducer<T>(state: AuthState<T>, action: AuthAction<T>) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}

function AuthProvider(props: AuthProviderProps) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  function login(userData: User) {
    localStorage.setItem('jwtToken', userData.token);
    dispatch({
      type: 'LOGIN',
      payload: userData,
    });
  }

  function logout() {
    localStorage.removeItem('jwtToken');
    dispatch({ type: 'LOGOUT' });
  }

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const contextValue: AuthContextValue = {
    user: state.user as User | null,
    login,
    logout,
  };

  return (
    <AuthContext.Provider
      value={contextValue}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  );
}

export { AuthContext, AuthProvider };
