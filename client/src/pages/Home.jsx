//import { useNavigate } from "react-router-dom";
import { redirect } from "react-router-dom";

const Home = ({ authUser }) => {
  //const navigate = useNavigate;

  if (authUser === null) {
    //navigate("/login");
    return redirect("/login");
  }
  else {
    return (
    <div>
      <p>
          
      </p>
      </div>
  )}
};

// const Home = () => {
//   //const navigate = useNavigate;

  
//     return (
//     <div>
//       <p>
//           test
//       </p>
//     </div>
//     )
// };

export default Home;

//Hello {authUser.fname} {authUser.lname}! 