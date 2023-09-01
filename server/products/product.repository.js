const db = require("../db");

const getProductPagination = async (page, limit) => {
  try {
    const offset = (page - 1) * limit;

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
      ORDER BY p.id
      LIMIT $1 OFFSET $2`,
      [limit, offset]
    );

    return result.rows;
  } catch (error) {
    throw Error(error);
  }
};

const getProducts = async () => {
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
      ORDER BY p.id`
    );
    return result.rows;
  } catch (error) {
    throw Error(error);
  }
};

const getTotalProducts = async () => {
  try {
    const result = await db.query(`SELECT COUNT(*) AS total FROM product`);
    return result.rows[0].total;
  } catch (error) {
    throw Error(error);
  }
};

module.exports = {
  getProductPagination,
  getProducts,
  getTotalProducts,
};
