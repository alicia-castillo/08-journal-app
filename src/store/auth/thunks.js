import { registerWithEmail, signInWithGoogle, loginWithEmail } from "../../firebase/providers";
import { checkingCredentials, logout, login } from "./authSlice";

export const checkingAuthentication = (email, password ) =>{
    return async ( dispatch )=>{
        dispatch( checkingCredentials() );
    }
}

export const startGoogleSignIn = () => {
    return async ( dispatch ) =>{
        dispatch( checkingCredentials() );

        const result = await signInWithGoogle();
        if( !result.ok ) return dispatch( logout(result.errorMessage) );

        dispatch(login(result))
    }
}

export const startCreatingUserWithEmail = ({ email, password, displayName })=>{
    return async (dispatch)=>{
        dispatch(checkingCredentials());

        const {ok, uid, photoURL, errorMessage} = await registerWithEmail({email, password, displayName});
        

        if (!ok) return dispatch( logout({errorMessage}) );

        dispatch(login({ uid, displayName, email, photoURL }));
    }
}

export const startLoginWithEmail = ({ email, password })=>{
    return async (dispatch)=>{
        dispatch(checkingAuthentication(email, password));

        const resp = await loginWithEmail({email, password});
        console.log("startLoginwithEmail");
        console.log(resp);
        if (!resp.ok) return dispatch(logout(resp));
        dispatch(login(resp));
    }
}