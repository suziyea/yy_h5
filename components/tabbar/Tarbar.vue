<template>
	<view class="container_tab ">
		<view class="content u-flex u-flex-between  ">
			<view class="tab u-flex  u-flex-center u-flex-items-center " v-for="(item,index) in tabbarList" :key="index"
				@tap="navigatorTo(item)">
				<image v-if="item.page === currentPage" :src="item.selectedIconPath" mode=""></image>
				<image v-else :src="item.iconPath" mode=""></image>
				<!-- <view class="text u-flex u-flex-center" :class="{'tabbarActive': currentPage === item.page}">{{item.text}}
				</view> -->


			</view>
			<view class="bigAreaImg" @click="handleJumpItem">
				<!-- 啊、 -->
				<image src="/static/tabIcon/bigArea.png" mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			currentPage: {
				type: String,
				default: 'index',
			}
		},
		data() {
			return {
				tabbarList: [{
						"pagePath": "/pages/index/index",
						"page": "index",
						"text": "首页",
						"iconPath": "/static/tabIcon/home.png",
						"selectedIconPath": "/static/tabIcon/home_fill.png"
					},
					{
						"pagePath": "/pages/mine/mine",
						"page": "mine",
						"text": "我的",
						"iconPath": "/static/tabIcon/user_line.png",
						"selectedIconPath": "/static/tabIcon/user_fill.png"
					}
				]
			}
		},
		onShow() {
			uni.hideTabBar({
				animation: false
			})
		},
		methods: {
			navigatorTo(item) {
				uni.redirectTo({
					url: `${item.pagePath}`
				});
			},
			handleJumpItem(item) {
				uni.navigateTo({
					url: '/pages/bigArea/bigArea'
				});
				return;
			},
		}
	}
</script>

<style lang="scss" scoped>
	.container_tab {
		// width: 100%;
		position: fixed;
		left: 0;
		bottom: 0;
		width: 750rpx;
		height: 156rpx;
		// height: 98rpx;
		// background: #171D41;
		background: url(/static/img/menubar_strip_bg.png) no-repeat;
		background-size: cover;
		// border: 1px solid red;
		box-sizing: border-box;

		.content {
			width: 100%;
			height: 100%;
			position: relative;
			box-sizing: border-box;

			.tab {
				width: 300rpx;
				height: 100%;
				position: relative;
				box-sizing: border-box;

				image {
					width: 48rpx;
					height: 48rpx;
					position: absolute;
					bottom: 24rpx;
				}

				.text {
					font-size: 20rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #B4BCCF;
					line-height: 28rpx;
				}

				.tabbarActive {
					color: #ECC6A1 !important;
				}
			}

			.bigAreaImg {
				position: absolute;
				top: 50%;
				width: 108rpx;
				height: 108rpx;
				left: 50%;
				transform: translate(-50%, -50%);

				image {
					width: 108rpx;
					height: 108rpx;
				}
			}
		}

	}
</style>
