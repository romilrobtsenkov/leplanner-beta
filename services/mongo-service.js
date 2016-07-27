const Promise = require('bluebird');

exports.count = function(q, Collection, next){
    Collection.count(q.args, function (err, count) {
        next(err, count);
    });
};

exports.countWithPromise = function(q, Collection, next){
    return Collection.count(q.args);
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
    if(q.skip){ query.skip(q.skip); }
    if(q.limit){ query.limit(q.limit); }
    query.exec(function(err, array) {
        next(err, array);
    });
};

exports.findWithPromise = function(q, Collection, next){
    var query = Collection.find();
    query.where(q.args);
    if(q.populated_fields){
        for(var i = 0; i< q.populated_fields.length; i++){
            query.populate(q.populated_fields[i].field, q.populated_fields[i].populate);
        }
    }
    if(q.select){ query.select(q.select); }
    if(q.sort){ query.sort(q.sort); }
    if(q.skip){ query.skip(q.skip); }
    if(q.limit){ query.limit(q.limit); }

    return query.exec();
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
    if(q.populated_fields){
        for(var i = 0; i< q.populated_fields.length; i++){
            query.populate(q.populated_fields[i].field, q.populated_fields[i].populate);
        }
    }
    query.exec(function(err, entry) {
        next(err, entry);
    });
};

exports.findOneWithPromise = function(q, Collection, next){
    var query = Collection.findOne();
    query.where(q.args);
    if(q.select){ query.select(q.select); }
    if(q.populated_fields){
        for(var i = 0; i< q.populated_fields.length; i++){
            query.populate(q.populated_fields[i].field, q.populated_fields[i].populate);
        }
    }
    return query.exec();
};

exports.saveNew = function(newEntry, Collection, next) {
    var newCollection = new Collection(newEntry);
    newCollection.save(function(err, entry) {
        //handle user saving error
        if(err && err.errors && err.errors.email && err.errors.email.message === 'That email is already in use'){
            return next({id: 6, message: 'That email is already in use'});
        }else if(err){
            return next(err);
        }
        next(err, entry);
    });
};

exports.saveNewWithPromise = function(newEntry, Collection) {
    var newCollection = new Collection(newEntry);
    return newCollection.save();
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

exports.updateWithPromise = function(q, Collection, next){
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
    return query.exec();
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

exports.updateMultipleWithPromise = function(q, Collection, next){
    var conditions = q.where;
    var update = q.update;
    var options = { multi: true };
    var query = Collection.update(conditions, update, options);
    return query.exec();
};
