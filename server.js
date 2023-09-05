const express = require("express");
const app = express();
const fs = require("fs");
const request = require("request");
const { PORT } = require("./config.js");
const { API_KEY } = require("./config.js");
const path = require("path");


  

 

app.get("/", (req, res) => {
  const url = "https://api.polygon.io/v3/reference/tickers?apiKey=" + API_KEY;
  request.get(
    {
      url: url,
      json: true,
      headers: { "User-Agent": "request" },
    },
    (err, res, data) => {
      if (err) {
        console.log("Error:", err);
      } else if (res.statusCode !== 200) {
        console.log("Status:", res.statusCode);
      } else {
        // data est bien pfaite comme JSON object:
        var newData = JSON.stringify(data);
        // on cree le fichier tickers.js 
        fs.writeFile( __dirname + "/frontend/static/js/views/tickers.json", newData,
          (err) => {
            if (err) throw err;
            console.log("sucess!");
          }
        );
        console.log(data);
      }
    }
  );
  res.sendFile(path.resolve(__dirname, "frontend", "index.html")); 
  
});

app.use(
    "/static", express.static(path.resolve(__dirname, "frontend", "static"))
  );
app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "index.html"));
  });

app.listen(PORT, () => {
  console.log("Server is running on PORT", PORT);
});
