const mongoose = require("mongoose");

const { Schema } = mongoose;

const OrderSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  order_data: {
    type: Array,
    required: true,
  },
});

const Orders = mongoose.models.Orders || mongoose.model("Orders", OrderSchema);
// module.exports = mongoose.model("user", UserSchema);
export default Orders;
