import React, { useState, useEffect } from "react";
import axios from "axios";
import JobCard from "../elements/JobCard";
import "../styles/DashboardStyles.css";

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [userId, setUserId] = useState(null);
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    fetchJobs();
    axios
    .get("/api/user")
    .then((response) => {
      setUserId(response.data.userId);
      setUserType(response.data.userType)
    })
    .catch((error) => {
      console.error("Error fetching userId");
    });
  }, []);
  
  const acceptJob = async (job) => {
   

    try {
      const response = await axios.post(`/api/existing/jobs/${job.id}`);
      
      console.log('Job accepted:', response.data);

      fetchJobs();
    } catch (error) {
      console.error("Error accepting job:", error);
    }
  };

  const fetchJobs = () => {
    axios
      .get("/api/jobs")
      .then((response) => {
        console.log(response.data)
        setJobs(response.data);
      })
      .catch((error) => {
        console.error("Error fetching job data:", error);
      });
  };

  const editJob = async (job) => {
    console.log(job.data)
    const {
      jobId,
      title,
      description,
      status,
      dateTimePosted,
      dateTimeScheduled,
      location,
    } = job;

    try {
      await axios.put(`/api/jobs/${jobId}`, {
        title,
        description,
        status,
        dateTimePosted,
        dateTimeScheduled,
        location,
      });

      
      fetchJobs();
    } catch (error) {
      console.error("An error occurred while updating the job:", error);
    }
  };

  const deleteJob = async (job) => {
    const { jobId } = job; 

    
    console.log('Deleting job with ID:', jobId);

    try {
      await axios.delete(`/api/jobs/${jobId}`); 
      
      fetchJobs();
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  return (
    <main id="pageBackdrop">
      <h1 className="pageTitle">Local Jobs</h1>
      <div className="cardContainer">
        {jobs.map((job, index) => (
        <JobCard key={index} job={job} onAccept={acceptJob} onEdit={editJob} onDelete={deleteJob} userId={userId} userType={userType} />
      ))}
        </div>
    </main>
  );
};

export default Dashboard;
