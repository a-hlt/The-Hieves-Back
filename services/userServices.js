import prisma from "prisma";

export const create = async (data) => {
    return await prisma.user.create({
        data: data,
    });
}


export const getUserByUuid = async (uuid) => {
    return await prisma.user.findUnique({
        where: {
            uuid: uuid,
        },
    });
}

export const updateUserByUuid = async (uuid, data) => {
    return await prisma.user.update({
        where: {
            uuid: uuid,
        },
        data: data,
    });
}

export const deleteUserByUuid = async (uuid) => {
    return await prisma.user.delete({
        where: {
            uuid: uuid,
        },
    });
}

