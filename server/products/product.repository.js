const express = require("express");
const Joi = require("joi");
const router = express.Router();
const db = require("../db");
const queryParamValidationMiddleware = require("../middleware/queryParamValidationMiddleware");

const queryParamsSchema = Joi.object().keys({
  page: Joi.number().integer().min(1),
  limit: Joi.number().integer().min(1),
});

module.exports = {
  getProducts: async () => {
    try {
      const result = await db.query(
        `SELECT
        p.id,
        p.name,
        p.description,
        p.price,
        pc.name AS "categoryName",
        pi.name AS "imageName",
        pi.description AS "imageDescription"
      FROM product p
      LEFT JOIN product_category pc ON p.product_category_id = pc.id
      LEFT JOIN product_image pi ON p.product_image_id = pi.id
      ORDER BY
        p.id
      `
      );
      return result.rows;
    } catch (error) {
      throw Error(error);
    }
  },

  getTotalProducts: async () => {
    try {
      const result = await db.query(`SELECT COUNT(*) AS total FROM product`);
      return result.rows[0].total;
    } catch (error) {
      throw Error(error);
    }
  },
};
