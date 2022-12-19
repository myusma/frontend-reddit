import React from 'react';
import {Link} from "react-router-dom";


const Header = ({hrefTwo,nameOne,nameTwo,nameThree, imgClassName,innerClassName,outerClassName,headerClassName,divClassName,src,alt,name,to,target,href,}) => {
    return (
        <header className={headerClassName}>

            <div className={divClassName}>

                <nav className={outerClassName}>

                    <ul className={innerClassName}>
                        <li>
                            <Link
                            to={to}
                            >
                                {nameOne}
                            </Link>
                            <a
                                target={target}
                                href={href}
                            >
                                {nameTwo}
                            </a>
                            <a
                                target={target}
                                href={hrefTwo}
                            >
                                {nameThree}
                            </a>
                        </li>

                    </ul>
                </nav>

                <img
                    className={imgClassName}
                    src={src}
                    alt={alt}
                />
                <h1>
                    {name}
                </h1>
            </div>
        </header>
    );
};

export default Header;