import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthUserContext } from './components/contexts/AuthUserProvider';

const Home = () => {
  const navigate = useNavigate();
  const  [authUser, setAuthUser] = useContext(AuthUserContext);

  useEffect(() => {
    if (authUser == null) {
      navigate("/login");
    }}, [authUser])
  
  return (
    <div>
      {authUser && authUser.fname && authUser.lname ? (
      <p>
          Hello {authUser.fname} {authUser.lname}!
      </p>
      ) : (
      <div>Loading ...</div>
      )}
    </div> 
  )
};

export default Home;