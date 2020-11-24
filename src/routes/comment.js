import express from "express";
import { commentController } from "../controllers";
import { INTERNAL_LINKS } from "../enum";

export default express
  .Router()
  .get(
    INTERNAL_LINKS.COMMENT.GET_COMMENT,
    commentController.getCommentByArticle
  )
  .post(
    INTERNAL_LINKS.COMMENT.COMMENT_ON_ARTICLE,
    commentController.createComment
  )
  .post(INTERNAL_LINKS.COMMENT.SUBCOMMENT, commentController.commentOncomment);
