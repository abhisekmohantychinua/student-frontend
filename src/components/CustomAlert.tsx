import React from 'react';
import { Alert } from 'react-bootstrap';

interface Props {
  variant: string;
  message: string;
  show: boolean;
}

const CustomAlert = ({ variant, message, show }: Props) => {
  return !show ? (
    <></>
  ) : (
    <>
      <Alert className="mt-2 text-center" variant={variant}>
        {message}
      </Alert>
    </>
  );
};

export default CustomAlert;
