import React, { useState, useEffect } from "react";
import {
  Typography,
  Button,
  TextField,
  Box,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const AssessmentPage = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState("");
  const [questions, setQuestions] = useState([]);
  const [questionText, setQuestionText] = useState("");
  const [optionText, setOptionText] = useState("");
  const [options, setOptions] = useState([]);
  const [isEditingQuestion, setIsEditingQuestion] = useState(false);
  const [editingQuestionIndex, setEditingQuestionIndex] = useState(null);
  const optionLabels = ["a", "b", "c", "d"];

  // Fetch jobs from localStorage
  useEffect(() => {
    const savedJobs = JSON.parse(localStorage.getItem("jobs")) || [];
    setJobs(savedJobs);
  }, []);

  // Load assessment data for selected job from localStorage
  useEffect(() => {
    if (selectedJob) {
      const savedAssessments =
        JSON.parse(localStorage.getItem(`assessment_${selectedJob}`)) || [];
      setQuestions(savedAssessments);
    } else {
      setQuestions([]);
    }
  }, [selectedJob]);

  const handleAddOption = () => {
    if (optionText.trim() && options.length < 4) {
      setOptions([...options, optionText.trim()]);
      setOptionText("");
    }
  };

  const handleEditOption = (index, newText) => {
    const updatedOptions = options.map((opt, i) =>
      i === index ? newText : opt
    );
    setOptions(updatedOptions);
  };

  const handleAddOrUpdateQuestion = () => {
    if (questionText.trim() && options.length === 4) {
      const newQuestion = {
        questionText: questionText.trim(),
        options: [...options],
      };
      let updatedQuestions;

      if (isEditingQuestion) {
        updatedQuestions = questions.map((question, index) =>
          index === editingQuestionIndex ? newQuestion : question
        );
      } else {
        updatedQuestions = [...questions, newQuestion];
      }

      setQuestions(updatedQuestions);
      setQuestionText("");
      setOptions([]);
      setIsEditingQuestion(false);
      setEditingQuestionIndex(null);

      // Save the updated questions for the selected job in localStorage
      localStorage.setItem(
        `assessment_${selectedJob}`,
        JSON.stringify(updatedQuestions)
      );
    } else if (options.length < 4) {
      alert("Each question must have exactly 4 options.");
    }
  };

  const handleEditQuestion = (index) => {
    const questionToEdit = questions[index];
    setQuestionText(questionToEdit.questionText);
    setOptions([...questionToEdit.options]);
    setIsEditingQuestion(true);
    setEditingQuestionIndex(index);
  };

  const deleteQuestion = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);

    // Update localStorage with the modified questions
    localStorage.setItem(
      `assessment_${selectedJob}`,
      JSON.stringify(updatedQuestions)
    );
  };

  return (
    <Box
      sx={{
        padding: "20px",
        maxWidth: "800px",
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
        Assessment Page
      </Typography>

      <Box sx={{ marginBottom: "20px", textAlign: "center" }}>
        <Typography variant="h6">Select Job</Typography>
        <TextField
          select
          fullWidth
          variant="outlined"
          value={selectedJob}
          onChange={(e) => setSelectedJob(e.target.value)}
          sx={{ marginTop: "10px" }}
        >
          <MenuItem value="">Select a job</MenuItem>
          {jobs.map((job) => (
            <MenuItem key={job.id} value={job.id}>
              {job.title}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      {selectedJob && (
        <Box sx={{ marginTop: "20px" }}>
          <Typography
            variant="h5"
            style={{
              color: "#2e7d32",
              fontWeight: "bold",
              marginBottom: "10px",
            }}
          >
            {isEditingQuestion ? "Edit Question" : "Add Question"} for{" "}
            {jobs.find((job) => job.id === parseInt(selectedJob))?.title}
          </Typography>

          {/* Question Input */}
          <TextField
            label="Question Text"
            fullWidth
            variant="outlined"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            sx={{ marginBottom: "20px" }}
          />

          {/* Options Input */}
          {options.map((option, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <Typography
                variant="body1"
                sx={{ fontWeight: "bold", marginRight: "10px" }}
              >
                {optionLabels[index]}.
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                value={option}
                onChange={(e) => handleEditOption(index, e.target.value)}
                sx={{ marginRight: "10px" }}
              />
            </Box>
          ))}

          {options.length < 4 && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Enter option text"
                value={optionText}
                onChange={(e) => setOptionText(e.target.value)}
                sx={{ marginRight: "10px" }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddOption}
                disabled={options.length >= 4}
                sx={{ fontWeight: "bold", backgroundColor: "#4CAF50" }}
              >
                Add Option
              </Button>
            </Box>
          )}

          {/* Add or Update Question Button */}
          <Button
            fullWidth
            onClick={handleAddOrUpdateQuestion}
            sx={{
              padding: "10px",
              backgroundColor: "#4CAF50",
              color: "white",
              fontWeight: "bold",
              borderRadius: "4px",
              cursor: "pointer",
              marginTop: "10px",
              marginBottom: "20px",
              "&:hover": {
                backgroundColor: "#388E3C",
              },
            }}
          >
            {isEditingQuestion ? "Update Question" : "Add Question"}
          </Button>

          {/* Display Added Questions with Serial Numbers */}
          <Typography
            variant="h5"
            style={{
              color: "#1976d2",
              fontWeight: "bold",
              marginBottom: "10px",
            }}
          >
            Questions
          </Typography>
          <List>
            {questions.map((question, index) => (
              <ListItem
                key={index}
                sx={{
                  backgroundColor: "#f1f1f1",
                  borderRadius: "8px",
                  marginBottom: "10px",
                  padding: "15px",
                  boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
                }}
              >
                <ListItemText
                  primary={`${index + 1}. ${question.questionText}`}
                  secondary={
                    <List>
                      {question.options.map((option, optIndex) => (
                        <ListItem key={optIndex} sx={{ paddingLeft: "0px" }}>
                          {optionLabels[optIndex]}. {option}
                        </ListItem>
                      ))}
                    </List>
                  }
                />
                <IconButton
                  onClick={() => handleEditQuestion(index)}
                  sx={{ color: "#1976d2" }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={() => deleteQuestion(index)}
                  sx={{ color: "#d32f2f" }}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
};

export default AssessmentPage;
