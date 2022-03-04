const handleError = (code: number) : string => {
    let msg: string;
    switch(code) {
        case 4001:
            msg = 'Invalid file type';
            break
        case 4002:
            msg = 'File size too large';
            break
        default:
            break
    }

    return msg;
}

export default handleError