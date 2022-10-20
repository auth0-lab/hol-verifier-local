import { RP, SIOP } from "@sphereon/did-auth-siop";
import { Resolver } from "did-resolver";
import { getResolver as ethrDidResolver } from "ethr-did-resolver";
import { getResolver as keyDidResolver } from "key-did-resolver";
import { getResolver as webDidResolver } from "web-did-resolver";

const INFURA_PROJECT_ID = process.env.INFURA_PROJECT_ID;
if (!INFURA_PROJECT_ID) throw new Error("INFURA_PROJECT_ID not set");

export function getRP({ nonce, rpKeys, presentationDefinition }, baseUrl) {
  const redirectUrl = getCallbackUrl(baseUrl, nonce);

  const customResolver = new Resolver({
    ...webDidResolver(),
    ...keyDidResolver(),
    ...ethrDidResolver({ infuraProjectId: INFURA_PROJECT_ID }),
  });
  
  return RP.builder()
    .redirect(redirectUrl)
    .requestBy(SIOP.PassBy.REFERENCE, `${baseUrl}/api/verify/request/${nonce}`)
    .internalSignature(rpKeys.hexPrivateKey, rpKeys.did, rpKeys.kid)
    .defaultResolver(customResolver)
    .registrationBy(SIOP.PassBy.VALUE)
    .addPresentationDefinitionClaim(presentationDefinition)
    .build();
}

export function getCallbackUrl(baseUrl, nonce) {
  return `${baseUrl}/api/verify/response/${nonce}`;
}
