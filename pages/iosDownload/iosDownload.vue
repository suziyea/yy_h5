<template>
	<view class="weixinTip" v-if="isWeat">
		<view class="wechatImg">
			<image src="/static/img/guide/isWechat.jpeg"></image>
		</view>
	</view>
	<view class="ios_download_contatiner" v-else>
		<!-- 介绍 -->
		<view class="introduce">
			<view class="app_desc u-flex u-flex-center u-flex-items-center">
				<image src="/static/img/guide/logo.png" mode=""></image>
				<view class="desc u-flex u-flex-center u-flex-items-center">
					上门按摩 我们只服务高端用户
				</view>
			</view>

			<!-- 防掉签下载 -->
			<view class="download_tip u-flex u-flex-center u-flex-items-center">
				<view class="content u-flex u-flex-center u-flex-items-center">
					<image src="/static/img/guide/ios_icon.png" mode=""></image>
					防掉签下载
				</view>
			</view>

			<!-- 下载 -->
			<view class="download_btn u-flex u-flex-center u-flex-items-center">
				<view class="btn u-flex u-flex-center u-flex-items-center" @click="downloadApp('')">
					我要下载
				</view>
			</view>
		</view>

		<view class="desc_img_container u-flex u-flex-column u-flex-items-center">
			<view class="desc_introduce  u-flex u-flex-items-center">
				为了你的隐私安全，请勿与“国家反诈中心”APP同设备使用
			</view>

			<view class="download_desc_view">
				<view class="desc_img">
					<image src="/static/img/guide/ios_download_desc.png" mode=""></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isWeat: false
			}
		},
		onLoad() {
			this.isWeat = this.is_weixin()
		},
		methods: {
			downloadApp(val = '') {
				// 创建A标签
				const link = document.createElement('a');
				link.style.display = 'none';
				link.href =
					`itms-services:///?action=download-manifest&url=https://apk.yeyuesm.com/yeyuesm.plist`;
				// 触发点击方法
				link.setAttribute('download', '夜约上门');
				document.body.appendChild(link);
				link.click();
				return;
			},
			is_weixin() {
				var ua = navigator.userAgent.toLowerCase();
				if (ua.match(/MicroMessenger/i) == "micromessenger") {
					return true;
				} else {
					return false;
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.weixinTip {
		width: 750rpx;
		height: 100vh;

		.wechatImg {
			width: 100%;
			height: 100%;
			box-sizing: border-box;

			image {
				width: 750rpx;
				height: 1000rpx;
			}
		}
	}

	.ios_download_contatiner {
		width: 750rpx;
		height: 100%;

		.introduce {
			width: 750rpx;
			height: 772rpx;
			background: url(/static/img/guide/ios_download_desc_bg.png) no-repeat;
			background-size: cover;
			font-weight: 500;
			color: #7F5D2E;
			box-sizing: border-box;
			position: relative;
			display: flex;

			.app_desc {
				width: 750rpx;
				height: 100rpx;
				padding: 0 46rpx;
				box-sizing: border-box;
				margin-top: 34rpx;

				image {
					width: 100rpx;
					height: 100rpx;
				}

				.desc {
					width: 552rpx;
					font-size: 40rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #EDDBC3;
					line-height: 56rpx;
					text-shadow: 2rpx 4rpx 2rpx rgba(37, 37, 37, 0.5);
				}
			}

			.download_tip {
				width: 194rpx;
				height: 48rpx;
				background: #FFEBCF;
				border-radius: 200rpx 0rpx 0rpx 200rpx;
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #C99B5C;
				position: absolute;
				bottom: 182rpx;
				right: 0;

				.content {
					height: 26rpx;

					image {
						width: 20rpx;
						height: 26rpx;
						margin-right: 6rpx;
					}
				}

			}

			.download_btn {
				width: 750rpx;
				height: 96rpx;
				box-sizing: border-box;
				position: absolute;
				bottom: -48rpx;

				.btn {
					width: 686rpx;
					height: 96rpx;
					background: linear-gradient(90deg, #EFD4AF 0%, #C1914B 100%);
					border-radius: 48rpx;
					font-weight: 500;
					color: #7F5D2E;
				}
			}
		}

		.desc_img_container {
			width: 750rpx;
			height: 1290rpx;
			background: linear-gradient(360deg, #9B9B9B 0%, #4D4D4D 100%);

			.desc_introduce {
				width: 662rpx;
				height: 98rpx;
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
				// line-height: 34rpx;
				margin-top: 48rpx;
				padding: 0 12rpx;
				box-sizing: border-box;
			}

			.download_desc_view {
				.desc_img {
					width: 684rpx;
					height: 1104rpx;

					image {
						width: 684rpx;
						height: 1104rpx;
					}
				}
			}
		}
	}
</style>
