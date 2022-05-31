import { useEffect, useState } from "react";

const Users = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5500/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);
  return (
    <div>
      <h2>This are {users.length} users</h2>
      <div>
        {users.map((user) => (
          <div
            key={user._id}
            style={{
              backgroundColor: "salmon",
              padding: "10px",
              margin: "10px",
            }}
          >
            {user.name} - {user.email}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
