import React, { useState, useEffect } from "react";
import axios from "axios";
import JobCard from "../elements/JobCard";

const Profile = () => {
  const [savedJobs, setSavedJobs] = useState([]);
  const [userId, setUserId] = useState(null);
  const [userType, setUserType] = useState(null);
  const [allJobs, UserPosts] = useState([]);

  useEffect(() => {
    fetchUserId();
  }, []);

  const fetchUserId = () => {
    axios
      .get("/api/user")
      .then((response) => {
        setUserId(response.data.userId);
        setUserType(response.data.userType);
        fetchSavedJobs(response.data.userId);
        getUserPosts(response.data)
      })
      .catch((error) => {
        console.error("Error fetching userId:", error);
      });
  };

  const fetchSavedJobs = (userId) => {
    axios
      .get(`/api/userJobs/${userId}`)
      .then((response) => {
        setSavedJobs(response.data);
      })
      .catch((error) => {
        console.error("Error fetching saved jobs:", error);
      });
  };

  const getUserPosts = () => {
    axios
      .get("/api/jobs")
      .then((response) => {
        UserPosts(response.data);
       
      })
      .catch((error) => {
        console.error("error getting jobs", error);
      });
  };

  const handleEdit = (job) => {
    console.log("Edit job", job);
  };

  const handleDelete = (job) => {
    console.log("Delete job", job);
  };

  const handleAccept = (job) => {
    console.log("Accept job", job);
  };

  const userPosts = allJobs.filter((job) => job.customerId === userId);
  console.log(userPosts)

  return (
    <main id="pageContainer">
      <h2 className="pageTitle">Accepted Jobs</h2>
      <div className="cardContainer">
      {savedJobs.map((job, index) => (
        <JobCard
          key={index}
          job={job}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onAccept={handleAccept}
          userId={userId}
          userType={userType}
          isProfilePage={true}
        />
      ))}

      </div>
      <h2 className="pageTitle" >Your Posts</h2>
      <div className="cardContainer">
      {userPosts.map((post, index) => (
        <JobCard
          key={index}
          job={post}
          onEdit={handleEdit}
          onDelete={handleDelete}
          userId={userId}
          userType={userType}
          isProfilePage
        />
      ))}
      </div>
    </main>
  );
};
export default Profile;
