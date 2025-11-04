const express = require("express");
const cors = require("cors");

const scienceQuestions = require("./data/science.json");
const cricketQuestions = require("./data/cricket.json");
const geographyQuestions = require("./data/geography.json");
const mythologyQuestions = require("./data/mythology.json");
const bollywoodQuestions = require("./data/bollywood.json");
const currentAffairsQuestions = require("./data/current_affairs.json");
const historyQuestions = require("./data/history.json");
const politiesQuestions = require("./data/politics.json");
const kidsQuestions = require("./data/kids.json");
const famousPersonalityQuestions = require("./data/famous.json");

const app = express();

// Allow all origins (for development or public APIs)
app.use(cors());

const PORT = process.env.POST || 8080;

function getRandomSubset(arr, size) {
  // Create a shallow copy of the array to avoid modifying the original
  const shuffled = [...arr];

  // Shuffle the array using the Fisher-Yates (Knuth) algorithm
  let currentIndex = shuffled.length;
  let randomIndex;

  while (currentIndex !== 0) {
    // Pick a remaining element
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element
    [shuffled[currentIndex], shuffled[randomIndex]] = [
      shuffled[randomIndex],
      shuffled[currentIndex],
    ];
  }

  // Return the first 'size' elements of the shuffled array
  return shuffled.slice(0, size);
}

function sendJson(req, res, array) {
  const size = req.query.size ? req.query.size : 10;
  const subset = getRandomSubset(array, size);
  res.header("Content-Type", "application/json");
  res.status(200).send(JSON.stringify(subset));
}

// ! science questions
app.get("/api/v1/science", (req, res) => {
  sendJson(req, res, scienceQuestions);
});

// ! cricket questions
app.get("/api/v1/cricket", (req, res) => {
  sendJson(req, res, cricketQuestions);
});

// ! geography questions
app.get("/api/v1/geography", (req, res) => {
  sendJson(req, res, geographyQuestions);
});

// ! Mythology questions
app.get("/api/v1/mythology", (req, res) => {
  sendJson(req, res, mythologyQuestions);
});

// ! Bollywood questions
app.get("/api/v1/bollywood", (req, res) => {
  sendJson(req, res, bollywoodQuestions);
});

// ! Current Affairs questions
app.get("/api/v1/current_affairs", (req, res) => {
  sendJson(req, res, currentAffairsQuestions);
});

// ! History questions
app.get("/api/v1/history", (req, res) => {
  sendJson(req, res, historyQuestions);
});

// ! Politics questions
app.get("/api/v1/politics", (req, res) => {
  sendJson(req, res, politiesQuestions);
});

// ! kids questions
app.get("/api/v1/kids", (req, res) => {
  sendJson(req, res, kidsQuestions);
});

// ! Famous personality questions
app.get("/api/v1/famous", (req, res) => {
  sendJson(req, res, kidsQuestions);
});

const server = app.listen(PORT, function () {
  const host = server.address().address;
  const port = server.address().port;
  console.log("Server is running at http://%s:%s", host, port);
});
