import { useState, useCallback } from 'react';
import { ApiCallError, ApiCallSuccess, ApiCallTuple } from '@apptypes';

export const useApiPost = <In, Out>(url: string): [ApiCallTuple<Out>, (data: In) => Promise<ApiCallTuple<Out>>] => {
  const [result, setResult] = useState<ApiCallTuple<Out>>([null, '', null]);

  const postFunction = useCallback(
    async (data: In) => {
      setResult([null, 'running', null]);

      let result;

      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        const body = (await response.json()) as Out;

        result = [body, 'complete', null] as ApiCallSuccess<Out>;

        setResult(result);
      } catch (exception) {
        result = [null, 'error', exception?.toString()] as ApiCallError;
        setResult(result);
      }

      return result;
    },
    [url]
  );

  return [result, postFunction];
};
