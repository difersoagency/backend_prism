import prisma from "../../../../../../../lib/prisma";

export async function getBrands() {
    try {
        const brand = await prisma.brand.findMany({});

        return brand;
    } catch (error) {
        console.log(error);

        return[];
    }
}

export async function getBrandsById(id: string) {
    try {
        const brands = await prisma.brand.findFirst({
            where: {
                id: Number.parseInt(id)
            }
        })

        return brands
    } catch (error) {
        console.log(error)

        return null
    }
}