"use client";
import React from "react";
import { useState, useRef, useEffect } from "react";
import {
	CirclePlus,
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

type Customer = {
	id: number;
	accountNo: string;
	customerName: string;
	phoneNumber: string;
	address: string;
	status: string;
	monthlyFee: string;
	remarks: string;
	registeredDate: string;
};

type Column<T> = {
	accessorKey?: keyof T;
	header?: string;
};

const data: Customer[] = [
	{
		id: 1,
		accountNo: "202314002",
		customerName: "Herrera, Lyka Joy",
		phoneNumber: "639569675693",
		address: "Block 81 Lot 7 Parkstone Estate",
		status: "Active",
		monthlyFee: "₱1,000",
		remarks: "penge barya",
		registeredDate: "14/06/2023",
	},
	{
		id: 2,
		accountNo: "202319005",
		customerName: "Vallente, Genovela",
		phoneNumber: "639569675693",
		address: "Block 54 Lot 4 Hyacinth Residences",
		status: "Non-Active",
		monthlyFee: "₱800",
		remarks: "Nagbabayad pero onti",
		registeredDate: "19/10/2023",
	},
];

const modalColumns: Column<Customer>[] = [
	{ accessorKey: "id" as keyof Customer, header: "ID" },
	{ accessorKey: "accountNo" as keyof Customer, header: "Account No." },
	{ accessorKey: "customerName" as keyof Customer, header: "Customer Name" },
	{ accessorKey: "phoneNumber" as keyof Customer, header: "Phone Number" },
	{ accessorKey: "address" as keyof Customer, header: "Address" },
	{ accessorKey: "status" as keyof Customer, header: "Status" },
	{ accessorKey: "monthlyFee" as keyof Customer, header: "Monthly Fee" },
	{ accessorKey: "remarks" as keyof Customer, header: "Remarks" },
	{
		accessorKey: "registeredDate" as keyof Customer,
		header: "Registered Date",
	},
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
		accessorKey: "status",
		header: "Status",
		cell: ({
			row,
		}: {
			row: import("@tanstack/react-table").Row<Customer>;
		}) => {
			const status = row.original.status;
			const active = status === "Active";
			return (
				<span
					className={`inline-flex items-center justify-center min-w-[90px] px-3 py-1 text-xs font-medium rounded-full whitespace-nowrap ${
						active
							? "bg-green-100 text-green-700 border-2 border-green-700"
							: "bg-red-100 text-red-700 border-2 border-red-700"
					}`}
				>
					{status}
				</span>
			);
		},
	},
	{
		accessorKey: "monthlyFee",
		header: "Monthly Fee",
	},
	{
		accessorKey: "remarks",
		header: "Remarks",
	},
	{
		accessorKey: "registeredDate",
		header: "Registered Date",
	},
	{
		id: "actions",
		header: "Actions",
		cell: ({ row }: { row: Row<Customer> }) => (
			<div className="flex items-center gap-2">
				<ActionModal
					type="edit"
					data={row.original}
					columns={modalColumns} // ← use modalColumns here
					nonEditableKeys={["id", "registeredDate"]} // skip these fields
					onSubmit={(updated) => console.log("Edited data:", updated)}
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

const Masterlist = () => {
	const { setOpen } = useMenu();
	const dropdownRef = useRef<HTMLDivElement>(null);
	const [open, dropDownOpen] = useState(false);
	const [sorting, setSorting] = useState<SortingState>([]);
	const [globalFilter, setGlobalFilter] = useState(""); // 1. Add global filter state
	const filteredData = React.useMemo(() => {
		if (!globalFilter) return data;

		const lowercasedFilter = globalFilter.toLowerCase();

		return data.filter((item) =>
			Object.values(item).some((value) =>
				String(value).toLowerCase().includes(lowercasedFilter)
			)
		);
	}, [globalFilter, data]);

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
				table.setSorting([{ id: "status", desc: false }]);
				break;
			case "Date Created":
				table.setSorting([{ id: "registeredDate", desc: true }]);
				break;
			default:
				table.resetSorting();
				break;
		}

		setOpen(false);
	};

	return (
		<div className="flex flex-col py-10 px-5 bg-white gap-6">
			{/* Header Row */}
			<div className="flex flex-wrap justify-between items-center gap-3">
				<div className="flex items-center gap-3">
					<h1 className="text-2xl font-bold">Masterlist Test</h1>
					<ActionModal
						type="add"
						columns={columns}
						nonEditableKeys={["id", "registeredDate"]} // fields that cannot be edited
						onSubmit={(newData) => console.log("Added:", newData)} // handle the new record
						trigger={
							<button className="p-2 hover:bg-gray-100 rounded">
								<CirclePlus size={20} />
							</button>
						}
					/>
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
			<div className="flex flex-wrap justify-between items-center gap-3 mt-3">
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
						{table.getRowModel().rows.map((row) => (
							<tr
								key={row.id}
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
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Masterlist;
