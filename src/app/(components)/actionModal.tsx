"use client";

import * as React from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Column<T> = {
	accessorKey?: keyof T;
	header?: string;
};

type ActionModalProps<T extends Record<string, string | number>> = {
	type: "add" | "edit" | "delete";
	onSubmit: (data: T) => void;
	data?: T;
	trigger: React.ReactNode;
	columns?: Column<T>[];
	nonEditableKeys?: (keyof T)[];
};

export function ActionModal<T extends Record<string, string | number>>({
	type,
	onSubmit,
	data,
	trigger,
	columns,
	nonEditableKeys,
}: ActionModalProps<T>) {
	const [open, setOpen] = React.useState(false);
	const [formData, setFormData] = React.useState<T>(data as T);

	React.useEffect(() => {
		if (type === "add" && columns) {
			const emptyData = {} as T;
			columns.forEach((col) => {
				if (col.accessorKey)
					emptyData[col.accessorKey] = "" as T[keyof T];
			});
			setFormData(emptyData);
		} else {
			setFormData(data as T);
		}
	}, [data, type, columns]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value } as T);
	};

	const handleSubmit = () => {
		onSubmit(formData);
		setOpen(false);
	};

	const titleMap: Record<string, string> = {
		add: "Add New Record",
		edit: "Edit Record",
		delete: "Confirm Delete",
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<DialogContent className="sm:max-w-lg">
				<DialogHeader>
					<DialogTitle>{titleMap[type]}</DialogTitle>
				</DialogHeader>

				{type === "delete" ? (
					<p>Are you sure you want to delete this record?</p>
				) : (
					<div className="space-y-4">
						{formData &&
							Object.keys(formData)
								.filter(
									(key) =>
										// hide id and registeredDate when adding
										!(
											type === "add" &&
											(key === "id" ||
												key === "registeredDate")
										)
								)
								.map((key) => {
									const column = columns?.find(
										(col) => col.accessorKey === key
									);
									const label = column?.header || key;
									const isReadOnly =
										nonEditableKeys?.includes(
											key as keyof T
										);

									return (
										<div key={key}>
											<label className="block text-sm font-medium text-gray-700">
												{label}
											</label>
											<Input
												name={key}
												value={formData[key as keyof T]}
												onChange={handleChange}
												className={`mt-1 ${
													isReadOnly
														? "bg-gray-100 cursor-not-allowed"
														: ""
												}`}
												readOnly={isReadOnly}
											/>
										</div>
									);
								})}
					</div>
				)}

				<DialogFooter className="space-x-2">
					<Button variant="outline" onClick={() => setOpen(false)}>
						Cancel
					</Button>
					<Button
						className={type === "delete" ? "bg-red-600" : ""}
						onClick={handleSubmit}
					>
						{type === "add"
							? "Add"
							: type === "edit"
							? "Save"
							: "Delete"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

export default ActionModal;
