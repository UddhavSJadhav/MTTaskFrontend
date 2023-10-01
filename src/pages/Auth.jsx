import { GoogleLogin } from "@react-oauth/google";
import { useEffect } from "react";
import FacebookLogin from "react-facebook-login";
import { useNavigate } from "react-router-dom";

import useStore from "../store.js";

const Auth = () => {
  const navigate = useNavigate();
  const setAuth = useStore((state) => state.setAuth);
  const auth = useStore((state) => state.auth);

  useEffect(() => {
    if (auth) navigate("/");
  }, [auth]);

  return (
    <div className='min-h-[calc(100vh-128px)] flex items-center justify-center'>
      <div className='bg-slate-100 rounded p-4 w-[clamp(100px,30%,350px)] text-center'>
        <div className='font-bold text-2xl'>Sign Up</div>
        <div className='mt-3 flex justify-center'>
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              setAuth(credentialResponse?.credential);
            }}
            onError={() => {
              console.log("Login Failed");
            }}
            size='large'
            text='Login with Google'
          />
        </div>
        <div className='mt-3'>
          <FacebookLogin
            appId='1484827869030452'
            autoLoad={false}
            fields='name,email,picture'
            scope='public_profile,email'
            callback={(res) => setAuth(res?.accessToken)}
            icon='fa-facebook'
            buttonStyle={{ padding: "6px 8px", borderRadius: "4px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Auth;
