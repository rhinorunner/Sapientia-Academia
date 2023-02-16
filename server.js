const express = require('express');
const bcrypt = require('bcrypt');
const app = express();

// ...

app.post('/login', (req, res) => {
  const { usernameOrEmail, password } = req.body;
  
  // Query the database to find the user with the provided username or email
  const query = "SELECT * FROM users WHERE (username = ? OR email = ?)";
  db.query(query, [usernameOrEmail, usernameOrEmail], (err, result) => {
    if (err) {
      console.error(err);
      res.json({ success: false, message: "An error occurred" });
      return;
    }
    
    if (result.length === 0) {
      res.json({ success: false, message: "Incorrect username or email" });
      return;
    }
    
    const user = result[0];
    
    // Compare the provided password with the hashed password in the database
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        console.error(err);
        res.json({ success: false, message: "An error occurred" });
        return;
      }
      
      if (!isMatch) {
        res.json({ success: false, message: "Incorrect password" });
        return;
      }
      
      // Password is correct, so create a session for the user and redirect to the home page
      req.session.userId = user.id;
      res.json({ success: true });
    });
  });
});
