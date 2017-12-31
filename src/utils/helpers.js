const validateEmail = (email) => {
    const emailError = 'Valid email must be provided... please.';
    // email regex check
    const mailValidate = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!email.match(mailValidate)) {
        return {
            error: true,
            msg: emailError
        }
    } else {
        return {
            error: false,
            msg: ''
        }
    }
}

const validatePassword = (password) => {
    const passwordError = 'Password of at least 4 characters must be provided... please.';
    // simple password check
    if (password.length < 7) {
        return {
            error: true,
            msg: passwordError
        }
    } else {
        return {
            error: false,
            msg: ''
        }
    }
}


export { validateEmail, validatePassword };
