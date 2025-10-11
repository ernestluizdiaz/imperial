import SideNav from "./(components)/sidenav";
export default function Home() {
	return (
		<div className="flex min-h-screen">
			<SideNav />
			<div className="flex-1 py-10 px-5 bg-white">
				<h1 className="text-3xl font-bold">Test</h1>
			</div>
		</div>
	);
}
