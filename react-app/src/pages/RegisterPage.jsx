import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { registerUser, userSelector } from '../modules/user';

function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      name: '',
      id: '',
      passwd: '',
    },
  });

  const { isSuccess, isError, errorMessage } = useSelector(userSelector);

  const onSubmit = data => {
    dispatch(registerUser(data));
  };

  useEffect(() => {
    if (isSuccess) {
      navigate('/');
    }
    if (isError) {
      if (errorMessage) console.error(errorMessage);
      reset({
        name: '',
        id: '',
        passwd: '',
      });
    }
  }, [isSuccess, isError]);

  return (
    <Container component="main" maxWidth="xs">
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
        <Typography component="h1" variant="h5">
          회원가입
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    required
                    fullWidth
                    id="name"
                    label="이름"
                    name="name"
                    autoFocus
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="id"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    required
                    fullWidth
                    id="id"
                    label="아이디"
                    name="email"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="passwd"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    required
                    fullWidth
                    id="passwd"
                    label="비밀번호"
                  />
                )}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            회원가입
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
export default RegisterPage;
