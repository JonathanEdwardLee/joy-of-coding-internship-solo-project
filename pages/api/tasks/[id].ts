import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const task = await prisma.task.findUnique({
        where: { id: Number(id) },
      });
      res.status(200).json(task);
    } catch (error) {
      console.error("Error fetching task:", error);
      res.status(500).json({ error: 'Error fetching task' });
    }
  } else if (req.method === 'PUT') {
    const { name, description, dueDate, username } = req.body;

    try {
      const updatedTask = await prisma.task.update({
        where: { id: Number(id) },
        data: { name, description, dueDate: new Date(dueDate), username },
      });
      res.status(200).json(updatedTask);
    } catch (error) {
      console.error("Error updating task:", error);
      res.status500.json({ error: 'Error updating task' });
    }
  } else if (req.method === 'DELETE') {
    try {
      await prisma.task.delete({
        where: { id: Number(id) },
      });
      res.status(204).end();
    } catch (error) {
      console.error("Error deleting task:", error);
      res.status(500).json({ error: 'Error deleting task' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
