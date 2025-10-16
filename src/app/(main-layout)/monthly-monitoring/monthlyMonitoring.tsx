import React from "react";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
	ArrowDownToLine,
	TrendingUp,
	Users,
	Wallet,
	RefreshCw,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

const months = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

const stats = ["Total Collections", "Gcash Transaction", "Active Reconnects"];
const statsValue = ["₱500,000", "500", "300"];
const average = [15, 8, 11];
const statsColors = ["bg-[#68B479]", "bg-[#0C7FDA]", "bg-[#465362]"];
const userTotal = [503, 213, 343];
const userBgColors = ["bg-[#ECFDF5]", "bg-[#FFF1F2]", "bg-[#F1F5F9]"];
const user = ["Active Users", "Non-Active Users", "Disconnected"];
const userProgress = [32, 56, 76];
const progressColors = [
	"[&>div]:bg-green-500",
	"[&>div]:bg-red-500",
	"[&>div]:bg-gray-500",
];
const textColors = ["text-green-500", "text-red-500", "text-gray-500"];
const borderColors = ["border-green-500", "border-red-500", "border-gray-500"];

const paymentIconBg = ["bg-[#D3FFDD]", "bg-[#CEEAF0]"];
const modeOfPayment = [
	"Cash Payment",
	"GCash Payment",
	"Cash Reconnect",
	"GCash Reconnect",
];
const paymentValue = [200, 233, 542, 543];

const performanceTracking = [43, 65, 76, 56];

const financialOverview = [
	"Expenses for the Month",
	"Total Collection",
	"Cash Office Uncollected",
	"Grand Total",
	"New Installation",
	"Amount of Installation",
];

const financialOverviewValue = [342, 254, 432, 123, 453, 543];
const progressBarValue = [43, 54, 45, 23, 54, 42];
const financialColors = [
	"#0C7FDA",
	"#FF7700",
	"#68B479",
	"#FFC700",
	"#9747FF",
	"#ED254E",
];
const progressBarColors = [
	"[&>div]:bg-[#0C7FDA]",
	"[&>div]:bg-[#FF7700]",
	"[&>div]:bg-[#68B479]",
	"[&>div]:bg-[#FFC700]",
	"[&>div]:bg-[#9747FF]",
	"[&>div]:bg-[#ED254E]",
];

const MonthlyMonitoring = () => {
	return (
		<div className="flex flex-col py-10 px-5 bg-white gap-6">
			{/* Header */}
			<div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
				<div className="flex flex-col items-start">
					<h1 className="text-2xl font-bold">Monthly Monitoring</h1>
					<p className="text-sm text-gray-600">
						Track your key metrics and performance
					</p>
				</div>

				<div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
					<Select>
						<SelectTrigger className="w-full sm:w-[180px]">
							<SelectValue placeholder="Select Month" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectLabel>Months</SelectLabel>
								{months.map((month) => (
									<SelectItem key={month} value={month}>
										{month}
									</SelectItem>
								))}
							</SelectGroup>
						</SelectContent>
					</Select>

					<Button className="bg-[#011936] w-full sm:w-auto flex items-center justify-center gap-2">
						<ArrowDownToLine className="h-4 w-4" />
						<span>Export</span>
					</Button>
				</div>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-white">
				{stats.map((label, index) => (
					<div
						key={index}
						className={`flex flex-col justify-between p-6 gap-5 rounded-2xl shadow-md ${statsColors[index]}`}
					>
						<p className="text-md font-medium">{label}</p>
						<p className="text-2xl font-bold">
							{statsValue[index]}
						</p>
						<p className="flex items-center text-sm">
							<TrendingUp className="w-4 h-4" />+{average[index]}%
							from last month
						</p>
					</div>
				))}
			</div>

			<div className=" flex flex-col border border-[#E4E4E7] p-6 rounded-lg gap-6">
				<div className="flex flex-col">
					<div className="flex items-center gap-2">
						<Users className="w-8 h-8" />
						<p className="text-lg font-medium">User Overview</p>
					</div>
					<p className="text-sm">Total user distribution</p>
				</div>
				<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
					{user.map((label, index) => (
						<div
							key={index}
							className={`flex flex-col p-6 gap-3 font-bold rounded-2xl shadow-md border-l-6 ${userBgColors[index]} ${borderColors[index]}`}
						>
							<p
								className={`text-2xl font-bold ${textColors[index]}`}
							>
								{userTotal[index]}
							</p>

							<p
								className={`text-sm font-medium ${textColors[index]}`}
							>
								{label}
							</p>

							<Progress
								className={progressColors[index]}
								value={userProgress[index]}
							/>

							<p
								className={`text-xs text-right ${textColors[index]}`}
							>
								{userProgress[index]}%
							</p>
						</div>
					))}
				</div>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
				{modeOfPayment.map((mode, index) => {
					// pick icon based on mode name
					const isPayment = mode.includes("Payment");
					const Icon = isPayment ? Wallet : RefreshCw;
					// choose bg color pattern alternately
					const bgColor = paymentIconBg[index % paymentIconBg.length];

					return (
						<div
							key={index}
							className="flex flex-col justify-between border border-[#E4E4E7] p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
						>
							<div
								className={`w-12 h-12 flex items-center justify-center rounded-full ${bgColor}`}
							>
								<Icon className="w-6 h-6 text-gray-700" />
							</div>

							<div className="mt-4">
								<p className="text-md font-medium text-gray-800">
									{mode}
								</p>
								<p className="text-2xl font-bold text-gray-900 mt-1">
									₱{paymentValue[index].toLocaleString()}
								</p>
							</div>
						</div>
					);
				})}
			</div>

			<div className="flex flex-col border border-[#E4E4E7] p-6 rounded-lg gap-2 shadow-sm">
				<h2 className="font-bold text-xl text-gray-800">
					Performance Tracking
				</h2>

				<div className="flex flex-col gap-4">
					{modeOfPayment.map((mode, index) => (
						<div key={mode} className="flex flex-col gap-1">
							<div className="flex justify-between text-sm font-medium text-gray-700">
								<span>{mode}</span>
								<span>{performanceTracking[index]}%</span>
							</div>

							<Progress
								value={performanceTracking[index]}
								className={
									mode.includes("GCash")
										? "[&>div]:bg-[#007AFF]" // Blue for GCash
										: "[&>div]:bg-[#28A745]" // Green for Cash
								}
							/>
						</div>
					))}
				</div>
			</div>

			<div className="grid grid-cols-2 gap-4">
				{financialOverview.map((mode, index) => (
					<div
						key={mode}
						className="flex flex-col p-6 rounded-lg gap-3 shadow-sm hover:shadow-md transition-all duration-200
						"
						style={{
							borderLeft: `6px solid ${financialColors[index]}`,
						}}
					>
						<div className="flex flex-col justify-between text-sm font-medium text-gray-700 gap-4">
							<span className="font-semibold text-lg">
								{mode}
							</span>
							<span className="text-2xl font-bold">
								₱
								{financialOverviewValue[index].toLocaleString()}
							</span>
						</div>

						<Progress
							value={progressBarValue[index]}
							className={`${progressBarColors[index]}`}
						/>

						<span className="text-xs text-gray-500 text-right">
							{progressBarValue[index]}%
						</span>
					</div>
				))}
			</div>
		</div>
	);
};

export default MonthlyMonitoring;
