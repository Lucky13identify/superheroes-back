const { db } = require('../../firebase/config');
const { bucket } = require('../../firebase/config');
// const { NotFound } = require('http-errors');
// const { Superhero } = require('../../model');
// const fs = require('fs/promises');
// const path = require('path');

// const pathAvatars = path.join(__dirname, '../../public/images');

const updateById = async (req, res) => {
  try {
    // const docRef = db.collection('superheroes').doc(id);
    // const doc = await docRef.get();

    // if (!doc.exists) {
    //   return res.status(404).json({ message: 'Superhero not found' });
    // }

    const imageUrl = await uploadFileToFirebase(req.file);

    const superheroData = {
      ...req.body,
      ...(imageUrl && { heroImage: imageUrl }),
    };

    const docRef = await db.collection('superheroes').add(superheroData);
    const docId = docRef.id;
    superheroData.id = docId;

    await docRef.update(superheroData);
    const doc = await docRef.get();

    const createdSuperhero = {
      id: docRef.id,
      ...doc.data(),
    };

    res.status(201).json({ message: 'Superhero created', data: createdSuperhero });
    // if (imageUrl) {
    //   await docRef.update({ ...req.body, heroImage: imageUrl });
    // }
    // await docRef.update(req.body);
    // const updatedDoc = await docRef.get();
    // const updatedSuperhero = {
    //   id: updatedDoc.id,
    //   ...updatedDoc.data(),
    // };

    // res.json({ message: 'Superhero updated', data: updatedSuperhero });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update superhero' });
  }
};

const uploadFileToFirebase = async (file) => {
  if (!file) return;
  try {
    const { path, originalname } = file;
    const destination = `images/${originalname}`;
    await bucket.upload(path, {
      destination,
      metadata: {
        contentType: 'image/jpeg',
      },
    });

    const [uploadedFile] = await bucket.file(destination).get();

    const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(
      destination
    )}?alt=media&token=${encodeURIComponent(uploadedFile.metadata.mediaLink.split('&token=')[1])}`;

    return imageUrl;
  } catch (error) {
    throw new Error('Erro upload to Firebase: ' + error.message);
  }
};

module.exports = updateById;
