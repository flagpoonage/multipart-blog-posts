import { ApiCallTuple } from '@apptypes';
import { useState, useEffect } from 'react';

export const useApiCall = <T>(callFn: () => Promise<T>): ApiCallTuple<T> => {
  const [[data, status, error], setResult] = useState<ApiCallTuple<T>>([undefined, '', undefined]);

  useEffect(() => {
    setResult([undefined, '', undefined]);
  }, [callFn]);

  useEffect(() => {
    if (!status) {
      setResult([undefined, 'running', undefined]);
      callFn()
        .then((v) => setResult([v, 'complete', undefined]))
        .catch((e) => setResult([undefined, 'error', e]));
    }
  }, [status, callFn]);

  return [data, status, error] as ApiCallTuple<T>;
};
