import Navbar from '../Navbar'

const Layout = (props) => {
  return (
    <div
      className='bg-theme-bg-dark min-h-screen'
    >
          <Navbar />
        {props.children}
    </div>
  )
}

export default Layout
