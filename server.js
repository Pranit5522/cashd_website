const express = require("express");
const path = require("path");

const app = express();

// Corrected to use "dist" folder
app.use(express.static(path.join(__dirname, "dist")));

// Serve static HTML pages for specific routes
app.get("/faq", (req, res) => {
  res.sendFile(path.join(__dirname, "static", "pages", "faq.html"));
});

app.get("/delete_account", (req, res) => {
  res.sendFile(path.join(__dirname, "static", "pages", "delete_account.html"));
});

app.get("/privacy_policy", (req, res) => {
  res.sendFile(path.join(__dirname, "static", "pages", "privacy_policy.html"));
});

app.get("/initial_check", (req, res) => {
  res.sendFile(path.join(__dirname, "static", "pages", "initial_check.html"));
});

app.get("/v1/privacy_policy", (req, res) => {
  res.sendFile(
    path.join(__dirname, "static", "pages", "privacy_policy_ios.html")
  );
});

app.get("/terms_service", (req, res) => {
  res.sendFile(path.join(__dirname, "static", "pages", "terms_service.html"));
});

app.get("/v1/terms_service", (req, res) => {
  res.sendFile(
    path.join(__dirname, "static", "pages", "terms_service_ios.html")
  );
});

// Serve assetlinks.json from APP_INFO in meta-data.json
app.get("/.well-known/assetlinks.json", (req, res) => {
  const meta = require(path.join(__dirname, "data", "meta-data.json"));
  res.json(meta.APP_INFO);
});

// Serve files from static folder by filename
app.get("/:filename", (req, res) => {
  res.sendFile(path.join(__dirname, "static", req.params.filename));
});

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(7003, () => {
  console.log("KickCash website running at http://127.0.0.1:7003");
});
