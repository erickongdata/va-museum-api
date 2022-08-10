import { useContext } from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

function UserOnlyRoute({ children }) {
  const { currentUser } = useContext(AuthContext);
  return currentUser ? children : <Navigate to="/" />;
}

UserOnlyRoute.propTypes = {
  children: PropTypes.element.isRequired,
};

export default UserOnlyRoute;
