// const express = require("express");
// const mongoose = require("mongoose");
// const fs = require("fs-extra");
// const path = require("path");
// const PDFDocument = require("pdfkit");
// const cors = require("cors");

// const app = express();
// app.use(express.json());
// app.use(cors());

// mongoose.connect("mongodb://localhost:27017/Odoo", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const IssueSchema = new mongoose.Schema({
//   title: String,
//   description: String,
//   category: String,
//   state: String,
//   district: String,
//   location: String,
//   image: String,
//   email: String,  
//   date: { type: Date, default: Date.now },
// });

// const Issue = mongoose.model("Issue", IssueSchema);

// // 📌 Base directory for PDFs
// const baseDir = path.resolve("E:/HackThron Odoo/IssueReports");

// // 📌 Route to Generate & Organize PDFs by State/District
// app.get("/generate-pdfs", async (req, res) => {
//   try {
//     const issues = await Issue.find();

//     if (issues.length === 0) {
//       return res.status(404).json({ message: "No issues found" });
//     }

//     for (const issue of issues) {
//       const stateFolder = path.join(baseDir, issue.state);
//       const districtFolder = path.join(stateFolder, issue.district);

//       // ✅ Ensure directories exist
//       await fs.ensureDir(districtFolder);

//       // ✅ Generate PDF
//       const pdfPath = path.join(districtFolder, `${issue.title.replace(/\s+/g, "_")}.pdf`);
//       const doc = new PDFDocument();
//       const writeStream = fs.createWriteStream(pdfPath);

//       doc.pipe(writeStream);
//       doc.fontSize(20).text("Issue Report", { align: "center" }).moveDown();
//       doc.fontSize(14).text(`Title: ${issue.title}`);
//       doc.text(`Description: ${issue.description}`);
//       doc.text(`Category: ${issue.category}`);
//       doc.text(`Location: ${issue.location}`);
//       doc.text(`State: ${issue.state}`);
//       doc.text(`District: ${issue.district}`);
//       doc.text(`Date: ${issue.date.toDateString()}`);

//       if (issue.image) {
//         const imagePath = path.join(__dirname, issue.image);
//         if (fs.existsSync(imagePath)) {
//           doc.image(imagePath, { width: 150 }).moveDown();
//         }
//       }

//       doc.end();
//       await new Promise((resolve) => writeStream.on("finish", resolve));
//     }

//     res.json({ message: "PDFs generated and organized successfully!" });
//   } catch (error) {
//     console.error("Error generating PDFs:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

// // 📌 Route to List PDFs
// app.get("/list-pdfs", async (req, res) => {
//   try {
//     if (!fs.existsSync(baseDir)) {
//       return res.json([]);
//     }

//     const stateFolders = await fs.readdir(baseDir);
//     let pdfFiles = [];

//     for (const state of stateFolders) {
//       const statePath = path.join(baseDir, state);
//       if (fs.statSync(statePath).isDirectory()) {
//         const districtFolders = await fs.readdir(statePath);
//         for (const district of districtFolders) {
//           const districtPath = path.join(statePath, district);
//           if (fs.statSync(districtPath).isDirectory()) {
//             const files = await fs.readdir(districtPath);
//             files.forEach(file => {
//               if (file.endsWith(".pdf")) {
//                 pdfFiles.push(`${state}/${district}/${file}`);
//               }
//             });
//           }
//         }
//       }
//     }

//     res.json(pdfFiles);
//   } catch (error) {
//     console.error("Error listing PDFs:", error);
//     res.status(500).json({ message: "Error retrieving PDFs" });
//   }
// });

// // 📌 Route to Download a PDF
// app.get("/download/:state/:district/:pdfName", (req, res) => {
//   const { state, district, pdfName } = req.params;
//   const pdfPath = path.join(baseDir, state, district, pdfName);

//   if (fs.existsSync(pdfPath)) {
//     res.download(pdfPath);
//   } else {
//     res.status(404).json({ message: "File not found" });
//   }
// });

// const PORT = process.env.PORT || 5001;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// const express = require("express");
// const mongoose = require("mongoose");
// const fs = require("fs-extra");
// const path = require("path");
// const PDFDocument = require("pdfkit");
// const cors = require("cors");

