export const PRIVATE_KEY = "da763a446ad512c51b9f7fd9b6006f986e0237868d2e448593e45b167b92c3a8";
export const DID = "did:ethr:goerli:0x03475242899766d1ec80089dcd91ac12813237ec2bb1b30d21b1c589c0c0a70cc4";
export const KID = "did:ethr:goerli:0x03475242899766d1ec80089dcd91ac12813237ec2bb1b30d21b1c589c0c0a70cc4#controller";

export const PRESENTATION_DEFINITION = {
  id: "vaccine-card-pd",
  input_descriptors: [
    {
      id: "vaccine-card-pd",
      name: "vaccine-card-pd",
      purpose: "Request for a VaccineCard",
      constraints: {
        fields: [
          {
            path: ["$.type[(@.length-1)]"],
            filter: {
              type: "string",
              pattern: "VaccineCard",
            },
          },
        ],
      },
    },
  ],
};
