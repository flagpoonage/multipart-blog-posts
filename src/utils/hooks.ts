import { useEffect, useRef, useState } from 'react';

type ApiCallStatus = 'running' | 'complete' | 'error' | '';
type ApiCallSuccess<T> = [T, 'complete', null];
type ApiCallError = [null, 'error', string];
type ApiCallEmpty = [null, '', null];
type ApiCallRunning = [null, 'running', null];

type ApiCallTuple<T> = ApiCallSuccess<T> | ApiCallError | ApiCallEmpty | ApiCallRunning;

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
