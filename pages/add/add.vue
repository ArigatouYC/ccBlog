<template>
	<view>
		<view class="add">
			<form @submit="submit">
				标题:<input type="text" v-model="inputInfo.title" placeholder="输入标题" name="title">

				作者:<input type="text" v-model="inputInfo.author" placeholder="输入作者" name="author">

				<!-- filePick -->
				上传图片
				<uni-file-picker 
				v-model="imageValue" 
				fileMediatype="image" 
				mode="grid" 

				@select="select"
				@progress="progress" 
				@success="upsuccess" 
				@fail="fail"
				 />

				正文:<textarea name="content" v-model="inputInfo.content" cols="30" rows="20">
				</textarea>

				<button class="reset" form-type="reset">
					重置
					<uni-icons type="loop" size="20" color="#fff"></uni-icons>
				</button>
				<button class="upload" form-type="submit"  :disabled="isDisable">
					上传
					<uni-icons type="cloud-upload-filled" size="20" color="#fff"></uni-icons>
				</button>
			</form>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imageValue: [],
				picUrl:[],
				inputInfo: {
					titile: "",
					author: "",
					content: ""
				},
				isDisable: false
			}
		},
		methods: {
			//filePick
			// 上传成功
			upsuccess(e) {
				console.log('上传成功',e)
					this.picUrl = e.tempFilePaths
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

			//filePick
			submit(e) {
				let newsInfo = e.detail.value
				// console.log(newsInfo)
				uniCloud.callFunction({
					name: "addNews",
					data: {
						newsInfo: newsInfo,
						picUrl:this.picUrl
					}
				}).then(res => {
					// console.log(res);
					console.log(this.picUrl);
					uni.showToast({
						title: "上传成功！"
					})
					setTimeout(() => {
						uni.reLaunch({
							url: "/pages/index/index"
						})
					}, 1000)

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
