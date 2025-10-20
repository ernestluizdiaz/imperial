"use client";
import React from "react";
import { useState, useRef, useEffect } from "react";
import {
	CalendarArrowDown,
	Search,
	ChevronLeft,
	ChevronRight,
	Funnel,
	Download,
	Pencil,
	Trash2,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Popover,
	PopoverTrigger,
	PopoverContent,
} from "@/components/ui/popover";
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
} from "@/components/ui/select";

import { useMenu } from "../../(components)/menuContext";
import {
	useReactTable,
	getCoreRowModel,
	flexRender,
	getSortedRowModel,
	SortingState,
	Row,
} from "@tanstack/react-table";
import ActionModal from "@/app/(components)/actionModal";

type Payment = {
	id: number;
	accountNo: string;
	customerName: string;
	phoneNumber: string;
	address: string;
	monthlyFee: string;
	paymentDate: string;
	PMStatus: string;
	mop: string;
	amountPaid: string;
	invoiceNo: string;
	remarks: string;
};

type Column<T> = {
	accessorKey?: keyof T;
	header?: string;
};

const PMStatus = ["Paid", "Disconnected"];
const mop = ["Cash", "Gcash"];
const remarks = ["Collected", "Uncollected"];
const amountPaid = ["₱800", "₱1000", "₱1,400", "₱2,000", "₱2,500"];

const data: Payment[] = [
	{
		id: 1,
		accountNo: "202314002",
		customerName: "Herrera, Lyka Joy",
		phoneNumber: "639569675693",
		address: "Block 81 Lot 7 Parkstone Estate",
		monthlyFee: "₱800",
		PMStatus: PMStatus[0],
		paymentDate: "10/14/2025",
		mop: mop[1],
		amountPaid: amountPaid[0],
		invoiceNo: "INV-20231110-001",
		remarks: remarks[0],
	},
	{
		id: 2,
		accountNo: "202319005",
		customerName: "Vallente, Genovela",
		phoneNumber: "639569675693",
		address: "Block 54 Lot 4 Hyacinth Residences",
		monthlyFee: "₱800",
		PMStatus: PMStatus[1],
		paymentDate: "09/05/2025",
		mop: mop[0],
		amountPaid: amountPaid[1],
		invoiceNo: "INV-20231105-002",
		remarks: remarks[1],
	},
];

const modalColumns: Column<Payment>[] = [
	{ accessorKey: "id" as keyof Payment, header: "ID" },
	{ accessorKey: "accountNo" as keyof Payment, header: "Account No." },
	{ accessorKey: "customerName" as keyof Payment, header: "Customer Name" },
	{ accessorKey: "phoneNumber" as keyof Payment, header: "Phone Number" },
	{ accessorKey: "address" as keyof Payment, header: "Address" },
	{ accessorKey: "monthlyFee" as keyof Payment, header: "Monthly Fee" },
	{ accessorKey: "paymentDate" as keyof Payment, header: "Payment Date" },
	{ accessorKey: "PMStatus" as keyof Payment, header: "Status" },
	{ accessorKey: "mop" as keyof Payment, header: "MOP" },
	{ accessorKey: "amountPaid" as keyof Payment, header: "Amount Paid" },
	{ accessorKey: "invoiceNo" as keyof Payment, header: "Invoice No." },
	{ accessorKey: "remarks" as keyof Payment, header: "Remarks" },
];

