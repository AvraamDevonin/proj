import React, { useState } from "react";

export const UserContext = React.createContext({});

export default function UserContextProvider({ children }) {
    const [user, setuser] = useState({
        name: '',
        email: '',
        password: ''
    });

 

    return (
        <UserContext.Provider
            value={{
                setuser,
                user,
            }}
        >
            {children}
        </UserContext.Provider>
    );
}
