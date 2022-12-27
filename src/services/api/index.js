const API = process.env.NEXT_PUBLIC_API_URL;

const endPoinst = {
  auth: {
    login: `${API}/users/login`,
    signUp: `${API}/users/signup`,
    profile: `${API}/users/profile`,
  },
  data: {
    api: `${API}/data`,
  },
};

module.exports = endPoinst;
