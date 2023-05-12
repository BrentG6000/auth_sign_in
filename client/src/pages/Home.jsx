import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthUserContext } from './components/contexts/AuthUserProvider';
import SignOutButton from "./components/SignOutButton";
import DeleteUserButton from "./components/DeleteUserButton";

const Home = () => {
  const navigate = useNavigate();
  const  [authUser] = useContext(AuthUserContext);

  useEffect(() => {
    if (authUser == null) {
      navigate("/login");
    }}, [authUser])
  
  return (
    <>
      {authUser && authUser.fname && authUser.lname ? (
      <div>
        <p>
          Hello {authUser.fname} {authUser.lname}!
        </p>
        <SignOutButton /><br />
        <DeleteUserButton />
      </div>
      ) : (
      <div>Loading ...</div>
      )}
    </> 
  )
};

export default Home;