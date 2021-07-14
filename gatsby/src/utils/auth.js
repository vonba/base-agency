import md5 from 'md5';
import { navigate } from 'gatsby';

export const isBrowser = () => typeof window !== 'undefined';

export const getUser = () =>
  isBrowser() && window.localStorage.getItem('a87dhij09')
    ? JSON.parse(window.localStorage.getItem('a87dhij09'))
    : {};

const setUser = (user) =>
  window.localStorage.setItem('a87dhij09', JSON.stringify(user));

export const login = (values, successUrl, errorUrl, honeypotField = null) => {
  const { password } = values;
  if (honeypotField && values[honeypotField]) {
    // It's a bot
    return navigate('/');
  }
  // daretodream
  if (md5(password) === `7d3169b7ba5450989d3026b1f3d81714`) {
    // Password is right
    navigate(successUrl);
    return setUser({
      username: `musa`,
    });
  }
  // Password is wrong
  navigate(errorUrl);
  return setUser({
    error: `password`,
  });
};

export const isLoginError = () => {
  const user = getUser();

  return !!user.error;
};

export const isLoggedIn = () => {
  const user = getUser();

  return !!user.username;
};

export const logout = (url) => {
  setUser({});
  navigate(url);
};
