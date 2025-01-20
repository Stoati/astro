function checkAndGetStoatiId() {
  if (globalThis.window) {
    const searchParams = new URLSearchParams(window.location.search);

    const liveId = searchParams.get("liveId");

    if (liveId) {
      sessionStorage.setItem("liveId", liveId);
      return liveId;
    }

    const sessionId = sessionStorage.getItem("liveId");

    if (sessionId) {
      return sessionId;
    }
  }

  return import.meta.env.STORYBOOK === "true"
    ? import.meta.env.VITE_PUBLIC_STOATI_ID
    : import.meta.env.PUBLIC_STOATI_ID;
}

export default checkAndGetStoatiId;
