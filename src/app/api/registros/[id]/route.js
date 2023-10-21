import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

//En este get solo obtenemos datos de uno por uno.
export async function GET(request, { params: { id } }) {
    try {
        const estudiante = await prisma.estudiante.findFirst({
            where: {
                id: Number(id)
            }
        })
        if (!estudiante)
            return NextResponse.json({
                mensaje: 'Estudiante no existe', status: 404
            })
        else {
            return NextResponse.json(estudiante)
        }
    } catch (error) {
        if (error instanceof Error)
            return NextResponse.json(error.message, { status: 500 })

    }
}

export async function DELETE(request, {params:{id}}) {
    try {
    const deleteStudent = await prisma.estudiante.delete({
        where:{
            id: Number(id)
        }
    })
    return NextResponse.json({
        mensaje: 'ELIMINANDO BASURA >:('
    })
    } catch (error) {
        if (error instanceof Error)
            return NextResponse.json(error.message, { status: 500 })

    }

}

export async function PUT(request,{params:{id}}) {
    const {nombre, genero, edad, carrera} = await request.json()
    try {
        const updateStudent = await prisma.estudiante.update({
            where:{
                id: Number(id)
            },
            data: {
                nombre,
                genero,
                edad,
                carrera,
            }
        })
        return NextResponse.json({
            mensaje: 'ALUMNO ACTUALIZADO:D'
        })
        } catch (error) {
            if (error instanceof Error)
                return NextResponse.json(error.message, { status: 500 })
    
        }
}