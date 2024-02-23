// ** React Imports
import React from 'react';
// react redux import
import { useSelector } from 'react-redux';

const CanViewNavGroup = props => {
  const { children, navGroup } = props;
  // hook
  const { ability } = useSelector((state) => state.aclReducer);
  
  return ability && ability?.can(navGroup.action, navGroup.subject) ? <>{children}</> : null
};

export default CanViewNavGroup;
