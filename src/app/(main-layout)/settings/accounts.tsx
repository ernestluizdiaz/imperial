import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Eye, EyeClosed, Check, X } from "lucide-react";

const TextField = ({
	id,
	label,
	type = "text",
	value,
	placeholder,
	onChange,
	className = "",
}: {
	id: string;
	label: string;
	type?: string;
	value: string;
	placeholder?: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	className?: string;
}) => (
	<div className={`space-y-2 ${className}`}>
		<Label htmlFor={id}>{label}</Label>
		<Input
			id={id}
			type={type}
			value={value}
			onChange={onChange}
			placeholder={placeholder}
		/>
	</div>
);

const PasswordField = ({
	id,
	label,
	value,
	placeholder,
	show,
	onToggle,
	onFocus,
	onBlur,
	onChange,
}: {
	id: string;
	label: string;
	value: string;
	placeholder?: string;
	show: boolean;
	onToggle: () => void;
	onFocus?: () => void;
	onBlur?: () => void;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
	<div className="space-y-2">
		<Label htmlFor={id}>{label}</Label>
		<div className="relative">
			<Input
				id={id}
				type={show ? "text" : "password"}
				value={value}
				onChange={onChange}
				onFocus={onFocus} // ✅ forward to input
				onBlur={onBlur} // ✅ forward to input
				placeholder={placeholder}
				className="pr-10"
			/>
			<button
				type="button"
				onClick={onToggle}
				className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
			>
				{show ? (
					<Eye className="h-4 w-4" />
				) : (
					<EyeClosed className="h-4 w-4" />
				)}
			</button>
		</div>
	</div>
);

const Accounts = () => {
	const [formData, setFormData] = useState({
		firstName: "Robin",
		lastName: "Salcedo",
		username: "robinsalcedo",
		email: "robinsalcedo@gmail.com",
		role: "Admin",
		currentPassword: "",
		newPassword: "",
		confirmPassword: "",
	});

	const [showPassword, setShowPassword] = useState({
		current: false,
		new: false,
		confirm: false,
	});

	const handleChange = (key: string, value: string) =>
		setFormData((prev) => ({ ...prev, [key]: value }));

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log("Updated info:", formData);
	};

	const password = formData.newPassword;
	const { newPassword, confirmPassword } = formData;
	const requirements = [
		{
			label: "At least 8 characters long",
			valid: password.length >= 8,
		},
		{
			label: "Contains an uppercase letter",
			valid: /[A-Z]/.test(password),
		},
		{
			label: "Contains a lowercase letter",
			valid: /[a-z]/.test(password),
		},
		{
			label: "Contains a number",
			valid: /\d/.test(password),
		},
		{
			label: "Contains a special character (!@#$%^&*)",
			valid: /[!@#$%^&*]/.test(password),
		},
		{
			label: "Passwords match",
			valid: newPassword !== "" && newPassword === confirmPassword,
		},
	];

	const [showRequirements, setShowRequirements] = useState(false);
	return (
		<div className="mt-6 mx-5 sm:mx-20 max-w-[85rem] space-y-10">
			{/* Personal Information */}
			<Section
				title="Personal Information"
				description="Use a permanent address where you can receive mail."
			>
				<form onSubmit={handleSubmit} className="space-y-6">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<TextField
							id="firstName"
							label="First Name"
							value={formData.firstName}
							placeholder="Enter first name"
							onChange={(e) =>
								handleChange("firstName", e.target.value)
							}
						/>
						<TextField
							id="lastName"
							label="Last Name"
							value={formData.lastName}
							placeholder="Enter last name"
							onChange={(e) =>
								handleChange("lastName", e.target.value)
							}
						/>
						<TextField
							id="username"
							label="Username"
							value={formData.username}
							placeholder="Enter username"
							className="md:col-span-2"
							onChange={(e) =>
								handleChange("username", e.target.value)
							}
						/>
						<TextField
							id="email"
							label="Email Address"
							type="email"
							value={formData.email}
							placeholder="Enter email"
							className="md:col-span-2"
							onChange={(e) =>
								handleChange("email", e.target.value)
							}
						/>

						{/* Role */}
						<div className="md:col-span-2 space-y-2">
							<Label htmlFor="role">Role</Label>
							<Select
								onValueChange={(value) =>
									handleChange("role", value)
								}
								value={formData.role}
							>
								<SelectTrigger className="w-full">
									<SelectValue placeholder="Select a Role" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="Admin">Admin</SelectItem>
									<SelectItem value="Technician">
										Technician
									</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>

					<div className="flex justify-end">
						<Button type="submit" className="bg-black text-white">
							Update Info
						</Button>
					</div>
				</form>
			</Section>

			{/* Change Password */}
			<Section
				title="Change Password"
				description="Update your password associated with your account."
			>
				<form onSubmit={handleSubmit} className="space-y-6">
					<PasswordField
						id="currentPassword"
						label="Current Password"
						value={formData.currentPassword}
						show={showPassword.current}
						onToggle={() =>
							setShowPassword((prev) => ({
								...prev,
								current: !prev.current,
							}))
						}
						onChange={(e) =>
							handleChange("currentPassword", e.target.value)
						}
						placeholder="Enter current password"
					/>

					{/* Show requirements only when user focuses on new/confirm field */}
					<PasswordField
						id="newPassword"
						label="New Password"
						value={formData.newPassword}
						show={showPassword.new}
						onFocus={() => setShowRequirements(true)}
						onBlur={() => setShowRequirements(false)}
						onToggle={() =>
							setShowPassword((prev) => ({
								...prev,
								new: !prev.new,
							}))
						}
						onChange={(e) =>
							handleChange("newPassword", e.target.value)
						}
						placeholder="Enter new password"
					/>

					<PasswordField
						id="confirmPassword"
						label="Confirm Password"
						value={formData.confirmPassword}
						show={showPassword.confirm}
						onFocus={() => setShowRequirements(true)}
						onBlur={() => setShowRequirements(false)}
						onToggle={() =>
							setShowPassword((prev) => ({
								...prev,
								confirm: !prev.confirm,
							}))
						}
						onChange={(e) =>
							handleChange("confirmPassword", e.target.value)
						}
						placeholder="Re-enter new password"
					/>

					{/* ✅ Dynamic password requirements (only visible when focused) */}
					{showRequirements && (
						<div className="text-sm text-gray-700 mt-2 space-y-1 animate-fade-in">
							<p className="font-medium text-gray-800">
								Password requirements:
							</p>
							<ul className="list-none space-y-1">
								{requirements.map((req, i) => (
									<li
										key={i}
										className="flex items-center gap-2"
									>
										{req.valid ? (
											<Check className="w-4 h-4 text-green-600" />
										) : (
											<X className="w-4 h-4 text-red-600" />
										)}
										<span
											className={
												req.valid
													? "text-green-600"
													: "text-red-600"
											}
										>
											{req.label}
										</span>
									</li>
								))}
							</ul>
						</div>
					)}

					<div className="flex justify-end">
						<Button
							type="submit"
							className="bg-black text-white disabled:opacity-50"
							disabled={!requirements.every((r) => r.valid)}
						>
							Update Password
						</Button>
					</div>
				</form>
			</Section>
		</div>
	);
};

const Section = ({
	title,
	description,
	children,
}: {
	title: string;
	description: string;
	children: React.ReactNode;
}) => (
	<div className="flex flex-col md:flex-row md:gap-40 gap-10 border-t border-gray-200 pt-7 first:border-t-0 first:pt-0">
		<div className="md:w-1/3">
			<h2 className="font-bold text-lg">{title}</h2>
			<p className="text-gray-600 text-sm">{description}</p>
		</div>
		<div className="md:w-2/3">{children}</div>
	</div>
);

export default Accounts;