const columns = [
	{
		accessorKey: "id",
		header: "No.",
	},
	{
		accessorKey: "accountNo",
		header: "Account No.",
	},
	{
		accessorKey: "customerName",
		header: "Customer Name",
	},
	{
		accessorKey: "phoneNumber",
		header: "Phone Number",
	},
	{
		accessorKey: "address",
		header: "Address",
	},
	{
		accessorKey: "monthlyFee",
		header: "Monthly Fee",
	},

	{
		accessorKey: "paymentDate",
		header: "Payment Date",
	},
	{
		accessorKey: "PMStatus",
		header: "Status",
		cell: ({
			row,
		}: {
			row: import("@tanstack/react-table").Row<Payment>;
		}) => {
			const status = row.original.PMStatus;

			// Plain text only if "Set Payment"
			if (status === "Set Payment") {
				return (
					<span className="inline-flex items-center justify-center min-w-[90px] text-gray-700">
						{status}
					</span>
				);
			}

			// Colored badges
			const isPaid = status === "Paid";
			const isDisconnected = status === "Disconnected";

			return (
				<span
					className={`inline-flex items-center justify-center min-w-[90px] px-3 py-1 text-xs font-medium rounded-full whitespace-nowrap border-2 ${
						isPaid
							? "bg-green-100 text-green-700 border-green-700"
							: isDisconnected
							? "bg-red-100 text-red-700 border-red-700"
							: ""
					}`}
				>
					{status}
				</span>
			);
		},
	},
	{
		accessorKey: "mop",
		header: "Mode of Payment",
		cell: ({
			row,
		}: {
			row: import("@tanstack/react-table").Row<Payment>;
		}) => {
			const status = row.original.mop;

			// Plain text only if "Set Payment"
			if (status === "Set Payment") {
				return (
					<span className="inline-flex items-center justify-center min-w-[90px] text-gray-700 ">
						{status}
					</span>
				);
			}

			// Colored badges
			const isGcash = status === "Gcash";
			const isCash = status === "Cash";

			return (
				<span
					className={`inline-flex items-center justify-center min-w-[90px] px-3 py-1 text-xs font-medium rounded-full whitespace-nowrap border-2 ${
						isGcash
							? "bg-blue-100 text-blue-700 border-blue-700"
							: isCash
							? "bg-green-100 text-green-700 border-green-700"
							: ""
					}`}
				>
					{status}
				</span>
			);
		},
	},

	{
		accessorKey: "amountPaid",
		header: "Amount Paid",
	},
	{
		accessorKey: "invoiceNo",
		header: "Invoice No.",
	},
	{
		accessorKey: "remarks",
		header: "Remarks",
	},

	{
		id: "actions",
		header: "Actions",
		cell: ({ row }: { row: Row<Payment> }) => (
			<div className="flex items-center gap-2">
				<ActionModal
					type="edit"
					data={Object.fromEntries(
						Object.entries(row.original).map(([key, value]) => [
							key,
							value === "Set Payment" ? "" : value,
						])
					)}
					columns={modalColumns}
					nonEditableKeys={[
						"id",
						"accountNo",
						"customerName",
						"phoneNumber",
						"address",
						"monthlyFee",
					]} // fields that cannot be edited
					onSubmit={(updated) => console.log("Edited data:", updated)}
					options={{
						PMStatus,
						mop,
						remarks,
						amountPaid,
					}}
					trigger={
						<button className="p-1 hover:text-green-700">
							<Pencil size={16} />
						</button>
					}
				/>
				<ActionModal
					type="delete"
					data={row.original}
					onSubmit={() => console.log("Deleted", row.original)}
					trigger={
						<button className="p-1 hover:text-red-600">
							<Trash2 size={16} />
						</button>
					}
				/>
			</div>
		),
	},
];

