import React, { useContext, useState, useEffect, createContext } from 'react';
import axios from 'axios';
import cookie from 'js-cookie';
import endPoints from '@api/index';
import { useRouter } from 'next/router';

const AuthContext = createContext();

export const ProviderAuth = ({ children }) => {
  const auth = useProviderAuth();
  const router = useRouter();

  useEffect(() => {
    const authentication = async () => {
      try {
        const res = await auth.auth();
      } catch (error) {
        console.log(error);
      }
    };
    authentication();
  }, [router.pathname]);
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

const useProviderAuth = () => {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);
  const router = useRouter();

  if (cookie.get('token-codes')) {
    axios.defaults.headers.Authorization = `${cookie.get('token-codes')}`;
  }

  const options = {
    Headers: {
      accept: '*/*',
      'content-Type': 'aplication/json',
    },
  };

  const signIn = async (body) => {
    try {
      const response = await axios.post(endPoints.auth.login, body, options);
      const { access_token } = response.data;

      if (access_token) cookie.set('token-codes', access_token, { expires: 30 });

      axios.defaults.headers.Authorization = `${cookie.get('token-codes')}`;
      auth();
      setTimeout(() => {
        router.push('/');
        setMessage(null);
      }, 1300);
    } catch (e) {
      if (e.response?.data?.error) {
        setMessage({ text: e.response.data.message, type: 'error' });
      } else {
        setMessage({ text: 'Error en la API', type: 'error' });
      }
    }
  };
  const signUp = async (body) => {
    try {
      const response = await axios.post(endPoints.auth.signUp, body, options);
      return response.data;
    } catch (e) {
      if (e.response?.data?.error) {
        setMessage(e.response.data.error);
      } else {
        setMessage('Error en la API');
      }
    }
  };

  const logOut = () => {
    cookie.remove('token-codes');
    setUser(null);
    delete axios.defaults.headers.Authorization;
  };
  const auth = async () => {
    try {
      const { data: userProfile } = await axios(endPoints.auth.profile);
      setUser(userProfile);
      return 'ok';
    } catch (error) {
      return error;
    }
  };
  return {
    user,
    signIn,
    signUp,
    logOut,
    auth,
    message,
    setMessage,
  };
};
