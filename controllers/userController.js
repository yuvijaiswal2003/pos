const userModal = require("../models/userModel");

// login user
const loginController = async (req, res) => {
  try {
    const { userId, password } = req.body;

    // Check if both userId and password are provided
    if (!userId || !password) {
      return res.status(400).json({ message: "Please enter both userId and password." });
    }

    // Find user with matching userId, password, and verified status
    const user = await userModal.findOne({ userId, password, verified: true });

    if (user) {
      // If a matching user is found, send a success response
      return res.status(200).json({ message: "Login successful", user });
    } else {
      // If no user is found or the credentials are invalid, send a failure response
      return res.status(401).json({ message: "Login failed. Invalid userId or password." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error occurred during login." });
  }
};

// register user
const registerController = async (req, res) => {
  try {
    // Ensure that the required fields are provided
    const { userId, password } = req.body;
    if (!userId || !password) {
      return res.status(400).json({ message: "Please provide a valid userId and password." });
    }

    const newUser = new userModal({ ...req.body, verified: true });
    await newUser.save();
    res.status(201).send("New user added successfully!");
  } catch (error) {
    res.status(400).json({ message: "Error registering user.", error: error.message });
    console.log(error);
  }
};

module.exports = {
  loginController,
  registerController,
};
