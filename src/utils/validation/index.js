/**
 * major function to test the value with the regex pattern
 * @param {*} val 
 * @param {*} pattern 
 * @param {*} nullable 
 * @returns 
 */
function validatePattern(val, pattern, nullable = true) {
    if (nullable && isNull(val)) return true
    return pattern.test(val);
}


/**
 * validate if a value is null
 * @param {any} val 
 * @param {boolean} nullable 
 * @returns 
 */
function isNull(val) {
    return val === '' || val === undefined || val === null
}


/**
 * validate if the val is a number
 * @param {any} val 
 * @param {boolean} nullable 
 * @returns 
 */
function isNumberOnly(val, nullable) {
    let pattern = /^\d+$/;
    return validatePattern(val, pattern, nullable = true);
}

/**
 * validate if the value is a number within the range
 * @param {any} val 
 * @param {number} min 
 * @param {number} max 
 * @param {boolean} nullable 
 * @returns 
 */
function isNumberInRange(val, min, max, nullable = true) {
    if (!isNumberOnly(val, nullable)) return false
    return val >= min && val <= max;
}

export const validateInput = (value, type) => {
    let reZeroToNine = new RegExp('^(?=.*[0-9])');
    let reSpecialCharacter = new RegExp('^(?=.*[!@#$%^&*])');

    if (!value) return `input field required`;
    if (reSpecialCharacter.test(value)) return `value must not contain special character`;

    switch (type) {
        case 'text':
            if (reZeroToNine.test(value)) return `value must not contain number`;
            break;
        case 'number':
            break;
        default:
            break;
    }
    return true;
};

const Validator = {
    isNumberOnly,
    isNumberInRange,
    validateInput
};

export default Validator