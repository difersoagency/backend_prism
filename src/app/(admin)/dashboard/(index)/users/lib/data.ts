import prisma from "../../../../../../../lib/prisma";
import { TColumns } from "../columns";

export async function getUser() {
    try {
        const user = await prisma.user.findMany({});
        return user;
    } catch (error) {
        console.log(error)
        return[];
    }
}

export async function getCust() {
    try {
        const cust = await prisma.user.findMany({
            where: {
                role: 'customer'
            },
            include:{
                _count:{
                    select:{
                        order:true
                    }
                }
            }
        });

        const response: TColumns[] = cust.map((customer) => {
            return{
                id:customer.id,
                name: customer.name,
                email: customer.email,
                total: customer._count.order
            }
        })
        return response;
    } catch (error) {
        console.log(error)
        return[];
    }
}