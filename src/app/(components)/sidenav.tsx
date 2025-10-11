"use client";
import React, { use, useState } from "react";
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

const icons = {
	Dashboard: House,
	Masterlist: ClipboardList,
	"Job Order": BriefcaseBusiness,
	"Payment Monitoring": WalletCards,
	"Monthly Monitoring": ChartNoAxesCombined,
	Settings: Settings,
	Logout: LogOut,
};

type NavKey = keyof typeof icons; // ✅ restrict to valid keys
const SideNav = () => {
	const username = "Sin";
	const navs: NavKey[] = [
		"Dashboard",
		"Masterlist",
		"Job Order",
		"Payment Monitoring",
		"Monthly Monitoring",
		"Settings",
		"Logout",
	];

	const [activeNav, setActiveNav] = useState("Dashboard");

	return (
		<div className="min-h-screen py-10 px-5 bg-[#F4FEFF] w-72 flex-shrink-0">
			<div className="flex flex-col gap-8">
				<div className="flex flex-row justify-between items-center">
					<h1 className="text-2xl font-medium">Hi, {username}</h1>
					<Image
						src="/img/imperiallogo.png"
						alt="logo"
						width={24}
						height={24}
						className=""
					/>
				</div>
				<div className="mt-10 flex flex-col gap-2">
					{navs.map((nav) => {
						const Icon = icons[nav];
						return (
							<div
								key={nav}
								onClick={() =>
									setActiveNav(nav as (typeof navs)[number])
								}
								className={`flex items-center gap-3 p-3 rounded-md cursor-pointer transition-all duration-200
										${
											nav === "Logout"
												? "bg-[#ED254E] text-white font-medium hover:opacity-90"
												: activeNav === nav
												? "bg-[#011936] text-white font-medium"
												: "hover:bg-[#D9F8FF] text-black"
										}
									`}
							>
								<Icon size={20} />
								<span>{nav}</span>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default SideNav;
