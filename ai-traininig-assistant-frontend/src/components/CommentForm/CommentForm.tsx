/* eslint-disable react/function-component-definition */
/* eslint-disable import/prefer-default-export */
import { useState, useContext } from 'react';
import { useMutation } from '@apollo/client';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Avatar,
} from '@mui/material';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';

import { CREATE_COMMENT_MUTATION } from './Mutations/createCommentMutation';
import { AuthContext } from '../../context/auth';
import stringToColor from '../views/utils/stringToColor';

export const CommentForm = ({ postId }) => {
  const [value, setValue] = useState('');
  const { user } = useContext(AuthContext);
  const [createComment] = useMutation(CREATE_COMMENT_MUTATION, {
    variables: {
      postId,
      body: value,
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    createComment();
    setValue('');
  };

  return (
    <Card>
      <CardContent>
        <Box component="form" noValidate onSubmit={handleSubmit}>
          <Input
            fullWidth
            size="medium"
            margin="dense"
            id="comment"
            name="comment"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            // TODO: Change it later
            sx={{
              color: 'secondary.contrastText',
              width: '100%',
            }}
            startAdornment={
              <InputAdornment position="start">
                <Avatar
                  sx={{
                    bgcolor: user
                      ? stringToColor(user.username)
                      : 'secondary.light',
                    width: 24,
                    height: 24,
                    margin: '5',
                  }}
                  aria-label="recipe"
                >
                  {user && user.username[0].toUpperCase()}
                </Avatar>
              </InputAdornment>
            }
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={value.trim() === ''}
            sx={{ mt: 3, mb: 2 }}
          >
            SUBMIT
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};
