import { useState, useCallback } from 'react';
import { ApiCallTuple } from '@apptypes';

export const useApiPost = <In, Out>(url: string): [ApiCallTuple<Out>, (data: In) => void] => {
  const [result, setResult] = useState<ApiCallTuple<Out>>([null, '', null]);

  const postFunction = useCallback(
    async (data: In) => {
      setResult([null, 'running', null]);

      let responseBody;

      try {
        responseBody = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        responseBody = (await responseBody.json()) as Out;

        setResult([responseBody, 'complete', null]);
      } catch (exception) {
        setResult([null, 'error', exception?.toString()]);
      }
    },
    [url]
  );

  return [result, postFunction];
};
