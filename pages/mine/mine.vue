<template>
	<view class="container" v-if="true">
		<common-dialog v-if="showDialog" title="温馨提示" content="您确认要注销账户吗！" confirmText="确认"
			v-on:on-click-dialog="onClickDialog"></common-dialog>
		<view class="bgBox">
			<view class="userInfo">
				<view class="avatar">
					<image src="/static/icon/mine_avatar.png" mode="aspectFill"></image>
				</view>
				<view class="userName u-flex u-flex-column" v-if="isLogin">
					<text class="name">{{`HI，${getUserInfos.username || ''}`}}</text>
				</view>
				<view class="userName" v-else>
					<navigator open-type="navigate" url="/pages/login/login">
						登录
					</navigator>
				</view>
				<view class="memberLevel" @click="handleListItem({path:'/pages/mine/equity/equity'})">
					<view class="text" :class="membershipLevel.levelstyle">{{membershipLevel.levelName}}</view>
					<view class="memberImg">
						<image
							:src="`/static/icon/${membershipLevel.levelStatus === 'silver' ? 'silver_mark' : 'gold_mark'}.png`"
							mode="aspectFill">
						</image>
					</view>
				</view>
			</view>
		</view>

		<!-- 特权 -->
		<view class="privilege u-flex  u-flex-center u-flex-items-center">
			<view class="privilegeImg u-flex  u-flex-center u-flex-items-center" @click="handleListItem('equity')">
				<view class="text">我的特权</view>
				<view class="clickImg">
					<image src="/static/icon/mine_jumpcolor.png" mode="aspectFill"></image>
				</view>
			</view>
		</view>

		<!-- 列表 -->
		<view class="mine_list u-flex u-flex-center">
			<view class="list_content ">
				<view class="title">常用功能</view>
				<view class="listSigle u-flex u-flex-center u-flex-items-center" v-for="(item,index) in firstList"
					:key="index" @click="handleListItem(item)">
					<view class="lefticon u-flex u-flex-center">
						<image :src="item.icon" mode=""></image>
					</view>
					<view class="text">{{item.name}}</view>
					<view class="rightIcon">
						<image src="/static/icon/mine_jump.png" mode=""></image>
					</view>
				</view>
			</view>
		</view>


		<view class="mine_list u-flex u-flex-center">
			<view class="list_content ">
				<view class="title">其他工具</view>
				<view class="listSigle u-flex u-flex-center u-flex-items-center" v-for="(item,index) in secondList"
					:key="index" @click="handleListItem(item)">
					<view class="lefticon u-flex u-flex-center">
						<image :src="item.icon" mode=""></image>
					</view>
					<view class="text">{{item.name}}</view>
					<view class="rightIcon">
						<image src="/static/icon/mine_jump.png" mode=""></image>
					</view>
				</view>
			</view>
		</view>

		<!-- 弹窗 -->
		<view>
			<u-modal :show="showModal" :title="title" :confirmText="confirmText" @confirm="confirm"
				:showCancelButton="true" @cancel=" showModal = false" :content='content'></u-modal>
			<!-- <u-button @click="show = true">打开</u-button> -->
		</view>
		<view class="tab">
			<Tarbar currentPage="mine"></Tarbar>
		</view>
	</view>

</template>

