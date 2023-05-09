import React, { useState, createContext } from 'react';

export const AuthUserContext = createContext([]);

const AuthUserProvider = ({children}) => {
  const [authUser, setAuthUser] = useState(null);

    return (
        <AuthUserContext.Provider value={[authUser, setAuthUser]}>
            {children}
        </AuthUserContext.Provider>
    )
}

//AuthUserProvider.context = AuthUserContext;

export default AuthUserProvider;
