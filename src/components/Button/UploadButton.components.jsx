import { useRef } from 'react';

const UploadButton = ({ children, placeholder, handleUpload, disabled = false }) => {
    const fileInputRef = useRef(null);

    const handleChange = (e) => {
        e.preventDefault();
        handleUpload(e.target.files[0]);
        fileInputRef.current.value = "";
    };

    return (
        <div
            className={`bg-theme-light-blue text-theme-white rounded-full pt-2 pb-2 pl-6 pr-6 transition-all
                ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
            `}
        >
            <input type="file" onChange={handleChange} ref={fileInputRef} className="hidden" />
            <button onClick={(e) => fileInputRef.current && fileInputRef.current.click()} className="btn btn-primary">
                {placeholder}
            </button>
        </div>
    );
};

export default UploadButton;
