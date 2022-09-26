<template>
	<view class="like_container">
		<view class="likeContent u-flex u-flex-wrap u-flex-between">
			<view class="photoInfo" v-for="(item,index) in 20" :key="index">
				<view class="image">
					<!-- <image src="/static/img/login/p2.jpeg" mode=""></image> -->
					<image src="https://img0.baidu.com/it/u=4082019450,124630764&fm=253&fmt=auto&app=138&f=JPEG?w=254&h=272" mode=""></image>
					
				</view>
				<view class="nicheng">
					珍妮Jenny珍妮Jenny
				</view>
				<view class="maps u-flex  u-flex-items-center">
					<image src="/static/icon/map.png" mode=""></image>
					<text class="city">上海</text>
				</view>
				<view class="like">
					<image src="/static/icon/like.png" mode=""></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		geCollectSisterList
	} from "@/config/api/product.js";
	export default {
		data() {
			return {

			}
		},
		created() {
			this.getInitList()
		},
		methods: {
			getInitList() {
				geCollectSisterList({}).then((res) => {
					if (res.code === 100000) {
						if (res?.data?.length > 0) {
							this.orderList = res?.data
						}
					}
				}).catch((err) => {
					console.log(err, 'err');
				}).finally(() => {
					this.showOrderFlag = true;
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.like_container {
		.likeContent {
			padding: 32rpx 48rpx;

			.photoInfo {
				width: 312rpx;
				height: 500rpx;
				border-radius: 30rpx;
				margin-bottom: 32rpx;
				position: relative;
				font-family: PingFangSC-Regular, PingFang SC;

				image {
					width: 312rpx;
					height: 500rpx;
					border-radius: 30rpx;
				}

				.nicheng {
					position: absolute;
					width: 180rpx;
					bottom: 68rpx;
					left: 24rpx;
					font-size: 28rpx;
					font-weight: 500;
					color: #FFFFFF;
					line-height: 48rpx;
					z-index: 2;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
					-o-text-overflow: ellipsis;
				}

				.maps {
					position: absolute;
					bottom: 16rpx;
					left: 16rpx;
					width: 180rpx;
					z-index: 2;

					.city {
						width: 100rpx;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
						-o-text-overflow: ellipsis;
					}


					image {
						width: 48rpx;
						height: 48rpx;
					}

					.city {
						font-size: 24rpx;
						font-weight: 400;
						color: #FFFFFF;
						line-height: 40rpx;
					}
				}

				.like {
					position: absolute;
					bottom: 42rpx;
					right: 16rpx;
					z-index: 2;

					image {
						width: 40rpx;
						height: 40rpx;
					}
				}

			}

			.photoInfo::after {
				position: absolute;
				width: 312rpx;
				height: 500rpx;
				background: linear-gradient(360deg, #000000 0%, rgba(0, 0, 0, 0) 100%);
				border-radius: 30rpx;
				content: "";
				top: 0;
				left: 0;
			}
		}
	}
</style>
