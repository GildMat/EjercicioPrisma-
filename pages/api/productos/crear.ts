import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { codigo, nombre, precio, stock } = req.body;

    try {
      const nuevoProducto = await prisma.producto.create({
        data: {
          codigo,
          nombre,
          precio: parseFloat(precio),
          stock: parseInt(stock),
        },
      });

      res.status(201).json(nuevoProducto);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear producto' });
    }
  } else {
    res.status(405).json({ message: 'Método no permitido' });
  }
}
