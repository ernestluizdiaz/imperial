import { Card, CardContent } from "@/components/ui/card";

export function AuthCard({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex min-h-screen items-center justify-center bg-[url('/img/bg.png')] bg-cover bg-center bg-no-repeat">
			<div className="w-full max-w-md">
				<Card className="p-6 shadow-xl rounded-2xl bg-white/95 backdrop-blur">
					<CardContent className="space-y-4">{children}</CardContent>
				</Card>
			</div>
		</div>
	);
}
