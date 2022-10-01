<template>
	<view class="container">
		<view class="servece_view u-flex u-flex-center u-flex-between u-flex-wrap">
			<view class="sigle_container u-flex u-flex-column u-flex-items-center" v-for="(item, index) in cellList"
				:key="index" @click="handleListItem(item)">
				<view class="bg_style">
					<image :src="item.bgImg" mode="aspectFill"></image>
				</view>
				<view class="title">
					{{ item.name }}
				</view>
			</view>
		</view>
		<u-modal :show="showModal" title="联系客服" confirmColor='#7f5d2e' @confirm='handleCoonfirmModal'>
			<view class="slot-content">
				<u-tooltip v-if="selecttype === 'wx'" :text="tooltipContent"></u-tooltip>
				<u-link  v-if="selecttype === 'tg'" href="https://t.me/richrov" text="电报(点击跳转)" @click="click"></u-link>
			</view>
		</u-modal>

	</view>
</template>

<script>
	import {
		getProductOtherInfos
	} from "@/config/api/user.js";
	export default {
		data() {
			return {
				version: "",
				showModal: false,
				cellList: [{
						bgImg: "/static/img/service_phone.png",
						path: "/pages/mine/telPhone/telPhone",
						name: "客服微信",
						type: "wx",
					},
					{
						bgImg: "/static/img/service_remark.png",
						path: "/pages/mine/feedback/feedback",
						name: "电报(纸飞机)",
						type: "tg",
					},
				],
				weChatNumber: '',
				tgNumber: '',
				tooltipContent: '',
				selecttype: ''
			};
		},
		created() {
			// #ifdef APP-PLUS
			this.version = plus.runtime.version;
			// #endif
			this.getJumpInfos();
		},
		methods: {
			handleListItem(item) {
				this.selecttype = item.type
				if (item.type === 'wx') {
					this.tooltipContent = this.weChatNumber
				}
				if (item.type === 'tg') {
					this.tooltipContent = this.tgNumber
				}
				this.showModal = true
			},
			handleCoonfirmModal() {
				this.showModal = false
			},
			async getJumpInfos() {
				try {
					let res = await getProductOtherInfos({
						code: "contract_us",
					});
					if (res.code === 100000) {
						this.weChatNumber = res?.data?.value?.wx
						this.tgNumber = res?.data?.value?.tg
					}
				} catch (e) {
					// error
				}
			},
		},
	};
</script>

<style lang="scss" scoped>
	.container {
		width: 750rpx;
		height: 100vh;
		background: #090d34;

		.servece_view {
			padding: 0 60rpx;
			box-sizing: border-box;

			.sigle_container {
				width: 288rpx;
				height: 344rpx;
				background: linear-gradient(360deg, #f9f9f7 0%, #fdf1e5 100%);
				border-radius: 16rpx;
				margin-top: 36rpx;
				position: relative;

				.bg_style {
					margin-top: 28rpx;

					image {
						width: 240rpx;
						height: 240rpx;
					}
				}

				.title {
					font-size: 28rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #341c0b;
					line-height: 40rpx;
				}
			}
		}

		.service {
			padding-top: 60upx;

			.logo {
				width: 182upx;
				height: 182upx;
				margin: 0 auto 57upx auto;

				image {
					width: 100%;
					height: 100%;
				}
			}

			/deep/ .u-cell-group__wrapper {
				background: #ffffff;
			}

			/deep/ .u-cell__body {
				padding: 28rpx 30rpx;
			}
		}
	}
</style>
