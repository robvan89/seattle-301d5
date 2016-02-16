(function(module) {
  var repos = {};

  repos.all = [];

  repos.requestRepos = function(callback) {
    // TODO: How would you like to fetch your repos? Don't forget to call the callback.
    $.ajax({
      url: 'https://api.github.com/users/robvan89/repos' + '?per_page=5&sort=updated',
      type: 'GET',
      headers: { 'Authorization': 'token ' + githubToken },
      success: function(data, message, xhr) {
        var title = data[0].description;
        $('.logo').html('<p>' + data[0].name + ' - ' + data[0].stargazers_url + '</p>');
        console.log(data);
      }
    }).done(
      callback();
    )
  };

  // DONE: Model method that filters the full collection for repos with a particular attribute.
  // You could use this to filter all repos that have a non-zero `forks_count`, `stargazers_count`, or `watchers_count`.
  repos.with = function(attr) {
    return repos.all.filter(function(repo) {
      return repo[attr];
    });
  };

  module.repos = repos;
})(window);