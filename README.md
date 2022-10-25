![banner](https://cdn.auth0.com/website/octo/sdkvr/readme-banner.png)

# Auth0 Lab Hands on Lab: Auth0 as verifier

![ba# Example: Local Presentation Request Verifier

This sample application shows how to perform Verifiable Presentation verification using local methods, as an alternative to using Auth0 as a verifier. 

To see this sample app, but using Auth0 as a verifier, check out this repo:
[auth0-lab/hol-verifier-auth0](https://github.com/auth0-lab/hol-verifier-auth0)

> :warning: This is a PROOF OF CONCEPT experimental library meant to support the learning of verifiable credentials and has not had a complete security review. As we learn and iterate, please be aware that releases may contain breaking changes.

High level notes:

- `/api/verify/start` - called by this app's UI to start the verification process
- `/api/verify/check` - called by this app, every second, to check the status of a previously started process
- `/api/verify/request/:id` - called by the wallet to get the full details of the presentation request
- `/api/verify/response/:id`- called by the wallet, it posts the presentation here

## What is Auth0?

Auth0 helps you to:

* Add authentication with [multiple authentication sources](https://auth0.com/docs/identityproviders), either social like **Google, Facebook, Microsoft Account, LinkedIn, GitHub, Twitter, Box, Salesforce, among others**, or enterprise identity systems like **Windows Azure AD, Google Apps, Active Directory, ADFS or any SAML Identity Provider**.
* Add authentication through more traditional [username/password databases](https://auth0.com/docs/connections/database/custom-db).
* Add support for [linking different user accounts](https://auth0.com/docs/link-accounts) with the same user.
* Support for generating signed [JSON Web Tokens](https://auth0.com/docs/jwt) to call your APIs and **flow the user identity** securely.
* Analytics of how, when, and where users are logging in.
* Pull data from other sources and add it to the user profile, through [JavaScript rules](https://auth0.com/docs/rules/current).

</br>

## Issue Reporting

If you have found a bug or if you have a feature request, please report them at this repository issues section. Please do not report security vulnerabilities on the public GitHub issue tracker. The [Responsible Disclosure Program](https://auth0.com/whitehat) details the procedure for disclosing security issues. This is an Auth0 Lab Experiment, it may not get updated.

</br>

## Author

[Auth0Lab](https://github.com/auth0-lab) - The experimentation arm of [Auth0](https://auth0.com/).

</br>
