"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import React from "react";
import { Login } from "../lib/action";
import { ActionResult } from "@/types";
import { useFormState, useFormStatus } from "react-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// import { ExclamationTriangleIcon } from "@radix-ui/react-icons"

const initialState: ActionResult = {
	error: "",
};

function SubmitButton() {
	const { pending } = useFormStatus();

	return (
		<Button type="submit" className="w-full bg-[#0300ff]" disabled={pending}>
			{pending ? "Loading" : "Sign In"}
		</Button>
	);
}

export default function Form() {
	const [state, formAction] = useFormState(Login, initialState);

	console.log(state);
	return (
		<>
			{/* <div className="bg-black w-full h-full absolute"></div> */}
			<form action={formAction} className="relative z-20">
				<Card className="w-full max-w-sm border-[#0300ff]">
					<CardHeader>
						<CardTitle className="text-2xl">Login</CardTitle>
						<CardDescription>
							Enter your email below to login to your account.
						</CardDescription>
					</CardHeader>
					<CardContent className="grid gap-4">
						{state.error !== "" && (
							<Alert variant="destructive">
								<AlertTitle>Error</AlertTitle>
								<AlertDescription>{state.error}</AlertDescription>
							</Alert>
						)}

						<div className="grid gap-2">
							<Label htmlFor="email">Email</Label>
							<Input
								name="email"
								id="email"
								type="email"
								placeholder="m@example.com"
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="password">Password</Label>
							<Input name="password" id="password" type="password" />
						</div>
					</CardContent>
					<CardFooter>
						<SubmitButton />
					</CardFooter>
				</Card>
			</form>
		</>
	);
}
function userFormState(
	Login: (_: unknown, formData: FormData) => Promise<ActionResult>,
	initialState: ActionResult
): [any, any] {
	throw new Error("Function not implemented.");
}
