import { useEffect, useState } from "react";

const Users = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5500/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const handleDeleteUser = (id) => {
    fetch(`http://localhost:5500/api/users/${id}`, {
      method: "DELETE",
    })
    .then(res => res.json())
    .then(data => {
      data.deletedCount? alert("User deleted") : alert("User not found"); 
      setUsers(users.filter(user => user._id !== id));
    })
  };

  return (
    <div>
      <h2>This are {users.length} users</h2>
      <div>
        {users?.map((user) => (
          <div
            key={user._id}
            style={{
              backgroundColor: "salmon",
              padding: "10px",
              margin: "10px",
            }}
          >
            {user.name} - {user.email}
            <span style={{ margin: "10px", padding: "10px" }}>
              <button onClick={() => handleDeleteUser(user._id)}>X</button>
              <button>Update</button>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
