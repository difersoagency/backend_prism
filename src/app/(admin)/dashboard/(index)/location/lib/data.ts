import prisma from "../../../../../../../lib/prisma";

export async function getLocation() {
    try {
        const location = await prisma.location.findMany({});

        return location;
    } catch(error) {
        console.log(error)

        return [];
    }
}

export async function getLocationById(id:string) {
    try {
        const location = await prisma.location.findFirst({
            where: {
                id: Number.parseInt(id)
            }
        })

        return location
    } catch (error) {
        console.log(error)

        return null
    }
}