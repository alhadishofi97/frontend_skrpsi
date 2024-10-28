// src/contexts/MenuContext.js
import React, { createContext, useState, useEffect } from 'react';

const MenuContext = createContext();

const MenuProvider = ({ children }) => {
    const [menus, setMenus] = useState([]);

    useEffect(() => {
        const storedMenus = localStorage.getItem('menu-items');
        if (storedMenus) {
            setMenus(JSON.parse(storedMenus));
        }
    }, []);

    return (
        <MenuContext.Provider value={{ menus, setMenus }}>
            {children}
        </MenuContext.Provider>
    );
};

export { MenuContext, MenuProvider };

