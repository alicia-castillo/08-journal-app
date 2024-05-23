import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {Link as RouterLink} from 'react-router-dom'
import { Google } from "@mui/icons-material"
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hooks/useForm'
import { startGoogleSignIn, startLoginWithEmail } from '../../store/auth/thunks'




export const LoginPage = () => {

  const { status, errorMessage } = useSelector(state => state.auth);

  const isAuthenticating = useMemo(()=> status === 'checking', [status]);

  const dispatch = useDispatch();

  const {email, password, onInputChange, onResetForm} = useForm({
    email: '',
    password: ''
  });

  const onSubmit = ( event )=>{
    event.preventDefault();
    //dispatch( checkingAuthentication() );
    dispatch(startLoginWithEmail({ email, password }));
    console.log(errorMessage);
  }

  const onGoogleSignIn = ()=>{
    dispatch( startGoogleSignIn() );
    console.log('on google sign in');
  }

  return (
    <AuthLayout title='Login'>
      <form onSubmit={ onSubmit }>
          <Grid container>
            <Grid item xs={12} sx={{mt:2}}>
              <TextField 
              label='correo' 
              type='email' 
              placeholder="a@gmail.com"
              fullWidth
              name='email'
              value={ email }
              onChange={ onInputChange }
              />
            </Grid>

            <Grid item xs={12} sx={{mt:2}}>
              <TextField 
              label='Contraseña' 
              type='password' 
              placeholder="conntaseña"
              fullWidth
              name='password'
              value={ password }
              onChange={ onInputChange }
              />
            </Grid>

            <Grid 
            sx={{mt: 1}}
            display={ !!errorMessage ? '' : 'none' }
            item xs={12}>
              <Alert severity='error'>
                { errorMessage }
              </Alert>
            </Grid>

            <Grid container spacing={2} sx={{mb: 2}}>
              <Grid item xs={12} sm={6}>
                <Button 
                disabled={ isAuthenticating }
                type='submit' variant="contained" fullWidth sx={{mt:2}}>
                  Login
                </Button>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Button 
                disabled={ isAuthenticating }
                variant="contained" 
                fullWidth sx={{mt:2}}
                onClick={ onGoogleSignIn }
                >
                  <Google /> 
                  <Typography sx={{ml:1}}>Google</Typography> 
                </Button>
              </Grid>
            </Grid>

            <Grid container
            direction='row'
            justifyContent='end'
            >
              <Link component={RouterLink} color='inherit' to="/auth/register">
              Crear una cuenta
              </Link>
              
            </Grid>

          </Grid>
        </form>
    </AuthLayout>
  )
}
