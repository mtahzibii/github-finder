import { useEffect, useContext } from "react";
import Spinner from "../layout/Spinner";
import UserItem from "./UserItem";
import GithubContext from "../../ocntext/github/GithubContext";

function UserResults() {
  // Get values from GithubContext
  const { users, loading, fetchUsers } = useContext(GithubContext);

  // Fetch data from API by loading page
  useEffect(() => {
    fetchUsers();
  }, []);

  return loading ? (
    <Spinner />
  ) : (
    <div className='grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2'>
      {users.map((user) => (
        <UserItem key={user.id} user={user} />
      ))}
    </div>
  );
}

export default UserResults;
