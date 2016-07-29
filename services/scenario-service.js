exports.getSortOrder = function(query, next){

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

  // TODO promise peale
  if(!next){
      return sort;
  }
  next(null, sort);

};
