exports.getSortOrder = function(query){

  // default sort
  var sort = { created: -1 };

  if (query && query.order) {
    switch (query.order) {
      case 'latest':
        sort = { created: -1 };
        break;
      case 'popular':
        sort = { view_count: -1 };
        break;
      case 'favorited':
        sort = { favorites_count: -1 };
        break;
      case 'commented':
        sort = { comments_count: -1 };
        break;
      default:
        sort = { created: -1 };
    }
  }

  return sort;

};
