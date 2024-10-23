import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { codigo } = req.query;

  if (req.method === 'GET') {
    try {
      const producto = await prisma.producto.findUnique({
        where: { codigo: String(codigo) },
      });

      if (producto) {
        res.status(200).json(producto);
      } else {
        res.status(404).json({ message: 'Producto no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al buscar producto' });
    }
  } else if (req.method === 'PUT') {
    const { nombre, precio, stock } = req.body;

    try {
      const productoActualizado = await prisma.producto.update({
        where: { codigo: String(codigo) },
        data: {
          nombre,
          precio: parseFloat(precio),
          stock: parseInt(stock),
        },
      });

      res.status(200).json(productoActualizado);
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar producto' });
    }
  } else {
    res.status(405).json({ message: 'Método no permitido' });
  }
}

