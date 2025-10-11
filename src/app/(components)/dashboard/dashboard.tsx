"use client";
import React from "react";
import {
	Bar,
	BarChart,
	CartesianGrid,
	XAxis,
	YAxis,
	ResponsiveContainer,
} from "recharts";
import {
	ChartConfig,
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import { Menu } from "lucide-react";
import { Progress } from "@/components/ui/progress";

// Custom hook to detect mobile mode
function useIsMobile() {
	const [isMobile, setIsMobile] = React.useState(false);

	React.useEffect(() => {
		// check on mount
		const checkScreen = () => {
			setIsMobile(window.innerWidth < 768); // Includes tablets and phones
		};

		checkScreen(); // initial check
		window.addEventListener("resize", checkScreen);
		return () => window.removeEventListener("resize", checkScreen);
	}, []);

	return isMobile;
}

const Dashboard = ({ openMenu }: { openMenu?: () => void }) => {
	const isMobile = useIsMobile();
	const chartData = [
		{ month: "January", gcash: 186, cash: 80 },
		{ month: "February", gcash: 305, cash: 200 },
		{ month: "March", gcash: 237, cash: 120 },
		{ month: "April", gcash: 73, cash: 190 },
		{ month: "May", gcash: 209, cash: 130 },
		{ month: "June", gcash: 214, cash: 140 },
		{ month: "July", gcash: 280, cash: 200 },
		{ month: "August", gcash: 200, cash: 150 },
		{ month: "September", gcash: 250, cash: 180 },
		{ month: "October", gcash: 300, cash: 220 },
		{ month: "November", gcash: 320, cash: 240 },
		{ month: "December", gcash: 400, cash: 300 },
	];
	const chartConfig = {
		gcash: {
			label: "Gcash Payment",
			color: "#2563eb",
		},
		cash: {
			label: "Cash Payment",
			color: "#60a5fa",
		},
	} satisfies ChartConfig;

	const modeOfPayment: Array<"Gcash" | "Cash"> = ["Gcash", "Cash"];

	const paymentStats: Record<"Gcash" | "Cash", number> = {
		Gcash: 564,
		Cash: 350,
	};

	const recentPay: {
		name: string;
		mode: "Gcash" | "Cash";
		amount: number;
		date: string;
	}[] = [
		{
			name: "John Doe",
			mode: "Gcash",
			amount: 150,
			date: "2024-10-01",
		},
		{
			name: "Jane Smith",
			mode: "Cash",
			amount: 200,
			date: "2024-10-02",
		},
		{
			name: "Alice Johnson",
			mode: "Gcash",
			amount: 100,
			date: "2024-10-03",
		},
	];

	const totalOfPayments = recentPay.reduce(
		(total, payment) => total + payment.amount,
		0
	);

	return (
		<div className="flex flex-col py-10 px-5 bg-white gap-6">
			{/* Header */}
			<div className="flex items-center justify-between ">
				<h1 className="text-2xl font-bold">Dashboard</h1>
				<button
					onClick={openMenu}
					className="p-2 lg:hidden rounded-md hover:bg-gray-100"
					aria-label="Open menu"
				>
					<Menu size={24} />
				</button>
			</div>

			{/* Payment Stats */}
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
				{modeOfPayment.map((mode) => (
					<div
						key={mode}
						className="flex flex-col gap-5 border p-6 rounded-lg border-[#E4E4E7]"
					>
						<p className="font-bold text-2xl">{mode} Payment</p>
						<p className="font-bold text-2xl">
							{paymentStats[mode]}
						</p>
						<Progress
							value={Math.min(
								(paymentStats[mode] / 600) * 100,
								100
							)}
							className={
								mode === "Gcash"
									? "[&>div]:bg-[#007AFF]" // GCash blue
									: "[&>div]:bg-[#28A745]" // Cash green
							}
						/>
					</div>
				))}
			</div>

			{/* Bar Chart */}
			<div className="flex flex-col gap-6 w-full border p-6 pb-0 rounded-lg border-[#E4E4E7]">
				<h2 className="font-medium text-black">Overview</h2>
				<div className="w-full h-[400px]">
					<ChartContainer
						config={chartConfig}
						className="w-full h-full"
					>
						<ResponsiveContainer width="100%" height="100%">
							{isMobile ? (
								<BarChart
									layout="vertical"
									data={chartData}
									margin={{
										top: 10,
										right: 20,
										bottom: 20,
										left: -20,
									}}
								>
									<CartesianGrid horizontal={false} />
									<YAxis
										type="category"
										dataKey="month"
										tickLine={false}
										tickMargin={10}
										axisLine={false}
										tickFormatter={(v) => v.slice(0, 3)}
									/>
									<XAxis type="number" />
									<ChartTooltip
										content={<ChartTooltipContent />}
									/>
									<ChartLegend
										content={<ChartLegendContent />}
									/>
									<Bar
										dataKey="gcash"
										fill="var(--color-gcash)"
										radius={4}
									/>
									<Bar
										dataKey="cash"
										fill="var(--color-cash)"
										radius={4}
									/>
								</BarChart>
							) : (
								<BarChart
									data={chartData}
									margin={{
										top: 20,
										right: 20,
										bottom: 20,
										left: 20,
									}}
								>
									<CartesianGrid vertical={false} />
									<XAxis
										dataKey="month"
										tickLine={false}
										tickMargin={10}
										axisLine={false}
										tickFormatter={(v) => v.slice(0, 3)}
									/>
									<ChartTooltip
										content={<ChartTooltipContent />}
									/>
									<ChartLegend
										content={<ChartLegendContent />}
									/>
									<Bar
										dataKey="gcash"
										fill="var(--color-gcash)"
										radius={4}
									/>
									<Bar
										dataKey="cash"
										fill="var(--color-cash)"
										radius={4}
									/>
								</BarChart>
							)}
						</ResponsiveContainer>
					</ChartContainer>
				</div>
			</div>

			<div className="border p-6 rounded-lg border-[#E4E4E7]">
				<p className="text-black font-medium">Recent Payments</p>
				<p className="text-sm text-black">
					You made {totalOfPayments} sales this month.{" "}
				</p>

				<div>
					<ul className="mt-4 space-y-3">
						{recentPay.map((payment) => (
							<li
								key={payment.name + payment.date}
								className="flex items-center gap-4 p-3 rounded-lg"
							>
								<div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-bold text-lg uppercase">
									{payment.name
										.split(" ")
										.map((n) => n[0])
										.join("")}
								</div>
								<div className="flex-1">
									<p className="font-semibold text-black">
										{payment.name}
									</p>
									<p
										className={`text-xs ${
											payment.mode === "Gcash"
												? "text-[#007AFF]"
												: "text-[#28A745]"
										}`}
									>
										{payment.date} &middot; {payment.mode}
									</p>
								</div>
								<div
									className={`font-bold ${
										payment.mode === "Gcash"
											? "text-[#007AFF]"
											: "text-[#28A745]"
									}`}
								>
									₱{payment.amount}
								</div>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
