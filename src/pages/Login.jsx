import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { authService } from "../utils/authService";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (isLogin) {
      const response = authService.login(username, password);
      if (response.success) {
        // Store the username in localStorage as the user name
        localStorage.setItem("user", JSON.stringify({ username })); // Store username as a JSON object
        setSuccess(response.message);
        navigate("/dashboard"); // Redirect to Dashboard after login
      } else {
        setError(response.message);
      }
    } else {
      if (password !== confirmPassword) {
        setError("Passwords do not match!");
        return;
      }
      const response = authService.signUp(username, password);
      if (response.success) {
        setSuccess(response.message);
        setIsLogin(true);
      } else {
        setError(response.message);
      }
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setUsername("");
    setPassword("");
    setConfirmPassword("");
    setError(null);
    setSuccess(null);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        bgcolor: "#f4f4f9",
      }}
    >
      <Paper
        elevation={3}
        sx={{ width: "500px", p: 4, borderRadius: 2, textAlign: "center" }}
      >
        <Typography variant="h4" gutterBottom>
          {isLogin ? "Login" : "Sign Up"}
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <TextField
            label="Username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            required
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
          />
          {!isLogin && (
            <TextField
              label="Confirm Password"
              type="password"
              variant="outlined"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              fullWidth
              required
            />
          )}
          <Button type="submit" variant="contained" color="primary" fullWidth>
            {isLogin ? "Login" : "Sign Up"}
          </Button>
        </form>
        <Button
          onClick={toggleMode}
          variant="text"
          color="secondary"
          sx={{ mt: 2 }}
        >
          {isLogin
            ? "Don't have an account? Sign Up"
            : "Already have an account? Login"}
        </Button>
      </Paper>
    </Box>
  );
};

export default Login;
