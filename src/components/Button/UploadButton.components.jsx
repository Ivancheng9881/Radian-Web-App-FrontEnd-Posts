import { UploadOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useRef } from 'react';

const UploadButton = ({ 
    placeholder, 
    handleUpload, 
    acceptedImgType=[],
    disabled = false
}) => {
    const fileInputRef = useRef(null);

    const handleChange = async (e) => {
        e.preventDefault();
        handleUpload(e.target.files[0]);
        fileInputRef.current.value = "";
    };

    return (
        <>
            <input type="file" onChange={handleChange} ref={fileInputRef} className="hidden" />
            <Button 
                onClick={(e) => fileInputRef.current && fileInputRef.current.click()} 
                size='large'
                shape='round'
                type='primary'
                disabled={disabled}
                icon={<UploadOutlined />}
            >
                {placeholder}
            </Button>
        </>
    );
};

export default UploadButton;
