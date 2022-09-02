"use strict";
var request = require("request");
const Portfolio = require("../models/portfolio");
const Holding = require("../models/holding");

module.exports = {
  create,
  edit,
  update,
  delete: deleteHolding,
};

const token = process.env.APIKEY;
const rootURL = "https://www.alphavantage.co/";
let date = "2022-08-26";
// replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
// var url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=${process.env.apikey}`;

function updatePrice(symbol, date, fn) {
  const options = {
    url: `${rootURL}/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${token}`,
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
      let price = data["Time Series (Daily)"][date]["4. close"];
      fn(price);
    }
  });
}

function search(keywords, fn) {
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
      let name = data["bestMatches"][0]["2. name"];
      fn(name);
    }
  });
}

function create(req, res) {
  req.body.portfolio = req.params.id;
  const holding = new Holding(req.body);
  holding.marketValue = (holding.quantity * holding.avgCost).toFixed(2);
  updatePrice(holding.symbol, date, function (price) {
    holding.price = price;
    holding.unrealizedGL = (
      holding.quantity *
      (price - holding.avgCost)
    ).toFixed(2);
    search(holding.symbol, function (name) {
      holding.name = name;
      holding.save(function (err) {
        if (err) return console.log(err);
        res.redirect(`/portfolios/${req.params.id}`);
      });
    });
  });
}

function edit(req, res) {
  Portfolio.findById(req.params.id, function (err, portfolio) {
    Holding.findById(req.params.id2, function (err, holding) {
      res.render("holdings/edit", { holding, portfolio });
    });
  });
}

function update(req, res) {
  Portfolio.findById(req.params.id, function (err, portfolio) {
    Holding.findById(req.params.id2, function (err, holding) {
      holding.quantity = req.body.quantity;
      holding.avgCost = req.body.avgCost;
      holding.marketValue = (holding.quantity * holding.avgCost).toFixed(2);
      updatePrice(holding.symbol, date, function (price) {
        holding.price = price;
        holding.unrealizedGL = (
          holding.quantity *
          (price - holding.avgCost)
        ).toFixed(2);
        holding.save(function (err) {
          if (err) return console.log(err);
          res.redirect(`/portfolios/${req.params.id}`);
        });
      });
    });
  });
}

function deleteHolding(req, res) {
  Holding.deleteOne({ _id: req.params.id2 }, function (err) {
    console.log(err);
    res.redirect(`/portfolios/${req.params.id}`);
  });
}
