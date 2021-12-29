import ItemOption from "./ItemOptions.components";


/**
 * 
 * @param {any[]} value array of current   
 * @returns 
 */
const ItemOptionList = ({
    value,
    options,
    handleSelect,
    arrangment='flex' // flex or inline

}) => {
    return (
        <div className={`
            w-full flex-wrap
            ${arrangment === 'flex' ? 'inline-flex' : 'inline'}
        `}>
            {
                options.map((item) => {
                    return (
                        <ItemOption 
                            key={item.value} 
                            value={item.value}
                            label={item.label}
                            active={value.includes(item.value)}
                            handleSelect={handleSelect}
                        />
                    )
                })
            }
        </div>
    )
};

export default ItemOptionList;