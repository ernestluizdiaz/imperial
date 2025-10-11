"use client";
import React from "react";
import Image from "next/image";
import {
	House,
	ClipboardList,
	BriefcaseBusiness,
	WalletCards,
	ChartNoAxesCombined,
	Settings,
	LogOut,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const icons = {
	Dashboard: House,
	Masterlist: ClipboardList,
	"Job Order": BriefcaseBusiness,
	"Payment Monitoring": WalletCards,
	"Monthly Monitoring": ChartNoAxesCombined,
	Settings: Settings,
	Logout: LogOut,
};

type NavItem = {
	name: keyof typeof icons;
	href: string;
};

type SideNavProps = {
	closeMenu?: () => void;
};

const SideNav = ({ closeMenu }: SideNavProps) => {
	const router = useRouter();
	const pathname = usePathname();
	const username = "Sin";

	const navs: NavItem[] = [
		{ name: "Dashboard", href: "/dashboard" },
		{ name: "Masterlist", href: "/masterlist" },
		{ name: "Job Order", href: "/job-order" },
		{ name: "Payment Monitoring", href: "/payment-monitoring" },
		{ name: "Monthly Monitoring", href: "/monthly-monitoring" },
		{ name: "Settings", href: "/settings" },
		{ name: "Logout", href: "/logout" },
	];

	return (
		<div className="h-full w-72 bg-[#F4FEFF] py-10 px-5 flex-shrink-0 overflow-y-auto">
			{/* Header */}
			<div className="flex flex-row justify-between items-center">
				<h1 className="text-2xl font-medium">Hi, {username}</h1>
				<Image
					src="/img/imperiallogo.png"
					alt="logo"
					width={24}
					height={24}
				/>
			</div>

			{/* Navigation */}
			<div className="mt-10 flex flex-col gap-2">
				{navs.map(({ name, href }) => {
					const Icon = icons[name];
					const isActive = pathname === href;

					return (
						<div
							key={name}
							onClick={() => {
								if (name === "Logout") {
									// optional: handle logout logic here
									console.log("Logging out...");
								} else {
									router.push(href);
								}
								closeMenu?.();
							}}
							className={`flex items-center gap-3 p-3 rounded-md cursor-pointer transition-all duration-200
								${
									name === "Logout"
										? "bg-[#ED254E] text-white font-medium hover:opacity-90"
										: isActive
										? "bg-[#011936] text-white font-medium"
										: "hover:bg-[#D9F8FF] text-black"
								}
							`}
						>
							<Icon size={20} />
							<span>{name}</span>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default SideNav;
