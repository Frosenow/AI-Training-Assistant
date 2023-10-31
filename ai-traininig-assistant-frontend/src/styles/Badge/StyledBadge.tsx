/* eslint-disable import/prefer-default-export */
import Badge, { BadgeProps } from '@mui/material/Badge';
import { styled } from '@mui/material/styles';

export const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -12,
    top: -5,
    border: `2px solid ${theme.palette.background.paper}`,
  },
}));
