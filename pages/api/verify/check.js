import { DB } from "../../../lib/db";

// Endpoint used by the front end to check if a presentation has been received
export default async function handler(req, res) {
  const { request_id } = req.body;

  if (!request_id) {
    return res.status(400).json({
      error: "invalid_request",
      error_description: "request_id is mandatory",
    });
  }

  const presentationReq = DB.get(request_id);
  if (!presentationReq) {
    return res.status(400).json({
      error: "invalid_request",
      error_description: `unknown request_id: ${request_id}`,
    });
  }

  if (presentationReq.status === "verified") {
    DB.delete(request_id);
  }
  const { status, response: presentation } = presentationReq;

  res.status(200).json({ status, presentation });
}
