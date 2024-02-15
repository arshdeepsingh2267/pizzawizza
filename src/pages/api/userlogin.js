import Users from "@/models/Users";
import db from "@/utils/db";
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;
export default async function handler(req, res) {
  //   const data = await Users.find();
  let success = false;

  if (req.method === "POST") {
    await db.connect();
    const { email, password } = req.body;
    try {
      let user = await Users.findOne({ email }); //{email:email} === {email}
      if (!user) {
        return res
          .status(400)
          .json({ success, error: "Try Logging in with correct credentials" });
      }

      const pwdCompare = await bcrypt.compare(password, user.password); // this return true false.
      if (!pwdCompare) {
        return res
          .status(400)
          .json({ success, error: "Try Logging in with correct credentials" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      success = true;
      const authToken = jwt.sign(data, jwtSecret);
      const isAdmin = await user.isAdmin;
      // console.log(user.isAdmin);
      res.json({ success, authToken, isAdmin });
    } catch (error) {
      console.error(error.message);
      res.send("Server Error");
    }
    // } catch (error) {
    //   console.error(error.message);
    // await Users.create([
    //   {

    //   },
    // ]);
  }
  await db.disconnect();

  //   console.log(data);
  //   res.status(200).json(data);
}
