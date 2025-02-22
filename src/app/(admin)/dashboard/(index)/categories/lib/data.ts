import prisma from "../../../../../../../lib/prisma";

export async function getCategories() {
    try {
        const categories = await prisma.category.findMany({});

        return categories;
    } catch(error) {
        console.log(error)

        return [];
    }
}

export async function getCategoriesById(id:string) {
    try {
        const categories = await prisma.category.findFirst({
            where: {
                id: Number.parseInt(id)
            }
        })

        return categories
    } catch (error) {
        console.log(error)

        return null
    }
}