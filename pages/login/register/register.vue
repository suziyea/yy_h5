<template>
	<view class="container u-flex u-flex-center u-flex-items-center">
		<u-toast ref="uToast"></u-toast>
		<view class="content u-flex u-flex-column u-flex-center">
			<view class="title"> 注册帐号 </view>
			<view class="login_form">
				<!--  账号 -->
				<view class="inputView u-flex u-flex-items-center">
					<image class="nameImage" src="@/static/icon/login_uername.png"></image>
					<input class="inputText" placeholder-class="input-placeholder" v-model="username"
						placeholder="请输入用户名" />
				</view>
				<!-- 密码 -->
				<view class="inputView u-flex u-flex-items-center">
					<image class="nameImage" src="@/static/icon/login_pwd.png"></image>
					<input class="inputText" placeholder-class="input-placeholder" v-model="password" password="true"
						placeholder="请输入密码" />
				</view>

				<!-- 注册button -->
				<view class="btn_view u-flex u-flex-center u-flex-items-center" @click="clickSubmit">
					注册
					<!-- <view class="btn u-flex u-flex-center u-flex-items-center" @click="clickSubmit">登录</view> -->
				</view>
				<view class="jumptext" @click="goLogin"> 已有账号,去登录 </view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		login,
		sendSMS,
		register
	} from "@/config/api/user.js";
	import {
		mapMutations
	} from "vuex";
	export default {
		data() {
			return {
				show: true,
				seconds: 60,
				username: "",
				password: "",
				formContent: {
					smsCode: "",
					phone: "",
				},
				tips: "获取验证码",
			};
		},
		computed: {
			success_verify() {
				return uni.$u.test.mobile(this.formContent.phone);
			},
			sms_code_status() {
				return uni.$u.test.code(this.formContent.smsCode, 4);
			},
		},
		methods: {
			...mapMutations(["SETDEVICE", "LOGIN", "SET_TOKEN"]),
			clickSubmit() {
				uni.$u.debounce(this.submit, 500);
			},

			goLogin() {
				uni.redirectTo({
					url: "/pages/login/login",
				});
			},
			showToast(params) {
				this.$refs.uToast.show({
					...params,
					complete() {
						params.url &&
							uni.navigateTo({
								url: params.url,
							});
					},
				});
			},

			submit() {
				let params_username = uni.$u.trim(this.username, "all");
				let params_pwd = uni.$u.trim(this.password, "all");
				let params = {
					username: params_username,
					password: params_pwd,
				};
				if (!uni.$u.test.rangeLength(params_username, [5, 10])) {
					this.showToast({
						type: "warning",
						message: "用户名长度应在5-10范围",
						iconUrl: "https://cdn.uviewui.com/uview/demo/toast/warning.png",
					})
					return;
				}
				if (!uni.$u.test.enOrNum(params_username)) {
					this.showToast({
						type: "warning",
						message: "用户名只能是数字和字母",
						iconUrl: "https://cdn.uviewui.com/uview/demo/toast/warning.png",
					})
					return;
				}
				if (!uni.$u.test.rangeLength(params_pwd, [3, 16])) {
					this.showToast({
						type: "warning",
						message: "密码长度应在3-16范围",
						iconUrl: "https://cdn.uviewui.com/uview/demo/toast/warning.png",
					})
					return;
				}
				register(params).then((res) => {
					if (res.code === 100000) {
						uni.navigateTo({
							url: "/pages/login/login",
						});
					}
				});
				return;
				this.$refs.formContentRef
					.validate()
					.then((res) => {
						let {
							phone,
							smsCode
						} = this.formContent;
						// uni.$u.toast('校验通过')
						uni.showLoading({
							title: "加载中",
						});
						let loginHeaderObj = {
							osType: uni.$u.os(),
							deviceId: uni.$u.sys().deviceId,
						};
						this.SETDEVICE(loginHeaderObj);
						login({
								phone: phone.replace(/\s*/g, ""),
								code: smsCode,
							}, {
								header: {
									"device-type": uni.$u.os() || "",
									"device-token": uni.$u.sys().deviceId || "",
								},
							})
							.then((res) => {
								uni.hideLoading();
								if (res.code === 100000) {
									let handleBaseInfo = {
										token: res.data.access_token,
										userInfo: res.data,
									};
									this.LOGIN(handleBaseInfo);
									this.SET_TOKEN({
										token: res.data.access_token,
										refresh_token: res.data.refresh_token,
									});
									uni.switchTab({
										url: "/pages/index/index",
									});
								}
							})
							.catch((err) => {
								uni.hideLoading();
								uni.showToast({
									icon: "none",
									title: err.msg || "登录失败，请稍后重试",
								});
							});
					})
					.catch((errors) => {
						uni.$u.toast("校验失败");
					});
			},
			jumpContent(val) {
				if (val === "platform") {
					uni.$u.route("/subpages/assessAgreement/assessAgreement");
					return;
				}

				if (val === "hide") {
					uni.$u.route("/subpages/appPrivacyAgreement/appPrivacyAgreement");
					return;
				}
			},
		},
	};
</script>

<style lang="scss" scoped>
	.container {
		width: 750rpx;
		box-sizing: border-box;
		height: 100vh;
		position: relative;
		background: url(/static/img/login/p3.jpeg) no-repeat;
		background-size: cover;

		.content {
			.title {
				font-size: 64rpx;
				font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: 600;
				color: #ffffff;
				line-height: 60rpx;
				z-index: 3;
			}

			.login_form {
				margin-top: 80rpx;
				z-index: 3;

				.inputView {
					width: 666rpx;
					height: 104rpx;
					background: #363636;
					border-radius: 60rpx;
					opacity: 0.5;
					display: flex;
					margin-bottom: 40rpx;

					/*输入框*/
					.nameImage {
						margin-left: 66rpx;
						margin-right: 36rpx;
						width: 30rpx;
						height: 32rpx;
					}

					.inputText {
						font-size: 32rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						width: 100%;
						color: #ffffff;
						box-sizing: border-box;
					}
				}

				.btn_view {
					margin-top: 72rpx;
					width: 662rpx;
					height: 104rpx;
					background: linear-gradient(90deg, #efd4af 0%, #c1914b 100%);
					border-radius: 52rpx;

					font-size: 32rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #7f5d2e;
					line-height: 44rpx;
				}

				.jumptext {
					margin-top: 24rpx;
					font-size: 28rpx;
					width: 662rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #ffffff;
					line-height: 36rpx;
					text-align: center;
				}
			}
		}

		&:before {
			width: 750rpx;
			height: 100vh;
			content: "";
			position: absolute;
			left: 0;
			right: 0;
			bottom: 0;
			top: 0;
			background: linear-gradient(181deg,
					rgba(0, 0, 0, 0.5) 0%,
					rgba(0, 0, 0, 0.49) 3%,
					rgba(0, 0, 0, 0) 100%);
			opacity: 0.7;
			z-index: 2;
		}

		/deep/ .input-placeholder {
			font-size: 32rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #ffffff;
			line-height: 40rpx;
		}
	}
</style>
