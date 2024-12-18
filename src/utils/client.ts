type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

export const BASE_URL = process.env.BASE_URL;

const request = <T>({
  url,
  tags,
  method = 'GET',
  data = null,
}: {
  url: string;
  method?: RequestMethod;
  data?: any;
  tags?: string[];
}): Promise<T> => {
  const options: RequestInit = {
    method,
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

  return fetch(BASE_URL + url, options).then((res) => {
    if (!res.ok) {
      return Promise.reject(res.json());
    }

    return res.json();
  });
};

export const client = {
  get: <T>({ url, tags }: { url: string; tags?: string[] }) =>
    request<T>({ url, tags }),

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

  delete: ({ url, data, tags }: { url: string; data: any; tags?: string[] }) =>
    request({ url, method: 'DELETE', data, tags }),
};
