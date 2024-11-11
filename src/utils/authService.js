// src/utils/authService.js
export const authService = {
    signUp: (username, password) => {
      const users = JSON.parse(localStorage.getItem('users')) || {};
      if (users[username]) {
        return { success: false, message: 'User already exists!' };
      }
      users[username] = password;
      localStorage.setItem('users', JSON.stringify(users));
      return { success: true, message: 'User registered successfully!' };
    },
    login: (username, password) => {
      const users = JSON.parse(localStorage.getItem('users')) || {};
      if (users[username] && users[username] === password) {
        return { success: true, message: 'Logged in successfully!' };
      }
      return { success: false, message: 'Invalid username or password!' };
    },
  };
  