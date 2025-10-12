"use client";
import React from "react";
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
} from "@tanstack/react-table";

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
    cell: ({ row }: { row: import("@tanstack/react-table").Row<Customer> }) => {
      const status = row.original.status;
      const active = status === "Active";
      return (
        <span
          className={`px-3 py-1 text-xs font-medium rounded-full ${
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
    cell: () => (
      <div className="flex items-center gap-2">
        <button className="p-1  hover:text-green-700">
          <Pencil size={16} />
        </button>
        <button className="p-1  hover:text-red-600 ">
          <Trash2 size={16} />
        </button>
      </div>
    ),
  },
];

const Masterlist = () => {
  const { setOpen } = useMenu();
  const table = useReactTable<Customer>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div className="flex flex-col py-10 px-5 bg-white gap-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-[18px]">
          <h1 className="text-2xl font-bold">Masterlist Test </h1>
          <button>
            <CirclePlus size={24} />
          </button>
        </div>
        <div>
          <button
            onClick={() => setOpen(true)}
            className="p-2 lg:hidden rounded-md hover:bg-gray-100"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="relative w-[300px]">
          <Search
            size={20}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
          />
          <Input type="search" placeholder="Search" className="pl-10" />
        </div>
        <div className="flex items-center gap-2">
          <div className="flex  items-center">
            <p className="text-md text-gray-500"> 1 - 10 of 52 </p>
            <button className=" pl-2">
              <ChevronLeft size={20} />
            </button>
            <button>
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="h-8 border-1 border-gray-300 mx-2" />

          <div className="flex items-center gap-3">
            <button>
              <Funnel size={20} />
            </button>
            <button>
              <Download size={20} />
            </button>
          </div>
        </div>
      </div>
      <div>
        <table className="min-w-full border-b border-gray-300 text-sm text-gray-700">
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
                  <td key={cell.id} className="px-4 py-2 align-middle">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
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
