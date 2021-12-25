import "./styles.css";

const Navbar = (props) => {
    return (
        <div id='RD-navbar' className="fixed w-full top-0 z-50">
            <div
                className='p-4 h-20 bg-theme-bg-light RD-shadow'
            >
                <img 
                    src="/logos/radian.png"
                    width="149px"
                    height="41px"
                    alt='radian logo'
                />
            </div>
        </div>

    )
};

export default Navbar;
