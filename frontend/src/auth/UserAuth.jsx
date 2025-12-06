import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser } from '../redux/userSlice';
import axios from '../config/axios';

const UserAuth = ({ children }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    const rehydrateUser = async () => {
      if (token && !user.isLoggedIn) {
        try {
          const res = await axios.get('/users/profile');
          
          dispatch(loginUser({ email: res.data.email }));
          setLoading(false);
        } catch (err) {
          console.log('Token invalid or expired',err);
          localStorage.removeItem('token');
          navigate('/login');
        }
      } else if (!token) {
        navigate('/login');
      } else {
        setLoading(false);
      }
    };

    rehydrateUser();
  }, [user, dispatch, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

UserAuth.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserAuth;
