import express from "express";
import { blogController } from "../controllers";
import { INTERNAL_LINKS } from "../enum";

export default express
  .Router()
  .get(INTERNAL_LINKS.BLOG.GET_ALL_ARTICLE, blogController.getAllArticle)
  .get(INTERNAL_LINKS.BLOG.GET_ARTICLE, blogController.getArticle)
  .post(INTERNAL_LINKS.BLOG.CREATE_BLOG, blogController.postArticle);
