const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (HTML / CSS / JS)
app.use(express.static(path.join(__dirname, "public")));

// Store applications in memory (simple)
let applications = [];

// Accept application submissions
app.post("/submit", (req, res) => {
    const appData = req.body;
    applications.push(appData);
    // Redirect to generated card
    res.redirect(`/card/${applications.length - 1}`);
});

// Show generated card
app.get("/card/:id", (req, res) => {
    const appId = parseInt(req.params.id);
    if (applications[appId]) {
        res.send(`
            <h2>Bus Pass Generated</h2>
            <div style="border:1px solid #ccc;padding:20px;width:320px;margin:auto;text-align:left;">
                <strong>Name:</strong> ${applications[appId].name}<br/>
                <strong>Age:</strong> ${applications[appId].age}<br/>
                <strong>Route:</strong> ${applications[appId].route}<br/>
                <strong>Pass Type:</strong> ${applications[appId].passType}<br/>
            </div>
            <br>
            <a href="/">Back to Form</a>
        `);
    } else {
        res.send("Application not found");
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
