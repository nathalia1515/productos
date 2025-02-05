const {response, request} = require('express');
const { PrismaClient } = require('@prisma/client');
const { createJwt } = require('../middlewares/validar_jwt');

const prisma = new PrismaClient();

const addUser = async (req=request, res=response)=> {

    // const email = req.body.email;
    // const password = req.body.password;

    const {email, password} = req.body;

    const result = await prisma.users.create({
        data:{
            email,
            password
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

const ShowUSers = async(req=request, res=response)=> {

    const users = await prisma.users.findMany()
    .catch((e)=>{
        return e.message;
    }).finally(async ()=> {
        await prisma.$disconnect();
    });

    res.status(200).json({users});
};

const ShowUSer = async(req=request, res=response)=> {

    const {id} = req.params;
    const result = await prisma.users.findFirst({
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

const Login = async(req=request, res=response)=> {

    const {email, password} = req.body;

    const result = await prisma.users.findFirst({
        where:{
            email,
            password
        }
    }).catch((e)=>{
        return e.message;
    }).finally(async ()=> {
        await prisma.$disconnect();
    });

    if (!result) {
        res.status(204).json({"message": "usuario no encontrado"});
    }

    const user_jwt = await createJwt(result);

    res.status(200).json({result, user_jwt});
};

const UpdateUser =async(req=request, res=response)=> {
    
    const {id} = req.params;
    const {email, password} = req.body;
    const result = await prisma.users.update({
        where:{
            id: Number(id)
        },
        data: {
            email,
            password
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

const DeleteUser = async(req=request, res=response)=> {
    const {id} = req.params;
    const result = await prisma.users.delete({
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
    addUser,
    ShowUSers,
    UpdateUser,
    DeleteUser,
    ShowUSer,
    Login
}