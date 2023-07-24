'use strict';
exports.main = async (event, context) => {
	let {id} = event 
	return uniCloud.database().collection("news").doc(id).remove()
};