<script>
	import {
		mapGetters,
		mapMutations
	} from 'vuex'
	import common from '@/utils/common'
	import store from "@/store"
	import Tabbar from '@/components/tabbar/Tarbar.vue'
	import {
		deleteUser,
		getUserInfo
	} from "@/config/api/user.js";
	import Tarbar from '@/components/tabbar/Tarbar.vue'
	import commonDialog from '@/components/common-dialog/common-dialog.vue'

	export default {
		components: {
			commonDialog,
		},
		data() {
			return {
				showDialog: false,
				firstList: [{
						icon: '/static/icon/mine_like.png',
						path: '/pages/mine/likePage/likePage',
						name: '喜欢',
						enName: 'like',
						isLogin: false
					},
					{
						icon: '/static/icon/mine_record.png',
						path: '/pages/mine/payRecord/payRecord',
						name: '消费记录',
						enName: 'record',
						isLogin: false
					}
				],
				secondList: [{
						icon: '/static/icon/mine_contact.png',
						path: '/pages/mine/telPhone/telPhone',
						name: '联系我们',
						enName: 'contact',
						isLogin: false
					},
					{
						icon: '/static/icon/mine_about.png',
						path: '/subpages/appPrivacyAgreement/appPrivacyAgreement',
						name: '关于我们',
						enName: 'about',
						isLogin: false
					},
					{
						icon: '/static/icon/mine_suggest.png',
						path: '/pages/mine/feedback/feedback',
						name: '建议反馈',
						enName: 'suggest',
						isLogin: false,
					},
					{
						icon: '/static/icon/mine_cooperation.png',
						path: '/pages/login/login',
						name: '商务合作',
						enName: 'cooperation',
						isLogin: false
					},
					{
						icon: '/static/icon/mine_logout.png',
						path: '/pages/login/login',
						name: '注销',
						enName: 'logout',
						isLogin: false
					}
				],
				showModal: false,
				title: '登录',
				content: '您好，请先完成登录！',
				confirmText: '去登录',
			};
		},
		components: {
			Tarbar,
		},
		mounted() {
			// uni.getLocation(OBJECT)
			// uni.getLocation({
			// 	type: 'wgs84',
			// 	success: function (res) {
			// 		uni.showToast({
			// 		title: `${res.longitude} -- 当前位置的纬度 ${res.latitude}`,
			// 		icon:'none',
			// 		duration: 200000
			// 		});

			// 		console.log('当前位置的经度：' + res.longitude);
			// 		console.log('当前位置的纬度：' + res.latitude);
			// 	}
			// });
			// const hello = common.getLocation()
			// uni.showToast({
			// 		title: JSON.stringify(hello),
			// 		icon:'none',
			// 		duration: 200000
			// 		});
		},
		methods: {
			...mapMutations(['LOGOUT']),
			orderPage(item) {
				uni.navigateTo({
					url: item.path
				})
			},

			clickNav(item) {
				if (!(store.state.user.token)) {
					this.showModal = true;
					return;
				}

				if (item.page) {
					getUserInfo({}).then(async (res) => {
						if (res.code === 100000) {
							if ((res?.data && res?.data.status === 4) || (res?.data && res?.data.status ===
									5)) {
								getQy({}).then((res) => {
									if (res.code === 100000) {
										uni.navigateTo({
											url: `/pages/webview/webview?urlPath=${encodeURIComponent(res?.data?.url)}`
										});
									} else {
										uni.$u.route(item.path);
									}
								}).catch((err) => {
									console.log(err, 'err');
								})
							} else {
								uni.$u.route(item.path);
							}

						}
					}).catch((err) => {
						console.log(err, 'err');
					})
					return
				}

				if (item.path) {
					uni.$u.route(item.path);
				}
			},
			handleListItem(item) {
				console.log(item, '看看')
				if (item === 'equity') {
					uni.navigateTo({
						url: `/pages/mine/equity/equity`
					});
					return;
				}
				if (item.enName === 'logout') {
					this.showDialog = true
					return;
				}
				uni.navigateTo({
					url: `${item.path}`
				});
				return;
			},
			confirm() {
				this.showModal = false;
				if (!(store.state.user.token)) {
					uni.$u.route('/pages/login/login');
					return;
				}
			},
			onClickDialog(event) {
				if (event == 'confirm') {
					deleteUser().then((res) => {
						if (res.code === 100000) {
							this.LOGOUT()
							uni.navigateTo({
								url: '/pages/login/login'
							});
							return;
						}

					})
				}
				this.showDialog = false
			},
		},
		onLoad() {
			uni.showLoading({

			})
		},
		onReady() {
			// #ifdef APP-PLUS
			plus.navigator.setStatusBarStyle('light');
			// #endif
		},
		onShow() {
			// #ifdef APP-PLUS
			plus.navigator.setStatusBarStyle('light');
			// #endif
			uni.hideLoading()
		},
		computed: {
			...mapGetters(['isLogin', 'getUserInfos']),
			headStr() {
				/**	getSexByBirthday
				 * @param idCard
				 * '0' 男
				 * '1' 女
				 */
				let sexNum = this.getUserInfos?.status ? common.getSexByBirthday(this.getUserInfos.id_number) : 2
				if (sexNum === '0') {
					return 'headman'
				}
				if (sexNum === '1') {
					return 'headwomen'
				}
				return 'head'
			},
			membershipLevel() {
				/**	membershipLevel
				 * @param 
				 * 
				 * 1-普通用户
				 * 2-普通会员
				 * 3-高级会员
				 */
				let obj = {
					levelName: '成为会员',
					levelstyle: {
						baijinColor: true,
						goldColor: false,
					},
					levelStatus: 'ordinary'
				}
				let sexNum = this.getUserInfos?.status
				if (this.getUserInfos?.status === 1) {
					obj.levelName = '成为会员',
						obj.levelstyle = {
							baijinColor: true,
							goldColor: false,
						}
					// obj.levelStatus ='ordinary'
					obj.levelStatus = 'silver'
					return obj
				}
				if (this.getUserInfos?.status === 2) {
					obj.levelName = '普通会员',
						obj.levelstyle = {
							baijinColor: true,
							goldColor: false,
						}
					obj.levelStatus = 'silver'
					return obj
				}
				if (this.getUserInfos?.status === 3) {
					obj.levelName = '高级会员',
						obj.levelstyle = {
							baijinColor: false,
							goldColor: true,
						}
					obj.levelStatus = 'gold'
					return obj
				}
				return obj
			}


		}
	}
