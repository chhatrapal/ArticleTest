import { joiValidation } from "../joiSchema";
const db = require("../config/dbConnection");

const createComment = async (req, res) => {
  try {
    let { article_id, nickname, content } = req.body,
      sql = `INSERT INTO comment ( article_id,nickname,content ) VALUES ( '${article_id}','${nickname}','${content}' )`;
    await joiValidation.commentSchema.validateAsync(req.body);
    const data = await db.query(sql);
    res
      .status(200)
      .send({ success: true, message: "comment on post successfully" });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};

const getCommentByArticle = async (req, res) => {
  try {
    let { article_id } = req.query,
      subcomment = null,
      commentdata = [];

    const rows = await db.query("SELECT * FROM comment WHERE article_id = ?", [
      article_id,
    ]);
    for (let i = 0; i < rows.length; i++) {
      let mainid = rows[i].id;
      subcomment = await db.query(
        `SELECT * FROM subcomment WHERE maincom_id = ${mainid}`
      );
      let mydata = {};
      if (subcomment.length > 0) {
        mydata = {
          ...rows[i],
          subcomment,
        };
      } else {
        mydata = {
          ...rows[i],
        };
      }
      commentdata.push(mydata);
    }

    res.status(200).send({ success: true, data: commentdata });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};

const commentOncomment = async (req, res) => {
  try {
    let { maincom_id, nickname, comment } = req.body,
      sql = `INSERT INTO subcomment ( maincom_id,nickname,comment ) VALUES ( '${maincom_id}','${nickname}','${comment}' )`;
    await joiValidation.subcommentSchema.validateAsync(req.body);
    const data = await db.query(sql);
    res
      .status(200)
      .send({ success: true, message: "comment post successfully" });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};

export default { createComment, getCommentByArticle, commentOncomment };
