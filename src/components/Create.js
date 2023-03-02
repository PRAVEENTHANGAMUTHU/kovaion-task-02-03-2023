import axios from "axios";
import React, { useRef, useState } from "react";
import { SiFormstack } from "react-icons/si";
import { API_URL } from "../constants/API";
import { useNavigate } from "react-router-dom";
import countryPhoneCodes from "../assets/countryPhoneCodes.json";
import * as Yup from "yup";
import { useFormik } from "formik";

const Create = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [flag,setFlag] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  const navigate = useNavigate();

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("*Required"),
    lastName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("*Required"),
      dob:Yup.string().required("*Required"),
    email: Yup.string().email("Invalid Email").required("Required"),
    age:Yup.string().required("*Required").matches(
      /(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/,
      "Please Enter Numeric Value"
    ),
    phoneNumber: Yup.string().required("*Required").matches(
        /(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/,
        "Not Valid Phone Number"
      ),
  });

  const formValueCatcher = async () => {
    await axios.post(API_URL, {
      firstname,
      lastname,
      dob,
      age,
      email,
      countryCode,
      phoneNumber,
    });
    navigate("/read");
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      dob:"",
      age:"",
      email: "",
      countryCode:countryCode,
      phoneNumber: "",
    },
    validationSchema,
  });

  console.log(formik.touched.firstName?formik.errors.firstName:"")

  return (
    <div className="create">
      <SiFormstack size={40} />
      <h2 className="create-title">Complete the form</h2>
      <form action="" className="form">
        <div className="form-section">
          <label htmlFor="">First Name</label>
          <input
            type="text"
            name="firstName"
            placeholder="Enter your First Name"
            onChange={(event) => {
              setFirstName(event.target.value)
              formik.handleChange(event)}}
            value={firstname}
            onBlur={formik.handleBlur}
          />
        </div>

        {formik.touched.firstName&&formik.errors.firstName?<p className="error">{formik.errors.firstName}</p>:<br />}

        <div className="form-section">
          <label htmlFor="">Last Name</label>
          <input
            type="text"
            name="lastName"
            placeholder="Enter your Last Name"
            onChange={(event) => {
              setLastName(event.target.value)
              formik.handleChange(event)}}
            value={lastname}
            onBlur={formik.handleBlur}
          />
        </div>

        {formik.touched.lastName&&formik.errors.lastName?<p className="error">{formik.errors.lastName}</p>:<br />}

        <div className="form-section">
          <label htmlFor="">Date of Birth</label>
          <input
            type="date"
            name="dob"
            placeholder="Enter your Date of Birth"
            onChange={(event) => {
              setDob(event.target.value)
              formik.handleChange(event)}}
            value={dob}
            onBlur={formik.handleBlur}
          />
        </div>

        {formik.touched.dob&&formik.errors.dob?<p className="error">{formik.errors.dob}</p>:<br />}

        <div className="form-section">
          <label htmlFor="">Age</label>
          <input
            type="number"
            name="age"
            placeholder="Enter your Age"
            onChange={(event) => {
              setAge(event.target.value)
              formik.handleChange(event)}}
            value={age}
            onBlur={formik.handleBlur}
          />
        </div>

        {formik.touched.age&&formik.errors.age?<p className="error">{formik.errors.age}</p>:<br />}

        <div className="form-section">
          <label htmlFor="">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your Email"
            onChange={(event) => {
              setEmail(event.target.value)
              formik.handleChange(event)}}
            value={email}
            onBlur={formik.handleBlur}
          />
        </div>

        {formik.touched.email&&formik.errors.email?<p className="error">{formik.errors.email}</p>:<br />}

        <div className="form-section">
          <label htmlFor="">Phone Number</label>
          <div className="drop-down-input">
            <div className="country-code-container">

           
          <input
            type="search"
            placeholder="Country/Code"
            className="country-code-input"
            name="countryCode"
            onChange={(event) => {
              setFlag(true);
              setCountryCode(event.target.value)
              formik.handleChange(event)}}
            value={countryCode}
            onBlur={formik.handleBlur}
          />
           </div>
           {
            (flag && (
              <div className="dropdown">
              {countryPhoneCodes.filter((codes)=>{
                const searchTerm = countryCode.toLowerCase();
                const JSONObjectCountries = codes.country.toLowerCase();
                const JSONObjectCountryCodes = codes.code;
                if(searchTerm&&JSONObjectCountries.startsWith(searchTerm)){
                  return(
                      searchTerm&&JSONObjectCountries.startsWith(searchTerm)
                  )
              } else if(searchTerm&&JSONObjectCountryCodes.startsWith(searchTerm)){
                  return(
                      searchTerm&&JSONObjectCountryCodes.startsWith(searchTerm)
                  )
              } 
              }).map((codes)=>{
                return(
                  
                  <p onClick={()=>{setFlag(false); setCountryCode("+"+codes.code+" / "+codes.country)}} className="dropdown-results">{codes.country} <span> +{"  "+codes.code}</span></p>
                )
              })}
            </div>
            ))
          

}
          </div>
         
          <input
            type="text"
            placeholder="Enter your Phone Number"
            className="phone-number-input"
            name="phoneNumber"
            onChange={(event) => {
              setPhoneNumber(event.target.value)
              formik.handleChange(event)}}
            value={phoneNumber}
            onBlur={formik.handleBlur}
          />
        </div>
        {formik.touched.phoneNumber&&formik.errors.phoneNumber?<p className="error">{formik.errors.phoneNumber}</p>:<br />}

        <p onClick={formValueCatcher} className="submit-btn">
          Submit the form
        </p>
      </form>
    </div>
  );
};

export default Create;