</script>

<style lang="scss" scoped>
	.container {
		width: 100%;
		height: 100vh;
		height: 1624rpx;
		background: #F9F9F9;
	}

	.bgBox {
		// width: 100%;
		width: 750rpx;
		height: 284rpx;
		background: url(../../static/img/mine_bg.png) no-repeat;
		background-size: cover;
		position: relative;

		.userInfo {
			width: 676rpx;
			position: absolute;
			top: 40rpx;
			left: 44rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			box-sizing: border-box;

			.avatar {
				width: 108rpx;
				height: 108rpx;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.userName {
				font-size: 36rpx;
				font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: 600;
				color: #333333;
				line-height: 50rpx;
				margin: 0 26rpx;
				box-sizing: border-box;

				.name {
					font-size: 36rpx;
					font-family: PingFangSC-Semibold, PingFang SC;
					font-weight: 600;
					color: #fff;
					line-height: 50rpx;
					margin-bottom: 4rpx;
				}
			}

			.memberLevel {
				margin-left: auto;
				position: relative;
				margin-right: 45rpx;

				.text {
					width: 156rpx;
					height: 48rpx;
					font-size: 24rpx;
					font-weight: 500;
					line-height: 34rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					border-radius: 200rpx 0rpx 0rpx 200rpx;
					display: flex;
					justify-content: center;
					align-items: center;
				}

				.baijinColor {
					background: #EAEDF2;
					color: #A1C0E4;
				}

				.goldColor {
					background: #FFEBCF;
					color: #C99B5C;
				}

				.memberImg {
					position: absolute;
					right: -44rpx;
					top: -16rpx;
					width: 72rpx;
					height: 72rpx;

					image {
						width: 72rpx;
						height: 72rpx;
					}
				}
			}
		}

	}

	.privilege {
		width: 750rpx;
		height: 176rpx;
		box-sizing: border-box;
		position: relative;
		z-index: 2;
		margin-top: -88rpx;
		margin-bottom: 36rpx;

		.privilegeImg {
			width: 702rpx;
			height: 176rpx;
			background: url(../../static/img/mine_border.png) no-repeat;
			background-size: cover;

			.text {
				font-size: 30rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #7F5D2E;
				line-height: 42rpx;
				margin-left: 56rpx;
			}

			.clickImg {
				margin-left: auto;
				margin-right: 52rpx;

				image {
					width: 15.02rpx;
					height: 27rpx;
				}
			}
		}
	}


	.mine_list {
		width: 100%;
		margin-bottom: 48rpx;

		.list_content {
			width: 702rpx;
			// height: 296rpx;

			padding: 0rpx 40rpx 0rpx 32rpx;
			background: #FFFFFF;
			border-radius: 16rpx;
			box-sizing: border-box;

			.title {
				width: 100%;
				font-size: 30rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #444444;
				line-height: 42rpx;
				margin: 32rpx 0rpx 12rpx 0;
			}

			.listSigle {
				width: 100%;
				height: 104rpx;

				.lefticon {
					image {
						width: 48rpx;
						height: 48rpx;
					}
				}

				.text {
					margin-left: 26rpx;
					font-size: 28rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #444444;
					line-height: 40rpx;
				}

				.rightIcon {
					margin-left: auto;

					image {
						width: 28rpx;
						height: 28rpx;
					}
				}
			}
		}
	}

	// .memberLegal {
	// 	// padding: 0 32rpx;

	// 	.memberEnjoy {
	// 		width: 678rpx;
	// 		height: 192rpx;
	// 		margin-top: -114rpx;
	// 		position: relative;
	// 		z-index: 21;
	// 		display: flex;
	// 		background: #FFFFFF;
	// 		box-shadow: 0px 4rpx 18rpx 0px rgba(0, 0, 0, 0.15);
	// 		border-radius: 16rpx;

	// 		.iconList {
	// 			display: flex;
	// 			flex-direction: column;
	// 			align-items: center;
	// 			justify-content: center;

	// 			image {
	// 				width: 80rpx;
	// 				height: 80rpx;
	// 			}

	// 			.title {
	// 				font-size: 24rpx;
	// 				font-family: PingFangSC-Regular, PingFang SC;
	// 				font-weight: 400;
	// 				line-height: 34rpx;
	// 				color: #28334A;
	// 			}
	// 		}
	// 	}


	// }

	.listView {
		margin-top: 40rpx !important;
	}

	::v-deep .u-row {
		width: 100%;
	}

	/deep/ .u-cell-group {
		margin-top: 40rpx;
		margin-top: 12rpx !important;

		.u-cell__body {
			height: 120rpx;
			// border:1px solid hotpink;
		}
	}
</style>
