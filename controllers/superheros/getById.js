const { db } = require('../../firebase/config');

const getById = async (req, res) => {
  const { id } = req.query;
  try {
    const doc = await db.collection('superheroes').doc(id).get();
    if (!doc.exists) {
      return res.status(404).json({ message: 'Superhero not found' });
    }

    const superheroData = doc.data();
    const superhero = {
      id: doc.id,
      ...superheroData,
    };
    res.json({ message: 'Superhero found', data: superhero });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch superhero' });
  }
};
module.exports = getById;
