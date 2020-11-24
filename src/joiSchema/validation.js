import Joi from "joi";

const articleSchema = Joi.object().keys({
  nickname: Joi.string().trim().required(),
  title: Joi.string().trim().required(),
  content: Joi.string().trim().required(),
});

const commentSchema = Joi.object().keys({
  article_id: Joi.string().trim().required(),
  nickname: Joi.string().trim().required(),
  content: Joi.string().trim().required(),
});

const subcommentSchema = Joi.object().keys({
  maincom_id: Joi.string().trim().required(),
  nickname: Joi.string().trim().required(),
  comment: Joi.string().trim().required(),
});

export default { articleSchema, commentSchema, subcommentSchema };
