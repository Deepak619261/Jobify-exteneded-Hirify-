import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Button,
  TextField,
  Box,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import EditIcon from "@mui/icons-material/Edit";

const JobPostingPage = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [candidateForm, setCandidateForm] = useState({
    name: "",
    resume: "",
    applicationDate: "",
    status: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingCandidateId, setEditingCandidateId] = useState(null);

  useEffect(() => {
    const savedJobs = JSON.parse(localStorage.getItem("jobs")) || [];
    const currentJob = savedJobs.find((job) => job.id === parseInt(jobId));

    if (currentJob) {
      setJob({
        ...currentJob,
        candidates: Array.isArray(currentJob.candidates)
          ? currentJob.candidates
          : [],
      });
    } else {
      console.error(`Job with ID ${jobId} not found`);
      setJob(null);
    }
  }, [jobId]);

  const addOrEditCandidate = (e) => {
    e.preventDefault();
    if (!job) return;

    const savedJobs = JSON.parse(localStorage.getItem("jobs")) || [];
    const updatedJob = { ...job };

    if (isEditing) {
      updatedJob.candidates = updatedJob.candidates.map((candidate) =>
        candidate.id === editingCandidateId
          ? { ...candidate, ...candidateForm }
          : candidate
      );
    } else {
      const newCandidate = {
        ...candidateForm,
        id: Date.now(),
        applicationDate: new Date().toLocaleDateString(),
      };
      updatedJob.candidates = [...(job.candidates || []), newCandidate];
    }

    const updatedJobs = savedJobs.map((j) =>
      j.id === updatedJob.id ? updatedJob : j
    );
    localStorage.setItem("jobs", JSON.stringify(updatedJobs));

    setJob(updatedJob);
    setCandidateForm({ name: "", resume: "", applicationDate: "", status: "" });
    setIsEditing(false);
    setEditingCandidateId(null);
  };

  const editCandidate = (candidate) => {
    setCandidateForm(candidate);
    setIsEditing(true);
    setEditingCandidateId(candidate.id);
  };

  const deleteCandidate = (candidateId) => {
    const updatedJob = {
      ...job,
      candidates: job.candidates.filter(
        (candidate) => candidate.id !== candidateId
      ),
    };

    const savedJobs = JSON.parse(localStorage.getItem("jobs")) || [];
    const updatedJobs = savedJobs.map((j) =>
      j.id === updatedJob.id ? updatedJob : j
    );
    localStorage.setItem("jobs", JSON.stringify(updatedJobs));

    setJob(updatedJob);
  };

  if (!job) {
    return <p>Loading...</p>;
  }

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "800px",
        margin: "0 auto",
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        style={{ color: "#2e7d32", fontWeight: "bold" }}
      >
        {job.title} - Candidates
      </Typography>
      <Divider sx={{ marginBottom: "20px" }} />
      <List>
        {job.candidates.map((candidate) => (
          <ListItem
            key={candidate.id}
            sx={{
              borderBottom: "1px solid #ddd",
              padding: "15px 10px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <ListItemText
              primary={
                <Link
                  to={`/job/${jobId}/candidate/${candidate.id}`}
                  style={{ textDecoration: "none", color: "#1976d2" }}
                >
                  <Typography variant="h6">{candidate.name}</Typography>
                </Link>
              }
              secondary={
                <Typography variant="body2" color="textSecondary">
                  Application Date: {candidate.applicationDate} | Status:{" "}
                  {candidate.status}
                </Typography>
              }
            />
            <div>
              <a
                href={candidate.resume}
                download
                style={{ textDecoration: "none" }}
              >
                <IconButton>
                  <UploadFileIcon />
                </IconButton>
              </a>
              <IconButton onClick={() => editCandidate(candidate)}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => deleteCandidate(candidate.id)}>
                <DeleteIcon />
              </IconButton>
            </div>
          </ListItem>
        ))}
      </List>
      <Box
        sx={{
          padding: "20px",
          backgroundColor: "white",
          width: "400px",
          margin: "auto",
          marginTop: "30px",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
        }}
      >
        <Typography
          variant="h5"
          sx={{ textAlign: "center", marginBottom: "20px", color: "#2e7d32" }}
        >
          {isEditing ? "Edit Candidate" : "Add Candidate"}
        </Typography>
        <form onSubmit={addOrEditCandidate}>
          <TextField
            label="Candidate Name"
            fullWidth
            margin="normal"
            value={candidateForm.name}
            onChange={(e) =>
              setCandidateForm({ ...candidateForm, name: e.target.value })
            }
            required
          />
          <TextField
            label="Resume Link"
            fullWidth
            margin="normal"
            value={candidateForm.resume}
            onChange={(e) =>
              setCandidateForm({ ...candidateForm, resume: e.target.value })
            }
            required
          />
          <TextField
            label="Application Status"
            fullWidth
            margin="normal"
            value={candidateForm.status}
            onChange={(e) =>
              setCandidateForm({ ...candidateForm, status: e.target.value })
            }
            required
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              marginTop: "20px",
              fontWeight: "bold",
              backgroundColor: "#4CAF50",
              color: "white",
              "&:hover": { backgroundColor: "#388E3C" },
            }}
          >
            {isEditing ? "Update Candidate" : "Add Candidate"}
          </Button>
          {isEditing && (
            <Button
              variant="outlined"
              fullWidth
              sx={{
                marginTop: "10px",
                fontWeight: "bold",
                color: "#d32f2f",
                borderColor: "#d32f2f",
              }}
              onClick={() => {
                setIsEditing(false);
                setCandidateForm({
                  name: "",
                  resume: "",
                  applicationDate: "",
                  status: "",
                });
              }}
            >
              Cancel
            </Button>
          )}
        </form>
      </Box>

      {/* Back to Dashboard Button at the bottom */}
      <Button
        variant="contained"
        onClick={() => navigate("/dashboard")}
        style={{ marginTop: "30px", backgroundColor: "#1976d2", color: "#fff" }}
        fullWidth
      >
        Back to Dashboard
      </Button>
    </div>
  );
};

export default JobPostingPage;
