const API_BASE_URL = import.meta.env.VITE_API_URL || '';

export async function checkBackendHealth(): Promise<{ status: string; service: string; message: string }> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/health`);
    if (!response.ok) {
      throw new Error(`Backend response error: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.warn('[WeatherGPT API] Backend connection error:', error);
    throw error;
  }
}
