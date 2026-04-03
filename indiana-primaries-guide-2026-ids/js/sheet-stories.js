// filepath: /home/calvin/Documents/ids/election-2026/js/sheet.js

/**
 * Google Sheet Structure Required:
 * Column A: headline (h3 text)
 * Column B: description (p text)
 * Column C: imageUrl (img src)
 * Column D: credit (p.credit text)
 * Column E: isFeatured (true/false - determines .featured-story class)
 * Column F: link (optional - a href for article)
 */

const url = 'https://docs.google.com/spreadsheets/d/1or2mAVHAwpzCLrSwC0xghyx60CBok5qVCkHsfto0quM/edit?gid=0#gid=0';

$(document).ready(function () {
  // Replace with your Google Sheet ID
  const options = {
    url: url,
    callback: populateArticles,
    reset: true
  };

  $('#statistics').sheetrock(options);
});

function populateArticles(error, options, response) {
  if (error) {
    console.error('Error loading sheet:', error);
    return;
  }


  let rows = response.rows.slice(1)

  rows.sort((a, b) => new Date(b['cellsArray'][0]) - new Date(a['cellsArray'][0]));



  const $articlesDiv = $('#articles');
  const $articleList = $('<div class="article-list flex-c"></div>');

  $articlesDiv.empty();

  // console.log(response)

  let featured = true;

  rows.slice(0,4).forEach(function (row) {
    const headline = row['cellsArray'][1] || '';
    const description = row['cellsArray'][2] || '';
    const imageUrl = row['cellsArray'][3] || '';
    const credit = row['cellsArray'][4] || '';
    const link = row['cellsArray'][5] || '';
    const altText = row['cellsArray'][6] || '';



    if (featured) {
      const $article_outer = $(`<a class="article-link link" href="${link}" target="_blank"></a>`);
      const $article = $(`<div class="flex-c featured-story"></div>`);
      if (imageUrl) {
        $article.append(`<img src="${imageUrl}" alt="${altText}">`);
      }
      $article.append(`<h3>${headline}</h3>`);
      // $article.append(`<p>${description}</p>`);
      if (credit) {
        $article.append(`<p class="credit">By ${credit}</p>`);
      }
      $article_outer.append($article);
      $articlesDiv.append($article_outer)
      featured = false;
    } else {

      const $article_outer = $(`<a class="article-link link" href="${link}" target="_blank"></a>`);
      const $article = $(`<div class="article flex-h"></div>`);

      const $info = $('<div></div>');

      $info.append(`<p class='place'>${description}</p>`);
      $info.append(`<h3>${headline}</h3>`);
      if (credit) {
        $info.append(`<p class="credit">By ${credit}</p>`);
      }

      $article.append($info)

      if (imageUrl) {
        $article.append(`<img src="${imageUrl}" alt="${altText}">`);
      }


      $article_outer.append($article);
      $articleList.append($article_outer);
    }


  });

  const $extraArticles = $('#articles-extra');

  rows.slice(4).forEach(function(row) {
    const headline = row['cellsArray'][1] || '';
    const description = row['cellsArray'][2] || '';
    const imageUrl = row['cellsArray'][3] || '';
    const credit = row['cellsArray'][4] || '';
    const link = row['cellsArray'][5] || '';
    const altText = row['cellsArray'][6] || '';


      const $article_outer = $(`<a class="article-link link" href="${link}" target="_blank"></a>`);
      const $article = $(`<div class="article flex-h"></div>`);

      const $info = $('<div class="info"></div>');

      // $info.append(`<p class='place'>${description}</p>`);
      $info.append(`<h3>${headline}</h3>`);
      if (credit) {
        $info.append(`<p class="credit">By ${credit}</p>`);
      }

	  if (imageUrl) {
        $article.append(`<img src="${imageUrl}" alt="${altText}">`);
      }


      $article.append($info)

      $article_outer.append($article);
      $extraArticles.append($article_outer);

  })

  $articlesDiv.append($articleList);
  console.log($articlesDiv);
}
