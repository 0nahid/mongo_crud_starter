import { useEffect, useState } from "react";
import { useParams } from "react-router";

const UpdateUser = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  useEffect(() => {
    fetch(`http://localhost:5500/api/users/${id}`)
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, [id]);

  return (
    <div>
      <div style={{background:'violate'}}>
        <p>User name : {user.name}</p>
        <p>User email : {user.email}</p>
      </div>
    </div>
  );
};

export default UpdateUser;
