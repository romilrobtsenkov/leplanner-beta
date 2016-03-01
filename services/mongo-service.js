exports.count = function(q, next){
    Favorite.count(q.args, function (err, count) {
        next(err, count);
    });
};

exports.find = function(q, Collection, next){
    var query = Collection.find();
    query.where(q.args);
    if(q.populated_fields){
        for(var i = 0; i< q.populated_fields.length; i++){
            query.populate(q.populated_fields[i].field, q.populated_fields[i].populate);
        }
    }
    if(q.select){ query.select(q.select); }
    if(q.sort){ query.sort(q.sort); }
    if(q.limit){ query.limit(q.limit); }
    query.exec(function(err, array) {
        next(err, array);
    });
};

exports.findById = function(id, Collection, next) {
    Collection.findById(id, function(err, entry) {
        next(err, entry);
    });
};

exports.findOne = function(q, Collection, next){
    var query = Collection.findOne();
    query.where(q.args);
    if(q.select){ query.select(q.select); }
    query.exec(function(err, entry) {
        next(err, entry);
    });
};

exports.saveNew = function(newEntry, Collection, next) {
    var newCollection = new Collection(newEntry);
    newCollection.save(function(err, entry) {
        //handle user saving error
        if(err && err.errors && err.errors.email && err.errors.email.message == 'That email is already in use'){
            return next({id: 6, message: 'That email is already in use'});
        }else if(err){
            return next(err);
        }
        next(err, entry);
    });
};

exports.update = function(q, Collection, next){
    var conditions = q.where;
    var update = q.update;
    var options = {new: true};
    if(q.select){ options.select = q.select; }
    var query = Collection.findOneAndUpdate(conditions, update, options);
    if(q.populated_fields){
        for(var i = 0; i< q.populated_fields.length; i++){
            query.populate(q.populated_fields[i].field, q.populated_fields[i].populate);
        }
    }
    query.exec(function(err, entry) {
        next(err, entry);
    });
};

exports.updateMultiple = function(q, Collection, next){
    var conditions = q.where;
    var update = q.update;
    var options = { multi: true };
    var query = Collection.update(conditions, update, options);
    query.exec(function(err, success) {
        next(err, success);
    });
};
