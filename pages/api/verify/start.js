import { randomUUID } from "crypto";
import absoluteUrl from "next-absolute-url";
import { DID, KID, PRESENTATION_DEFINITION, PRIVATE_KEY } from "../../../lib/constants";
import { DB } from "../../../lib/db";
import { getRP } from "../../../lib/rp";

const WALLET_URL = process.env.WALLET_URL;
if (!WALLET_URL) throw new Error("WALLET_URL not set");

// Endpoint used by the front end to start a presentation flow
export default async function handler(req, res) {
  try {
    const result = await start(req);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

async function start(req) {
  // Generate a presentation request
  const nonce = randomUUID();
  const rpKeys = {
    hexPrivateKey: PRIVATE_KEY,
    did: DID,
    kid: KID,
  };
  const presentationDefinition = {
    location: "vp_token",
    definition: PRESENTATION_DEFINITION,
  };

  const presentationReq = {
    nonce,
    rpKeys,
    presentationDefinition,
    status: "pending",
  };
  const urlBase = absoluteUrl(req).origin;
  const rp = getRP(presentationReq, urlBase);
  const authReq = await rp.createAuthenticationRequest({ nonce });
  const now = new Date();

  // Store the presentation request in the "database" (in memory store for this demo)
  DB.set(nonce, { ...presentationReq, jwt: authReq.jwt, expiresAt: new Date(now.getTime() + 600000) });

  const reqParams = new URLSearchParams(authReq.encodedUri);
  
  // this is the URL that would be QR Code encoded for a wallet to scan and start the credential
  // presentation flow
  const url = `${WALLET_URL}/siop?scope=${reqParams.get("scope")}&request_uri=${encodeURIComponent(
    reqParams.get("request_uri")
  )}&registration=${encodeURIComponent(reqParams.get("registration"))}`;

  return { url, request_id: nonce };
}
