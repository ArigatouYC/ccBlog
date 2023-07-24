'use strict';
exports.main = async (event, context) => {
	let {id} = event
	return await uniCloud.database().collection("news").doc(id).get();
};
