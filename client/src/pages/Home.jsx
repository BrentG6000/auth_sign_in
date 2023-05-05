import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = ({ authUser }) => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log(authUser);
    if (authUser == null) {
      navigate("/login");
    }
    else {
      return (
      <div>
        <p>
            test
        </p>
        </div>
    )}
  }, [])
  // if (authUser == null) {
  //   navigate("/login");
  // }
  // else {
  //   return (
  //   <div>
  //     <p>
  //         test
  //     </p>
  //     </div>
  // )}
};

export default Home;

//Hello {authUser.fname} {authUser.lname}! 