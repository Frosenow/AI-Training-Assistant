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
import { REGISTER_USER_MUTATION } from './Mutations/registerMutations';
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

export default function SignUp() {
  const context = useContext(AuthContext);
  const navigate = useNavigate();
  const [errors, setErrors] = useState<AuthError>({});

  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  const { onChange, onSubmit, values } = useForm(registerUserCallback, {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [addUser, { loading }] = useMutation(REGISTER_USER_MUTATION, {
    update(_, { data: { register: userData } }) {
      setErrors({});
      // Using login, because registering is like login users
      context.login(userData);
      navigate('/', {
        replace: true,
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
  function registerUserCallback() {
    addUser();
  }

  return (
    <Container component="main" maxWidth="xs">
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
            type="text"
            // eslint-disable-next-line no-unneeded-ternary
            error={errors.username ? true : false}
            onChange={onChange}
            inputProps={{ style: { color: '#000' } }}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            type="email"
            // eslint-disable-next-line no-unneeded-ternary
            error={errors.email ? true : false}
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
            error={errors.password ? true : false}
            onChange={onChange}
            inputProps={{ style: { color: '#000' } }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            // eslint-disable-next-line no-unneeded-ternary
            error={errors.confirmPassword ? true : false}
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
              'Register'
            )}
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/login#/login" variant="body2">
                Already have an account? Sign In!
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
