const axios = require('axios');

const Dev = require('../models/Dev');

module.exports = {
  async index(_, res) {
    res.json(await Dev.find());
  },
  async store(req, res) {
    const { github_username, techs, longitude, latitude } = req.body;
    const arrTechs = techs.split(',').map((tech) => tech.trim());

    const findUser = await Dev.findOne({ username: github_username });
    if (findUser) {
      res.status(409).json({ message: 'user already exists', user: findUser });
      return;
    }

    const response = await axios.get(
      `https://api.github.com/users/${github_username}`,
    );

    const { data } = response;

    const newDev = {
      name: data.name,
      username: data.login,
      avatar_url: data.avatar_url,
      bio: data.bio,
      techs: arrTechs,
      location: {
        type: 'Point',
        coordinates: [longitude, latitude],
      },
    };

    const saved = await Dev.create(newDev);
    res.json(saved);
  },
};
