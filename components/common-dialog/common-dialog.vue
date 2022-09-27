<template>
	<view>
		<view class="dialog">
			<view class="title">{{title}}
				<view class="close" @click.stop="close">
					<image src="/static/icon/close_icon.png" mode="aspectFill"></image>
				</view>
			</view>
			<view class="content">
				{{content}}
			</view>
			<view class="button_layout">
				<view v-if="showCancel" class="cancel" @click.stop="cancel">{{cancelText}}</view>
				<view class="confirm" @click.stop="confirm">{{confirmText}}</view>
			</view>
		</view>
		<view class="mask" @touchmove.stop.prevent="stopScroll"></view>
	</view>
</template>

<script>
	export default {
		name: 'common-dialog',
		props: {
			title: {
				type: String,
				default: ''
			},
			content: {
				type: String,
				default: ''
			},
			confirmText: {
				type: String,
				default: '确定'
			},
			cancelText: {
				type: String,
				default: '取消'
			},
			showCancel: {
				type: Boolean,
				default: false
			}
		},
		// data() {
		// 	return {
		// 		show: false
		// 	}
		// },
		created() {},
		mounted() {},
		methods: {
			close() {
				this.$emit('on-click-dialog', 'close')
			},
			confirm() {
				this.$emit('on-click-dialog', 'confirm')
			},
			cancel() {
				this.$emit('on-click-dialog', 'cancel')
			},
			stopScroll() {
				return false
			},
		}
	}
</script>

<style lang="scss" scoped>
	.dialog {
		position: fixed;
		z-index: 100000;
		top: 30%;
		left: 50%;
		margin-left: -40%;
		width: 80%;
		padding-bottom: 60upx;
		color: #333333;
		font-size: 28upx;
		background: #FFFFFF;
		border-radius: 32rpx;

		.title {
			padding: 46upx 0 37upx 0;
			width: 100%;
			text-align: center;
			font-weight: 600;
			position: relative;
			font-size: 36rpx;
			font-family: PingFangSC-Semibold, PingFang SC;
			font-weight: 600;
			color: #000000;
			line-height: 50rpx;

			.close {
				position: absolute;
				right: 42upx;
				top: 47upx;
				width: 30upx;
				height: 31upx;

				image {
					width: 100%;
					height: 100%;
				}
			}
		}

		.content {
			width: 80%;
			margin: 0 auto;
			text-align: center;
			font-size: 28rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #444444;
			padding-bottom: 30rpx;
		}

		.content_bottom {
			width: 80%;
			margin: 0 auto;
			font-size: 28upx;
			color: #333333;
		}

		.cancel {
			width: 100%;
			height: 82rpx;
			text-align: center;
			line-height: 82rpx;
			color: rgb(111, 111, 111);
			margin: 30rpx 30rpx 0 auto;
			background: rgb(255, 255, 255);
			border-radius: 42rpx;
			border: 1px solid rgb(179, 179, 179);
		}

		.confirm {
			width: 100%;
			height: 82rpx;
			text-align: center;
			line-height: 82rpx;
			margin: 30rpx auto 0 auto;
			background: linear-gradient(90deg, #EFD4AF 0%, #C1914B 100%);
			border-radius: 48rpx;
			font-size: 32rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #7F5D2E;
		}

		.button_layout {
			display: flex;
			flex-direction: row;
			margin: 0 40upx;
		}
	}

	.mask {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 99999;
		background: rgba(0, 0, 0, 0.5);
	}
</style>
