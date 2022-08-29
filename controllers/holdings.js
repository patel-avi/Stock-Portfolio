const Portfolio = require("../models/portfolio");

module.exports = {
  index,
  create,
};

const token = process.env.APIKEY;
const rootURL = "https://www.alphavantage.co/";
var symbol = "IBM";
var keywords = "tesco";
let date = "2022-08-26";
// replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
// var url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=${process.env.apikey}`;

function index(req, res) {
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
      let holding1 = data["Time Series (Daily)"][date]["4. close"];
    }
  });

  let holdings = Holding.find({ symbol: "IBM" });
  console.log(holdings);
  res.render("/portfolios/show", {});
}

function create(req, res) {
  //   req.body.portfolio = req.params.id;
  //   //   console.log(req.body);
  //   const holding = new Holding(req.body);
  //   ticket.save(function (err) {
  //     if (err) return res.redirect("/tickets/new");
  //     // console.log(ticket);
  //     res.redirect(`/flights/${req.params.id}`);
  //   });

  Portfolio.findById(req.params.id, function (err, portfolio) {
    portfolio.holdings.push(req.body);
    portfolio.save(function (err) {
      // if (err) {
      //   console.log(err);
      // }
      // console.log(flight);
      res.redirect(`/portfolio/${req.params.id}`);
    });
  });
}
