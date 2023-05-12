import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthUserContext } from './contexts/AuthUserProvider';

const DeleteUserButton = () => {
  const navigate = useNavigate();
  const  [authUser, setAuthUser] = useContext(AuthUserContext);

  const handleDelete = async() => {
    try {
      const deleteUser = await fetch("/api/user/delete", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
      });
      const deleteResult = await deleteUser.json();
    
      if (deleteResult.message === "User deleted") {
        setAuthUser(null);
        console.log(authUser);
        navigate("/");
      } else {
        console.log(deleteResult.message);
      };
    }
    catch(err) {
      console.log(err);
    }
  }

  const alertDelete = (e) => {
    e.preventDefault();
    if (window.confirm('Are you sure you wish to delete this item?')) {
      handleDelete();
    }
  }

  return (
    <div>
      <button onClick={alertDelete}>
        Delete User
      </button>
    </div> 
  )
};

export default DeleteUserButton;