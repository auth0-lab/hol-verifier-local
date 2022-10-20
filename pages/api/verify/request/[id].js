import Cors from "cors";
import { DB } from "../../../../lib/db";
import { initMiddleware } from "../../../../lib/init_middleware";

const cors = initMiddleware(
  Cors({
    methods: ["GET"],
    origin: true,
  })
);

// This endpoint will be requested by the wallet after
// scanning the QR Code (or following the URL), to retrieve the
// presentation request JWT. The QR code link only contains a pointer
// to this, not the the full JWT
export default async function handler(req, res) {
  await cors(req, res);

  try {
    const { id } = req.query;
    if (!id) throw new Error("id not provided");

    // Get from "database"
    const presentationReq = DB.get(id);

    if (!presentationReq) {
      console.log("not found ", id);
      return res.status(404).end();
    }

    res.setHeader("Content-Type", "application/jwt");
    res.status(200).send(presentationReq.jwt);
  } catch (err) {
    return res.status(500).send(`get request jwt error - ${err.message}`);
  }
}
