import { Link, NavLink } from "react-router-dom";
import logo from "../assets/red30-tech-logo.png";
import React, { useState, useEffect } from 'react';

export default function Header() {
  const getClass = ({ isActive }) => (isActive ? "nav-active" : null);
    const [headerFixed, setHeaderFixed] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop > 0) {
                setHeaderFixed(true);
            } else {
                setHeaderFixed(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

  return (
    <header className="container">
      <Link to="/">
        <img
          className="logo"
          src={logo}
          alt="Red30 Tech logo"
          title="Red30 Tech | Home"
        />
      </Link>

      <nav>
        <NavLink to="/" className={getClass}>
          Home
        </NavLink>
        <NavLink to="/about" className={getClass}>
          About
        </NavLink>
        <NavLink to="/categories" className={getClass}>
          Categories
        </NavLink>
      </nav>
    </header>
  );
}