// const app = express();
// app.use(express.json());
// app.use(cors());

// mongoose.connect("mongodb://localhost:27017/Odoo", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const IssueSchema = new mongoose.Schema({
//   title: String,
//   description: String,
//   category: String,
//   state: String,
//   district: String,
//   location: String,
//   image: String,
//   email: String,
//   date: { type: Date, default: Date.now },
// });

// const Issue = mongoose.model("Issue", IssueSchema);

// // 📌 Base directory for PDFs
// const baseDir = path.resolve("E:/HackThron Odoo/IssueReports");

// // 📌 Route to Generate & Organize PDFs by State/District/Category
// app.get("/generate-pdfs", async (req, res) => {
//   try {
//     const issues = await Issue.find();
//     if (issues.length === 0) {
//       return res.status(404).json({ message: "No issues found" });
//     }

//     for (const issue of issues) {
//       const stateFolder = path.join(baseDir, issue.state);
//       const districtFolder = path.join(stateFolder, issue.district);
//       const categoryFolder = path.join(districtFolder, issue.category);

//       // ✅ Ensure directories exist
//       await fs.ensureDir(categoryFolder);

//       // ✅ Generate PDF
//       const pdfPath = path.join(categoryFolder, `${issue.title.replace(/\s+/g, "_")}.pdf`);
//       const doc = new PDFDocument();
//       const writeStream = fs.createWriteStream(pdfPath);

//       doc.pipe(writeStream);
//       doc.fontSize(20).text("Issue Report", { align: "center" }).moveDown();
//       doc.fontSize(14).text(`Title: ${issue.title}`);
//       doc.text(`Description: ${issue.description}`);
//       doc.text(`Category: ${issue.category}`);
//       doc.text(`Location: ${issue.location}`);
//       doc.text(`State: ${issue.state}`);
//       doc.text(`District: ${issue.district}`);
//       doc.text(`Date: ${issue.date.toDateString()}`);


//   const imagePath = path.join(__dirname, "uploads", issue.image);

//   if (fs.existsSync(imagePath)) {
//     doc.image(imagePath, { width: 150 }).moveDown();
//   } else {
//     console.warn(`Image not found: ${imagePath}`);
//   }

//   res.setHeader("Content-Type", "application/pdf");
//   doc.pipe(res);

//       doc.end();
//       await new Promise((resolve) => writeStream.on("finish", resolve));
//     }

//     res.json({ message: "PDFs generated and organized successfully!" });
//   } catch (error) {
//     console.error("Error generating PDFs:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

// // 📌 Route to List PDFs by State/District/Category
// app.get("/list-pdfs", async (req, res) => {
//   try {
//     if (!fs.existsSync(baseDir)) {
//       return res.json({});
//     }

//     const stateFolders = await fs.readdir(baseDir);
//     let pdfData = {};

//     for (const state of stateFolders) {
//       const statePath = path.join(baseDir, state);
//       if (fs.statSync(statePath).isDirectory()) {
//         pdfData[state] = {};

//         const districtFolders = await fs.readdir(statePath);
//         for (const district of districtFolders) {
//           const districtPath = path.join(statePath, district);
//           if (fs.statSync(districtPath).isDirectory()) {
//             pdfData[state][district] = {};

//             const categoryFolders = await fs.readdir(districtPath);
//             for (const category of categoryFolders) {
//               const categoryPath = path.join(districtPath, category);
//               if (fs.statSync(categoryPath).isDirectory()) {
//                 const files = await fs.readdir(categoryPath);
//                 pdfData[state][district][category] = files.filter((file) => file.endsWith(".pdf"));
//               }
//             }
//           }
//         }
//       }
//     }

//     res.json(pdfData);
//   } catch (error) {
//     console.error("Error listing PDFs:", error);
//     res.status(500).json({ message: "Error retrieving PDFs" });
//   }
// });

// // 📌 Route to Download a PDF
// app.get("/download/:state/:district/:category/:pdfName", (req, res) => {
//   const { state, district, category, pdfName } = req.params;
//   const pdfPath = path.join(baseDir, state, district, category, pdfName);

//   if (fs.existsSync(pdfPath)) {
//     res.download(pdfPath);
//   } else {
//     res.status(404).json({ message: "File not found" });
//   }
// });

