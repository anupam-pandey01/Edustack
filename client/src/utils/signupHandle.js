// Function that's handle the submit of Sign up form after click on submit button

 async function signupHandleSubmit(e, authData){
    e.preventDefault();
    try{
      let { username, email, password, role} = authData;
      if(!username || !email || !password || !role){
        return {
          success: false,
          message: "username, email, password are required"
        }
      }
      let url = `${import.meta.env.VITE_BASE_URL}/register`
      let response = await fetch(url, {
        method: "POST",
        headers:{
          "Content-Type": "application/json"
        },
        body: JSON.stringify(authData)
      });
      let data = await response.json();
      if(data){
        return data;
      }
    }catch(err){
      console.log(err)
      return {
        success: false,
        message: "Server Error"
      }
    }
  }

   export default signupHandleSubmit;