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

type Column<T> = {
	accessorKey?: keyof T;
	header?: string;
};

type JobOrder = {
	id: number;
	accountNo: string;
	customerName: string;
	address: string;
	phoneNumber: string;
	description: string;
	cost: string;
	technician: string[];
	status: string;
	dateCreated: string;
};

const descriptions = [
	"No Power",
	"Limited Connection",
	"Slow Internet",
	"Upgrade",
	"Downgrade",
	"Relocation",
	"Change modem",
	"Other",
];

const cost = ["500", "1000", "1500", "Free"];
const status = ["Done", "Pending", "In Progress", "Cancelled"];

const technicians = ["Alvarez", "Reyes", "Valdez", "Santos", "Cruz"];
const pickTechs = (...indexes: number[]) => indexes.map((i) => technicians[i]);

const data: JobOrder[] = [
	{
		id: 1,
		accountNo: "202314002",
		customerName: "Herrera, Lyka Joy",
		phoneNumber: "639569675693",
		address: "Block 81 Lot 7 Parkstone Estate",
		description: descriptions[0],
		cost: cost[1],
		technician: pickTechs(0, 2),
		status: status[0],
		dateCreated: "14/06/2023",
	},
	{
		id: 2,
		accountNo: "202319005",
		customerName: "Vallente, Genovela",
		phoneNumber: "639569675693",
		address: "Block 54 Lot 4 Hyacinth Residences",
		description: descriptions[1],
		cost: cost[0],
		technician: pickTechs(1, 3),
		status: status[1],

		dateCreated: "19/10/2023",
	},
	{
		id: 3,
		accountNo: "202320007",
		customerName: "Santos, Mark",
		phoneNumber: "639123456789",
		address: "Block 10 Lot 2 Green Meadows",
		description: descriptions[2],
		cost: cost[3],
		technician: pickTechs(0, 3),
		status: status[2],
		dateCreated: "05/01/2024",
	},
	{
		id: 4,
		accountNo: "202321009",
		customerName: "Lopez, Anna",
		phoneNumber: "639987654321",
		address: "Block 22 Lot 5 Blue Ridge",
		description: descriptions[3],
		cost: cost[2],
		technician: pickTechs(2, 3),
		status: status[3],
		dateCreated: "12/03/2024",
	},
];

const modalColumns: Column<JobOrder>[] = [
	{ accessorKey: "id" as keyof JobOrder, header: "ID" },
	{ accessorKey: "accountNo" as keyof JobOrder, header: "Account No." },
	{ accessorKey: "customerName" as keyof JobOrder, header: "Customer Name" },
	{ accessorKey: "address" as keyof JobOrder, header: "Address" },
	{ accessorKey: "phoneNumber" as keyof JobOrder, header: "Phone Number" },
	{ accessorKey: "description" as keyof JobOrder, header: "Description" },
	{ accessorKey: "cost" as keyof JobOrder, header: "Cost" },
	{ accessorKey: "technician" as keyof JobOrder, header: "Technician" },
	{ accessorKey: "status" as keyof JobOrder, header: "Status" },
	{
		accessorKey: "dateCreated" as keyof JobOrder,
		header: "Date Created",
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
		accessorKey: "address",
		header: "Address",
	},
	{
		accessorKey: "phoneNumber",
		header: "Phone Number",
	},

	{
		accessorKey: "description",
		header: "Description",
	},
	{
		accessorKey: "cost",
		header: "Cost",
	},
	{
		accessorKey: "technician",
		header: "Technician",
	},
	{
		accessorKey: "status",
		header: "Status",
		cell: ({
			row,
		}: {
			row: import("@tanstack/react-table").Row<JobOrder>;
		}) => {
			const status = row.original.status;

			let badgeClass = "";
			switch (status) {
				case "Done":
					badgeClass =
						"bg-green-100 text-green-700 border-2 border-green-700";
					break;
				case "Pending":
					badgeClass =
						"bg-yellow-100 text-yellow-700 border-2 border-yellow-700";
					break;
				case "In Progress":
					badgeClass =
						"bg-blue-100 text-blue-700 border-2 border-blue-700";
					break;
				case "Cancelled":
					badgeClass =
						"bg-red-100 text-red-700 border-2 border-red-700";
					break;
				default:
					badgeClass =
						"bg-gray-100 text-gray-700 border-2 border-gray-700";
			}

			return (
				<span
					className={`inline-flex items-center justify-center min-w-[100px] px-3 py-1 text-xs font-medium rounded-full  ${badgeClass}`}
				>
					{status}
				</span>
			);
		},
	},
	{
		accessorKey: "dateCreated",
		header: "Date Created",
	},
	{
		id: "actions",
		header: "Actions",
		cell: ({ row }: { row: Row<JobOrder> }) => (
			<div className="flex items-center gap-2">
				<ActionModal
					type="edit"
					data={row.original}
					columns={modalColumns}
					nonEditableKeys={["id", "dateCreated"]}
					onSubmit={(updated) => console.log("Edited data:", updated)}
					options={{
						descriptions,
						cost,
						status,
						technicians,
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

const JobOrder = () => {
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
				table.setSorting([{ id: "dateCreated", desc: true }]);
				break;
			default:
				table.resetSorting();
				break;
		}

		setOpen(false);
	};

	return (
		<div className="flex flex-col py-10 px-5 bg-white gap-4">
			{/* Header Row */}
			<div className="flex flex-wrap justify-between items-center">
				<div className="flex items-center ">
					<h1 className="text-2xl font-bold">Job Order</h1>
					<ActionModal
						type="add"
						columns={modalColumns}
						nonEditableKeys={["id", "dateCreated"]}
						onSubmit={(newData) => console.log("Added:", newData)}
						options={{
							descriptions,
							cost,
							status,
							technicians,
						}}
						jobOrders={data} // ✅ Correct prop for your array
						trigger={
							<button className="p-2 cursor-pointer rounded">
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

export default JobOrder;
