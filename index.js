// 1. Import the necessary code modules
const express = require("express");
const Unblocker = require("unblocker");
const path = require("path");

// 2. Initialize the Express web framework application
const app = express();

// 3. Create the proxy engine instance with your hidden network route
const unblocker = new Unblocker({ prefix: "/science-hub/" });

// 4. Register the proxy middleware so Node can capture incoming requests
app.use(unblocker);

// 5. Point Node to your frontend web folder containing index.html and style.css
app.use(express.static(path.join(__dirname, "public")));

// 6. Define the landing page route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// 7. Tell Node to listen for traffic on the port assigned by the cloud platform
const port = process.env.PORT || 8080;
const server = app.listen(port, () => {
    console.log(`Academic server active on port ${port}`);
});

// 8. Enable support for modern media streams and websockets
server.on("upgrade", unblocker.onUpgrade);
