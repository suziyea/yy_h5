<template>
	<view class="welfare_container">
		<view class="content u-flex u-flex-items-center" v-for="(item,index) in websiteAddrList" :key="index">
			<view class="name ellipsis">
				{{item.name}}
			</view>
			<view class="btn u-flex u-flex-center u-flex-items-center">
				点击进入
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getWebsiteList
	} from "@/config/api/product.js";

	export default {
		data() {
			return {
				websiteAddrList: []
			}
		},
		created() {
			this.storageUserInfo = uni.getStorageSync('userInfo');
			this.initData()
		},
		methods: {
			initData() {
				this.getDetails()
			},
			getDetails() {
				getWebsiteList({}).then((res) => {
					if (res.code === 100000) {
						this.websiteAddrList = res?.data || {}
					}
				}).catch((err) => {
					console.log(err, 'err');
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.welfare_container {
		width: 750rpx;
		height: 1624rpx;
		background: #F9F9F9;

		.content {
			width: 100%;
			height: 116rpx;
			background: #FFFFFF;
			padding: 0 44rpx;
			box-sizing: border-box;
			margin-bottom: 12rpx;

			.name {
				width: 190px;
				font-size: 28rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #000000;
				line-height: 40rpx;
			}

			.btn {
				margin-left: auto;
				width: 156rpx;
				height: 52rpx;
				background: linear-gradient(180deg, #3A3938 0%, #93908B 100%);
				border-radius: 28rpx;
				font-size: 24rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #EDDBC3;
				line-height: 34rpx;
			}

		}

		.content:last-child {
			margin-bottom: 30rpx;
		}

	}
</style>
