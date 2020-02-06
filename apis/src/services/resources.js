const NotFoundError = require('../errors/NotFoundError');
const { Resource } = require('../database/models');

const allocateResource = async (resource, data) => {
  const updatedData = {};
  if (!data.rentedAt) {
    updatedData.rentedAt = new Date();
  }
  await resource.update(updatedData);
};

const freeResource = async (resource, data) => {
  const updatedData = {};
  if (!data.returnedAt) {
    updatedData.returnedAt = new Date();
  }
  await resource.update(updatedData);
};

const getResource = async (id) => {
  const resource = await Resource.findByPk(id);
  if (resource) {
    return resource;
  }
  throw new NotFoundError('The resource with the given id is not found');
};

const getResources = async () => {
  const resources = await Resource.findAll();
  return resources;
};

const updateResource = async (resource, data) => {
  await resource.update(data);
};

module.exports = {
  allocateResource,
  freeResource,
  getResource,
  getResources,
  updateResource,
};
