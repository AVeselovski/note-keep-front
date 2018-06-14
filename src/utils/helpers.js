const validateEmail = email => {
	// email regex check
	const mailValidate = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // eslint-disable-line
	if (!email.match(mailValidate)) {
		return true;
	} else {
		return false;
	}
};

const validatePassword = password => {
	// simple password check
	if (password.length < 7) {
		return true;
	} else {
		return false;
	}
};

export { validateEmail, validatePassword };
