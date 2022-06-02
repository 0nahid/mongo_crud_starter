import { useRef } from "react";
import Swal from "sweetalert2";
const AddUser = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const handleAddUser = (e) => {
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const newUser = { email, name };
    fetch("http://localhost:5500/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((data) => {
        // show alert after successful insert
        data.insertedId
          ? Swal.fire("Congratulation!", "User added succcessfully!", "success")
          : alert("User not added");
        e.target.reset();
      });
    e.preventDefault();
  };

  return (
    <div>
      <h2>Please add an user here</h2>
      <form onSubmit={handleAddUser}>
        Name : <input type="text" required ref={nameRef} name="firstName" />
        <br />
        <br />
        Email : <input type="email" required ref={emailRef} name="email" />
        <br />
        <br />
        <input
          style={{
            border: "none",
            padding: "05px 15px",
            borderRadius: "4px",
            outline: "none",
          }}
          type="submit"
          value="Submit"
        />
      </form>
    </div>
  );
};

export default AddUser;
