"use strict";
var request = require("request");
const User = require("../models/user");
const Holding = require("../models/holding");

module.exports = {
  index,
  search,
};

const token = process.env.APIKEY;
const rootURL = "https://www.alphavantage.co/";
var symbol = "IBM";
var keywords = "tesco";
// replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
// var url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=${process.env.apikey}`;

function index(req, res, next) {
  const options = {
    url: `${rootURL}/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=demo`,
    json: true,
    headers: { "User-Agent": "request" },
  };
  request.get(options, function (err, res, data) {
    if (err) {
      console.log("Error:", err);
    } else if (res.statusCode !== 200) {
      console.log("Status:", res.statusCode);
    } else {
      // data is successfully parsed as a JSON object:
      console.log(data);
    }
  });
  let modelQuery = req.query.name
    ? { name: new RegExp(req.query.name, "i") }
    : {};
  // Default to sorting by name
  let sortKey = req.query.sort || "name";
  User.find(modelQuery)
    .sort(sortKey)
    .exec(function (err, users) {
      if (err) return next(err);
      console.log(req.user);
      // Passing search values, name & sortKey, for use in the EJS
      res.render("portfolios/index", {
        users,
        name: req.query.name,
        sortKey,
        user: req.user,
        title: "Dashboard",
      });
    });
}

function search(req, res, next) {
  const options = {
    url: `${rootURL}/query?function=SYMBOL_SEARCH&keywords=${keywords}&apikey=${process.env.apikey}`,
    json: true,
    headers: { "User-Agent": "request" },
  };
  request.get(options, function (err, res, data) {
    if (err) {
      console.log("Error:", err);
    } else if (res.statusCode !== 200) {
      console.log("Status:", res.statusCode);
    } else {
      // data is successfully parsed as a JSON object:
      console.log(data);
    }
  });
}
