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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ActionResult } from "@/types";
import { ChevronLeft, PlusCircle, Upload } from "lucide-react";
import Link from "next/link";
import React, { ReactNode } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { postProduct, updateProduct } from "../lib/action";
import UploadFile from "./upload-file";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Product } from "@prisma/client";

const initialState: ActionResult = {
	error: "",
};

interface FormProductProps {
	children: ReactNode;
	type?: 'ADD' | 'EDIT'
	data?: Product | null
}


function SubmitButton() {
	const { pending } = useFormStatus();
	return (
		<Button size="sm" disabled={pending}>
			{pending ? "Loading...." : "Save Product"}
		</Button>
	);
}

export default function FormProduct({ children, data = null, type='ADD' }: FormProductProps) {
	const updateProductWithId = (_:unknown, formData: FormData) => updateProduct(_, formData,data?.id)
	const [state, formAction] = useFormState(type === 'ADD' ? postProduct : updateProductWithId, initialState);
	return (
		<>
			<form action={formAction}>
				<div className="flex items-center gap-4 mb-7">
					<Button
						variant="outline"
						size="icon"
						className="h-7 w-7"
					>
						<Link href="/dashboard/products">
							<ChevronLeft className="h-4 w-4" />
							<span className="sr-only">Back</span>
						</Link>
					</Button>
					<h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
						Create New Product
					</h1>
					<div className="hidden items-center gap-2 md:ml-auto md:flex">
						<SubmitButton />
					</div>
				</div>
				<div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
					<div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
						<Card x-chunk="dashboard-07-chunk-0">
							<CardHeader>
								<CardTitle>Product Details</CardTitle>
								<CardDescription>
									Lipsum dolor sit amet, consectetur adipiscing elit
								</CardDescription>
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
										<Label htmlFor="name">Name</Label>
										<Input
											id="name"
											name="name"
											type="text"
											className="w-full"
											defaultValue={data?.name}
										/>
									</div>
									<div className="grid gap-3">
										<Label htmlFor="description">Description</Label>
										<Textarea
											id="description"
											name="description"
											className="min-h-32"
											defaultValue={data?.description}
										/>
									</div>

									<div className="grid gap-3">
										<Label htmlFor="stock">Product Stock</Label>
										<Select name="stock" defaultValue={data?.stock}>
											<SelectTrigger id="stock" aria-label="Select stock">
												<SelectValue placeholder={data?.stock} />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="ready">Ready</SelectItem>
												<SelectItem value="preorder">Pre-Order</SelectItem>
											</SelectContent>
										</Select>
									</div>
									<div className="grid gap-3">
										<Label htmlFor="price">Price</Label>
										<Input
											id="price"
											name="price"
											type="text"
											className="w-full"
											defaultValue={data?.price.toString()}
										/>
									</div>
								</div>
							</CardContent>
						</Card>
						<Card x-chunk="dashboard-07-chunk-2">
							<CardHeader>
								<CardTitle>Product Category</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="grid gap-6 sm:grid-cols-3">{children}</div>
							</CardContent>
						</Card>
					</div>
					<div className="grid auto-rows-max items-start gap-4 lg:gap-8">
						<UploadFile data={data} type={type}/>
					</div>
				</div>
			</form>
		</>
	);
}
