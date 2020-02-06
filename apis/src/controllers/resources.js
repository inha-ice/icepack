const service = require('../services/resources');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const {
  isItemId,
  isText50,
  isText100,
  isUserId,
} = require('../utils/validator');
const { authorice } = require('../../lib');

/**
 * @async
 * @param {Request} req
 * @param {Response} res
 */
const allocateResource = async (req, res) => {
  const { token, userPayload: managerPayload } = req;
  const { id } = req.params;
  const { userId, note, rentedAt } = req.body;
  if (id && isItemId(id) && userId && isUserId(userId)) {
    const userPayload = await authorice.getUser(token, userId);
    if (userPayload) {
      const data = { userPayload };
      if (note) {
        if (isText100(note)) {
          data.note = note;
        } else {
          throw new BadRequestError('The given note is invalid');
        }
      }
      if (rentedAt) {
        if (isText100(rentedAt)) {
          data.rentedAt = rentedAt;
        } else {
          throw new BadRequestError('The given rentedAt is invalid');
        }
      }
      const resource = await service.getResource(id);
      await service.allocateResource(resource, data, managerPayload);
      res.json({ message: 'success' });
    } else {
      throw new NotFoundError('The user with the given id is not found');
    }
  } else {
    throw new BadRequestError('The given id is invalid');
  }
};

/**
 * @async
 * @param {Request} req
 * @param {Response} res
 */
const freeResource = async (req, res) => {
  const { userPayload: managerPayload } = req;
  const { id } = req.params;
  const { note, rentedAt } = req.body;
  if (id && isItemId(id)) {
    const data = {};
    if (note) {
      if (isText100(note)) {
        data.note = note;
      } else {
        throw new BadRequestError('The given note is invalid');
      }
    }
    if (rentedAt) {
      if (isText100(rentedAt)) {
        data.rentedAt = rentedAt;
      } else {
        throw new BadRequestError('The given returnedAt is invalid');
      }
    }
    const resource = await service.getResource(id);
    await service.freeResource(resource, data, managerPayload);
    res.json({ message: 'success' });
  } else {
    throw new BadRequestError('The given id is invalid');
  }
};

/**
 * @async
 * @param {Request} req
 * @param {Response} res
 */
const getResource = async (req, res) => {
  const { userPayload: managerPayload } = req;
  const { id } = req.params;
  if (id && isItemId(id)) {
    const resource = await service.getResource(id, managerPayload);
    res.json({
      message: 'success',
      resource: {
        id: resource.id,
        name: resource.name,
        userId: resource.userId || null,
        note: resource.note || null,
        rentedAt: resource.rentedAt || null,
        returnedAt: resource.returnedAt || null,
      },
    });
  } else {
    throw new BadRequestError('The given id is invalid');
  }
};

/**
 * @async
 * @param {Request} req
 * @param {Response} res
 */
const getResources = async (req, res) => {
  const { userPayload: managerPayload } = req;
  const resources = await service.getResources(managerPayload);
  res.json({
    message: 'success',
    resources: resources.map((resource) => ({
      id: resource.id,
      name: resource.name,
      userId: resource.userId || null,
      note: resource.note || null,
      rentedAt: resource.rentedAt || null,
      returnedAt: resource.returnedAt || null,
    })),
  });
};

/**
 * @async
 * @param {Request} req
 * @param {Response} res
 */
const updateResource = async (req, res) => {
  const { token, userPayload: managerPayload } = req;
  const { id } = req.params;
  const {
    name, userId, note,
    rentedAt, returnedAt,
  } = req.body;
  if (id && isItemId(id)) {
    const data = { };
    if (name) {
      if (isText50(name)) {
        data.name = name;
      } else {
        throw new BadRequestError('The given name is invalid');
      }
    }
    if (userId) {
      if (isUserId(userId)) {
        const userPayload = await authorice.getUser(token, userId);
        if (userPayload) {
          data.userId = userId;
        } else {
          throw new NotFoundError('The user with the given id is not found');
        }
      } else {
        throw new BadRequestError('The given user id is invalid');
      }
    }
    if (note) {
      if (isText100(note)) {
        data.note = note;
      } else {
        throw new BadRequestError('The given note is invalid');
      }
    }
    if (rentedAt) {
      if (isText100(rentedAt)) {
        data.rentedAt = rentedAt;
      } else {
        throw new BadRequestError('The given rentedAt is invalid');
      }
    }
    if (returnedAt) {
      if (isText100(returnedAt)) {
        data.returnedAt = returnedAt;
      } else {
        throw new BadRequestError('The given returnedAt is invalid');
      }
    }
    const resource = await service.getResource(id);
    await service.updateResource(resource, data, managerPayload);
    res.json({ message: 'success' });
  } else {
    throw new BadRequestError('The given id is invalid');
  }
};

module.exports = {
  allocateResource,
  freeResource,
  getResource,
  getResources,
  updateResource,
};
