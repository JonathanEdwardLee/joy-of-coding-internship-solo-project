import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const tasks = await prisma.task.findMany();
      res.status(200).json(tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      res.status(500).json({ error: 'Error fetching tasks' });
    }
  } else if (req.method === 'POST') {
    const { name, description, dueDate, username } = req.body;

    try {
      const user = await prisma.user.findUnique({
        where: { username },
      });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const newTask = await prisma.task.create({
        data: { 
          name,
          description, 
          dueDate: new Date(dueDate), 
          user: { connect: { id: user.id } } 
        },
      });
      res.status(201).json(newTask);
    } catch (error) {
      console.error("Detailed error creating task:", error);
      res.status(500).json({ error: `Error creating task: ${error.message}` });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
