const fs = require('fs');
const path = require('path');

export default function handler(req, res) {
  const directory = path.join(process.cwd(), 'public', 'bea');

  fs.readdir(directory, (err, files) => {
    if (err || !files || files.length === 0) {
      return res.status(500).send('No images found.');
    }

    const images = files.filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file));
    if (images.length === 0) {
      return res.status(500).send('No image files found.');
    }

    const randomImage = images[Math.floor(Math.random() * images.length)];
    const imagePath = path.join(directory, randomImage);
    const ext = path.extname(randomImage).toLowerCase();

    const contentType = {
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.png': 'image/png',
      '.gif': 'image/gif',
      '.webp': 'image/webp',
    }[ext] || 'application/octet-stream';

    fs.readFile(imagePath, (err, data) => {
      if (err) {
        return res.status(500).send('Error reading image.');
      }
      res.setHeader('Content-Type', contentType);
      res.send(data);
    });
  });
}