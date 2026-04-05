import { serve } from "bun";
import index from "./index.html";

const server = serve({
  port: 3031,
  routes: {
    "/*": index,

    "/api/hello": {
      async GET(req) {
        return Response.json({
          message: "Hello, world!",
          method: "GET",
        });
      },
      async PUT(req) {
        return Response.json({
          message: "Hello, world!",
          method: "PUT",
        });
      },
    },

    "/health": {
      async GET(req) {
        return new Response("ok", {
          status: 200,
          headers: { "Content-Type": "text/plain" },
        });
      },
    },

  },

  development: process.env.NODE_ENV !== "production" && {
    // Enable browser hot reloading in development
    hmr: true,

    // Echo console logs from the browser to the server
    console: true,
  },
});

console.log(`🚀 Server running at ${server.url}`);
