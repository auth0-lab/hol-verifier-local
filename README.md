# Example: Local Presentation Request Verifier

This demo app shows how to verify a Presentation using two flows:

- locally within the app itself (`/api/local-verification`)
- using Auth0 as a verifier (`/api/auth0-verification`)

## Setup

This app is preconfigurd to work against an existing Auth0 tenant, `verifier-demo.auth0lab.com`.
To make it work with your own Tenant, high level, you will need:

- to clone this repo and install deps (yarn)
- an Auth0Labs tenant instance
- an application
- a `VaccineCard` presenation definition
- a Presentation template (like the `PRESENTATION_DEFINITION` defined [here](lib/constants.js) defined in Auth0
- an Infura API key (free at https://infura.io/)

## Run

- copy the `.env.local.example` file to `.env.local` and fill out all the values
- start the project with `yarn dev`

There is one UI page with a radio select that lets you switch between the two flows. This selector only changes the URL of which API route to call on the backend.

