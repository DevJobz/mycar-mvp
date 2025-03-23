// src/components/Layout/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="p-4 bg-gray-800 text-white flex gap-4">
            <Link to="/">Home</Link>
            <Link to="/vehicles">Veículos</Link>
        </nav>
    );
}

export default Navbar;
