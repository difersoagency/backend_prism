import prisma from "../../../../../../../lib/prisma";


export async function getProducts() {
    try {
        const products = await prisma.product.findMany({});

        return products;
    } catch (error) {
        console.log(error)

        return [];
    }
}

export async function getProductsById(id:string) {
    try {
        const products = await prisma.product.findFirst({
            where:{
                id: Number.parseInt(id)
            }
        })

        return products
    } catch (error) {
        console.log(error)

        return null
    }
}