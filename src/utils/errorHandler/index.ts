

export interface ErrorInterface {
    message: string,
    code: number,
}

const ErrorHandler = (code: number): ErrorInterface => {
    let message: string = ''

    switch(code) {

        // 
        // get profile error
        case 4200:
            message = 'profile not found';
            break;

        case 4300:
            message = 'address already in use';
            break
    }

    return {
        code, 
        message
    };
    
};

export default ErrorHandler;