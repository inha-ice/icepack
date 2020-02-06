const ITEM_ID_REGEX = /^\d+$/;
const USER_ID_REGEX = /^\d{8}$/;

const isString = (string) => typeof string === 'string';
const isItemId = (number) => ITEM_ID_REGEX.test(number.toString());
const isMaxLength = (string, max) => string.length <= max;
const isMinLength = (string, min) => string.length >= min;
const isUserId = (number) => USER_ID_REGEX.test(number.toString());
const isText50 = (string) => isString(string) && isMaxLength(string, 50);
const isText100 = (string) => isString(string) && isMaxLength(string, 100);

module.exports = {
  isItemId,
  isMaxLength,
  isMinLength,
  isText50,
  isText100,
  isUserId,
};
