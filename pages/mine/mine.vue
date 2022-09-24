<template>
	<view class="container" v-if="true">
		<view class="bgBox">
			<view class="userInfo">
				<view class="avatar">
					<image src="/static/icon/mine_avatar.png" mode="aspectFill"></image>
				</view>
				<view class="userName u-flex u-flex-column" v-if="isLogin">
					<text class="name">{{`HI，${getUserInfos.actual_name || ''}`}}</text>
				</view>
				<view class="userName" v-else>
					<navigator open-type="navigate" url="/pages/login/login">
						登录
					</navigator>
				</view>
				<view class="memberLevel">
					<view class="text baijinColor ">白金会员</view>
					<view class="memberImg">
						<image src="/static/icon//mine_baijin.png" mode="aspectFill"></image>
					</view>
				</view>
			</view>
		</view>

		<!-- 特权 -->
		<view class="privilege u-flex  u-flex-center u-flex-items-center">
			<view class="privilegeImg u-flex  u-flex-center u-flex-items-center">
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
					:key="item.enName">
					<view class="lefticon">
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
					:key="item.enName">
					<view class="lefticon">
						<image :src="item.icon" mode=""></image>
					</view>
					<view class="text">{{item.name}}</view>
					<view class="rightIcon">
						<image src="/static/icon/mine_jump.png" mode=""></image>
					</view>
				</view>
			</view>
		</view>





		<!-- <view class="memberLegal u-flex u-flex-center">
			<view class="memberEnjoy">
				<u-row justify="space-between">
					<u-col span="4" justify="center" v-for="(item,index) in memberNav" :key="index">
						<view class="demo-layout bg-purple iconList">
							<image :src="item.icon" mode="aspectFill" @click="clickNav(item)"></image>
							<view class="title">{{item.name}}</view>
						</view>
					</u-col>
				</u-row>
			</view>
		</view> -->

		<!-- <view class="listView">
			<u-cell-group :border='false'>
				<view v-for="(item,index) in cellList" :key="index">
					<u-cell :border='false' v-if="isLogin" :title="item.name" size="large" :name="item.enName" isLink
						:icon="item.icon" @click="handleListItem"
						titleStyle="font-size: 32rpx;font-weight: 400;color: #28334A;line-height: 44rpx;"
						rightIconStyle="font-size:14px;"></u-cell>
					<u-cell :border='false' v-else-if="!isLogin && !item.power" :title="item.name" size="large"
						:name="item.enName" isLink :icon="item.icon" @click="handleListItem"
						titleStyle="font-size: 32rpx;font-weight: 400;color: #28334A;line-height: 44rpx;"
						rightIconStyle="font-size:14px;"></u-cell>
				</view>

			</u-cell-group>
		</view>
 -->

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
		getQy,
		getUserInfo
	} from "@/config/api/user.js";
	import Tarbar from '@/components/tabbar/Tarbar.vue'

	export default {
		data() {
			return {
				memberNav: [{
					icon: '/static/icon/enjoy.png',
					path: '/pages/mine/privilege/privilege',
					name: '我的权益',
					page: 'current'
				}, {
					icon: '/static/icon/order.png',
					path: '/pages/mine/order/order',
					name: '我的订单',
					page: ''
				}, {
					icon: '/static/icon/customerService.png',
					path: '/pages/mine/service/service',
					name: '客服中心',
					page: ''
				}],
				firstList: [{
						icon: '/static/icon/mine_like.png',
						path: '',
						name: '喜欢',
						enName: 'like',
						isLogin: false
					},
					{
						icon: '/static/icon/mine_record.png',
						path: '',
						name: '消费记录',
						enName: 'record',
						isLogin: false
					}
				],
				secondList: [{
						icon: '/static/icon/mine_contact.png',
						path: '',
						name: '联系我们',
						enName: 'contact',
						isLogin: false
					},
					{
						icon: '/static/icon/mine_about.png',
						path: '',
						name: '关于我们',
						enName: 'about',
						isLogin: false
					},
					{
						icon: '/static/icon/mine_suggest.png',
						path: '',
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
			// const hak = common.getLocation()
			// uni.showToast({
			// 		title: JSON.stringify(hak),
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
				if (item.name === 'logout') {
					uni.$u.route({
						type: 'reLaunch',
						url: 'pages/login/login',
					})
					this.LOGOUT()
					return;
				}
				if (item.name === 'about') {
					uni.$u.route('/subpages/appPrivacyAgreement/appPrivacyAgreement')
					return;
				}
				if (item.name === 'look') {
					uni.$u.route('/subpages/assessAgreement/assessAgreement')
					return;
				}
			},
			confirm() {
				this.showModal = false;
				if (!(store.state.user.token)) {
					uni.$u.route('/pages/login/login');
					return;
				}
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
				let sexNum = this.getUserInfos?.id_number ? common.getSexByBirthday(this.getUserInfos.id_number) : 2
				if (sexNum === '0') {
					return 'headman'
				}
				if (sexNum === '1') {
					return 'headwomen'
				}
				return 'head'
			},


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
				// border: 1px solid skyblue;

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
