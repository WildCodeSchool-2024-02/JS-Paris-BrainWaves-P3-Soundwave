const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const tables = require("../../database/tables");

const browse = async ({ res, next }) => {
  try {
    const users = await tables.user.readAllUsers();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

const read = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await tables.user.readOne(id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

const add = async (req, res, next) => {
  try {
    const hash = await argon2.hash(req.body.password);
    req.body.password = hash;
    const userData = req.body;
    const result = await tables.user.insertOne(userData);
    const user = await tables.user.readOne(result.insertId);
    const accessToken = jwt.sign(
      { id: user.id, role: user.role },
      process.env.APP_SECRET,
      { expiresIn: "1h" }
    );
    const refreshToken = jwt.sign(
      { id: user.id, role: user.role },
      process.env.APP_SECRET,
      { expiresIn: "1d" }
    );
    delete user.password;
    res
      .status(201)
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "lax",
      })
      .header("Authorization", accessToken)
      .json(user);
  } catch (err) {
    next(err);
  }
};

const edit = async (req, res, next) => {
  const uploadDest = `${process.env.APP_HOST}/upload/`;
  if (req.file) req.body.image = uploadDest + req.file.filename;
  try {
    const result = await tables.user.edit(req.body, req.auth.id);
    if (result.affectedRows > 0) {
      const user = await tables.user.readOne(req.auth.id);
      res.status(200).json(user);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
};

const readLogin = async (req, res, next) => {
  try {
    const [user] = await tables.user.findByEmail(req.body.email);
    if (user) {
      if (await argon2.verify(user.password, req.body.password)) {
        const accessToken = jwt.sign(
          { id: user.id, role: user.role },
          process.env.APP_SECRET,
          { expiresIn: "1h" }
        );
        const refreshToken = jwt.sign(
          { id: user.id, role: user.role },
          process.env.APP_SECRET,
          { expiresIn: "1d" }
        );
        delete user.password;
        const crew = await tables.user.selectCrewByUser(user.id);
        const likeEvent = await tables.user.readEventLike(user.id);
        const followCrew = await tables.user.readCrewFollow(user.id);
        res
          .status(200)
          .cookie("refreshToken", refreshToken, {
            httpOnly: true,
            sameSite: "lax",
          })
          .header("Authorization", accessToken)
          .json({ user, crew, likeEvent, followCrew });
      } else {
        res.status(400).json("Wrong Credentials");
      }
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
};

const refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      res.status(401).json("Access Denied. No refresh token provided");
    }
    const decoded = jwt.verify(refreshToken, process.env.APP_SECRET);
    const accessToken = jwt.sign(
      { id: decoded.id, role: decoded.role },
      process.env.APP_SECRET,
      { expiresIn: "1h" }
    );
    const user = await tables.user.readOne(decoded.id);
    const crew = await tables.user.selectCrewByUser(decoded.id);
    const likeEvent = await tables.user.readEventLike(decoded.id);
    const followCrew = await tables.user.readCrewFollow(decoded.id);

    delete user.password;

    res
      .header("Authorization", accessToken)
      .json({ user, crew, likeEvent, followCrew });
  } catch (error) {
    next(error);
  }
};

const logout = async ({ res }) => {
  res.clearCookie("refreshToken").sendStatus(200);
};

const userEventLike = async (req, res, next) => {
  try {
    const result = await tables.user.userLikeEvent(
      req.body.event_id,
      req.auth.id
    );
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const eventDeleteLike = async (req, res, next) => {
  try {
    const result = await tables.user.deleteEventLike(
      req.body.event_id,
      req.auth.id
    );
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const allEventLike = async (req, res, next) => {
  try {
    const result = await tables.user.readAllEventLike(req.auth.id);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const userCrewFollow = async (req, res, next) => {
  try {
    const result = await tables.user.userFollowCrew(
      req.body.crew_id,
      req.auth.id
    );
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const crewDeleteFollow = async (req, res, next) => {
  try {
    const result = await tables.user.deleteCrewFollow(
      req.body.crew_id,
      req.auth.id
    );
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

// const readCrewFollow = async (req, res, next) => {
//   try {
//     const result = await tables.user.readCrewFollow(req.auth.id);
//     res.status(201).json(result);
//   } catch (error) {
//     next(error);
//   }
// };

const allCrewFollow = async (req, res, next) => {
  try {
    const result = await tables.user.allCrewFollows(req.auth.id);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  browse,
  read,
  add,
  edit,
  readLogin,
  refresh,
  logout,
  userEventLike,
  eventDeleteLike,
  allEventLike,
  userCrewFollow,
  crewDeleteFollow,
  // readCrewFollow,
  allCrewFollow,
};
