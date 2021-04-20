import React, {Fragment} from 'react';

const Footer = (props) => {
    return (
        <>
            <footer className="py-1">
                <p className="text-center  mt-1">
                    Shopping Cart - {new Date().getFullYear()}, All Rights Reserved
                </p>
            </footer>
        </>
    );
}

export default Footer;