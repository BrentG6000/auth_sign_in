import { useEffect, useContext } from "react";
import { Navigate, useNavigate, Routes, Route } from "react-router-dom";
import { AuthUserContext } from './pages/components/contexts/AuthUserProvider';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const App = () => {
  const navigate = useNavigate();

  const  [authUser, setAuthUser] = useContext(AuthUserContext);

  const checkForValidUser = async () => {
    // Use this API to check JWT
    try {
      const authCheck = await fetch("/api/user/authStatus"); // Add try/catch
      const checkResult = await authCheck.json();
      if (checkResult.result === "success") {
        setAuthUser({ fname: checkResult.fname, lname: checkResult.lname });
        navigate("/");
      }
      else {
        navigate("/login");
      }
    }
    catch(err) {
      console.log(err);
    }
  }

  /* useEffect will stop an infinite loop caused by setAuthUser. Setters make React rerender the
  component, so checkForValidUser() would run on each render. The empty brackets in useEffect's second
  argument tell it to run only once after the component mounts, not on every rerender. */
  useEffect(() => {
    checkForValidUser();
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="*" element={ <Navigate to="/" /> } />
      </Routes>
    </div>
  );
}  

export default App;