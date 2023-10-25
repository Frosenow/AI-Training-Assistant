/* eslint-disable import/prefer-default-export */
import { Button } from 'semantic-ui-react';

// eslint-disable-next-line react/function-component-definition
export const CommonButton = ({
  children,
  color,
  disabled,
  size,
  sx,
  variant,
}) => {
  return (
    <Button
      color={color}
      disabled={disabled}
      size={size}
      sx={sx}
      variant={variant}
    >
      {children}
    </Button>
  );
};
