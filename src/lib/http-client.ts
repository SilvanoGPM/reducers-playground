import axios from "axios";

export interface HttpClientOptions {
  method?: string;
  body?: unknown;
  headers?: Record<string, string>;
}

export async function httpClient<R = any>(
  url: string,
  {
    implemantation,
    ...options
  }: HttpClientOptions & { implemantation?: "fetch" | "axios" } = {}
) {
  const handler =
    implemantation === "fetch" ? fetchImplementation : axiosImplementation;

  return handler<R>(url, options);
}

async function axiosImplementation<R>(
  url: string,
  options: HttpClientOptions = {}
) {
  const response = await axios.request({
    url,
    method: options.method || "GET",
    data: options.body ? JSON.stringify(options.body) : undefined,
    headers: options.headers || {},
  });

  const data = response.data as R;

  return { data };
}

async function fetchImplementation<R>(
  url: string,
  options: HttpClientOptions = {}
) {
  const response = await fetch(url, {
    method: options.method || "GET",
    body: options.body ? JSON.stringify(options.body) : undefined,
    headers: options.headers || {},
  });

  const data = (await response.json()) as R;

  return { data };
}
