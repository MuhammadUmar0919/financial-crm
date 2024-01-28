// react import
import { useState } from "react";

export default function useToken() {
    const getToken = () => {
        const tokenStringSes = sessionStorage.getItem("crm-admin");
        const tokenStringLoc = localStorage.getItem("crm-admin");
        const userToken = JSON.parse(tokenStringSes || tokenStringLoc);
        return userToken;
    };

    const [token, setToken] = useState(getToken());

    const saveToken = (userToken, save) => {
        save
            ? localStorage.setItem(
                  "crm-admin",
                  JSON.stringify(userToken)
              )
            : sessionStorage.setItem(
                  "crm-admin",
                  JSON.stringify(userToken)
              );
        setToken(userToken);
    };

    return {
        setToken: saveToken,
        token,
    };
};
