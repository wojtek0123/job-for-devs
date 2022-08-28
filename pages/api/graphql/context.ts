import { PrismaClient } from '@prisma/client';
import prisma from '../../../lib/prisma';

export interface Context {
  prisma: PrismaClient;
}

export const context: Context = {
  prisma,
};
