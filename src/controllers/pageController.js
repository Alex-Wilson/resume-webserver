// src/controllers/pageController.js

import * as contentService from '../services/contentService.js';

/**
 * Renders the page that lists all articles.
 */
export function renderArticleListPage(req, res) {
  const articles = contentService.getAllArticles();
  res.render('pages/article-list', {
    title: 'All Articles',
    articles: articles,
  });
}

/**
 * Renders a single article page based on the slug from the URL.
 */
export function renderSingleArticle(req, res, next) {
  const slug = req.params.slug;
  const article = contentService.getArticleBySlug(slug);

  if (article) {
    // If the article exists in our cache, render it.
    res.render('pages/article', {
      title: article.title,
      content: article.html,
    });
  } else {
    // If no article with that slug is found, trigger the 404 handler.
    next();
  }
}