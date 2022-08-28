const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const holdingSchema = new Schema({
  portfolio: {
    type: Schema.Types.ObjectId,
    ref: "Portfolio",
  },
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
  price: {
    type: Number,
  },
  marketValue: {
    type: Number,
  },
  unrealizedGL: {
    type: Number,
  },
});

module.exports = mongoose.model("Holding", holdingSchema);
