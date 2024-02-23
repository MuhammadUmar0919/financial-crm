// react import
import React from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
// hooks import
import useToken from '@/Hooks/useToken';
// configs import
import { buildAbilityFor } from '@/configs/acl';
// component import
import { AbilityContext } from '@/Layout/components/acl/Can';

const ProtectedRoute = ({ component: Component, subject, ...rest }) => {
  const { token } = useToken();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const [ability, setAbility] = React.useState(null);
  const roleData = [];
  React.useEffect(() => {
    if (!token) {
      return navigate('/login');
    }
  }, [location.pathname, token]);

  // if (token && token?.roleName && !ability) {
  //   const filteredAction = roleData.filter(
  //     (item) => item.roleName.toLowerCase() === token.roleName.toLowerCase()
  //   );
  //   setAbility(buildAbilityFor(token?.roleName, filteredAction));
  // }

  // if (token && token.roleName && !ability) {
  //   const filteredAction = roleData.find(
  //     (item) => item.roleName.toLowerCase() === token.roleName.toLowerCase()
  //   );
  //   setAbility(buildAbilityFor(token.roleName, filteredAction));
  // }

  // if (ability && ability?.can('read', subject)) {
  //   dispatch({ type: 'ACL_SUCCESS', data: ability });
  //   return (
  //     <AbilityContext.Provider value={ability}>
  //       <Component {...rest} />
  //     </AbilityContext.Provider>
  //   );
  // }
  if (token) {
    return <Component {...rest} />;
  }

  return <Navigate to="/login" replace />;
};

export default ProtectedRoute;
