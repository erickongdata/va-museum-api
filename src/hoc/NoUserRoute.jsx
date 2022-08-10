import { useContext } from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

function NoUserRoute({ children }) {
  const { currentUser } = useContext(AuthContext);
  return currentUser ? <Navigate to="/" /> : children;
}

NoUserRoute.propTypes = {
  children: PropTypes.element.isRequired,
};

export default NoUserRoute;
