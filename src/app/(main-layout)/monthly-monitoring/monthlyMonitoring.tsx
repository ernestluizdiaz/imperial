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
import { ArrowDownToLine, TrendingUp, Users } from "lucide-react";
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

const MonthlyMonitoring = () => {
	return (
		<div className="flex flex-col py-10 px-5 bg-white gap-4">
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
		</div>
	);
};

export default MonthlyMonitoring;
