
const DoubleCollumTextfield = (props) => {
    
    return (
            <div className="relative w-2/3 mt-4">
                <div className="fixed absolute left-0 top-0 text-theme-white text-left">
                    {props.title}
                </div>
                <div className="fixed absolute left-48 top-0 text-theme-white text-center">
                    {props.content}
                </div>
                <div className="border-b pt-8 border-theme-white"/>
            </div>       
    );
}

export default DoubleCollumTextfield;