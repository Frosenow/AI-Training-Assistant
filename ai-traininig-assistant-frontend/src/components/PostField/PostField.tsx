/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from '@apollo/client';

import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { CircularProgress, Card, CardHeader, Alert } from '@mui/material';

import { AllPostsResult } from '../../types/types';
import { CREATE_POST_MUTATION } from './Mutations/createPostMutation';
import { FETCH_POSTS_QUERY } from '../views/Home/Queries/homeQueries';
import { useForm } from '../views/utils/hooks';
import { AuthContext } from '../../context/auth';

export default function PostField() {
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  const { onChange, onSubmit, values } = useForm(createPostCallback, {
    body: '',
  });

  const [createPost, { error, loading }] = useMutation(CREATE_POST_MUTATION, {
    update(cache, { data }) {
      const { getPosts } = cache.readQuery<AllPostsResult>({
        query: FETCH_POSTS_QUERY,
      }) || { getPosts: [] };

      cache.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: {
          getPosts: [data.createPost, ...getPosts],
        },
      });
      values.body = '';
    },
    variables: values,
  });

  // Declared function to call addUser to force hoisting
  function createPostCallback() {
    createPost();
  }

  return (
    <>
      {error && (
        <Alert severity="error" sx={{ mt: '2rem', mb: '3rem' }}>
          {error.graphQLErrors[0].message}
        </Alert>
      )}
      <Card
        component="form"
        onSubmit={onSubmit}
        noValidate
        sx={{
          mt: '2rem',
          mb: '3rem',
          padding: '2rem',
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
              id="body"
              label="What's on your mind?"
              name="body"
              value={values.body}
              autoFocus
              // eslint-disable-next-line no-unneeded-ternary
              error={error ? true : false}
              onChange={onChange}
              inputProps={{ style: { color: '#000', height: 50 } }}
            />
          }
        />
        <CssBaseline />
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
      </Card>
    </>
  );
}
