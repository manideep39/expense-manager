function paginatedResults(model) {
	return async (req, res, next) => {
		const page = parseInt(req.query.page);
		const limit = parseInt(req.query.limit);

		const startIndex = (page - 1) * limit;
		const endIndex = page * limit;

		const results = {};

		if (endIndex < (await model.countDocuments().exec())) {
			results.next = {
				page: page + 1,
				limit: limit
			};
		}

		if (startIndex > 0) {
			results.prev = {
				page: page - 1,
				limit: limit
			};
		}

		try {
			results.current = await model.find({ user_id: req.params.id }).limit(limit).skip(startIndex).exec();
			res.pagination = results;
			next();
		} catch (e) {
			res.status(500).json({ message: e.message });
		}
	};
}

module.exports = paginatedResults;
