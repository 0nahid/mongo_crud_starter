import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
const Users = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5500/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const handleDeleteUser = (id) => {
    // add user confirmation for delete
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5500/api/users/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            data.deletedCount
              ? Swal.fire("Deleted!", "Your file has been deleted.", "success")
              : alert("User not found");
            setUsers(users.filter((user) => user._id !== id));
          });
      }
    });
    // if (procced) {
    //   fetch(`http://localhost:5500/api/users/${id}`, {
    //     method: "DELETE",
    //   })
    //     .then((res) => res.json())
    //     .then((data) => {
    //       data.deletedCount
    //         ? Swal.fire({
    //             position: "top-end",
    //             icon: "success",
    //             title: "User deleted",
    //           })
    //         : alert("User not found");
    //       setUsers(users.filter((user) => user._id !== id));
    //     });
    // }
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
              borderRadius: "10px",
              width: "900px",
              margin: "10px auto",
            }}
          >
            <span style={{ fontWeight: "bold", hover: "pointer" }}>
              {user.name}
            </span>{" "}
            - {user.email}
            <span
              style={{
                border: "none",
                padding: "5px 15px",
                borderRadius: "4px",
                outline: "none",
              }}
            >
              <button
                style={{
                  border: "none",
                  padding: "05px 15px",
                  borderRadius: "4px",
                  outline: "none",
                }}
                onClick={() => handleDeleteUser(user._id)}
              >
                Delete{" "}
              </button>
              <Link to={`/users/update/${user._id}`}>
                {" "}
                <button
                  style={{
                    border: "none",
                    padding: "05px 15px",
                    borderRadius: "4px",
                    outline: "none",
                  }}
                >
                  Edit
                </button>{" "}
              </Link>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
