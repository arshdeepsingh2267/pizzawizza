import Orders from "@/models/Orders";
import db from "@/utils/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    await db.connect();
    try {
      console.log(req.body.email);
      let eId = await Orders.find({ email: req.body.email });
      console.log(eId);
      res.json({ orderData: eId });
    } catch (error) {
      res.send("Error", error.message);
      await db.disconnect();
    }
  }
  await db.disconnect();
}
