"use client";
import React, { useState } from "react";
import Link from "next/link";
import Accounts from "./accounts";
import Teams from "./teams";

const Settings = () => {
	const [activeTab, setActiveTab] = useState("account");

	return (
		<div className="flex flex-col py-10 px-5 bg-white gap-4">
			{/* Header */}
			<div className="flex justify-between items-center">
				<h1 className="text-2xl font-bold">Settings</h1>
			</div>

			{/* Tabs */}
			<div className="ml-5 space-x-8 border-b border-gray-300">
				{["account", "teams"].map((tab) => (
					<button
						key={tab}
						onClick={() => setActiveTab(tab)}
						className={`pb-2 font-bold text-sm transition-all ${
							activeTab === tab
								? "text-black border-b-2 border-black"
								: "text-gray-500"
						}`}
					>
						<Link href="#">
							{tab.charAt(0).toUpperCase() + tab.slice(1)}
						</Link>
					</button>
				))}
			</div>

			{activeTab === "account" && <Accounts />}

			{activeTab === "teams" && <Teams />}
		</div>
	);
};

export default Settings;
