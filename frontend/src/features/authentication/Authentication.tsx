import { useAuth0  } from "@auth0/auth0-react";
import axios from "axios";

export function Authentication() {
    const { loginWithPopup, logout, user, isAuthenticated, getAccessTokenSilently } = useAuth0();

    console.log(user);

    const temp = async () => {
        // try {
        //     const accessToken = await getAccessTokenWithPopup({
        //     audience: identifier,
        //     scope: "openid profile email"
        //   });
         
        //   console.log(accessToken);
        // const resp = await axios.post('/testing', null, { headers: { Authorization: `Bearer ${accessToken}`, } });
        //   console.log(resp);
        // } catch (error) {
        //     console.log(error);
        // }
    }

    const temp1 = async () => {
        try {
            const accessToken = await getAccessTokenSilently();
         
          console.log(accessToken);
              
          const resp = await axios.post('/testing', null, { headers: { Authorization: `Bearer ${accessToken}`, } });
          console.log(resp);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
        {
            isAuthenticated? user?.name : "user not logged in"
        }
        <button onClick = { () => { loginWithPopup() } }>Signin</button>
        <button onClick = { () => { logout() } }>Signout</button>
        <button onClick = { () => { temp() } }>temp</button>
        <button onClick = { () => { temp1() } }>temp1</button>
        </>
    )
}