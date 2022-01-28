import { tickIcon } from '../../../../components/Icons/tickIconSvg';
import { exclamationMarkIcon } from '../../../../components/Icons/exclamationMarkIconSvg';

const GlobalSnackbarComponent = (props) => {
    return (
        props.snackbar.open && (
            <div id="RD-snackbar" className="RD-snackbar absolute w-full z-40">
                <div
                    className={`m-auto p-2 rounded shadow flex justify-center items-center h-full w-2/3 border-theme-primary
                ${props.snackbar.severity === 'success' ? `bg-theme-success` : `bg-theme-danger`}`}
                >
                    <span className="bg-theme-white font-theme-white color-white rounded-xl mr-2">
                        {props.snackbar.severity === 'success' ? tickIcon : exclamationMarkIcon}
                    </span>

                    <p className="font-semibold text-theme-white text-base">{props.snackbar.message}</p>
                </div>
            </div>
        )
    );
};
export default GlobalSnackbarComponent;
