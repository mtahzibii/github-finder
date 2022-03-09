import { createContext, useState } from "react";

const GithubContext = createContext();

// const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

// Component GithubProveider
export const GithubProvider = ({ children }) => {
  // Initialize users
  const [users, setUsers] = useState([]);
  // Initialize loading
  const [loading, setLoading] = useState(true);
  // Initialize specific user
  const [user, setUser] = useState({});
  // Initialize Repos
  const [repos, setRepos] = useState([]);

  // Fetch users (using async/await)
  const fetchUsers = async () => {
    const response = await fetch(`https://api.github.com/users`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });
    const data = await response.json();
    // update users after fetch from github API
    setUsers(data);
    // Set loading to false (users are loaded)
    setLoading(false);
  };

  // Search users from Github API
  const searchUsers = async (text) => {
    setLoading(true);

    // Set  URL search Parameters
    const params = new URLSearchParams({
      q: text,
    });
    // Make a string query (using fetch API)
    const response = await fetch(
      `https://api.github.com/search/users?${params}`,
      {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
        },
      }
    );
    // Get the items value from output as data
    const { items } = await response.json();
    // update users after fetch from github API
    setUsers(items);
    // Set loading to false (users are loaded)
    setLoading(false);
  };

  // Get single user data
  const getUser = async (login) => {
    setLoading(true);

    // Make a string query (using fetch API)
    const response = await fetch(`https://api.github.com/users/${login}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });
    if (response.status === 404) {
      window.location("/notfound");
    } else {
      // Get the items value from output as data
      const data = await response.json();
      // update users after fetch from github API
      setUser(data);
      // Set loading to false (users are loaded)
      setLoading(false);
    }
  };

  // Get User Repos
  const getUserRepos = async (login) => {
    // Set loading to true
    setLoading(true);

    // Set URL search Parameters
    const params = new URLSearchParams({
      sort: "created",
      per_page: 20,
    });

    // Make a string query (using fetch API)
    const response = await fetch(
      `https://api.github.com/users/${login}/repos?${params}`,
      {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
        },
      }
    );
    // Get the items value from output as data
    const data = await response.json();
    // update users after fetch from github API
    setRepos(data);
    // Set loading to false (users are loaded)
    setLoading(false);
  };

  // Clear users from state
  const clearUsers = () => setUsers([]);

  return (
    <GithubContext.Provider
      value={{
        user,
        users,
        loading,
        repos,
        getUserRepos,
        fetchUsers,
        searchUsers,
        clearUsers,
        getUser,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
