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
import { Alert, CircularProgress } from '@mui/material';

import { AuthError } from '../../../types/types';
import { LOGIN_USER_MUTATION } from './Mutations/loginMutations';
import { useForm } from '../utils/hooks';
import { AuthContext } from '../../../context/auth';

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...(props as any)}
    >
      {'Copyright © '}
      <Link color="inherit" href="/home">
        LiftLogic.AI
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function SignIn() {
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
    <Container component="main" maxWidth="xs" sx={{ marginTop: '1rem' }}>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" color="text.secondary">
          Sign in
        </Typography>

        <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoFocus
            // eslint-disable-next-line no-unneeded-ternary
            error={errors.username ? true : false}
            onChange={onChange}
            inputProps={{ style: { color: '#000' } }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            // eslint-disable-next-line no-unneeded-ternary
            error={errors.username ? true : false}
            onChange={onChange}
            inputProps={{ style: { color: '#000' } }}
          />
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
              'Login'
            )}
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/register#/register" variant="body2">
                Don&apos;t have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
          {Object.keys(errors).length > 0 && (
            <Box sx={{ mt: 1 }}>
              {Object.values(errors).map((value) => (
                <Alert severity="error" key={value} sx={{ margin: '.5rem' }}>
                  {value}
                </Alert>
              ))}
            </Box>
          )}
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
