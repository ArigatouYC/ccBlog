<template>
	<view>

		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />


		<h1 class="animate__animated animate__rubberBand">CC新闻30分</h1>

		<view class="item" v-for="item in news" :key="item._id" @click="goDetail(item._id)">
			<view class="lefttext">
				<view class="title">
					{{item.title}}
				</view>
				<view class="info">
					发布于<uni-dateformat :date="item.posttime" format="MM-dd" :threshold="[60000, 7200000]">
					</uni-dateformat>


					|作者:{{item.author}}
				</view>
			</view>
			<view class="rightimg">
				<image v-if="item.picUrl && item.picUrl.length" :src="item.picUrl[0]" mode="aspectFill">
					<image v-else src="../../static/logo.png" mode="aspectFill">

			</view>
		</view>
		<view class="goAdd" @click="goAdd">
			<uni-icons type="plusempty" size="30" color="#fff"></uni-icons>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				news: []
			}
		},
		onLoad() {
			this.getData()
			// uni.startPullDownRefresh();
		},
		onPullDownRefresh() {
			this.news = []
			this.getData()
			// setTimeout(function() {
			// 	uni.stopPullDownRefresh();
			// }, 1000);
		},
		onReachBottom() {
			uni.showLoading({
				title: '新内容加载中',
			});
			setTimeout(function() {
				uni.hideLoading();
			}, 600)

		},
		methods: {
			goAdd() {
				uni.navigateTo({
					url: "/pages/add/add"
				})
			},
			getData() {
				uniCloud.callFunction({
					name: "getNews",
					data: {
						skip: this.news.length
					}
				}).then(res => {
					// console.log(res)
					let oldNews = this.news;
					let newNews = [...oldNews, ...res.result.data]
					this.news = newNews
					uni.stopPullDownRefresh();
				})
			},
			goDetail(id) {
				// console.log(id);
				uni.navigateTo({
					url: `/pages/detail/detail?id=${id}`,
				})
			}
		}
	}
</script>

<style lang="scss">
	.item {
		display: flex;
		justify-content: space-between;
		height: 250rpx;
		border: 1px solid #ccc;
		padding: 15rpx;
		margin: 15rpx;

		.lefttext {
			width: 380rpx;
			height: 250rpx;
			// border: 1px solid red;
			display: flex;
			flex-direction: column;
			justify-content: space-around;

			.title {
				font-size: 30rpx;
				overflow: hidden; //超出隐藏
				text-overflow: ellipsis; //溢出显示省略号
				white-space: normal; //常规默认，会折行
				display: -webkit-box;
				-webkit-box-orient: vertical; //子元素排列 vertical（竖排）orhorizontal（横排）
				-webkit-line-clamp: 3;
			}

			.info {
				font-size: 20rpx;
				color: #999;
			}
		}

		image {
			height: 250rpx;
			width: 320rpx;
		}
	}

	.goAdd {
		width: 100rpx;
		height: 100rpx;
		background-color: #2B9939;
		opacity: 0.9;
		color: #fff;
		border-radius: 50%;
		font-size: 50rpx;
		//中间+号位置
		display: flex;
		justify-content: center;
		align-items: center;
		//
		position: fixed;
		right: 90rpx;
		bottom: 150rpx;
	}

	h1 {
		text-align: center;
	}

	// .enter-active {
	//   animation: cc 0.2s linear;
	// }

	// .leave-active {
	//   animation: cc 0.2s linear reverse;
	// }

	// @keyframes cc {
	//   from {
	//     transform: translateX(100%);
	//   }
	//   to {
	//     transform: translateX(0px);
	//   }
	// }
</style>
