import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function UserItem({ user: { login, avatar_url } }) {
  return (
    <div className='card side shadow-md bg-base-100 compact'>
      <div>
        <div className='avatar'>
          <div className='rounded-full shadow w-14 h-14'>
            <img src={avatar_url} alt='Profile' />
          </div>
        </div>
      </div>
      <div>
        <h2 className='card-title'>{login}</h2>
        <Link
          to={`/users/${login}`}
          className='text-base-content text-opacity-40'
        >
          Visit Profile
        </Link>
      </div>
    </div>
  );
}

UserItem.propTypes = {
  user: PropTypes.object.isRequired,
};

export default UserItem;
