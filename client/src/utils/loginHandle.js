// Function that's handle the submit of Sign up form after click on submit button

 async function loginHandleSubmit(e, authData){
    e.preventDefault();
    try{
      let { email, password } = authData;
      if(!email || !password){
        return {
          success: false,
          message: "email, password are required"
        }
      }
      let url = "http://localhost:5000/login";
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
      return {
        success: false,
        message: "Server Error"
      }
    }
  }

   export default loginHandleSubmit;