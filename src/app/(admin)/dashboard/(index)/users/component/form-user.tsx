"use client";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useFormState, useFormStatus } from "react-dom";
import { ActionResult } from "@/types";
import { postUser } from "../lib/action";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const initialState: ActionResult = {
	error: "",
};

function SubmitButton() {
	const { pending } = useFormStatus();

	return (
		<Button size="sm" disabled={pending}>
			{pending ? "Loading...." : "Save User"}
		</Button>
	);
}

export default function FormUser() {
	const [state, formAction] = useFormState(postUser, initialState);

	return (
		<form action={formAction}>
			<div className="flex items-center gap-4">
				<Button variant="outline" size="icon" className="h-7 w-7">
					<Link href="/dashboard/users">
						<ChevronLeft className="h-4 w-4" />
						<span className="sr-only">Back</span>
					</Link>
				</Button>
				<h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
					Create New User
				</h1>
				<div className="hidden items-center gap-2 md:ml-auto md:flex">
					<SubmitButton />
				</div>
			</div>
			<div className="mt-10">
				<Card x-chunk="dashboard-07-chunk-0">
					<CardHeader>
						<CardTitle>New User Detail</CardTitle>
						<CardDescription>Add new user to your team</CardDescription>
					</CardHeader>
					<CardContent>
						{state.error !== "" && (
							<Alert variant="destructive" className="mb-6">
								<AlertTitle>Error</AlertTitle>
								<AlertDescription>{state.error}</AlertDescription>
							</Alert>
						)}
						<div className="grid gap-6">
							<div className="grid gap-3">
								<Label htmlFor="name">User Name</Label>
								<Input
									id="name"
									type="text"
									className="w-full"
									name="name"
									//   defaultValue={data?.name}
								/>
							</div>
							<div className="grid gap-3">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									type="text"
									className="w-full"
									name="email"
									//   defaultValue={data?.name}
								/>
							</div>
							<div className="grid gap-3">
								<Label htmlFor="password">Password</Label>
								<Input
									id="password"
									type="password"
									className="w-full"
									name="password"
									//   defaultValue={data?.name}
								/>
							</div>
                            <div className="grid gap-3">
								<Label htmlFor="role">User Role</Label>
								<Select name="role" >
											<SelectTrigger id="role" aria-label="User Role">
												<SelectValue  />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="superadmin">Super Admin</SelectItem>
												<SelectItem value="customer">Customer</SelectItem>
											</SelectContent>
										</Select>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</form>
	);
}
