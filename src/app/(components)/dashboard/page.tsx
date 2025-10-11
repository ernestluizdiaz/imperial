"use client";
import { useState } from "react";
import SideNav from "../sidenav";
import Dashboard from "./dashboard";

export default function Home() {
	const [menuOpen, setMenuOpen] = useState(false);

	return (
		<div className="flex min-h-screen">
			{/* Desktop Sidebar */}
			<div className="hidden lg:block sticky top-0 w-72 flex-shrink-0">
				<SideNav />
			</div>

			{/* Mobile Overlay Sidebar */}
			{menuOpen && (
				<div
					className="fixed inset-0 z-50 bg-black/30"
					onClick={() => setMenuOpen(false)}
				>
					<div
						className="absolute top-0 left-0 h-full w-72 bg-[#F4FEFF] shadow-lg"
						onClick={(e) => e.stopPropagation()}
					>
						<SideNav closeMenu={() => setMenuOpen(false)} />
					</div>
				</div>
			)}

			{/* Dashboard */}
			<div className="flex-1 bg-white overflow-x-hidden">
				<Dashboard openMenu={() => setMenuOpen(true)} />
			</div>
		</div>
	);
}
