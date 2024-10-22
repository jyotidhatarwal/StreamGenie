
export const validateForm = (email,password) => {
    const validEmail = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email);
    const validPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);
    
    if(!validEmail && !validPassword) return "Invalid Email and Password";
    if(!validEmail) return "Invalid Email";
    if(!validPassword) return "Invalid Password";
    return null;
}