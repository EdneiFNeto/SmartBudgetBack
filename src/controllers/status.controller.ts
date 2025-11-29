import { Request, Response } from 'express';
import prisma from '../core/prisma';

export const getStatus = async (_req: Request, res: Response) => {
  try {
    await prisma.$queryRaw`SELECT 1`; // lightweight health probe

    res.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Database unavailable',
      detail: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

