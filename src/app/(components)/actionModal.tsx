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
import {
	Select,
	SelectTrigger,
	SelectContent,
	SelectItem,
	SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronDownIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

type Column<T> = {
	accessorKey?: keyof T;
	header?: string;
};

type ActionModalProps<T extends Record<string, string | string[] | number>> = {
	type: "add" | "edit" | "delete";
	onSubmit: (data: T) => void;
	data?: T;
	trigger: React.ReactNode;
	columns?: Column<T>[];
	nonEditableKeys?: (keyof T)[];
	options?: {
		descriptions?: string[];
		cost?: string[];
		status?: string[];
		technicians?: string[];
		masterListStatus?: string[];
		paymentDate?: string[];
		PMStatus?: string[];
		mop?: string[];
		remarks?: string[];
		amountPaid?: string[];
	};
};

type HandleInputChange<T> = (e: {
	target: { name: keyof T; value: string | string[] };
}) => void;

export function ActionModal<
	T extends Record<string, string | string[] | number>
>({
	type,
	onSubmit,
	data,
	trigger,
	columns,
	nonEditableKeys,
	options,
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

	const handleInputChange: HandleInputChange<T> = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
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
			<DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
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
												key === "registeredDate" ||
												key === "dateCreated")
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

											{key === "technician" ? (
												// ✅ Technicians from props
												<div className="grid grid-cols-2 gap-2 mt-2">
													{(
														options?.technicians ??
														[]
													).map((tech) => {
														const isChecked = (
															formData[
																key as keyof T
															] as string[]
														).includes(tech);
														return (
															<div
																key={tech}
																className="flex items-center space-x-2"
															>
																<Checkbox
																	checked={
																		isChecked
																	}
																	onCheckedChange={(
																		checked
																	) => {
																		const current =
																			formData[
																				key as keyof T
																			] as string[];
																		const updated =
																			checked
																				? [
																						...current,
																						tech,
																				  ]
																				: current.filter(
																						(
																							t
																						) =>
																							t !==
																							tech
																				  );

																		handleInputChange(
																			{
																				target: {
																					name: key as keyof T,
																					value: updated,
																				},
																			}
																		);
																	}}
																/>
																<span className="text-sm">
																	{tech}
																</span>
															</div>
														);
													})}
												</div>
											) : key === "description" ? (
												// ✅ Descriptions from props
												<div className="mt-1">
													<Select
														onValueChange={(
															newValue
														) =>
															handleInputChange({
																target: {
																	name: key as keyof T,
																	value: newValue,
																},
															})
														}
														value={
															formData[
																key as keyof T
															] as string
														}
													>
														<SelectTrigger className="w-full">
															<SelectValue placeholder="Select Description" />
														</SelectTrigger>
														<SelectContent>
															{(
																options?.descriptions ??
																[]
															).map((desc) => (
																<SelectItem
																	key={desc}
																	value={desc}
																>
																	{desc}
																</SelectItem>
															))}
														</SelectContent>
													</Select>
												</div>
											) : key === "cost" ? (
												// ✅ Cost from props
												<div className="mt-1">
													<Select
														onValueChange={(
															newValue
														) =>
															handleInputChange({
																target: {
																	name: key as keyof T,
																	value: newValue,
																},
															})
														}
														value={
															formData[
																key as keyof T
															] as string
														}
													>
														<SelectTrigger className="w-full">
															<SelectValue placeholder="Select Cost" />
														</SelectTrigger>
														<SelectContent>
															{(
																options?.cost ??
																[]
															).map((c) => (
																<SelectItem
																	key={c}
																	value={c}
																>
																	{c ===
																	"Free"
																		? c
																		: `₱${c}`}
																</SelectItem>
															))}
														</SelectContent>
													</Select>
												</div>
											) : key === "status" ? (
												// ✅ Status from props
												<div className="mt-1">
													<Select
														onValueChange={(
															newValue
														) =>
															handleInputChange({
																target: {
																	name: key as keyof T,
																	value: newValue,
																},
															})
														}
														value={
															formData[
																key as keyof T
															] as string
														}
													>
														<SelectTrigger className="w-full">
															<SelectValue placeholder="Select Status" />
														</SelectTrigger>
														<SelectContent>
															{(
																options?.status ??
																[]
															).map((s) => (
																<SelectItem
																	key={s}
																	value={s}
																>
																	{s}
																</SelectItem>
															))}
														</SelectContent>
													</Select>
												</div>
											) : key === "masterListstatus" ? (
												// ✅ Status from props
												<div className="mt-1">
													<Select
														onValueChange={(
															newValue
														) =>
															handleInputChange({
																target: {
																	name: key as keyof T,
																	value: newValue,
																},
															})
														}
														value={
															formData[
																key as keyof T
															] as string
														}
													>
														<SelectTrigger className="w-full">
															<SelectValue placeholder="Select Status" />
														</SelectTrigger>
														<SelectContent>
															{(
																options?.masterListStatus ??
																[]
															).map((s) => (
																<SelectItem
																	key={s}
																	value={s}
																>
																	{s}
																</SelectItem>
															))}
														</SelectContent>
													</Select>
												</div>
											) : key === "paymentDate" ? (
												<div className="mt-1">
													<Popover>
														<PopoverTrigger asChild>
															<Button
																variant="outline"
																className="w-full justify-between font-normal"
															>
																{formData[
																	key as keyof T
																]
																	? new Date(
																			formData[
																				key as keyof T
																			] as string
																	  ).toLocaleDateString()
																	: "Select date"}
																<ChevronDownIcon className="h-4 w-4 opacity-70" />
															</Button>
														</PopoverTrigger>
														<PopoverContent
															className="w-auto overflow-hidden p-0"
															align="start"
														>
															<Calendar
																mode="single"
																selected={
																	formData[
																		key as keyof T
																	]
																		? new Date(
																				formData[
																					key as keyof T
																				] as string
																		  )
																		: undefined
																}
																captionLayout="dropdown"
																onSelect={(
																	date
																) =>
																	handleInputChange(
																		{
																			target: {
																				name: key as keyof T,
																				value: date
																					? date.toISOString()
																					: "",
																			},
																		}
																	)
																}
															/>
														</PopoverContent>
													</Popover>
												</div>
											) : key === "PMStatus" ? (
												// ✅ Status from props
												<div className="mt-1">
													<Select
														onValueChange={(
															newValue
														) =>
															handleInputChange({
																target: {
																	name: key as keyof T,
																	value: newValue,
																},
															})
														}
													>
														<SelectTrigger className="w-full">
															<SelectValue placeholder="Select Status" />
														</SelectTrigger>
														<SelectContent>
															{(
																options?.PMStatus ??
																[]
															).map((s) => (
																<SelectItem
																	key={s}
																	value={s}
																>
																	{s}
																</SelectItem>
															))}
														</SelectContent>
													</Select>
												</div>
											) : key === "mop" ? (
												// ✅ Status from props
												<div className="mt-1">
													<Select
														onValueChange={(
															newValue
														) =>
															handleInputChange({
																target: {
																	name: key as keyof T,
																	value: newValue,
																},
															})
														}
													>
														<SelectTrigger className="w-full">
															<SelectValue placeholder="Select Mode of Payment" />
														</SelectTrigger>
														<SelectContent>
															{(
																options?.mop ??
																[]
															).map((s) => (
																<SelectItem
																	key={s}
																	value={s}
																>
																	{s}
																</SelectItem>
															))}
														</SelectContent>
													</Select>
												</div>
											) : key === "remarks" ? (
												// ✅ Status from props
												<div className="mt-1">
													<Select
														onValueChange={(
															newValue
														) =>
															handleInputChange({
																target: {
																	name: key as keyof T,
																	value: newValue,
																},
															})
														}
													>
														<SelectTrigger className="w-full">
															<SelectValue placeholder="Select Remarks" />
														</SelectTrigger>
														<SelectContent>
															{(
																options?.remarks ??
																[]
															).map((s) => (
																<SelectItem
																	key={s}
																	value={s}
																>
																	{s}
																</SelectItem>
															))}
														</SelectContent>
													</Select>
												</div>
											) : key === "amountPaid" ? (
												// ✅ Status from props
												<div className="mt-1">
													<Select
														onValueChange={(
															newValue
														) =>
															handleInputChange({
																target: {
																	name: key as keyof T,
																	value: newValue,
																},
															})
														}
														value={
															formData[
																key as keyof T
															] as string
														}
													>
														<SelectTrigger className="w-full">
															<SelectValue placeholder="Select Amount" />
														</SelectTrigger>
														<SelectContent>
															{(
																options?.amountPaid ??
																[]
															).map((s) => (
																<SelectItem
																	key={s}
																	value={s}
																>
																	{s}
																</SelectItem>
															))}
														</SelectContent>
													</Select>
												</div>
											) : (
												// ✅ Default Input
												<Input
													name={key}
													value={
														formData[key as keyof T]
													}
													onChange={handleInputChange}
													className={`mt-1 ${
														isReadOnly
															? "bg-gray-100 cursor-not-allowed"
															: ""
													}`}
													readOnly={isReadOnly}
												/>
											)}
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
