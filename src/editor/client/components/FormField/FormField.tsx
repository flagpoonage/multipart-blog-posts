import React, { ReactElement } from 'react';

export interface FormFieldProps {
  title: string | undefined;
  name: string | undefined;
}

export function FormField({ children, title, name }: React.PropsWithChildren<FormFieldProps>): ReactElement {
  return (
    <div className="mg-y">
      <label className="block-i mg-b4" htmlFor={name}>
        {title}
      </label>
      <div>{children}</div>
    </div>
  );
}
