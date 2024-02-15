import Orders from "@/models/Orders";
import db from "@/utils/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    await db.connect();
    let data = req.body.order_data;
    await data.splice(0, 0, { Order_date: req.body.order_date });
    console.log("1231242343242354", req.body.email);

    //if email not exisitng in db then create: else: InsertMany()
    let eId = await Orders.findOne({ email: req.body.email });
    console.log(eId);
    if (eId === null) {
      try {
        console.log(data);
        console.log("1231242343242354", req.body.email);
        await Orders.create({
          email: req.body.email,
          order_data: [data],
        }).then(() => {
          res.json({ success: true });
        });
      } catch (error) {
        console.log(error.message);
        res.send("Server Error", error.message);
        await db.disconnect();
      }
    } else {
      try {
        await Orders.findOneAndUpdate(
          { email: req.body.email },
          { $push: { order_data: data } }
        ).then(() => {
          res.json({ success: true });
        });
      } catch (error) {
        console.log(error.message);
        res.send("Server Error", error.message);
        await db.disconnect();
      }
    }
  }
  await db.disconnect();
}
