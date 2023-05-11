import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthUserContext } from './contexts/AuthUserProvider';

const SignOutButton = () => {
  const navigate = useNavigate();
  const  [authUser, setAuthUser] = useContext(AuthUserContext);

  const handleSignOut = async(e) => {
    e.preventDefault();

    try {
      const signOut = await fetch("/api/user/signout", {
      method: "POST",
      headers: { "Content-Type": "application/json" }
      });
      const signOutResult = await signOut.json();
    
      if (signOutResult.result === "Token invalidated") {
        setAuthUser(null);
        navigate("/");
      } else {
        console.log(signOutResult.message);
      };
    }
    catch(err) {
      console.log(err);
    }
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