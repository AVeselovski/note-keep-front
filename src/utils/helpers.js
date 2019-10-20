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

const validateTag = tag => {
    if (!tag) return false;

    return tag.match(/[`~!@$%^&*()\\=+[\]{}/?,.<>]/) ? true : false;
};

const formatTag = tag => {
    let formattedTag = tag
        .replace('-', ' ')
        .replace(/\s+/g, ' ')
        .trim()
        .replace('#', '')
        .replace(' ', '-')
        .toLowerCase();

    return '#' + formattedTag;
};

export { validateEmail, validatePassword, validateTag, formatTag };
