import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/JobFormStyles.css";

const JobForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dateTimeScheduled, setDateTimeScheduled] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [customerId, setUserId] = useState(null);
  const [message, setMessage] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/user/getAddress")
      .then((response) => {
        setUserAddress(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user address:", error);
      });
    axios
      .get("/api/user")
      .then((response) => {
        setUserId(response.data.userId);
      })
      .catch((error) => {
        console.error("Error fetching userId");
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = {
      title,
      description,
      dateTimeScheduled,
      location: userAddress,
      customerId: customerId,
    };
    console.log(customerId);

    axios
      .post("/api/jobs", formData)
      .then(() => {
        setMessage("Job submitted successfully");

        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      })
      .catch(() => {
        setMessage("Error submitting the job");
      });
  };

  return (
    <main id="mainFormContainer">
      <form id="jobFormContainer" onSubmit={handleSubmit}>
        <label className="formText" htmlFor="title">
          Title:
        </label>
        <input
          className="inputUnder"
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label className="formText" htmlFor="description">
          Description:
        </label>
        <input
          className="inputUnder"
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <label htmlFor="dateTimeScheduled">Schedule a time:</label>
        <input
          type="datetime-local"
          id="dateTimeScheduled"
          value={dateTimeScheduled}
          onChange={(e) => setDateTimeScheduled(e.target.value)}
          required
        />

        <input id="submitBtn" type="submit" value="Submit" />

        {message && <div>{message}</div>}
      </form>
    </main>
    
  );
};

export default JobForm;
