'use strict';
exports.main = async (event, context) => {
	let inputInfo = event.inputInfo;	
	let picUrl = event.picUrl;
	return await uniCloud.database().collection("news").doc(inputInfo._id).update({
		title:inputInfo.title,
		author:inputInfo.author,
		content:inputInfo.contenr,
		picUrl
	})
};