import React from 'react'
import Header from '../ui/Header'
import Chat from '../pages/Chat'
import Footer from '../ui/Footer'

const UserLayout = (props) => {
    return (
        <React.Fragment>
           <Header/>
            {props.children}
            <Chat />
            <Footer />
        </React.Fragment>
    )
}
export default UserLayout