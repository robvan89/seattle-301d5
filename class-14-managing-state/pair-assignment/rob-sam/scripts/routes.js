//When this script is loaded, page is called at the bottom of this script file.
//Page checks the URL, assuming it's index, it calls articlesController.loadAll and articlesController.index
page('/',
  articlesController.loadAll,
  articlesController.index);

page('/about', aboutController.index);

page('/article/:id',
  articlesController.loadById,
  articlesController.index);

// Redirect home if the default filter option is selected:
page('/category', '/');
page('/author', '/');

page('/author/:authorName',
  articlesController.loadByAuthor,
  articlesController.index);

page('/category/:categoryName',
  articlesController.loadByCategory,
  articlesController.index);

page();
