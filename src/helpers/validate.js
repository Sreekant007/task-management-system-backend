"use strict";

function replaceUndefinedOrNull(key, value) {
  if (value === null || value === undefined) {
    return undefined;
  }

  return value;
}

function valdateResult(data) {
  return JSON.parse(JSON.stringify(data, replaceUndefinedOrNull));
}

function convertToCamelCase(obj) {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => convertToCamelCase(item));
  }

  const camelCaseObj = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const camelCaseKey = key.replace(/_([a-z])/g, (match, group) =>
        group.toUpperCase()
      );
      camelCaseObj[camelCaseKey] = convertToCamelCase(obj[key]);
    }
  }

  return camelCaseObj;
}

exports.valdateResult = valdateResult;
exports.convertToCamelCase = convertToCamelCase;
