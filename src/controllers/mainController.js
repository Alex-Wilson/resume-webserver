// src/controllers/mainController.js

import fs from 'fs';
import path from 'path';
import MarkdownIt from 'markdown-it';

const md = new MarkdownIt();

export function renderHomePage(req, res, next) {
  res.render('pages/index', { title: 'Hello, world!' });
}

export function renderReadmePage(req, res, next) {
  const readmeFilePath = path.join(
    process.cwd(),
    'public',
    'content',
    'math',
    'README.md',
  );

  try {
    const markdownContent = fs.readFileSync(readmeFilePath, 'utf8');
    const htmlContent = md.render(markdownContent);

    res.render('pages/article', {
      title: 'readme',
      content: htmlContent,
      category: 'about',
      slug: 'readme',
    });
  } catch (error) {
    console.error(`Error rendering /readme page: ${error.message}`);
    const err = new Error('Could not load About page content');
    err.status = 500;
    return next(err);
  }
}

export function serveResumePdf(req, res, next) {
  const resumePath = path.join(process.cwd(), 'public', 'content', 'math', 'alexander-wilson-resume.pdf');
  res.sendFile(resumePath, (err) => {
    if (err) {
      console.error('Error sending resume PDF:', err);
      return next(new Error('Resume file not found', { cause: err }));
    }
  });
}