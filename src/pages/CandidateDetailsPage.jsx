import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography, List, ListItem, IconButton, Link } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import UploadFileIcon from '@mui/icons-material/UploadFile';

const CandidateDetailsPage = () => {
  const { jobId, candidateId } = useParams();
  const [candidate, setCandidate] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedJobs = JSON.parse(localStorage.getItem('jobs')) || [];
    const job = savedJobs.find(j => j.id === parseInt(jobId));
    if (job) {
      const currentCandidate = job.candidates.find(c => c.id === parseInt(candidateId));
      if (currentCandidate) {
        setCandidate(currentCandidate);
      } else {
        console.error(`Candidate with ID ${candidateId} not found`);
      }
    } else {
      console.error(`Job with ID ${jobId} not found`);
    }
  }, [jobId, candidateId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCandidate({ ...candidate, [name]: value });
  };

  const saveCandidateDetails = (showAlert = true) => {
    const savedJobs = JSON.parse(localStorage.getItem('jobs')) || [];
    const jobIndex = savedJobs.findIndex(j => j.id === parseInt(jobId));
    if (jobIndex !== -1) {
      const candidateIndex = savedJobs[jobIndex].candidates.findIndex(c => c.id === parseInt(candidateId));
      if (candidateIndex !== -1) {
        savedJobs[jobIndex].candidates[candidateIndex] = candidate;
        localStorage.setItem('jobs', JSON.stringify(savedJobs));
        setIsEditing(false);
        if (showAlert) {
          alert('Candidate details saved successfully.');
        }
      }
    }
  };

  const handleBack = () => {
    saveCandidateDetails(false);
    navigate(`/job/${jobId}`);
  };

  if (!candidate) {
    return <p>Loading candidate details...</p>;
  }

  return (
    <Box sx={{ padding: '20px', maxWidth: '600px', margin: 'auto', marginTop: '50px', backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0px 4px 12px rgba(0,0,0,0.1)' }}>
      <Typography variant="h4" sx={{ color: '#2e7d32', fontWeight: 'bold', textAlign: 'center', marginBottom: '20px' }}>
        Candidate Details: {candidate.name}
      </Typography>
      {!isEditing ? (
        <List>
          {['email', 'contact', 'skills', 'experience', 'status'].map((field, index) => (
            <ListItem key={index} sx={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0' }}>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                {field.charAt(0).toUpperCase() + field.slice(1)}: {candidate[field] || 'N/A'}
              </Typography>
              <IconButton onClick={() => setIsEditing(true)}>
                <EditIcon />
              </IconButton>
            </ListItem>
          ))}
          <ListItem sx={{ paddingTop: '10px' }}>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              Resume:
            </Typography>
            {candidate.resume ? (
              <Link href={candidate.resume} target="_blank" rel="noopener noreferrer" sx={{ ml: 2 }}>
                <IconButton>
                  <UploadFileIcon />
                </IconButton>
                Preview/Download
              </Link>
            ) : (
              <Typography sx={{ ml: 2 }}>No resume provided</Typography>
            )}
          </ListItem>
        </List>
      ) : (
        <>
          {['email', 'contact', 'skills', 'experience', 'status', 'resume'].map((field, index) => (
            <TextField
              key={index}
              label={field.charAt(0).toUpperCase() + field.slice(1)}
              fullWidth
              margin="normal"
              name={field}
              value={candidate[field] || ''}
              onChange={handleInputChange}
            />
          ))}
          <Button variant="contained" color="primary" onClick={() => saveCandidateDetails(true)} sx={{ marginTop: '20px', fontWeight: 'bold' }}>
            Save Details
          </Button>
        </>
      )}
      <Button variant="outlined" onClick={handleBack} sx={{ marginTop: '20px', color: '#1976d2', borderColor: '#1976d2' }}>
        Back to Job Posting
      </Button>
    </Box>
  );
};

export default CandidateDetailsPage;
