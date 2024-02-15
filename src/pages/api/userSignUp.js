import Users from "@/models/Users";
import db from "@/utils/db";
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;
export default async function handler(req, res) {
  //   const data = await Users.find();
  let success = false;
  const salt = await bcrypt.genSalt(10);
  let securePass = await bcrypt.hash(req.body.password, salt);
  if (req.method === "POST") {
    await db.connect();
    try {
      await Users.create({
        name: req.body.name,
        // password: req.body.password,  first write this and then use bcryptjs
        password: securePass,
        email: req.body.email,
        location: req.body.location,
      })
        .then((user) => {
          const data = {
            user: {
              id: user.id,
            },
          };
          const authToken = jwt.sign(data, jwtSecret);
          success = true;
          res.json({ success, authToken });
        })
        .catch((err) => {
          console.log(err);
          res.json({ error: err });
        });
    } catch (error) {
      console.error(error.message);
      // await Users.create([
      //   {

      //   },
      // ]);
    }
  }
  await db.disconnect();

  //   console.log(data);
  //   res.status(200).json(data);
}
