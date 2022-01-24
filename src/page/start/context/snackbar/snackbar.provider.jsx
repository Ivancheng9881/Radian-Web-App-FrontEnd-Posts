import { useEffect, useState, useRef, Fragment } from 'react';
import CreateSnackbarContext from './snackbar.context';

import { tickIcon } from '../../../../components/Icons/tickIconSvg';
import { exclamationMarkIcon } from '../../../../components/Icons/exclamationMarkIconSvg';

const GlobalSnackBarProvider = ({ children }) => {
    const [ snackbar, setSnackBar ] = useState('');

    const autoHideTime = useRef(null);

    useEffect(
        () => {
            if (snackbar.open) {
                // bind timeout to ref
                autoHideTime.current = setTimeout(() => {
                    handleSnackbarClose();
                }, 3000);
            }
            return () => {
                autoHideTime.current = null;
            };
        },
        [ snackbar ]
    );

    const handleSnackbarClose = () => {
        setSnackBar({ open: false, message: '' });
    };

    return (
        <CreateSnackbarContext.Provider value={{ snackbar, setSnackBar }}>
            <Fragment>
                {snackbar.open && (
                    <div id="RD-snackbar" className="RD-snackbar absolute w-full z-40">
                        <div
                            className={`m-auto p-2 rounded shadow flex justify-center items-center h-full w-2/3 border-theme-primary
                            ${snackbar.severity === 'success' ? `bg-theme-success` : `bg-theme-danger`}`}
                        >
                            <span className="bg-theme-white font-theme-white color-white rounded-xl mr-2">
                                {snackbar.severity === 'success' ? tickIcon : exclamationMarkIcon}
                            </span>
                            <p className="font-semibold text-theme-white text-base">{snackbar.message}</p>
                        </div>
                    </div>
                )}
                {children}
            </Fragment>
        </CreateSnackbarContext.Provider>
    );
};

export default GlobalSnackBarProvider;
