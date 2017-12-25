const validateEmail = (email) => {
    const emailError = 'Valid email must be provided... please.';

    // email regex check
    const mailValidate = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!email.match(mailValidate)) {
        return emailError;
    } else {
        return '';
    }
}

const validatePassword = (password) => {
    const passwordError = 'Password of at least 4 characters must be provided... please.';

    // simple password check
    if (password.length < 4) {
        return passwordError;
    } else {
        return '';
    }
}


export { validateEmail, validatePassword };
