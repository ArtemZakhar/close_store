type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const request = <T>({
  url,
  tags,
  method = 'GET',
  data = null,
  noCache,
}: {
  url: string;
  method?: RequestMethod;
  data?: any;
  tags?: string[];
  noCache?: boolean;
}): Promise<T> => {
  const options: RequestInit = {
    method,
    credentials: 'include',
  };

  if (data) {
    options.body = JSON.stringify(data);
    options.headers = {
      'Content-Type': 'application/json',
    };
  }

  if (tags) {
    options.next = {
      tags,
    };
  }

  if (noCache) {
    options.cache = 'no-store';
  }

  return fetch(BASE_URL + url, options).then(async (res) => {
    if (!res.ok) {
      return Promise.reject(await res.json());
    }

    return res.json();
  });
};

export const client = {
  get: <T>({
    url,
    tags,
    noCache,
  }: {
    url: string;
    tags?: string[];
    noCache?: boolean;
  }) => request<T>({ url, tags, noCache }),

  post: <T>({
    url,
    data,
    tags,
  }: {
    url: string;
    data?: any;
    tags?: string[];
  }) => request<T>({ url, method: 'POST', data, tags }),

  patch: <T>({
    url,
    data,
    tags,
  }: {
    url: string;
    data: any;
    tags?: string[];
  }) => request<T>({ url, method: 'PATCH', data, tags }),

  delete: ({ url, data, tags }: { url: string; data?: any; tags?: string[] }) =>
    request({ url, method: 'DELETE', data, tags }),
};
