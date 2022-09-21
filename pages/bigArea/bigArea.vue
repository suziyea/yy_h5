<template>
	<view class="bigAreaView">
		<!-- 上面icon -->
		<view class="topIcons u-flex u-flex-center u-flex-items-center">
			<view class="sigleIconview u-flex u-flex-column  u-flex-center u-flex-items-center" v-for="(item,index) in topIconsList" :key="index">
				<view class="img u-flex u-flex-center">
					<image :src="item.iconPath" mode="aspectFill"></image>
				</view>
				<view class="text u-flex u-flex-center">
					{{item.text}}
				</view>
			</view>
		</view>
		<view class="grayview"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				topIconsList: [{
						"pagePath": "/pages/index/index",
						"text": "首页",
						"iconPath": "/static/icon/bigArea01.png",
					},
					{
						"pagePath": "/pages/mine/mine",
						"text": "交流群",
						"iconPath": "/static/icon/bigArea02.png",
					},
					{
						"pagePath": "/pages/mine/mine",
						"text": "福利地址",
						"iconPath": "/static/icon/bigArea03.png",
					},
					{
						"pagePath": "/pages/mine/mine",
						"text": "专属客服",
						"iconPath": "/static/icon/bigArea04.png",
					}
				]
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.bigAreaView {
		.topIcons {
			width: 750rpx;
			height: 222rpx;
			box-sizing: border-box;
			padding: 0 32rpx;

			// border:1px solid skyblue;
			.sigleIconview {
				width: 164rpx;
				height: 176rpx;

				.img {
					image {
						width: 100rpx;
						height: 100rpx;
					}
				}

				.text {
					font-size: 14px;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #444444;
					line-height: 20px;
				}
			}
		}

		.grayview {
			width: 750rpx;
			height: 16rpx;
			background: #F9F9F9;
		}
	}
</style>
