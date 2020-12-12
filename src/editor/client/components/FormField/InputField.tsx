import { classnames } from '@utils/classnames';
import React, { ReactElement } from 'react';
import { FormField } from './FormField';

export function TextInputField({
  title,
  name,
  className,
  children,
  ...rest
}: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>): ReactElement {
  return (
    <FormField title={title} name={name}>
      {children}
      <input className={classnames('pd-xy4', className)} type="text" value={title} {...rest} />
    </FormField>
  );
}
