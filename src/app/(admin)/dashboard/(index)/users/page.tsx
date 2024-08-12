import React from "react";
import FormUser from "./component/form-user";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { columns, columnsCust } from "./columns";
import { getCust, getUser } from "./lib/data";

export default async function UserPage() {
	const data = await getUser();
    const user = await getCust();

	return (
		<>
			<div className="flex items-center">
				<div className="mr-auto flex items-center gap-2">
					<h1 className="font-bold text-xl">Admin List</h1>
				</div>
			</div>
			<DataTable columns={columns} data={data} />

            <div className="flex items-center mt-3">
				<div className="mr-auto flex items-center gap-2">
					<h1 className="font-bold text-xl">Customer List</h1>
				</div>
			</div>
			<DataTable columns={columnsCust} data={user} />

            
		</>
	);
}
