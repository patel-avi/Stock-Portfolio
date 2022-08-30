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
  },
  avgCost: {
    type: Number,
  },
  price: {
    type: Number,
  },
  marketValue: {
    type: Number,
  },
  unrealizedGL: {
    type: Number,
  },
  portfolio: {
    type: Schema.Types.ObjectId,
    ref: "Portfolio",
  },
});

module.exports = mongoose.model("Holding", holdingSchema);
