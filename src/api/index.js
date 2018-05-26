import axios from "axios";
import camelcaseKeys from "camelcase-keys";
import jwt from "jwt-simple";

const API_PREFIX = "https://api.themoviedb.org/3";
const API_KEY = "8c9f0b25d628dc3a96bcc112d2c82e63";

export function searchMovies(query) {
  const params = {
    query,
    api_key: API_KEY
  };

  return axios
    .get(`${API_PREFIX}/search/movie`, { params })
    .then(response => response.data)
    .then(data => camelcaseKeys(data, { deep: true }));
}

export function fetchMovie(id) {
  const params = {
    api_key: API_KEY
  };

  return axios
    .get(`${API_PREFIX}/movie/${id}`, { params })
    .then(response => response.data)
    .then(data => camelcaseKeys(data, { deep: true }));
}

const USERS = [
  {
    login: "max",
    name: "Max",
    avatar: "http://via.placeholder.com/400x400",
    password: "qwerty12345"
  },
  {
    login: "test",
    name: "Test",
    avatar: "http://via.placeholder.com/400x400",
    password: "test"
  }
];

const SECRET = "react2";

export function auth(login, password) {
  return new Promise((resolve, reject) => {
    const user = USERS.find(user => user.login === login);

    if (!user) {
      return reject("User does not exist");
    }

    if (user.password !== password) {
      return reject("Password is incorrect");
    }

    return resolve({
      user,
      token: jwt.encode(user, SECRET)
    });
  });
}

export function checkAuth(token) {
  return new Promise((resolve, reject) => {
    if (!token) {
      return reject("User is not authenticated");
    }

    const decodedUser = jwt.decode(token, SECRET);
    const loggedInUser = USERS.find(user => user.login === decodedUser.login);

    if (!loggedInUser) {
      return reject("User does not exist");
    }

    return resolve(loggedInUser);
  });
}

export default {
  searchMovies,
  fetchMovie,
  auth,
  checkAuth
};
