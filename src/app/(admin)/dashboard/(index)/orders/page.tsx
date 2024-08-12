import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Link } from "lucide-react";
import React from "react";
import { columns } from "./columns";
import { getOrders } from "./lib/data";

export default async function OrderPage() {

    const data = await getOrders();
	return (
		<>
			<div className="flex items-center">
				<div className="mr-auto flex items-center gap-2">
					<h1 className="font-bold text-xl">Order List</h1>
				</div>
			</div>
            <DataTable columns={columns} data={data}/>
			
		</>
	);
}
