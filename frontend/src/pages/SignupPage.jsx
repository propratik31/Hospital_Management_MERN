import React, { useState } from "react";

export default function SignupPage() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    gender: "",
    contact: "",
    address: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Patient Data:", formData);

    fetch("http://localhost:9090/hsm/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(data => {
        console.log("Response:", data);
        alert("Patient data sent successfully");
      })
      .catch(err => {
        console.error("Error:", err);
      });
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(135deg, #74ebd5, #9face6)"
    }}>
      <div style={{
        maxWidth: "420px",
        width: "100%",
        background: "#fff",
        padding: "25px",
        borderRadius: "10px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
      }}>
        <h2 style={{
          textAlign: "center",
          marginBottom: "20px",
          color: "#333"
        }}>
          Patient Registration
        </h2>

        <form onSubmit={handleSubmit}>
          <input style={inputStyle} name="name" placeholder="Full Name" onChange={handleChange} required />
          <input style={inputStyle} name="email" type="email" placeholder="Email Address" onChange={handleChange} required />
          <input style={inputStyle} name="password" type="password" placeholder="Password" onChange={handleChange} required />
          <input style={inputStyle} name="age" type="number" placeholder="Age" onChange={handleChange} required />

          <select style={inputStyle} name="gender" onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>

          <input style={inputStyle} name="contact" placeholder="Contact Number" onChange={handleChange} required />
          <textarea style={{ ...inputStyle, height: "80px" }} name="address" placeholder="Address" onChange={handleChange} required />

          <button style={buttonStyle} type="submit">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

/* ---------- Styles ---------- */

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "12px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  fontSize: "14px"
};

const buttonStyle = {
  width: "100%",
  padding: "10px",
  backgroundColor: "#4CAF50",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  fontSize: "16px",
  cursor: "pointer",
  marginTop: "10px"
};
