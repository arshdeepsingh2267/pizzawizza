import PizzaData from "@/models/PizzaData";
import db from "@/utils/db";

export default async function handler(req, res) {
  //   const data = await PizzaData.find();
  if (req.method === "POST") {
    await db.connect();
    for (let i = 0; i < req.body.length; i++) {
      let p = new PizzaData({
        name: req.body[i].name,
        category: req.body[i].category,
        foodType: req.body[i].foodType,
        price: req.body[i].price,
        description: req.body[i].description,
        img: req.body[i].img,
      });
      await p.save();
    }
    res.status(200).json({ value: "HO GAYA" });
    // await PizzaData.create([
    //   {

    //   },
    // ]);
  }
  if (req.method === "GET") {
    await db.connect();
    let data = await PizzaData.find();
    res.status(200).json({ data });
  }
  await db.disconnect();
  //   console.log(data);
  //   res.status(200).json(data);
}
