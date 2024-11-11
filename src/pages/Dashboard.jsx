import React, { useState, useEffect } from "react";
import {
  Button,
  Table,
  Modal,
  TextField,
  Box,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [jobs, setJobs] = useState(() => {
    const savedJobs = localStorage.getItem("jobs");
    return savedJobs ? JSON.parse(savedJobs) : [];
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [jobForm, setJobForm] = useState({ title: "", description: "" });
  const [expandedDescriptionId, setExpandedDescriptionId] = useState(null); // Track which job's description is expanded

  useEffect(() => {
    localStorage.setItem("jobs", JSON.stringify(jobs));
  }, [jobs]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (editingJob) {
      editJob({ ...editingJob, ...jobForm });
    } else {
      addJob(jobForm);
    }
    setIsModalOpen(false);
    setEditingJob(null);
    setJobForm({ title: "", description: "" });
  };

  const addJob = (job) => {
    const newJob = {
      id: Date.now(),
      ...job,
      candidates: [],
    };
    setJobs([...jobs, newJob]);
  };

  const editJob = (updatedJob) => {
    const updatedJobs = jobs.map((job) =>
      job.id === updatedJob.id ? updatedJob : job
    );
    setJobs(updatedJobs);
  };

  const deleteJob = (id) => {
    const updatedJobs = jobs.filter((job) => job.id !== id);
    setJobs(updatedJobs);
  };

  const toggleDescription = (id) => {
    setExpandedDescriptionId(expandedDescriptionId === id ? null : id); // Toggle expanded description for each job
  };

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "900px",
        margin: "0 auto",
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
        boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
      }}
    >
      <Typography
        variant="h3"
        align="center"
        gutterBottom
        style={{ fontWeight: "bold", color: "#2e7d32" }}
      >
        Job Dashboard
      </Typography>
      <Button
        variant="contained"
        onClick={() => setIsModalOpen(true)}
        style={{
          backgroundColor: "#4caf50",
          color: "#fff",
          marginBottom: "20px",
          fontWeight: "bold",
        }}
      >
        + Add Job
      </Button>
      <TableContainer>
        <Table>
          <TableHead style={{ backgroundColor: "#e0e0e0" }}>
            <TableRow>
              <TableCell style={{ fontWeight: "bold" }}>Sr. No</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Job Title</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Description</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>
                Number of Candidates
              </TableCell>
              <TableCell style={{ fontWeight: "bold", textAlign: "center" }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jobs.map((job, index) => (
              <TableRow key={job.id} hover>
                <TableCell style={{ verticalAlign: "top" }}>
                  {index + 1}
                </TableCell>
                <TableCell style={{ verticalAlign: "top" }}>
                  <Link
                    to={`/job/${job.id}`}
                    style={{
                      textDecoration: "none",
                      color: "#1976d2",
                      fontWeight: "500",
                    }}
                  >
                    {job.title}
                  </Link>
                </TableCell>
                <TableCell
                  style={{
                    maxWidth: "200px",
                    whiteSpace: "normal",
                    overflowWrap: "break-word",
                    verticalAlign: "top",
                  }}
                >
                  {expandedDescriptionId === job.id ||
                  job.description.length <= 100
                    ? job.description
                    : `${job.description.slice(0, 100)}... `}
                  {job.description.length > 100 && (
                    <Button
                      size="small"
                      onClick={() => toggleDescription(job.id)}
                      style={{
                        color: "#1976d2",
                        textTransform: "none",
                        padding: 0,
                        fontSize: "0.875rem",
                      }}
                    >
                      {expandedDescriptionId === job.id
                        ? "Read less"
                        : "Read more"}
                    </Button>
                  )}
                </TableCell>
                <TableCell style={{ verticalAlign: "top" }}>
                  {job.candidates.length}
                </TableCell>
                <TableCell
                  style={{ textAlign: "center", verticalAlign: "top" }}
                >
                  <Button
                    onClick={() => {
                      setEditingJob(job);
                      setJobForm(job);
                      setIsModalOpen(true);
                    }}
                    variant="outlined"
                    style={{
                      marginRight: "10px",
                      fontWeight: "bold",
                      color: "#1976d2",
                      borderColor: "#1976d2",
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => deleteJob(job.id)}
                    variant="outlined"
                    style={{
                      fontWeight: "bold",
                      color: "#d32f2f",
                      borderColor: "#d32f2f",
                    }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {jobs.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan="5"
                  style={{
                    textAlign: "center",
                    padding: "20px",
                    color: "#757575",
                  }}
                >
                  No jobs available. Click "Add Job" to create one.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingJob(null);
          setJobForm({ title: "", description: "" });
        }}
      >
        <Box
          sx={{
            padding: "20px",
            backgroundColor: "white",
            width: "400px",
            margin: "auto",
            marginTop: "50px",
            borderRadius: "8px",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
          }}
        >
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            style={{ color: "#2e7d32" }}
          >
            {editingJob ? "Edit Job" : "Add Job"}
          </Typography>
          <form onSubmit={handleFormSubmit}>
            <TextField
              label="Job Title"
              fullWidth
              margin="normal"
              value={jobForm.title}
              onChange={(e) =>
                setJobForm({ ...jobForm, title: e.target.value })
              }
              required
            />
            <TextField
              label="Job Description"
              fullWidth
              multiline
              rows={4}
              margin="normal"
              value={jobForm.description}
              onChange={(e) =>
                setJobForm({ ...jobForm, description: e.target.value })
              }
              required
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              style={{
                backgroundColor: "#4caf50",
                color: "#fff",
                fontWeight: "bold",
                marginTop: "10px",
              }}
            >
              {editingJob ? "Update Job" : "Add Job"}
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default Dashboard;
