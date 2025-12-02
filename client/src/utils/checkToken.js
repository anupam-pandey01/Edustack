
export function checkToken(token){
    if (token === "Token Expired"){
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        alert("Session expired. Login agian");
        
        window.location.href = "/auth";
        
        return 
    }
}