// Mock API (remove in production)
import type { NextApiRequest, NextApiResponse } from 'next';

const gardeners = [
  {
    id: '1',
    name: 'Ayesha Zaman',
    profilePhoto: 'https://i.ibb.co/gjb4Lrv/download-1.jpg',
    followers: 340,
    bio: 'Loves urban gardening 🌿',
    postsCount: 22,
  },
  {
    id: '2',
    name: 'Kamrul Islam',
    profilePhoto: 'https://i.ibb.co/gjb4Lrv/download-1.jpg',
    followers: 280,
    bio: 'Herbs and healing plants expert 🌱',
    postsCount: 30,
  },
  {
    id: '3',
    name: 'Ritu Das',
    profilePhoto: 'https://i.ibb.co/gjb4Lrv/download-1.jpg',
    followers: 230,
    bio: 'Balcony gardener & plant mom 🌸',
    postsCount: 19,
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(gardeners);
}
