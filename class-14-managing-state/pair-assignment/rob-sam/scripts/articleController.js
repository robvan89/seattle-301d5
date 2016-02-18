(function(module) {
  var articlesController = {};

  Article.createTable();  // Ensure the database table is properly initialized

  articlesController.index = function(ctx, next) {
    articleView.index(ctx.articles);
  };

  // : What does this method do?  What is it's execution path?
  /* This method loads the article after the read on button is clicked.  The execution path is page('/article/:id'). When clicking on the 'read on' button, the id, based on the handlebars template is put into the url which then initates the path specifie in routs.js.
  *
  */
  articlesController.loadById = function(ctx, next) {
    var articleData = function(article) {
      ctx.articles = article;
      next();
    };

    Article.findWhere('id', ctx.params.id, articleData);
  };

  // : What does this method do?  What is it's execution path?
  /* This method loads the articles specified by author name.  When an author name is selected the articleView.handleFilters method is ran which makes filter an empty string which meets the condition of the page funciton that contains the two callback functions of articleController.loadByAuthor and articleController.index.  This will load the articles based which author name was selected and replace the '+' inside the ctx.params.author with an empty string.
  * The authorData variable is initialized and passed into the Article.findWhere function as its callback.
  */

  articlesController.loadByAuthor = function(ctx, next) {
    var authorData = function(articlesByAuthor) {
      ctx.articles = articlesByAuthor;
      next();
    };

    Article.findWhere('author', ctx.params.authorName.replace('+', ' '), authorData);
  };

  /** : This method loads the articles based on their category, as specified in the JSON file.
  /* This method loads the articles specified by category name.  When a category name is selected the articleView.handleFilters method is ran which makes filter an empty string which meets the condition of the page funciton that contains the two callback functions - this method and articleController.index.  This will load the articles based which category name was selected and replace the '+' inside the ctx.params.categoryName with an empty string.
  * The categoryData variable is initialized and passed into the Article.findWhere function as its callback.
  */
  articlesController.loadByCategory = function(ctx, next) {
    var categoryData = function(articlesInCategory) {
      ctx.articles = articlesInCategory;
      next();
    };

    Article.findWhere('category', ctx.params.categoryName, categoryData);
  };

  /** This method loads the articles into the context object.
  * It is called when page checks for '/'
  * @param {Array} Article.all: an array containing the article objects.
  * @param {allArticles}: Not sure what this is doing. We console logged it and it came back undefined.
  * It checks to see if there's anything in Article.all.
  * If there is, it sets the value of the context object's articles property
  * to Article.all. If there isn't, it calls Article.fetchAll.
  * Then, the articleController.index method is called, as is specified by routes.js.
  * This method is passed in as next.
  */
  articlesController.loadAll = function(ctx, next) {
    var articleData = function(allArticles) {
      ctx.articles = Article.all;
      next();
    };

    if (Article.all.length) {
      ctx.articles = Article.all;
      next();
    } else {
      Article.fetchAll(articleData);
    }
  };


  module.articlesController = articlesController;
})(window);
