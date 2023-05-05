import React, { useState, useEffect, createContext } from 'react';

const LoggedInContext = createContext([]);

const LoggedInProvider = ({children}) => {
  //var themeSet = 'light'; 

  const [theme, setTheme] = useState("false");

  // This use effect is needed because Next.js renders the server side first and
  // localStorage is only accessable to the client side
  useEffect(() => {
    if (localStorage.getItem('theme') != null) {
    themeSet = localStorage.getItem('theme');
  }
    }, [])

  // Everytime the theme changes the theme state is changed
  useEffect(() => {
        localStorage.setItem('theme', theme);
    }, [theme])

    return (
        <LoggedInContext.Provider value={[theme, setTheme]}>
            {children}
        </LoggedInContext.Provider>
    )
}

LoggedInProvider.context = LoggedInContext;

export default LoggedInProvider;
