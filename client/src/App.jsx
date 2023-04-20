import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import User from "./pages/User";
import Login from "./pages/Login";
import PageNotFound from "./pages/404";
import Navigation from "./components/Navigation";

const App = () => {
  // If a user is already logged in, this variable will keep track of it 
  const [authUser, setAuthUser] = useState(null);

  const checkForValidUser = async () => {
    // Use this API to check JWT
    const authCheck = await fetch("/api/user/lookup");
    const checkResult = await authCheck.json();

    if (checkResult.result === "success") {
      setAuthUser({ _id: checkResult._id, email: checkResult.email });
    }
  }

  /* useEffect will stop an infinite loop caused by setAuthUser. Setters make React rerender the
  component, so checkForValidUser() would run on each render. The empty brackets in useEffect's second
  argument tell it to run only once after the component mounts, not on every rerender. */
  useEffect(() => {
    checkForValidUser()
  }, []);

  return (
    <div>
      <Navigation />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home authUser={ authUser } />} />
            <Route path="/login" element={<Login />} />
            <Route path="/user/:id" element={<User />}/>
            <Route path="*" element={<PageNotFound />}/>
          </Routes>
        </BrowserRouter>
    </div>
  );
}  

export default App;