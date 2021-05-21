import fetch from 'isomorphic-fetch';

interface Listener<T> {
  onSuccess: (res: T) => void;
  onError: (
    statusCode: string,
    response: Record<string, unknown> | null
  ) => void;
}

function handleErrors<T extends Record<string, any>>(response: T) {
  if (!response.ok) {
    throw response;
  }
  return response;
}

export interface FetcherBaseParams {
  token: string;
  'agent id': string | number;
}

export function fetcher<T, P extends FetcherBaseParams = FetcherBaseParams>(
  endpoint: string,
  jsonData: P,
  { onSuccess, onError }: Listener<T>
) {
  return fetch(endpoint, {
    method: 'POST',
    body: JSON.stringify(jsonData),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(handleErrors)
    .then<T>(res => res.json())
    .then(res => onSuccess(res))
    .catch(async res => {
      let data = null;
      try {
        data = await res.json();
      } catch {
        // pass
      }
      onError('' + res.status, data);
      return res;
    });
}
