import { createContext, useState } from "react";

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
  // Initialize users
  const [users, setUsers] = useState([]);
  // Initialize loading
  const [loading, setLoading] = useState(true);

  // Fetch Data (using async/await)
  const fetchUsers = async () => {
    const response = await fetch(`${GITHUB_URL}`, {
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

  return (
    <GithubContext.Provider value={{ users: users, loading, fetchUsers }}>
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
