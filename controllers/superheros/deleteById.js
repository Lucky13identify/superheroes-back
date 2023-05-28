const { db } = require("../../firebase/config");

const deleteById = async (req, res) => {
  const { id } = req.query;

  try {
    const docRef = db.collection("superheroes").doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).json({ message: "Superhero not found" });
    }

    await docRef.delete();

    res.json({ message: "Superhero deleted" });
  } catch (error) {
    console.error("Failed to delete superhero:", error);
    res.status(500).json({ message: "Failed to delete superhero" });
  }
};

module.exports = deleteById;
