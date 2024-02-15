import PizzaData from "@/models/PizzaData";
import db from "@/utils/db";

export default async function handler(req, res) {
  await db.connect();

  if (req.method === "POST") {
    try {
      const { name, foodCategory, foodType, price, description, img } =
        req.body;

      const newData = new PizzaData({
        name: name,
        category: foodCategory,
        foodType: foodType,
        price: price,
        description: description,
        img: img,
      });
      const savedData = await newData.save();
      res.status(201).json({ success: true, data: savedData });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
