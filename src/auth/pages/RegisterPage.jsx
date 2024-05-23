import { useMemo, useState } from 'react'
import {Link as RouterLink} from 'react-router-dom'
import { Google } from "@mui/icons-material"
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hooks/useForm'
import { useDispatch, useSelector } from 'react-redux'
import { startCreatingUserWithEmail } from '../../store/auth/thunks'


const formData = {
  email: '',
  password: '',
  displayName: ''
}

const formValidations = {
  email: [(value)=>value.includes('@'), 'El correo debe tener un arroba'],
  password: [(value)=>value.length >= 6, 'El password requiere mínimo 6 carácteres'],
  displayName: [(value)=>value.length >= 1, 'El nombre es requerido']

}

export const RegisterPage = () => {

  const dispatch = useDispatch();

  const [formSubmitted, setFormSubmitted] = useState(false);

  const { status, errorMessage } = useSelector(state => state.auth);
  const isCheckingAuthentication = useMemo(()=> status === 'checking', [status]);

  const {displayName, email, password, onInputChange, 
    onResetForm, formState, isFormValid, displayNameValid, 
    emailValid, passwordValid} = useForm(formData, formValidations);

  const onSubmit = (event)=>{
    event.preventDefault();
    setFormSubmitted(true);

    if ( !isFormValid ) return;

    dispatch(startCreatingUserWithEmail(formState));
  }

  return (
    <AuthLayout title='Register'>
      <h1>FormValid { isFormValid ? 'true' : 'false' }</h1>
    <form onSubmit={onSubmit}>
        <Grid container>

          <Grid item xs={12} sx={{mt:2}}>
            <TextField 
            label='Nombre completo' 
            type='text' 
            placeholder="Nombre completo"
            fullWidth
            name='displayName'
            value={displayName}
            onChange={onInputChange}
            error={ !!displayNameValid && formSubmitted }
            helperText={ formSubmitted && displayNameValid }
            />
          </Grid>

          <Grid item xs={12} sx={{mt:2}}>
              <TextField 
              label='correo' 
              type='email' 
              placeholder="a@gmail.com"
              fullWidth
              name='email'
            value={email}
            onChange={onInputChange}
            error={ !!emailValid && formSubmitted }
            helperText={ formSubmitted && emailValid}
              />
            </Grid>

          <Grid item xs={12} sx={{mt:2}}>
            <TextField 
            label='Contraseña' 
            type='password' 
            placeholder="conntaseña"
            fullWidth
            name='password'
            value={password}
            onChange={onInputChange}
            error={ !!passwordValid && formSubmitted }
            helperText={ formSubmitted && passwordValid }
            />
          </Grid>

          <Grid container spacing={2} sx={{mb: 2, mt:2 }}>
            <Grid 
            display={ !!errorMessage ? '' : 'none' }
            item xs={12}>
              <Alert severity='error'>
                { errorMessage }
              </Alert>
            </Grid>

            <Grid item xs={12}>
              <Button 
              type='submit'
              variant="contained" fullWidth 
              disabled={isCheckingAuthentication}
              >
                Crear cuenta
              </Button>
            </Grid>

            
          </Grid>

          <Grid container
          direction='row'
          justifyContent='end'
          >
            <Typography>¿Ya tienes cuenta? </Typography>
            <Link component={RouterLink} color='inherit' to="/auth/login">
            Ingresar
            </Link>
            
          </Grid>

        </Grid>
      </form>
  </AuthLayout>
  )
}
