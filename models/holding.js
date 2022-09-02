const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const holdingSchema = new Schema({
  symbol: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  quantity: {
    type: Number,
    required: true,
  },
  avgCost: {
    type: mongoose.Types.Decimal128,
    required: true,
  },
  price: {
    type: Number,
  },
  marketValue: {
    type: mongoose.Types.Decimal128,
  },
  unrealizedGL: {
    type: mongoose.Types.Decimal128,
  },
  portfolio: {
    type: Schema.Types.ObjectId,
    ref: "Portfolio",
  },
});

module.exports = mongoose.model("Holding", holdingSchema);