const PaymentMonitoring = () => {
	const { setOpen } = useMenu();
	const dropdownRef = useRef<HTMLDivElement>(null);
	const [open, dropDownOpen] = useState(false);
	const [sorting, setSorting] = useState<SortingState>([]);
	const [globalFilter, setGlobalFilter] = useState(""); // 1. Add global filter state
	const [dateOpen, setDateOpen] = React.useState(false);
	const [year, setYear] = React.useState(new Date().getFullYear());
	const [month, setMonth] = React.useState(new Date().getMonth());

	const filteredData = React.useMemo(() => {
		return data
			.map((payment) => {
				// Try parsing date safely
				let date: Date | null = null;
				if (
					payment.paymentDate &&
					payment.paymentDate !== "Set Payment"
				) {
					const parts = payment.paymentDate.split("/");
					if (parts.length === 3) {
						const [monthStr, dayStr, yearStr] = parts;
						date = new Date(
							Number(yearStr),
							Number(monthStr) - 1,
							Number(dayStr)
						);
					}
				}

				const matchesMonthYear =
					date &&
					date.getMonth() === month &&
					date.getFullYear() === year;

				// If out of range or invalid date → mark as “No Payment”
				if (!matchesMonthYear) {
					return {
						...payment,
						PMStatus: "Set Payment",
						paymentDate: "Set Payment",
						mop: "Set Payment",
						amountPaid: "Set Payment",
						invoiceNo: "Set Payment",
						remarks: "Set Payment",
					};
				}

				// Still allow search filter
				return payment;
			})
			.filter((payment) => {
				if (!globalFilter) return true;

				return Object.values(payment).some((value) =>
					String(value)
						.toLowerCase()
						.includes(globalFilter.toLowerCase())
				);
			});
	}, [data, month, year, globalFilter]);

	const table = useReactTable({
		data: filteredData,
		columns,
		state: { sorting },
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
	});

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(e.target as Node)
			) {
				dropDownOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () =>
			document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const handleToggle = () => {
		dropDownOpen((prev) => !prev);
	};

	const handleSort = (type: string) => {
		switch (type) {
			case "Name":
				table.setSorting([{ id: "customerName", desc: false }]);
				break;
			case "Status":
				table.setSorting([{ id: "PMStatus", desc: false }]);
				break;
			case "Payment Date":
				table.setSorting([{ id: "paymentDate", desc: true }]);
				break;
			default:
				table.resetSorting();
				break;
		}

		setOpen(false);
	};

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

	const years = Array.from({ length: 20 }, (_, i) => 2020 + i);

	const formattedMonthYear = `${months[month]} ${year}`;

	return (
		<div className="flex flex-col py-10 px-5 bg-white gap-4">
			{/* Header Row */}
			<div className="flex flex-wrap justify-between items-center">
				<div className="flex items-center gap-4 ">
					<h1 className="text-2xl font-bold">Payment Monitoring</h1>
					<Popover open={dateOpen} onOpenChange={setDateOpen}>
						<PopoverTrigger asChild>
							<Button
								variant="outline"
								className="p-2 cursor-pointer rounded flex items-center gap-2"
							>
								<CalendarArrowDown size={18} />
								<span className="text-sm">
									{formattedMonthYear}
								</span>
							</Button>
						</PopoverTrigger>

						<PopoverContent
							className="w-64 p-4 space-y-3"
							align="start"
						>
							<div className="flex flex-col gap-2">
								<label className="text-sm font-medium">
									Select Month
								</label>
								<Select
									value={String(month)}
									onValueChange={(val) =>
										setMonth(Number(val))
									}
								>
									<SelectTrigger>
										<SelectValue placeholder="Month" />
									</SelectTrigger>
									<SelectContent>
										{months.map((m, idx) => (
											<SelectItem
												key={m}
												value={String(idx)}
											>
												{m}
											</SelectItem>
										))}
									</SelectContent>
								</Select>

								<label className="text-sm font-medium">
									Select Year
								</label>
								<Select
									value={String(year)}
									onValueChange={(val) =>
										setYear(Number(val))
									}
								>
									<SelectTrigger>
										<SelectValue placeholder="Year" />
									</SelectTrigger>
									<SelectContent>
										{years.map((y) => (
											<SelectItem
												key={y}
												value={String(y)}
											>
												{y}
											</SelectItem>
										))}
									</SelectContent>
								</Select>

								<Button
									onClick={() => setDateOpen(false)}
									className="w-full mt-2"
								>
									Confirm
								</Button>
							</div>
						</PopoverContent>
					</Popover>
				</div>

				{/* Mobile Menu Button */}
				<button
					onClick={() => setOpen(true)}
					className="p-2 lg:hidden rounded-md hover:bg-gray-100"
				>
					<Menu size={24} />
				</button>
			</div>

			{/* Controls Row */}
			<div className="flex flex-wrap justify-between items-center gap-3">
				{/* Search Bar */}
				<div className="relative w-full sm:w-[250px] md:w-[300px]">
					<Search
						size={20}
						className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
					/>
					<Input
						type="search"
						placeholder="Search"
						className="pl-10 w-full"
						value={globalFilter}
						onChange={(e) => setGlobalFilter(e.target.value)} // 3. Update global filter
					/>
				</div>

				{/* Pagination + Actions */}
				<div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-end">
					{/* Pagination */}
					<div className="flex items-center text-gray-500 text-sm">
						<p>1 - 10 of 52</p>
						<button className="cursor-pointer pl-2">
							<ChevronLeft size={20} />
						</button>
						<button className="cursor-pointer">
							<ChevronRight size={20} />
						</button>
					</div>

					<div className="h-6 w-px bg-gray-300 hidden sm:block" />

					{/* Filter + Download */}
					<div
						className="relative flex items-center"
						ref={dropdownRef}
					>
						{/* Funnel button */}
						<button
							onClick={handleToggle}
							className="cursor-pointer p-2 rounded-md hover:bg-gray-100"
						>
							<Funnel size={20} />
						</button>

						{/* Dropdown menu */}
						{open && (
							<div className="absolute right-0 top-10 w-44 bg-white border border-gray-200 rounded-md shadow-md z-50">
								<ul className="text-sm text-gray-700">
									<li
										className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
										onClick={() => handleSort("Name")}
									>
										Sort by Name
									</li>
									<li
										className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
										onClick={() => handleSort("Status")}
									>
										Sort by Status
									</li>
									<li
										className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
										onClick={() =>
											handleSort("Date Created")
										}
									>
										Sort by Date Created
									</li>
								</ul>
							</div>
						)}

						{/* Download button */}
						<button className="cursor-pointer p-2 rounded-md hover:bg-gray-100">
							<Download size={20} />
						</button>
					</div>
				</div>
			</div>

			<div className="overflow-x-auto">
				<table className="w-full border-b border-gray-300 text-sm text-gray-700">
					<thead className="bg-gray-50">
						{table.getHeaderGroups().map((hg) => (
							<tr key={hg.id}>
								{hg.headers.map((header) => (
									<th
										key={header.id}
										className="px-4 py-2 text-left font-semibold border-b border-gray-300"
									>
										{flexRender(
											header.column.columnDef.header,
											header.getContext()
										)}
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody>
						{table.getRowModel().rows.length > 0 ? (
							table.getRowModel().rows.map((row) => (
								<tr
									key={`row-${row.id}`}
									className="hover:bg-gray-50 border-b border-gray-200"
								>
									{row.getVisibleCells().map((cell) => (
										<td
											key={cell.id}
											className="px-4 py-2 align-middle"
										>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</td>
									))}
								</tr>
							))
						) : (
							<tr>
								<td
									colSpan={columns.length}
									className="px-4 py-2 text-center text-gray-500"
								>
									No accounts found.
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default PaymentMonitoring;
