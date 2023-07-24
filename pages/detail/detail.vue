<template>
	<view>

		<view v-if="Loaded">
			<view class="box">
				<view class="title">
					<text>{{newsDetail.title}}</text>
				</view>
				
				<view class="content">
					<text>{{newsDetail.content}}</text>
				</view>
				
				<view class="img">
					<image class="imgItem" v-for="item in newsDetail.picUrl" :src="item" mode="aspectFill"></image>
				</view>

				<view class="author">作者：{{newsDetail.author}}</view>

				<view class="time">
					发布于
					<uni-dateformat :date="newsDetail.posttime" format="MM-dd" :threshold="[60000, 7200000]">
					</uni-dateformat>
				</view>


				<view class="bts">
					<button size="mini" type="primary" @click="goEdit">
						编辑
						<uni-icons type="compose" size="20" color="#fff"></uni-icons>
					</button>
					<button size="mini" type="warn" @click="deleteNews()">
						删除
						<uni-icons type="trash-filled" size="20" color="#fff"></uni-icons>
					</button>
				</view>
			</view>

		</view>
		<view v-else>
			<uni-load-more status="loading" iconType="circle"></uni-load-more>
		</view>

	</view>
</template>

<script>
	let id
	export default {
		data() {
			return {
				newsDetail: {},
				Loaded: false
			}
		},
		onLoad(option) {
			// console.log(option.id);
			id = option.id
			// this.getDetail()
		},
		onShow() {
			this.getDetail()
		},
		methods: {
			goEdit(){
				uni.navigateTo({
					url:`/pages/edit/edit?id=${id}`,
				})
			},
			getDetail() {
				uniCloud.callFunction({
					name: "getNewsDetail",
					data: {
						id: id
					}
				}).then(res => {
					// console.log(res);
					this.newsDetail = res.result.data[0]
					this.Loaded = true
					uni.setNavigationBarTitle({
						title: this.newsDetail.title
					})
					// console.log(this.newsDetail);
				})
			},

			deleteNews() {
				uni.showModal({
					title: '确定要删除吗？',
					//使用箭头函数才能找到this.delt
					success: (res)=> {
						if (res.confirm) {
							this.delt()
							console.log(this);
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			delt() {
				uniCloud.callFunction({
					name: "deleteNews",
					data: {
						id: id
					}
				}).then(res => {
					console.log(res);
					uni.showToast({
						title: '删除成功'
					});
					setTimeout(() => {
						uni.reLaunch({
							url: "/pages/index/index"
						})
					}, 600)
				})
			},
		},
	}
</script>

<style scoped>
	.title,.content,.author,.time  {
		padding: 10rpx 25rpx;
	}

	.title {
		font-size: 50rpx;
	}

	.author {
		color: #999;
	}

	button {
		margin: 15rpx;
	}
	
	.img{
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}
	.imgItem{
		padding: 5rpx;
		width: 220rpx;
		height: 220rpx;
	}
</style>
