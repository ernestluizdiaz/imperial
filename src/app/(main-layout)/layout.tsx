"use client";
import { useMenu, MenuProvider } from "../(components)/menuContext";
import SideNav from "../(components)/sidenav";

function LayoutContent({ children }: { children: React.ReactNode }) {
	const { open, setOpen } = useMenu();

	return (
		<div className="flex min-h-screen overflow-x-hidden">
			{/* Desktop Sidebar */}
			<div className="hidden lg:block fixed top-0 left-0 h-screen w-72 bg-[#F4FEFF] shadow-lg">
				<SideNav />
			</div>

			{/* Mobile Sidebar */}
			{open && (
				<div
					className="fixed inset-0 z-[9999] bg-black/30"
					onClick={() => setOpen(false)}
				>
					<div
						className="absolute top-0 left-0 h-full w-72 bg-[#F4FEFF] shadow-lg"
						onClick={(e) => e.stopPropagation()}
					>
						<SideNav closeMenu={() => setOpen(false)} />
					</div>
				</div>
			)}

			{/* Main Content */}
			<main className="flex-1 ml-0 lg:ml-72 overflow-x-hidden overflow-y-auto">
				{children}
			</main>
		</div>
	);
}

export default function MainLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<MenuProvider>
			<LayoutContent>{children}</LayoutContent>
		</MenuProvider>
	);
}
