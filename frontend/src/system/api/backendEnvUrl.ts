const host = window.location.host;
const developmentHost = "localhost:5173";

export const backendEnvUrl = host === developmentHost
    ? "http://localhost:8080"
    : window.location.origin;