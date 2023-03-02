import React, { useState, useEffect } from "react";
import { SiFormstack } from "react-icons/si";
import axios from "axios";
import { API_URL } from "../constants/API";
import { useNavigate } from "react-router-dom";
const Update = () => {
  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");

  async function UpdateData() {
    await axios.put(API_URL + "/" + id, {
      firstname,
      lastname,
      dob,
      age,
      email,
    });
    navigate("/read");
  }

  useEffect(() => {
    setId(localStorage.getItem("id"));
    setFirstName(localStorage.getItem("firstname"));
    setLastName(localStorage.getItem("lastname"));
    setDob(localStorage.getItem("dob"));
    setAge(localStorage.getItem("age"));
    setEmail(localStorage.getItem("email"));
  }, []);

  return (
    <div className="update">
      <SiFormstack size={40} />
      <h2 className="create-title">Update the form</h2>
      <form action="" className="form">
        <div className="form-section">
          <label htmlFor="">First Name</label>
          <input
            type="text"
            placeholder="Enter your First Name"
            onChange={(event) => setFirstName(event.target.value)}
            value={firstname}
          />
        </div>
        <br />
        <div className="form-section">
          <label htmlFor="">Last Name</label>
          <input
            type="text"
            placeholder="Enter your Last Name"
            onChange={(event) => setLastName(event.target.value)}
            value={lastname}
          />
        </div>

        <br />

        <div className="form-section">
          <label htmlFor="">Date of Birth</label>
          <input
            type="date"
            placeholder="Enter your Date of Birth"
            onChange={(event) => setDob(event.target.value)}
            value={dob}
          />
        </div>

        <br />

        <div className="form-section">
          <label htmlFor="">Age</label>
          <input
            type="number"
            placeholder="Enter your Age"
            onChange={(event) => setAge(event.target.value)}
            value={age}
          />
        </div>

        <br />

        <div className="form-section">
          <label htmlFor="">Email</label>
          <input
            type="email"
            placeholder="Enter your Email"
            onChange={(event) => setEmail(event.target.value)}
            value={email}
          />
        </div>

        <br />

        <p onClick={UpdateData} className="submit-btn">
          Update the form
        </p>
      </form>
    </div>
  );
};

export default Update;
