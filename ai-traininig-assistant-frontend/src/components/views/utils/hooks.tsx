/* eslint-disable import/prefer-default-export */
import { useState } from 'react';

interface FormState {
  [key: string]: unknown;
}

export const useForm = <T extends FormState>(
  callback: () => void,
  initialState: T
) => {
  const [values, setValues] = useState<T>(initialState);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    callback();
  };

  return {
    onChange,
    onSubmit,
    values,
  };
};
