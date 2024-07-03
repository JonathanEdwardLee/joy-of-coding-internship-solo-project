import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, email, password } = req.body;

    try {
      const user = await prisma.user.create({
        data: { username, email, password },
      });
      res.status(201).json(user);
    } catch (error) {
      console.error("Detailed error creating user:", error);
      res.status(500).json({ error: `Error creating user: ${error.message}` });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
