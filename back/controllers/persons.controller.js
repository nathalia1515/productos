            
const {response, request} = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const addPerson = async (req=request, res=response)=> {

    // const email = req.body.email;
    // const password = req.body.password;

    const {nombre, cedula, } = req.body;
console.log('usuaruiosdddd',req.body);
    const result = await prisma.person.create({
        data:{
            nombre,
            cedula
        }
    }).catch((e)=>{
        return e.message;
    }).finally(async ()=> {
        await prisma.$disconnect();
    });

    res.status(201).json({
        result
    });
};

const ShowPersons = async (req = request, res = response) => {
    const personas = await prisma.person.findMany()
        .catch((e) => {
            return e.message;
        }).finally(async () => {
            await prisma.$disconnect();
        });

    res.status(200).json(personas);
};

const ShowPerson = async(req=request, res=response)=> {

    const {id} = req.params;
    
    const result = await prisma.person.findFirst({
        where:{
            id: Number(id)
        }
    }).catch((e)=>{
        return e.message;
    }).finally(async ()=> {
        await prisma.$disconnect();
    });

    res.status(200).json({result});
};

const UpdatePerson =async(req=request, res=response)=> {
    
    const {id} = req.params;
    const {nombre, cedula} = req.body;
    const result = await prisma.person.update({
        where:{
            id: Number(id)
        },
        data: {
           nombre,
           cedula
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

const DeletePerson = async(req=request, res=response)=> {
    const {id} = req.params;
    const result = await prisma.person.delete({
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
    addPerson,
    ShowPersons,
    UpdatePerson,
    DeletePerson,
    ShowPerson
}