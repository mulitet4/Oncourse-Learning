import { PrismaClient } from '@prisma/client';
import { nanoid } from 'nanoid';

const prisma = new PrismaClient();

const getUrlsOfUser = async (req, res) => {
  try {
    const userShortenedUrls = await prisma.shortenedUrl.findMany({
      where: {
        userId: req.user.userId,
      },
    });
    res.status(201).json({ urls: userShortenedUrls });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create shortened URL' });
  }
};

const deleteUrlbyId = async (req, res) => {
  const { id } = req.params;

  try {
    const userShortenedUrls = await prisma.shortenedUrl.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(201).json({ urls: userShortenedUrls });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to delete URL' });
  }
};

const createShortenedUrl = async (req, res) => {
  const { originalUrl } = req.body;
  const shortenedUrl = nanoid(6);

  try {
    const newShortenedUrl = await prisma.shortenedUrl.create({
      data: {
        originalUrl,
        shortenedUrl,
        userId: req.user.userId,
      },
    });
    res.status(201).json(newShortenedUrl);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create shortened URL' });
  }
};

const getOriginalUrl = async (req, res) => {
  const { url } = req.params;

  try {
    const urlRecord = await prisma.shortenedUrl.findUnique({
      where: {
        shortenedUrl: url,
      },
    });

    if (urlRecord) {
      await prisma.shortenedUrl.update({
        where: { id: urlRecord.id },
        data: { clickCount: { increment: 1 } },
      });
      res.redirect(urlRecord.originalUrl);
    } else {
      res.status(404).json({ error: 'Shortened URL not found' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to retrieve original URL' });
  }
};

export { createShortenedUrl, getOriginalUrl, getUrlsOfUser, deleteUrlbyId };
