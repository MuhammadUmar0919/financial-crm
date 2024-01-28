import React from "react";
import useToken from "Hooks/UseToken";
import { useLocation } from "react-router-dom";
import { PPM } from "Data/navigation/PagesManagement";
import { useDispatch, useSelector } from "react-redux";

const GuestGuard = () => {
  const { token } = useToken();
  const location = useLocation(); 
  const dispatch = useDispatch(); 
  const { roleData } = useSelector((state) => state.roleReducer); 
  const [data, setData] = React.useState({
    data: [{ subject: "crm", actions: ["read"] }],
    aclData: null
});

  React.useEffect(() => {
    const foundData = PPM.find((item) => item.path === location.pathname);

    const filteredAction = roleData.filter((item) => item.roleName.toLowerCase() === token.roleName.toLowerCase());

    const foundAcl = filteredAction?.find((item) => item?.subject === foundData?.subject.toLowerCase());

    // console.log("foundData: ", foundData)
    // console.log("filteredAction: ", filteredAction)
    // console.log("foundAcl: ", foundAcl)

    setData({data: [...filteredAction], aclData: foundAcl?.subject});
    // dispatch({ type: "ACL_SUCCESS", data: foundAcl?.subject }); 
  }, [location, roleData, token, dispatch]);

  return data; 
};

export default GuestGuard; 

  // Manager
  // Director
  // Specialist
  // Coordinator
  // Analyst
  // Supervisor
  // Administrator
  // Consultant
  // Team Leader