
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const tasks = await prisma.task.findMany();
    res.json(tasks);
  } else if (req.method === 'POST') {
    const { name, description, dueDate } = req.body;
    const newTask = await prisma.task.create({
      data: { name, description, dueDate: new Date(dueDate) },
    });
    res.json(newTask);
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
