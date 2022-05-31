import { useRef } from "react";

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
          ? alert("User added successfully")
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
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default AddUser;
