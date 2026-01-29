export type GoogleMapsConfig = {
  GOOGLE_MAPS_API_KEY: string;
  GOOGLE_MAPS_LANGUAGE?: string;
  GOOGLE_MAPS_REGION?: string;
};

export function loadGoogleMapsConfig(env: NodeJS.ProcessEnv): GoogleMapsConfig {
  const apiKey = env.GOOGLE_MAPS_API_KEY?.trim();

  if (!apiKey) {
    throw new Error("GOOGLE_MAPS_API_KEY is required");
  }

  return {
    GOOGLE_MAPS_API_KEY: apiKey,
    GOOGLE_MAPS_LANGUAGE: env.GOOGLE_MAPS_LANGUAGE?.trim() || undefined,
    GOOGLE_MAPS_REGION: env.GOOGLE_MAPS_REGION?.trim() || undefined,
  };
}