// const PORT = process.env.PORT || 5001;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs-extra");
const path = require("path");
const PDFDocument = require("pdfkit");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// ✅ Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/Odoo", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

const IssueSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  state: String,
  district: String,
  location: String,
  image: String,
  email: String,
  date: { type: Date, default: Date.now },
});

const Issue = mongoose.model("Issue", IssueSchema);

// 📌 Base directory for PDF storage
const baseDir = path.resolve("E:/HackThron Odoo/IssueReports");

// 📌 Route to Generate PDFs and Organize by State/District/Category
app.get("/generate-pdfs", async (req, res) => {
  try {
    const issues = await Issue.find();
    if (issues.length === 0) {
      return res.status(404).json({ message: "No issues found" });
    }

    for (const issue of issues) {
      const stateFolder = path.join(baseDir, issue.state);
      const districtFolder = path.join(stateFolder, issue.district);
      const categoryFolder = path.join(districtFolder, issue.category);

      // ✅ Ensure directories exist
      await fs.ensureDir(categoryFolder);

      // ✅ Generate PDF File Path
      const pdfFileName = `${issue.title.replace(/\s+/g, "_")}.pdf`;
      const pdfPath = path.join(categoryFolder, pdfFileName);

      // ✅ Create PDF Document
      const doc = new PDFDocument();
      const writeStream = fs.createWriteStream(pdfPath);
      doc.pipe(writeStream);

      // ✅ Add Content to PDF
      doc.fontSize(20).text("Issue Report", { align: "center" }).moveDown();
      doc.fontSize(14).text(`Title: ${issue.title}`);
      doc.text(`Description: ${issue.description}`);
      doc.text(`Category: ${issue.category}`);
      doc.text(`Location: ${issue.location}`);
      doc.text(`State: ${issue.state}`);
      doc.text(`District: ${issue.district}`);
      doc.text(`Date: ${issue.date.toDateString()}`).moveDown();

     

      // ✅ Add Image if Exists

      const imagePath = "E:/HackThron Odoo/Backend odoo" + issue.image;

if (fs.existsSync(imagePath)) {
  doc.image(imagePath, { width: 150 }).moveDown();
} else {
  console.warn(`Image not found: ${imagePath}`);
}

      // ✅ Finalize PDF
      doc.end();
      await new Promise((resolve) => writeStream.on("finish", resolve));
    }

    res.json({ message: "PDFs generated and organized successfully!" });
  } catch (error) {
    console.error("Error generating PDFs:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// 📌 Route to List PDFs by State/District/Category
app.get("/list-pdfs", async (req, res) => {
  try {
    if (!fs.existsSync(baseDir)) {
      return res.json({});
    }

    const stateFolders = await fs.readdir(baseDir);
    let pdfData = {};

    for (const state of stateFolders) {
      const statePath = path.join(baseDir, state);
      if (fs.statSync(statePath).isDirectory()) {
        pdfData[state] = {};

        const districtFolders = await fs.readdir(statePath);
        for (const district of districtFolders) {
          const districtPath = path.join(statePath, district);
          if (fs.statSync(districtPath).isDirectory()) {
            pdfData[state][district] = {};

            const categoryFolders = await fs.readdir(districtPath);
            for (const category of categoryFolders) {
              const categoryPath = path.join(districtPath, category);
              if (fs.statSync(categoryPath).isDirectory()) {
                const files = await fs.readdir(categoryPath);
                pdfData[state][district][category] = files.filter((file) =>
                  file.endsWith(".pdf")
                );
              }
            }
          }
        }
      }
    }

    res.json(pdfData);
  } catch (error) {
    console.error("Error listing PDFs:", error);
    res.status(500).json({ message: "Error retrieving PDFs" });
  }
});

// 📌 Route to Download a Specific PDF
app.get("/download/:state/:district/:category/:pdfName", (req, res) => {
  const { state, district, category, pdfName } = req.params;
  const pdfPath = path.join(baseDir, state, district, category, pdfName);

  if (fs.existsSync(pdfPath)) {
    res.download(pdfPath);
  } else {
    res.status(404).json({ message: "File not found" });
  }
});

// 📌 Route to Serve Uploaded Images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
