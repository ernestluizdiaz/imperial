"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { AuthCard } from "@/app/(auth)/AuthCard";
import { PasswordInput } from "@/app/(auth)/PasswordInput";

const loginSchema = z.object({
	username: z.string().min(1, "Username is required"),
	password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
	const form = useForm<LoginFormValues>({
		resolver: zodResolver(loginSchema),
		defaultValues: { username: "", password: "" },
	});

	const onSubmit = (data: LoginFormValues) => {
		console.log("Login data:", data);
		alert("Login submitted!");
	};

	return (
		<AuthCard>
			<h2 className="text-2xl font-semibold text-[#001f3f]">Sign In</h2>

			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-4"
				>
					{/* Username */}
					<FormField
						control={form.control}
						name="username"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Username</FormLabel>
								<FormControl>
									<Input placeholder="Username" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Password */}
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<PasswordInput
										placeholder="Password"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<div className="flex justify-end">
						<Link
							href="#"
							className="text-sm text-gray-500 hover:underline"
						>
							Forgot password?
						</Link>
					</div>

					<Button type="submit" className="w-full">
						Log In
					</Button>

					<div className="text-center text-sm text-gray-400">or</div>

					<Button variant="outline" className="w-full" asChild>
						<Link href="/signup">Create an account</Link>
					</Button>
				</form>
			</Form>
		</AuthCard>
	);
}
