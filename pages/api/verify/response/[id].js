import Cors from "cors";
import absoluteUrl from "next-absolute-url";
import { DB } from "../../../../lib/db";

import { initMiddleware } from "../../../../lib/init_middleware";
import { getCallbackUrl, getRP } from "../../../../lib/rp";

const cors = initMiddleware(
  Cors({
    methods: ["GET", "POST", "OPTIONS"],
    origin: true,
  })
);

// This is the endpoint where the Wallet will submit
// the Verifiable Presentation
export default async function handler(req, res) {
  await cors(req, res);

  try {
    const { id } = req.query;
    // get from 'database'
    console.log("looking for ", id);
    const presentationReq = DB.get(id);

    if (!presentationReq) {
      return res.status(404).json({ error_description: "invalid nonce" });
    }

    const baseUrl = absoluteUrl(req).origin;
    const rp = getRP(presentationReq, baseUrl);

    // Verify the presentation received
    const verifiedAuthResponseWithJWT = await rp.verifyAuthenticationResponseJwt(req.body.id_token, {
      nonce: id,
      audience: getCallbackUrl(baseUrl, id),
    });

    // update status in 'database'
    DB.set(id, { ...DB.get(id), status: "verified", response: verifiedAuthResponseWithJWT });
  } catch (err) {
    return res.status(401).json({ error_description: `presentation verification error - ${err.message}` });
  }

  res.status(200).end();
}
