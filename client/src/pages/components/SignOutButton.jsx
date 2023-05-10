import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthUserContext } from './components/contexts/AuthUserProvider';

const SignOutButton = () => {
  const navigate = useNavigate();
  //const  [authUser, setAuthUser] = useContext(AuthUserContext);

  const handleSignOut = () => {
    e.preventDefault();

    const authCheck = await fetch("/api/user/signout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginCreds)
    });
    const authResult = await authCheck.json();
  }

  // useEffect(() => {
  //   if (authUser == null) {
  //     navigate("/login");
  //   }}, [])
  
  return (
    <div>
      <button onClick={handleSignOut}>
          Sign Out
      </button>
    </div> 
  )
};

export default SignOutButton;