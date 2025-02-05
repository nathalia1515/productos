            
const {response, request} = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const addCategoria = async (req=request, res=response)=> {

    // const email = req.body.email;
    // const password = req.body.password;

    const {nombre, descripcion } = req.body;
    
    const result = await prisma.categoria.create({
        data:{
            nombre,
            descripcion
        },
    }).catch((e)=>{
        return e.message;
    }).finally(async ()=> {
        await prisma.$disconnect();
    });

    res.status(201).json({
        result
    });
};

const ShowCategorias = async (req = request, res = response) => {
    const categoria = await prisma.categoria.findMany()
        .catch((e) => {
            return e.message;
        }).finally(async () => {
            await prisma.$disconnect();
        });

    res.status(200).json(categoria);
};


const UpdateCategoria =async(req=request, res=response)=> {
    
    const {id} = req.params;
    const {nombre, descripcion} = req.body;
    console.log('update ddd',req.body);
    const result = await prisma.categoria.update({
        where:{
            id: Number(id)
        },
        data: {
           nombre,
           descripcion
        }
    }).catch((e)=>{
        return e.message;
    }).finally(async ()=> {
        await prisma.$disconnect();
    });

    res.status(202).json({
        result
    });
};

const DeleteCategoria = async(req=request, res=response)=> {
    const {id} = req.params;
    const result = await prisma.categoria.delete({
        where:{
            id: Number(id)
        }
    }).catch((e)=>{
        return e.message;
    }).finally(async ()=> {
        await prisma.$disconnect();
    });

    res.status(204).json({
        result
    });
};

module.exports = {
    addCategoria,
    ShowCategorias,
    UpdateCategoria,
    DeleteCategoria,
    
}