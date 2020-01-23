const dev = require('../models/Dev');

module.exports = {
  async index(req, res) {
    const { latitude, longitude, techs } = req.query;
    const arrTechs = techs.split(',').map((tech) => tech.trim());

    const finded = await dev.find({
      techs: {
        $in: arrTechs,
      },
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude],
          },
          $maxDistance: 1000000,
        },
      },
    });
    res.json(finded);
  },
};
