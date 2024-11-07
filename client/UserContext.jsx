import { createContext, useState } from "react";
import cookie from 'js-cookie';

const UserContext = createContext(null);

export const UserProvider = (props) => {
  const [authUser, setAuthUser] = useState();
  const signIn = async (credentials)=>{
    let response = await fetch("http://localhost:3000/users/login",
      {
        method: "POST",
        body: JSON.stringify({
          username: "Mr Moudstachex",
          password: "ridemeharder"
        }),
        headers: {
          "Content-Type" : "application/json"
        }
      }
    );
    if (response.ok){
      let json = await response.json();
      cookie.set('authJWT', json);
      setAuthUser(json);
    } else {
      console.log(response);

    }
    
  } 
  const signOut = ()=>{
    cookie.remove("authJWT");
    setAuthUser(null);
    console.log('signing out');
  }
  return (
    <UserContext.Provider value={{
      authUser,
      actions: {
        signIn,
        signOut
      }
    }}>
      {props.children}
    </UserContext.Provider >
  );
}
export default UserContext;