export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname.startsWith("/api/")) {
      return new Response("API OK", { status: 200 });
    }

    return env.ASSETS.fetch(request);
  },
};
