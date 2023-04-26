import { useNavigate } from "react-router-dom";

const Home = ({ authUser }) => {
  const navigate = useNavigate;

  if (authUser === null) {
    navigate("/login");
  }
  else {
    return (
    <div>
      <p>
          Hello {authUser.fname} {authUser.lname}! 
      </p>
      </div>
  )}
};

export default Home;