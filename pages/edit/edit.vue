<template>
	<view>
		<view class="edit">
			<form @submit="submit">
				修改标题:<input type="text" v-model="inputInfo.title" placeholder="输入新的标题" name="title">

				修改作者:<input type="text" v-model="inputInfo.author" placeholder="输入新的作者" name="author">

				修改正文:<textarea name="content" v-model="inputInfo.content" cols="30" rows="20">
				</textarea>
				
				修改图片
				<uni-file-picker 
				v-model="imageValue" 
				fileMediatype="image" 
				mode="grid" 
				
				@select="select"
				@progress="progress" 
				@success="upsuccess" 
				@fail="fail"
				 />

				<button class="reset" form-type="reset">
					重置
					<uni-icons type="loop" size="20" color="#fff"></uni-icons>
				</button>
				<button class="upload" form-type="submit">
					修改
					<uni-icons type="cloud-upload-filled" size="20" color="#fff"></uni-icons>
				</button>
			</form>

		</view>
	</view>
</template>

<script>
	let id;
	export default {
		data() {
			return {
				imageValue: [],
				inputInfo: {},
			}
		},
		onLoad(option){
			id = option.id
			this.getData()
		},
		methods: {
			upsuccess(e) {
				console.log('上传成功',e)
			},
			
			select(e) {
				console.log('选择文件：', e)
			},
			// 获取上传进度
			progress(e) {
				console.log('上传进度：', e)
			},
			
			// 上传失败
			fail(e) {
				console.log('上传失败：', e)
			},
			submit() {
				let _picUrl = this.imageValue.map(item=>{
					return item.url;
				})
				uniCloud.callFunction({
					name: "updataNews",
					data: {
						inputInfo:this.inputInfo,
						picUrl:_picUrl
					}
				}).then(res => {
					console.log(res);
					uni.showToast({
						title:"修改成功"
					})
					setTimeout(()=>{
						uni.navigateBack()
					},600)
				})
			},
			getData() {
				uniCloud.callFunction({
					name: "getNewsDetail",
					data: {
						id: id
					}
				}).then(res => {
					this.inputInfo = res.result.data[0]
					let urls = this.inputInfo.picUrl.map(item=>{
						return {url:item}
					})
					this.imageValue = urls;
				})
			},
		},

	}
</script>

<style scoped>
	* {
		padding: 10rpx;
	}

	.upload {
		background-color: #2B9939;
		margin-top: 20rpx;
		color: #fff;
	}

	.reset {
		background-color: #F56C6C;
		margin-top: 20rpx;
		color: #fff;
	}

	input {
		border: 1px solid #999;
	}

	textarea {
		border: 1px solid #999;
		width: 100%;
		box-sizing: border-box;
	}
</style>
