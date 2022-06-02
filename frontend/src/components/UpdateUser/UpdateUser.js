import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Swal from "sweetalert2";
const UpdateUser = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  useEffect(() => {
    fetch(`http://localhost:5500/api/users/${id}`)
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, [id]);
  // update user
  const handleNameChange = (e) => {
    setUser({ ...user, name: e.target.value });
  };
  const handleEmailChange = (e) => {
    setUser({ ...user, email: e.target.value });
  };

  const handleUpdateUser = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5500/api/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        data.modifiedCount > 0
          ? Swal.fire({
              position: "top-end",
              icon: "success",
              title: "User updated",
            })
          : Swal.fire(
              "Really want to change?",
              "Then edit something first!!!",
              "question"
            );
      });
  };

  return (
    <div>
      <div
        style={{
          background: "#8e1bf2",
          width: "1000px",
          margin: "100px auto",
          padding: "40px",
          borderRadius: "5px",
        }}
      >
        <form onSubmit={handleUpdateUser}>
          <input
            style={{
              width: "600px",
              border: "none",
              borderBottom: "1px solid black",
              outline: "none",
            }}
            onChange={handleNameChange}
            type="text"
            name="name"
            value={user.name || ""}
          />
          <br /> <br />
          <input
            style={{
              width: "600px",
              border: "none",
              borderBottom: "1px solid black",
              outline: "none",
            }}
            onChange={handleEmailChange}
            type="email"
            name="email"
            value={user.email || ""}
          />
          <br />
          <br />
          <input
            style={{
              border: "none",
              padding: "05px 15px",
              borderRadius: "4px",
            }}
            type="submit"
            value="Submit"
          />
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;
