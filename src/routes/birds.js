const route = require('express').Router();
const db = require('../database/postgres-connector');
const {
  isValidOrder,
  isValidLimitOffset,
  isValidNewBird,
} = require('../utils/validation');

route.get('/', async (req, res) => {
  try {
    const { attribute, order, offset, limit } = req.query;

    if (order && !isValidOrder(order)) {
      return res.status(400).json({
        success: false,
        message: 'Order is not valid value',
      });
    }

    if (typeof limit !== 'undefined' && !isValidLimitOffset(limit)) {
      return res.status(400).json({
        success: false,
        message: 'Limit is not valid value',
      });
    }

    if (typeof offset !== 'undefined' && !isValidLimitOffset(offset)) {
      return res.status(400).json({
        success: false,
        message: 'Offset is not valid value',
      });
    }

    const { rows } = await db
      .query(
        `SELECT * FROM birds ORDER BY ${attribute || 'name'} ${order || 'ASC'} LIMIT $1 OFFSET $2`,
        [limit, offset],
      );
    res.send({
      success: true,
      birds: rows,
    });
  } catch (e) {
    res.status(400).json({
      message: e.message,
    });
  }
});

route.post('/', async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({
        success: false,
        message: 'Please, provide data',
      });
    }
    const isValidData = await isValidNewBird(req.body);
    if (!isValidData.success) {
      return res.status(400).json({
        success: false,
        message: isValidData.message,
      });
    }

    const { name, color, species, body_length, wingspan } = req.body;
    await db.query(
      `INSERT INTO birds(name, color, species, body_length, wingspan) VALUES($1, $2, $3, $4, $5)`,
      [name, color, species, body_length, wingspan],
    );
    return res.json({
      success: true,
      message: 'Bird successfully added',
    });
  } catch (e) {
    res.status(400).json({
      message: e.message,
    });
  }
});

module.exports = route;
