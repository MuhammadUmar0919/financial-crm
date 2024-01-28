// ** React Imports
import React from 'react';
// react redux import
import { useSelector } from 'react-redux';

const CanViewNavSectionTitle = props => {
  // ** Props
  const { children, navTitle } = props
  // ** Hook
  const { ability } = useSelector((state) => state.aclReducer);

  return ability && ability?.can(navTitle?.action, navTitle?.subject) ? <>{children}</> : null
}

export default CanViewNavSectionTitle
