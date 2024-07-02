// pages/api/tasks/[id].ts

import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'GET') {
    const task = await prisma.task.findUnique({
      where: { id: Number(id) },
    });
    res.json(task);
  } else if (req.method === 'PUT') {
    const { name, description, dueDate } = req.body;
    const updatedTask = await prisma.task.update({
      where: { id: Number(id) },
      data: { name, description, dueDate: new Date(dueDate) },
    });
    res.json(updatedTask);
  } else if (req.method === 'DELETE') {
    await prisma.task.delete({
      where: { id: Number(id) },
    });
    res.status(204).end();
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
