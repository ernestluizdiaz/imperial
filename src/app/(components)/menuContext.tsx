"use client";
import { createContext, useContext, useState } from "react";

const MenuContext = createContext({
	open: false,
	setOpen: (_: boolean) => {},
});

export const MenuProvider = ({ children }: { children: React.ReactNode }) => {
	const [open, setOpen] = useState(false);
	return (
		<MenuContext.Provider value={{ open, setOpen }}>
			{children}
		</MenuContext.Provider>
	);
};

export const useMenu = () => useContext(MenuContext);
