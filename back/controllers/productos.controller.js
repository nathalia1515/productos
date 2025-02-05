const { response, request } = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const addProductos = async (req = request, res = response) => {
    // Desestructuración del body del JSON
    const { nombre, cantidad, valor } = req.body;
    // Agregar producto
    const result = await prisma.productos.create({
       
        data: {
            nombre,
            cantidad,
            valor,
            
        }
        
    }).catch((e) => {
        return e.message;
    }).finally(async () => {
        await prisma.$disconnect();
    });

    res.status(201).json({
        result
    });
};

const ShowProductos = async (req = request, res = response) => {
    const productos = await prisma.productos.findMany()
        .catch((e) => {
            return e.message;
        }).finally(async () => {
            await prisma.$disconnect();
        });

    res.status(200).json(productos);
};

const UpdateProductos = async (req = request, res = response) => {
    const { id } = req.params;
    const { nombre, cantidad, valor } = req.body;
    const result = await prisma.productos.update({
        where: {
            id: Number(id)
        },
        data: {
            nombre,
            cantidad,
            valor
        }
    });
    res.status(202).json({
        result
    });
};

const DeleteProductos = async (req = request, res = response) => {
    const { id } = req.params;
    const result = await prisma.productos.delete({
        where: {
            id: Number(id)
        }
    }).catch((e) => {
        return e.message;
    }).finally(async () => {
        await prisma.$disconnect();
    });
    res.status(204).json({
        result
    });
};

const ShowProducto = async (req = request, res = response) => {
    const { id } = req.params;
    const result = await prisma.productos.findFirst({
        where: {
            id: Number(id)
        }
    }).catch((e) => {
        return e.message;
    }).finally(async () => {
        await prisma.$disconnect();
    });

    res.status(202).json({ result });
};

module.exports = {
    addProductos,
    ShowProductos,
    UpdateProductos,
    DeleteProductos,
    ShowProducto
};
