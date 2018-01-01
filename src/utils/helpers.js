import { errorMessages as messages } from './messages';


const validateEmail = (email) => {
    // email regex check
    const mailValidate = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!email.match(mailValidate)) {
        return {
            error: true,
            msg: messages.validEmailError
        }
    } else {
        return {
            error: false,
            msg: ''
        }
    }
}

const validatePassword = (password) => {
    // simple password check
    if (password.length < 7) {
        return {
            error: true,
            msg: messages.validPasswordError
        }
    } else {
        return {
            error: false,
            msg: ''
        }
    }
}


export { validateEmail, validatePassword };
