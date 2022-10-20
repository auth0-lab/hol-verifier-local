import { useEffect } from "react";

// This is a very dirty hack. When we run Next.js in dev mode (next dev)
// it only compiles API routes on first use. This triggers a restart.
// Because we're using an in-memory "database" to keep track of presentationDefinions
// the restart wipes our database.
//
// This hack effectively 'pre-fetches' the api routes to get the dev server to compile them
export const usePrecompileHack = () => {
  useEffect(() => {
    const run = async () => {
      const urls = [
        "/api/verify/start",
        "/api/verify/request/123",
        "/api/verify/response/abc",
        "/api/verify/check",
      ];
      await Promise.allSettled(urls.map((u) => fetch(u)));
    };

    run();
  }, []);
};
