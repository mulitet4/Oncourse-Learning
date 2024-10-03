import { PrismaClient } from '@prisma/client';
import { nanoid } from 'nanoid';

const prisma = new PrismaClient();

const getPatients = async (req, res) => {
  try {
    const patients = await prisma.patient.findMany({});
    console.log(patients);
    res.status(200).json({ patients: patients });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch patients' });
  }
};

export { getPatients };
