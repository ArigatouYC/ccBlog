'use strict';
exports.main = async (event, context) => {
	let {skip=0} = event;
	return await uniCloud.database().collection("news").limit(8).skip(skip).orderBy("posttime","desc").get();
};
