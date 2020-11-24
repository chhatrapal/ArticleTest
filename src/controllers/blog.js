import { joiValidation } from "../joiSchema";
const db = require("../config/dbConnection");

const postArticle = async (req, res) => {
  try {
    let { nickname, title, content } = req.body,
      sql = `INSERT INTO article ( nickname,title,content ) VALUES ( '${nickname}','${title}','${content}' )`;
    await joiValidation.articleSchema.validateAsync(req.body);
    const mypost = await db.query(sql);
    mypost &&
      res.status(200).send({
        success: true,
        message: "blog created successfully",
      });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};

const getAllArticle = async (req, res) => {
  try {
    let { page } = req.query,
      limit = 20 * 1;
    page = page ? page * limit : 0;

    const data = await db.query(
      `SELECT * FROM article LIMIT ${limit} OFFSET ${page}`
    );
    res.status(200).send({ success: true, data: data });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};

const getArticle = async (req, res) => {
  try {
    let { id } = req.query,
      finaldata = {},
      commentdata = [];
    const data = await db.query(`SELECT * FROM article WHERE id = ${id}`);
    const rows = await db.query(
      `SELECT * FROM comment WHERE article_id = ${id}`
    );
    for (let i = 0; i < rows.length; i++) {
      let mainid = rows[i].id;
      const subcomment = await db.query(
        `SELECT * FROM subcomment WHERE maincom_id = ${mainid}`
      );
      let mydata = {};
      if (subcomment.length > 0) {
        mydata = {
          ...rows[i],
          subcomment: subcomment,
        };
      } else {
        mydata = {
          ...rows[i],
        };
      }
      commentdata.push(mydata);
    }
    finaldata = {
      ...data[0],
      commentdata,
    };
    res.status(200).send({ success: true, data: finaldata });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};

export default { postArticle, getAllArticle, getArticle };
