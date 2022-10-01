<template>
	<view class="like_container" v-if="showFlag">
		<view class="likeContent u-flex u-flex-wrap u-flex-between" v-if="likeSisters.length > 0">
			<view class="photoInfo" v-for="(item,index) in likeSisters" :key="index" @click="lookSisterDetail(item)">
				<view class="image">
					<!-- <image src="/static/img/login/p2.jpeg" mode=""></image> -->
					<!-- <image
						src="https://img0.baidu.com/it/u=4082019450,124630764&fm=253&fmt=auto&app=138&f=JPEG?w=254&h=272"
						mode="aspectFit"></image> -->
					<image :src="item.index_image_url" mode="aspectFit"></image>
				</view>
				<view class="nicheng">
					<!-- 珍妮Jenny珍妮Jenny -->
					{{item.name}}
				</view>
				<view class="maps u-flex  u-flex-items-center">
					<image src="/static/icon/map.png" mode="aspectFit"></image>
					<text class="city"> {{item.address}}
					</text>
				</view>
				<view class="like">
					<image src="/static/icon/like.png" mode="aspectFit"></image>
				</view>
			</view>
		</view>
		<view class="empty" v-else>
			<u-empty mode="order" :text="emptyText" icon="http://cdn.uviewui.com/uview/empty/order.png">
			</u-empty>
		</view>
	</view>
</template>

<script>
	import {
		getCollectSisterList
	} from "@/config/api/sister.js";
	export default {
		data() {
			return {
				likeSisters: [],
				emptyText: "暂无喜欢的小姐姐哦",
				showFlag: false,
			}
		},
		created() {
			this.getInitList()
		},
		methods: {
			getInitList() {
				getCollectSisterList({}).then((res) => {
					if (res.code === 100000) {
						this.likeSisters = res?.data
					}
				}).catch((err) => {
					console.log(err, 'err');
				}).finally(() => {
					this.showFlag = true;
				})
			},
			lookSisterDetail(val) {
				uni.navigateTo({
					url: `/pages/dataDetail/dataDetail?id=${val.sister_id}&name=${new Date().getTime()}`
				});
			}
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
					width: 280rpx;
					z-index: 2;

					.city {
						width: 260rpx;
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
