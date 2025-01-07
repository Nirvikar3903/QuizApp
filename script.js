document.addEventListener("DOMContentLoaded" , ()=>{

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const checkBox = document.getElementById("tickbox");
    const signupButton = document.querySelector(".signup-btn");


    //error msg elements
    const nameErr = document.getElementById("nameErr");
    const emailErr = document.getElementById("emailErr");
    const passwordErr = document.getElementById("passwordErr");


    //function validating email
    const isValid=(email)=>{
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }


});