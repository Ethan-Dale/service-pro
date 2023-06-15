import React, { useState } from "react";
import "../styles/DashboardStyles.css";

const JobCard = ({
  job,
  onEdit,
  onDelete,
  onAccept,
  userId,
  userType,
  isProfilePage,
}) => {
  const [editing, setEditing] = useState(false);
  const [editedJob, setEditedJob] = useState({});

  const handleEdit = () => {
    if (userId === job.customerId) {
      setEditing(true);
      setEditedJob(job);
    }
  };

  const handleDelete = () => {
    onDelete(job);
  };

  const handleAccept = () => {
    onAccept(job);
  };

  const handleInputChange = (e) => {
    setEditedJob({ ...editedJob, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onEdit(editedJob);
    setEditing(false);
  };

  const date = new Date(job.dateTimeScheduled);
  const formattedDate = `${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`;

  if (editing) {
    return (
      <div className="job-card">
        <h3>Edit Job</h3>
        <form onSubmit={handleSubmit}>
          <label>
            Title:
            <input
              type="text"
              name="title"
              value={editedJob.title || ""}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Description:
            <input
              type="text"
              name="description"
              value={editedJob.description || ""}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Status:
            <select
              name="status"
              value={editedJob.status || ""}
              onChange={handleInputChange}
            >
              <option value="incomplete">Incomplete</option>
              <option value="accepted">Accepted</option>
              <option value="completed">Completed</option>
            </select>
          </label>
          <label>
            Date Time Scheduled:
            <input
              type="text"
              name="dateTimeScheduled"
              value={editedJob.dateTimeScheduled || ""}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Location:
            <input
              type="text"
              name="location"
              value={editedJob.location || ""}
              onChange={handleInputChange}
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }

  return (
    <div className="job-card">
      <div id="jobDetails">
        <div>
          <h3>{job.title}</h3>
          <p>{job.customerFirstName}</p>
          <p>{job.status ? job.status : "Incomplete"}</p>
          <p>Scheduled: {formattedDate}</p>
          <p>{job.location}</p>
        </div>
        <p id="jobDescription">{job.description}</p>
      </div>
      <div id="buttons">
        {userId === job.customerId && (
          <button className="cardButtons" onClick={handleEdit}>
            Edit
          </button>
        )}
        {userType === "tradesman" &&
          !isProfilePage &&
          job.customerId !== userId && (
            <button className="cardButtons" onClick={handleAccept}>
              Accept Job
            </button>
          )}

        {userId === job.customerId && (
          <button className="cardButtons" onClick={handleDelete}>
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default JobCard;
