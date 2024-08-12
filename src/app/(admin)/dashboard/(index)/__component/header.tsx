import Link from "next/link";
import {
	Activity,
	ArrowUpRight,
	CircleUser,
	CreditCard,
	DollarSign,
	Menu,
	Package2,
	Search,
	Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import React from "react";
import LogoutBtn from "./logout";
import Image from "next/image";
import { getImageUrl } from "@/lib/supabase";

export default function Header() {
	return (
		<header className="sticky z-30 top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
			<nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
				<Link
					href="#"
					className=""
				>
					
					<Image
					src={getImageUrl('logo.png', 'index')}
					alt="Image"
					width={400}
					height={400}
					className="w-[4vw] max-w-[3vw]"
					/>
					<span className="sr-only">Acme Inc</span>
				</Link>
				<Link
					href="/dashboard"
					className="text-foreground transition-colors hover:text-foreground"
				>
					Dashboard
				</Link>
				<Link
					href="/dashboard/orders"
					className="text-muted-foreground transition-colors hover:text-foreground"
				>
					Orders
				</Link>
				<Link
					href="/dashboard/products"
					className="text-muted-foreground transition-colors hover:text-foreground"
				>
					Products
				</Link>
				<Link
					href="/dashboard/brands"
					className="text-muted-foreground transition-colors hover:text-foreground"
				>
					Brands
				</Link>
				<Link
					href="/dashboard/categories"
					className="text-muted-foreground transition-colors hover:text-foreground"
				>
					Categories
				</Link>
				<Link
					href="/dashboard/location"
					className="text-muted-foreground transition-colors hover:text-foreground"
				>
					Location
				</Link>
				<Link
					href="/dashboard/users"
					className="text-muted-foreground transition-colors hover:text-foreground"
				>
					Users
				</Link>
			</nav>
			<Sheet>
				<SheetTrigger asChild>
					<Button variant="outline" size="icon" className="shrink-0 md:hidden">
						<Menu className="h-5 w-5" />
						<span className="sr-only">Toggle navigation menu</span>
					</Button>
				</SheetTrigger>
				<SheetContent side="left">
					<nav className="grid gap-6 text-lg font-medium">
						<Link
							href="#"
							className="flex items-center gap-2 text-lg font-semibold"
						>
							<Package2 className="h-6 w-6" />
							<span className="sr-only">Acme Inc</span>
						</Link>
						<Link href="/dashboard" className="hover:text-foreground">
							Dashboard
						</Link>
						<Link
							href="/dashboard/orders"
							className="text-muted-foreground hover:text-foreground"
						>
							Orders
						</Link>
						<Link
							href="/dashboard/products"
							className="text-muted-foreground hover:text-foreground"
						>
							Products
						</Link>
						<Link
							href="/dashboard/brands"
							className="text-muted-foreground hover:text-foreground"
						>
							Brands
						</Link>
						<Link
							href="/dashboard/categories"
							className="text-muted-foreground hover:text-foreground"
						>
							Categories
						</Link>
						<Link
							href="/dashboard/location"
							className="text-muted-foreground hover:text-foreground"
						>
							Location
						</Link>
						<Link
							href="/dashboard/users"
							className="text-muted-foreground hover:text-foreground"
						>
							Users
						</Link>
						
					</nav>
				</SheetContent>
			</Sheet>
			<div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
				<form className="ml-auto flex-1 sm:flex-initial">
					<div className="relative">
						<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
						<Input
							type="search"
							placeholder="Search products..."
							className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
						/>
					</div>
				</form>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="secondary" size="icon" className="rounded-full">
							<CircleUser className="h-5 w-5" />
							<span className="sr-only">Toggle user menu</span>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>My Account</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem>Settings</DropdownMenuItem>
						<DropdownMenuItem>Support</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem>
                            <LogoutBtn/>
                        </DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</header>
	);
}
