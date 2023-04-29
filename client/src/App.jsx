import { useEffect, useState } from "react";
import { Navigate, useNavigate, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const App = () => {
  const navigate = useNavigate();

  // If a user is already logged in, this variable will keep track of it 
  const [authUser, setAuthUser] = useState(null);

  const checkForValidUser = async () => {
    // Use this API to check JWT
    
    const authCheck = await fetch("/api/user/lookup");
    const checkResult = await authCheck.json();
    //console.log(checkResult);

    if (checkResult.result === "success") {
      setAuthUser({ fname: checkResult.fname, lname: checkResult.lname });
      //console.log(checkResult);
      //return redirect("/");
      navigate("/");
    }
    else {
      //console.log(checkResult);
      //return (navigate("/login"));
      navigate("/login");
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
      <Routes>
        <Route path="/" element={<Home authUser={ authUser } />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="*" element={ <Navigate to="/" /> } />
      </Routes>
    </div>
  );
}  

export default App;