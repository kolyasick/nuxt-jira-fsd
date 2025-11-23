export const APP_URL = process.env.APP_URL || "http://localhost:3000";
export const API_URL = APP_URL + (process.env.API_URL || "/api");

export const ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_SECRET!;
export const REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_SECRET!;

export const REFRESH_TOKEN_NAME = "jira-refresh-token";
export const ACCESS_TOKEN_NAME = "jira-access-token";
