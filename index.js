var express = require('express');
var app = express();
var cors = require('cors');

// Enable CORS
app.use(cors({ optionsSuccessStatus: 200 }));

// Serve static files
app.use(express.static('public'));

// Serve the main page
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// API endpoint to handle date parsing
app.get("/api/:date?", function (req, res) {
  console.log(`Received request: ${req.protocol}://${req.get('host')}${req.originalUrl}`);

  let dateParam = req.params.date;
  let date;

  // If no date is provided, use the current date
  if (!dateParam) {
    date = new Date();
  } else {
    // Check if the dateParam is a number (Unix timestamp in milliseconds)
    if (!isNaN(dateParam)) {
      dateParam = parseInt(dateParam);
    }
    // Parse the dateParam
    date = new Date(dateParam);
  }

  // Check if the date is valid
  if (date.toString() === "Invalid Date") {
    res.json({ error: "Invalid Date" });
  } else {
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString()
    });
  }
});

// Start the server
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
