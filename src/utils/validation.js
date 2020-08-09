const db = require('../database/postgres-connector');

const isValidOrder = (value) => {
  const order = value.toLowerCase();
  if (order !== 'asc' && order !== 'desc') {
    return false;
  }
  return true;
};

const isValidLimitOffset = (value) => {
  const num = parseInt(value)
  if (typeof num !== 'number' || isNaN(num) || value < 0) {
    return false;
  }
  return true;
};

const isValidNewBird = async (bird) => {
  const { name, color, species, body_length, wingspan } = bird;

  if (!name || typeof name !== 'string') {
    return {
      success: false,
      message: 'NAME property is invalid'
    };
  }

  if (!color || typeof color !== 'string') {
    return {
      success: false,
      message: 'COLOR property is invalid'
    };
  }
  const { rows: birdColorRows } = await db
    .query(
      `SELECT unnest(enum_range(NULL::bird_color))`,
    );
  const birdColors = birdColorRows.map(color => color.unnest);
  if (!birdColors.includes(color)) {
    return {
      success: false,
      message: 'COLOR property can\'t be such value',
    };
  }

  if (!species || typeof species !== 'string') {
    return {
      success: false,
      message: 'SPECIES property is invalid',
    };
  }
  if (!body_length && body_length !== 0) {
    return {
      success: false,
      message: 'BODY_LENGTH property is invalid',
    };
  }
  if (!wingspan && wingspan !== 0) {
    return {
      success: false,
      message: 'WINGSPAN property is invalid',
    };
  }

  const body_length_parsed = parseInt(body_length);
  if (typeof body_length_parsed !== 'number' || isNaN(body_length_parsed) || body_length_parsed < 0) {
    return {
      success: false,
      message: 'BODY_LENGTH property should be positive number',
    };
  }
  const wingspan_parsed = parseInt(wingspan);
  if (typeof wingspan_parsed !== 'number' || isNaN(wingspan_parsed) || wingspan_parsed < 0) {
    return {
      success: false,
      message: 'WINGSPAN property should be positive number',
    };
  }
  return {
    success: true,
  };
};

module.exports = {
  isValidOrder,
  isValidLimitOffset,
  isValidNewBird,
}