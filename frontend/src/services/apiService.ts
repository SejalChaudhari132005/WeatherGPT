import { supabase } from "../lib/supabase";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8000";


async function getAccessToken(): Promise<string> {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.access_token) {
    throw new Error("User is not authenticated.");
  }

  return session.access_token;
}


export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = await getAccessToken();

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      ...(options.headers || {}),
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || "API request failed");
  }

  return response.json() as Promise<T>;
}