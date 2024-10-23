import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

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
  } else {
    res.status(405).json({ message: 'Método no permitido' });
  }
}
