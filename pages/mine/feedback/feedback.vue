<template>
	<view class="feedback">
		<view class="group">
			<view class="item">
				<view class="title">联系人</view>
				<view class="input"><input type="text" v-model="contact" placeholder="请输入您的姓名"
						placeholder-class="myholder" /></view>
			</view>
			<view class="item">
				<view class="title">联系电话</view>
				<view class="input"><input type="number" v-model="contact_phone" placeholder="请输入您的手机号码"
						placeholder-class="myholder" /></view>
			</view>
			<view class="item">
				<view class="title">联系邮箱</view>
				<view class="input"><input type="text" v-model="contact_email" placeholder="请输入您的邮箱"
						placeholder-class="myholder" /></view>
			</view>
		</view>
		<view class="block"></view>
		<view class="group">
			<view class="textarea">
				<view class="title">反馈内容</view>
				<view class="content">
					<textarea v-model="content" maxlength="-1" placeholder="如果您对我们的商品、服务、APP有什么意见或建议， 请在这里告诉我们"
						placeholder-class="myholder" />
				</view>
			</view>
		</view>
		<view class="btn_view u-flex u-flex-center ">
			<view class="btnContent u-flex u-flex-center  u-flex-items-center " @click="clickSubmit">
				提交
			</view>
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import {
		addFeedback
	} from "@/config/api/user.js";
	export default {
		data() {
			return {
				contact: '',
				contact_phone: '',
				contact_email: '',
				content: ''
			};
		},
		methods: {
			clickSubmit() {
				uni.$u.debounce(this.submit, 500)
			},

			submit() {
				if (!this.contact) {
					this.showNoneIconToast('请输入您的姓名！')
					return
				}
				if (!this.contact_phone) {
					this.showNoneIconToast('请输入您的手机号码！')
					return
				}
				if (!this.content) {
					this.showNoneIconToast('请填写反馈内容！')
					return
				}
				if (!uni.$u.test.mobile(this.contact_phone)) {
					this.showNoneIconToast('请输入正确的手机号！')
					return
				}
				if (this.contact_email) {
					if (!uni.$u.test.email(this.contact_email)) {
						this.showNoneIconToast('请输入正确的邮箱格式！')
						return
					}
				}

				addFeedback({
					"contact": this.contact,
					"contact_phone": this.contact_phone,
					"contact_email": this.contact_email,
					"content": this.content
				}).then((res) => {
					if (res.code === 100000) {
						let params = {
							message: "我们已收到反馈内容，会尽快处理",
							url: '/pages/mine/mine'
						}
						this.$refs.uToast.show({
							...params,
							complete() {
								params.url && uni.navigateTo({
									url: params.url
								})
							}
						})
					}

				}).catch((err) => {
					console.log(err, 'err');
				})
			},
			showNoneIconToast(title) {
				uni.showToast({
					icon: 'none',
					title: title
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		width: 100%;
		background-color: #F9F9F9;

		.feedback {
			width: 100%;
			height: 100%;
			position: fixed;
			background-color: #f7f7f7;

			.block {
				width: 100%;
				height: 20rpx;
			}

			.group {
				background-color: #FFFFFF;

				.myholder {
					color: #999999;
					font-size: $mc-normal-font-size;
					// text-align: right;
					// font-size: 30rpx;
				}

				.item {
					@extend %flex-layout-row;
					height: 100rpx;
					line-height: 100rpx;
					justify-content: space-between;
					margin-left: 45rpx;
					border-bottom: 1rpx solid #e6e6e6;

					.title {
						flex: 0 0 121rpx;
						font-size: $mc-normal-font-size;
						color: $mc-normal-font-color;
					}

					.input {
						flex: 1;
						text-align: left;
						margin-left: 72rpx;

						input {
							padding-right: 20rpx;
						}
					}
				}

				:last-of-type {
					border-bottom: none;
				}

				.textarea {
					.title {
						font-size: $mc-normal-font-size;
						color: $mc-normal-font-color;
						margin-left: 45rpx;
						padding: 33rpx 0 28rpx 0;
					}

					.content {
						padding: 0 46rpx 46rpx 46rpx;

						textarea {
							width: 100%;
						}
					}

				}
			}

			.submit {
				width: 640rpx;
				height: 88rpx;
				background: linear-gradient(-90deg, #FF7611, #FF9001);
				border-radius: 44rpx;
				position: fixed;
				bottom: 19rpx;
				z-index: 1;
				left: 55rpx;
				right: 55rpx;
				color: #FFFFFF;
				font-size: $mc-large-font-size;
			}
		}
	}

	.btn_view {
		width: 100%;
		margin-top: 134rpx;
		box-sizing: border-box;

		.btnContent {
			width: 662rpx;
			height: 82rpx;
			background: linear-gradient(90deg, #EFD4AF 0%, #C1914B 100%);
			border-radius: 48rpx;
			font-size: 32rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #7F5D2E;
		}
	}
</style>
