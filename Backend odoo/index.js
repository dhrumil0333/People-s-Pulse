const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const EmployeeModel = require('./models/Employee');
const multer = require('multer');
const path = require('path');

const PDFDocument = require("pdfkit");
const fs = require("fs");

const app = express();
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

mongoose.connect("mongodb://localhost:27017/Odoo", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const IssueSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  state: String,
  district: String,
  location: String,
  image: String,
  email: String,  // Associate the issue with the user
  date: { type: Date, default: Date.now },
});

const Issue = mongoose.model("Issue", IssueSchema);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Save images in 'uploads' folder
  },
  filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  }
});

const upload = multer({ storage: storage });

app.post("/issues", upload.single("image"), async (req, res) => {
  try {

    const { title, description, category, state, district, location, email } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

    if (!title || !description || !category || !state || !district || !location || !email) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newIssue = new Issue({
      title,
      description,
      category,
      state,
      district,
      location,
      image: imagePath,
      email, // Store the user's email
    });

    await newIssue.save();
    res.status(201).json({ message: "Issue submitted successfully", data: newIssue });
  } catch (error) {
    console.error("Error submitting issue:", error);
    res.status(501).json({ message: "Internal server error" });
  }
});

app.get("/issues/:email", async (req, res) => {
  try {
    const issues = await Issue.find({ email: req.params.email });

    if (!issues.length) {
      return res.status(404).json({ message: "No issues found for this user" });
    }

    res.json(issues);
  } catch (error) {
    res.status(510).json({ message: "Internal server error" });
  }
});

const PolicySchema = new mongoose.Schema({
  id: Number,
  title: String,
  description: String,
  date: String,
  source: String,
  image: String,
  category: String, 
});

const Policy = mongoose.model("Policy", PolicySchema);


app.get("/policies", async (req, res) => {
  try {
    const policies = await Policy.find();
    res.json(policies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


app.get("/policies/:category", async (req, res) => {
  try {
    const policies = await Policy.find({ category: req.params.category });
    res.json(policies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/sign' , async (req, res) => {

  try {
      const { firstName, lastName, password, Email, PhoneNo } = req.body; 

      const existingUser = await EmployeeModel.findOne({ Email: Email });
      if (existingUser) {
          return res.status(402).json({ error: "Email already registered" });
      }

      const newEmployee = new EmployeeModel({
          firstName,
          lastName,          
          password,
          Email,
          PhoneNo
      });

      await newEmployee.save(); 
      res.status(202).json(newEmployee);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});

app.post('/log', async (req, res) => {
  const { Email, password } = req.body;
  EmployeeModel.findOne({ Email: Email})
  .then(user =>{
      if(user){
          if(user.password === password){
              res.json("Success");
          }else{
              res.json("Wrong Password");
          }
      }else{
          res.json("User not found");
      }
  })
});

app.get('/user/:email', async (req, res) => {
  try {
      const user = await EmployeeModel.findOne({ Email: req.params.email });
      if (!user) return res.status(404).json({ error: "User not found" });

      res.json({
          firstName: user.firstName,
          lastName: user.lastName,
          Email: user.Email,
          PhoneNo: user.PhoneNo,
          address: user.address,
      });
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});

app.put('/update-address', async (req, res) => {
  try {
      const { Email, address } = req.body;

      // Find the user by email and update the address
      const updatedUser = await EmployeeModel.findOneAndUpdate(
          { Email: Email },
          { $set: { address: address } },
          { new: true } // Return the updated document
      );

      if (!updatedUser) {
          return res.status(404).json({ error: "User not found" });
      }

      res.json({ message: "Address updated successfully", user: updatedUser });
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});



app.get("/issues/pdf/:email", async (req, res) => {
  try {
      const userEmail = req.params.email;
      const issues = await Issue.find({ email: userEmail });

      if (!issues.length) {
          return res.status(404).json({ message: "No issues found for this user" });
      }

      const doc = new PDFDocument({ margin: 50 });
      const filename = `issues_${userEmail}.pdf`;
      const filePath = `./uploads/${filename}`;
      const stream = fs.createWriteStream(filePath);
      doc.pipe(stream);
      // **Header Section**
      doc.fontSize(20).text("User Issues Report", { align: "center" }).moveDown(1);
      
      // **Loop Through Issues**
      issues.forEach((issue, index) => {
          doc
              .fontSize(16)
              .fillColor("black")
              .text(`Issue ${index + 1}`, { continued: false })
              .moveDown(0.5);

          doc.fontSize(12).fillColor("black");
          doc.text(`Title: ${issue.title}`, { indent: 20 });
          doc.text(`Description: ${issue.description}`, { indent: 20 });
          doc.text(`Category: ${issue.category}`, { indent: 20 });
          doc.text(`Location: ${issue.location}, ${issue.district}, ${issue.state}`, { indent: 20 });
          doc.text(`Date: ${issue.date.toDateString()}`, { indent: 20 });

      //     // **Add Image If Exists**
          // if (issue.image) {
          //     try {
          //         doc.moveDown(0.5);
          //         doc.image(`.${issue.image}`, {
          //             fit: [150, 150], // Ensure images fit properly
          //             align: "left",
          //             valign: "center",
          //         });
          //         doc.moveDown(1);
          //     } catch (err) {
          //         console.error("Error loading image:", err);
          //     }
          // }

          doc.moveDown(2); // Add space between issues
      });

      doc.end();

      stream.on("finish", () => {
          res.download(filePath, filename, (err) => {
              if (err) console.error("Download Error:", err);
              fs.unlinkSync(filePath); // Delete file after sending
          });
      });

  } catch (error) {
      console.error("Error generating PDF:", error);
      res.status(500).json({ message: "Internal server error" });
  }
});





const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


