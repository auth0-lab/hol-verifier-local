# Example: Local Presentation Request Verifier

This sample application shows how to perform Verifiable Presentation verification using local methods, as an alternative to using Auth0 as a verifier. 

To see this sample app, but using Auth0 as a verifier, check out this repo:
[auth0-lab/hol-verifier-auth0](https://github.com/auth0-lab/hol-verifier-auth0)

High level notes:

- `/api/verify/start` - called by this app's UI to start the verification process
- `/api/verify/check` - called by this app, every second, to check the status of a previously started process
- `/api/verify/request/:id` - called by the wallet to get the full details of the presentation request
- `/api/verify/response/:id`- called by the wallet, it posts the presentation here