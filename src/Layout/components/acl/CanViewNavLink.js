// ** React Imports
import React from 'react';
// react redux import
import { useSelector } from 'react-redux';

const CanViewNavLink = props => {
  // ** Props
  const { children, navLink } = props
  const { ability } = useSelector((state) => state.aclReducer);

  return ability && ability?.can(navLink?.action, navLink?.subject) ? <>{children}</> : null
}

export default CanViewNavLink;
