exports.definition = {
	config: {
		columns: {
		    "image_id": "TEXT",
		    "source_url": "TEXT",
		    "url": "TEXT",
		    "ext": "TEXT",
		    "created_at": "TEXT",
		    "is_star": "INTEGER",
		    "count": "INTEGER"
		},
		adapter: {
			type: "sql",
			collection_name: "Image",
            idAttribute: "image_id"
		}
	},
	extendModel: function(Model) {
		_.extend(Model.prototype, {
			// extended functions and properties go here
		});

		return Model;
	},
	extendCollection: function(Collection) {
		_.extend(Collection.prototype, {
			// extended functions and properties go here
		});

		return Collection;
	}
};
