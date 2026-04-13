import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const assetsDir = path.resolve('src/assets');
const sourceCandidates = [
    'profile-source.avif',
    'profile-source.webp',
    'profile-source.jpg',
    'profile-source.jpeg',
    'profile-source.png',
    'photo-source.avif',
    'photo-source.webp',
    'photo-source.jpg',
    'photo-source.jpeg',
    'photo-source.png',
    'profile.avif',
    'profile.webp',
    'profile.jpg',
    'profile.jpeg',
    'profile.png',
    'photo.avif',
    'photo.webp',
    'photo.jpg',
    'photo.jpeg',
    'photo.png',
];

const outputFiles = {
    avif: path.join(assetsDir, 'photo.avif'),
    webp: path.join(assetsDir, 'photo.webp'),
    jpg: path.join(assetsDir, 'photo.jpg'),
};

const findSourceImage = async () => {
    for (const filename of sourceCandidates) {
        const fullPath = path.join(assetsDir, filename);
        try {
            await fs.access(fullPath);
            return fullPath;
        } catch {
            // Continue scanning candidates.
        }
    }

    const files = await fs.readdir(assetsDir);
    const fallback = files.find((file) => /^photo\.(avif|webp|jpe?g|png)$/i.test(file));
    return fallback ? path.join(assetsDir, fallback) : null;
};

const removeFileIfExists = async (filePath) => {
    try {
        await fs.unlink(filePath);
    } catch {
        // Ignore if file does not exist.
    }
};

const optimize = async () => {
    const sourceImage = await findSourceImage();

    if (!sourceImage) {
        console.error('No source image found in src/assets. Add profile-source.* or photo-source.* first.');
        process.exit(1);
    }

    const image = sharp(sourceImage);
    const metadata = await image.metadata();

    const maxWidth = metadata.width && metadata.width > 1200 ? 1200 : metadata.width;

    await Promise.all([
        sharp(sourceImage)
            .resize({ width: maxWidth, withoutEnlargement: true })
            .avif({ quality: 54, effort: 6 })
            .toFile(outputFiles.avif),
        sharp(sourceImage)
            .resize({ width: maxWidth, withoutEnlargement: true })
            .webp({ quality: 78, effort: 6 })
            .toFile(outputFiles.webp),
        sharp(sourceImage)
            .resize({ width: maxWidth, withoutEnlargement: true })
            .jpeg({ quality: 84, mozjpeg: true })
            .toFile(outputFiles.jpg),
    ]);

    await removeFileIfExists(path.join(assetsDir, 'photo.png'));

    console.log(`Optimized image variants generated from: ${path.basename(sourceImage)}`);
    console.log('Created: photo.avif, photo.webp, photo.jpg');
};

optimize().catch((error) => {
    console.error('Image optimization failed:', error);
    process.exit(1);
});
