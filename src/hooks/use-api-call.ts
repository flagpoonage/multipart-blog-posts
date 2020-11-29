import { ApiCallTuple } from '@apptypes';
import { useState, useRef, useEffect } from 'react';

export const useApiCall = <T>(callFn: () => Promise<T>): ApiCallTuple<T> => {
  const [[data, status, error], setResult] = useState<ApiCallTuple<T>>([null, '', null]);

  const callRef = useRef(callFn);

  useEffect(() => {
    if (!status) {
      setResult([null, 'running', null]);
      callRef
        .current()
        .then((v) => setResult([v, 'complete', null]))
        .catch((e) => setResult([null, 'error', e]));
    }
  }, [status]);

  return [data, status, error] as ApiCallTuple<T>;
};
