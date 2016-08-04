const Promise = require('bluebird');

exports.count = function(q, Collection, next){
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

    return query.exec();
};

exports.findById = function(id, Collection, next) {
    return Collection.findById(id);
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
    return query.exec();
};

exports.saveNew = function(newEntry, Collection) {
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
    return query.exec();
};

exports.updateMultiple = function(q, Collection, next){
    var conditions = q.where;
    var update = q.update;
    var options = { multi: true };
    var query = Collection.update(conditions, update, options);
    return query.exec();
};
