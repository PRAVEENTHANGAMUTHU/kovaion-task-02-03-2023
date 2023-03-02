import React from "react";
import { Link } from "react-router-dom";
import { SiFormstack } from "react-icons/si";

const Home = () => {
  return (
    <div className="home">
      <SiFormstack size={60} />
      <h2 className="title">Form Data to API</h2>
      <Link className="home-link" to="/create">
        Click to Open the Form
      </Link>
    </div>
  );
};

export default Home;
