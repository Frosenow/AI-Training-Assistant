/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from '@apollo/client';

import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {
  Alert,
  CircularProgress,
  Card,
  CardHeader,
  Stack,
} from '@mui/material';

import { CardContent } from 'semantic-ui-react';
import { AuthError } from '../../types/types';
import { LOGIN_USER_MUTATION } from '../views/Login/Mutations/loginMutations';
import { useForm } from '../views/utils/hooks';
import { AuthContext } from '../../context/auth';

export default function PostField() {
  const context = useContext(AuthContext);
  const navigate = useNavigate();
  const [errors, setErrors] = useState<AuthError>({});

  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    username: '',
    password: '',
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER_MUTATION, {
    update(_, { data: { login: userData } }) {
      setErrors({});
      context.login(userData);
      navigate('/', {
        replace: false,
      });
    },
    async onError(err) {
      if (err.graphQLErrors[0].extensions.errors) {
        setErrors(err.graphQLErrors[0].extensions.errors);
      }
    },
    variables: values,
  });

  // Declared function to call addUser to force hoisting
  function loginUserCallback() {
    loginUser();
  }

  return (
    <Card
      component="form"
      onSubmit={onSubmit}
      noValidate
      sx={{
        mt: '2rem',
        padding: '2rem',
        // maxWidth: 'xs',
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: 'red' }} aria-label="recipe">
            {context.user && context.user.username[0].toUpperCase()}
          </Avatar>
        }
        sx={{
          color: 'black',
        }}
        title={
          <TextField
            margin="none"
            required
            fullWidth
            id="post"
            label="What's on your mind?"
            name="post"
            autoFocus
            // eslint-disable-next-line no-unneeded-ternary
            error={errors.username ? true : false}
            onChange={onChange}
            inputProps={{ style: { color: '#000', height: 50 } }}
          />
        }
      />
      <CssBaseline />
      <CardContent
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          {loading ? (
            <CircularProgress
              size={24}
              sx={{
                color: '#fff',
              }}
            />
          ) : (
            'post'
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
