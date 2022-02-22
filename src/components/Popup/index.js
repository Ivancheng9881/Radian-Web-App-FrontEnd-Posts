import Popup from 'reactjs-popup';

const DropdownList = (buttons, position, reference) => {
 
    return <Popup
                trigger={<button> 
                            {buttons[0]}
                        </button>} 
                position={position ? position : "bottom center"}
                closeOnDocumentClick
                arrow={false}
                ref={reference}
                >
                <div className="pt-1 pl-3">
                    {buttons.slice(1,buttons.length).map(
                        (b,i)=>{
                            <div>
                                {b}
                                <div className='pt-1'></div>
                            </div>
                        }
                    )}                    
                </div>
            </Popup>
}

export default DropdownList;