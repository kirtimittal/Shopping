import React, { useCallback, useState } from "react";
import { LoginSocialGoogle } from "reactjs-social-login";

// CUSTOMIZE ANY UI BUTTON
import { GoogleLoginButton } from "react-social-login-buttons";

// REDIRECT URL must be same with URL where the (reactjs-social-login) components is locate
// MAKE SURE the (reactjs-social-login) components aren't unmounted or destroyed before the ask permission dialog closes
const REDIRECT_URI = window.location.href;

const Example = () => {
  const [provider, setProvider] = useState("");
  const [profile, setProfile] = useState(null);

  const onLoginStart = useCallback(() => {
    alert("login start");
  }, []);

  const onLogoutSuccess = useCallback(() => {
    setProfile(null);
    setProvider("");
    alert("logout success");
  }, []);

  return (
    <>
      {provider && profile ? (
        <div>{console.log(provider)}</div>
      ) : (
        // <User
        //   provider={provider}
        //   profile={profile}
        //   onLogout={onLogoutSuccess}
        // />
        <div className={`App ${provider && profile ? "hide" : ""}`}>
          <h1 className="title">ReactJS Social Login</h1>

          <LoginSocialGoogle
            isOnlyGetToken
            client_id="229313699502-aagqig7sm0efn74vle83nub6r7oeo3it.apps.googleusercontent.com"
            onLoginStart={onLoginStart}
            onResolve={({ provider, data }) => {
              setProvider(provider);
              setProfile(data);
            }}
            onReject={(err) => {
              console.log(err);
            }}
          >
            <GoogleLoginButton />
          </LoginSocialGoogle>
        </div>
      )}
    </>
  );
};

export default Example;
