"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";

interface PasswordInputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {}

export function PasswordInput(props: PasswordInputProps) {
	const [show, setShow] = useState(false);

	return (
		<div className="relative">
			<Input
				type={show ? "text" : "password"}
				{...props}
				className="pr-10"
			/>
			<button
				type="button"
				onClick={() => setShow((prev) => !prev)}
				className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
			>
				{show ? <EyeOff size={18} /> : <Eye size={18} />}
			</button>
		</div>
	);
}
