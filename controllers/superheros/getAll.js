// const { Superhero } = require('../../model');
const { db } = require('../../firebase/config');

const getAll = async (req, res) => {
  try {
    const { limit = 10, page = 1 } = req.query;
    const limitNumber = parseInt(limit);
    const pageNumber = parseInt(page);

    let snapshot;
    let totalItems;
    let totalPages;
    if (limitNumber && pageNumber) {
      const querySnapshot = await db.collection('superheroes').orderBy('nickName', 'asc').get();
      totalItems = querySnapshot.size;
      totalPages = Math.ceil(totalItems / limitNumber);

      snapshot = await db
        .collection('superheroes')
        .orderBy('nickName', 'asc')
        .limit(limitNumber)
        .offset((pageNumber - 1) * limitNumber)
        .get();
    } else {
      snapshot = await db.collection('superheroes').orderBy('nickName', 'asc').get();
    }

    const superheroes = [];
    snapshot.forEach((doc) => {
      const superheroData = doc.data();
      const superhero = {
        id: doc.id,
        ...superheroData,
      };
      superheroes.push(superhero);
    });

    res.json({
      message: 'Get all heroes',
      code: 200,
      data: superheroes,
      page: pageNumber,
      limit: limitNumber,
      totalPages,
    });
  } catch (error) {
    res.status(500).json({ status: 'Error', code: 500, message: 'Failed to get heroes' });
  }
};

module.exports = getAll;
