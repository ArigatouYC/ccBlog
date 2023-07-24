'use strict';
exports.main = async (event, context) => {
	let{newsInfo,picUrl} = event;
	
	
	return await uniCloud.database().collection("news").add({
		posttime :Date.now(),
		picUrl,
		...newsInfo
	})
};
