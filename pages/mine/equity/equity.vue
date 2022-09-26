<template>
	<view class="container_equity">
		<view class="container_equity_bg" :class="[this.current === 1 ? 'gold_bgColor' : '' ]">
			<!-- <view class="container_equity_bg"> -->
			<image :src="this.current === 0 ? '/static/img/login/login_bg.jpeg' : '/static/img/login/p3.jpeg'" mode="">
			</image>
		</view>
		<!-- 头部 -->
		<view class="top"></view>
		<!-- 轮播图 -->
		<view class="swiper_container">
			<!-- #ifndef APP-NVUE || MP-TOUTIAO -->
			<view class="u-demo-block">
				<u-swiper :list="list3" previousMargin="30" nextMargin="30" :current="current" circular
					:autoplay="false" radius="5" @change="changeSwiper" @click=clickSwiper>
					<view slot="indicator" class="indicator">
						<view class="indicator__dot" v-for="(item, index) in list3" :key="index"
							:class="[index === current && 'indicator__dot--active']">
						</view>
					</view>

				</u-swiper>
				<view class="member_status u-flex u-flex-center u-flex-items-center">
					<image src="/static/icon/avatar.png" mode=""></image>
					<view class="tip">
						{{true ? '暂未' : '已'}}激活{{current | formatMemberText}}
					</view>
				</view>

				<!-- 会员名称 -->
				<view class="member_name u-flex u-flex-items-center">
					{{this.current === 0 ? '普通会员' : '高级会员'}}
				</view>
			</view>
			<!-- #endif -->
		</view>
		<!-- tip -->
		<view class="websiteTip u-flex u-flex-center u-flex-items-center">
			<view class="text u-flex u-flex-center u-flex-items-center"
				:class="[this.current === 1 ? ' gold_member_price_color' : ' silver_member_price_color' ]">
				本站所有小妹即可预约（时间自行沟通）
			</view>
		</view>

		<!-- 会员价格 -->
		<view class="member_price u-flex u-flex-center u-flex-items-center">
			<view class="content u-flex  u-flex-items-center u-flex-between"
				:class="[this.current === 1 ? 'gold_border gold_member_price_color' : 'silver_border silver_member_price_color' ]">
				<view class="month">
					12个月
				</view>
				<view class="price u-flex u-flex-center u-flex-items-center">
					<text class="sign">¥</text>
					<text class="money">999.00</text>
				</view>
				<view class="borderImg">
					<image :src="this.current === 0 ? '/static/icon/silver_border.png' : '/static/icon/gold_border.png'"
						mode=""></image>
				</view>

				<view v-if="current === 1"
					class="tips_content gold_member_price_color u-flex u-flex-center u-flex-items-center">
					新人首次免费安排
				</view>
			</view>
		</view>
		<!-- 会员权益 -->
		<view class="privilege_container">
			<view class="privilege">
				<view class="title u-flex  u-flex-items-center"
					:class="[current === 1 ? 'gold_color' : 'silver_color' ]">
					VIP特权
				</view>

				<view class="groupIcon u-flex u-flex-wrap">
					<view class="iconInfo u-flex u-flex-column  u-flex-center u-flex-items-center"
						v-for="(item,index) in privilegeList" :key="index">
						<image :src="item.img" mode=""></image>
						<view class="text u-flex u-flex-center u-flex-items-center"
							:class="[current === 1 ? 'gold_color' : 'silver_color' ]">
							{{item.text}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="bottomTabbar u-flex u-flex-center u-flex-items-center">
			<view class="subscribe_view u-flex  u-flex-items-center">
				<view class="subscribeBtn  u-flex u-flex-center u-flex-items-center"
					:class="membershipLevel.levelstyle">
					<view class="text">{{membershipLevel.levelName}}</view>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				current: 0,
				list3: [
					'/static/img/mine_equity_silver.png',
					'/static/img/mine_equity_gold.png',
				],
				swiperList: [{
						"pagePath": "/pages/mine/mine",
						"page": "silver",
						"text": "银卡",
						"img": "/static/img/mine_equity_silver.png",
					}, {
						"pagePath": "/pages/index/index",
						"page": "gold",
						"text": "金卡",
						"img": "/static/img/mine_equity_gold.png",
					},

				]

			}
		},
		filters: {
			formatMemberText(value) {
				if (value === 0) {
					return '白金会员'
				}
				if (value === 1) {
					return '黄金会员'
				}
			},
		},
		computed: {
			privilegeList() {
				let privilegeObj = [{
						"text": "一对一福利",
						"img": "/static/icon/privilege_silver_welfare.png",
					}, {
						"text": "推荐福利APP",
						"img": "/static/icon/privilege_silver_app.png",
					},
					{
						"text": "福利网站地址",
						"img": "/static/icon/privilege_silver_web.png",
					},
				]
				if (this.current === 1) {
					privilegeObj = [{
							"text": "一对一福利",
							"img": "/static/icon/privilege_gold_welfare.png",
						}, {
							"text": "推荐福利APP",
							"img": "/static/icon/privilege_gold_app.png",
						},
						{
							"text": "福利网站地址",
							"img": "/static/icon/privilege_gold_web.png",
						},
						{
							"text": "新人首次免费安排",
							"img": "/static/icon/privilege_gold_newMember.png",
						},
						{
							"text": "会员福利群",
							"img": "/static/icon/privilege_gold_membergroup.png",
						},
						{
							"text": "专属客服一对一服务",
							"img": "/static/icon/privilege_gold_kefu.png",
						},
					]
				}
				return privilegeObj;
			},
			styleStatus() {
				let styleObj = {
					silver_color: true,
					silver_background_btn: true
				}

				if (this.current === 1) {
					styleObj = {
						gold_color: true,
						gold_background_btn: true
					}
				}
				return styleObj;
			}
		},
		methods: {
			// 轮播图切换时
			changeSwiper(e) {
				console.log(e, 'change')
				this.current = e.current
			},
			// 点击轮播图时
			clickSwiper(val) {
				console.log(val, '点击了')
				this.current = val
			}

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
						silver_color: true,
						silver_background_btn: true
					},
					levelStatus: 'ordinary'
				}
				let sexNum = this.getUserInfos?.status
				if (this.getUserInfos?.status === 1) {
					obj.levelName = '成为会员',
						obj.levelStatus = 'silver'
					return obj
				}
				if (this.getUserInfos?.status === 2) {
					obj.levelName = '升级高级会员',
						// obj.levelstyle = {
						// 	silver_color: true,
						// 	silver_background_btn: true
						// }
						obj.levelStatus = 'silver'
					return obj
				}
				if (this.getUserInfos?.status === 1) {
					obj.levelName = '高级会员',
						obj.levelstyle = {
							gold_color: true,
							gold_background_btn: true
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
	.container_equity {
		width: 750rpx;
		box-sizing: border-box;
		height: 100vh;
		position: relative;

		.container_equity_bg {
			position: absolute;
			width: 750rpx;
			height: 100vh;
			top: 0;
			left: 0;
			// background: rgba(228, 241, 255, 0.6);

			image {
				width: 100%;
				height: 100%;
			}



		}

		.top {
			width: 750rpx;
			height: 176rpx;
			background: #3D3C3A;
			position: relative;
			background: rgba(61, 60, 58, 1);
			border-radius: 0rpx 0rpx 80rpx 80rpx;
			z-index: 3;
		}

		.swiper_container {
			margin-top: -160rpx;
			position: relative;
			z-index: 3;

			.u-demo-block {
				position: relative;

				.member_status {
					position: absolute;
					left: 82rpx;
					bottom: 40rpx;
					font-size: 24rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #999999;
					line-height: 34rpx;

					image {
						width: 40rpx;
						height: 40rpx;
					}

					.tip {
						margin-left: 12rpx;
					}
				}

				.member_name {
					width: 400rpx;
					height: 56rpx;
					position: absolute;
					left: 82rpx;
					top: 64rpx;
					font-size: 48rpx;
					font-family: SourceHanSansCN-Medium, SourceHanSansCN;
					font-weight: 500;
					color: #FFFFFF;
					line-height: 48rpx;
					text-shadow: 0px 0px 12rpx rgba(0, 0, 0, 0.3);
				}
			}

			/deep/ .u-swiper {
				height: 296rpx !important;
				box-sizing: border-box !important;
				background: none !important;
				overflow: visible !important;

				.u-swiper__wrapper {
					height: 296rpx !important;
				}

				.u-swiper__indicator {
					bottom: -40rpx !important;
				}

				.u-swiper__wrapper__item__wrapper {
					height: 296rpx !important;

					image {
						width: 654rpx !important;
						height: 296rpx !important;
					}
				}
			}

			.indicator {
				@include flex(row);
				justify-content: center;

				&__dot {
					height: 20rpx;
					width: 20rpx;
					border-radius: 100px;
					background-color: rgba(210, 169, 111, 0.35);
					margin: 0 5px;
					transition: background-color 0.3s;

					&--active {
						width: 20rpx;
						height: 20rpx;
						background: #BD9762;
					}
				}
			}

		}

		.websiteTip {
			width: 750rpx;
			position: relative;
			margin-top: 100rpx;
			margin-bottom: 64rpx;
			z-index: 4;

			.text {
				width: 582rpx;
				height: 72rpx;
				background: #FFFFFF;
				background-color: rgba(255, 255, 255, 0.6);
				border-radius: 44rpx;
				font-size: 28rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				line-height: 40rpx;
			}
		}

		.member_price {
			width: 750rpx;
			position: relative;
			z-index: 3;

			.content {
				width: 702rpx;
				height: 128rpx;
				padding: 0 64rpx 0 40rpx;
				box-sizing: border-box;
				border-radius: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				position: relative;
				border: 1px solid red;

				.tips_content {
					position: absolute;
					height: 26px;
					padding: 0 30rpx;
					background: linear-gradient(180deg, #3A3938 0%, #93908B 100%);
					border-radius: 28rpx;
					font-size: 24rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #EDDBC3;
					line-height: 34rpx;
					top: -26rpx;
					left: 220rpx;
				}



				.month {
					font-size: 28rpx;
					font-weight: 400;
					line-height: 40rpx;
				}

				.price {
					.sign {
						font-size: 24rpx;
						font-weight: 400;
						line-height: 34rpx;
					}

					.money {
						font-size: 48rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						line-height: 40rpx;
						margin-left: 4rpx;
					}
				}

				.borderImg {
					position: absolute;
					right: 0rpx;
					bottom: -12rpx;

					image {
						width: 70rpx;
						height: 70rpx;
					}
				}
			}

		}

		.privilege_container {
			margin-top: 40rpx;
			width: 750rpx;
			position: relative;
			z-index: 3;

			.privilege {
				width: 750rpx;
				padding: 0rpx 24rpx;
				box-sizing: border-box;

				.title {
					width: 250rpx;
					height: 44rpx;
					font-size: 30rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					line-height: 42rpx;
					margin: 40rpx 0;
				}
			}

			.groupIcon {
				box-sizing: border-box;

				.iconInfo {
					width: 226rpx;
					margin-bottom: 20rpx;

					image {
						width: 96rpx;
						height: 96rpx;
					}

					.text {
						height: 66rpx;
						margin-top: 18rpx;
						font-size: 26rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						line-height: 36rpx;
						padding: 0 20rpx;
						text-align: center;
					}
				}
			}
		}

		.bottomTabbar {
			width: 750rpx;
			height: 128rpx;
			background: #FFFFFF;
			padding: 0 32rpx;
			position: fixed;
			left: 0;
			bottom: 0;
			z-index: 3;
			box-shadow: 0rpx -12rpx 32px 0rpx rgba(0, 0, 0, 0.05);
			box-sizing: border-box;

			.subscribe_view {
				width: 100%;

				.subscribeBtn {
					width: 686rpx;
					height: 96rpx;
					border-radius: 48rpx;
					font-size: 32rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					line-height: 40rpx;
				}
			}


		}


		&::after {
			position: absolute;
			width: 750rpx;
			height: 100vh;
			background: rgba(228, 241, 255, 0.6);
			content: "";
			top: 0;
			left: 0;
		}

		.gold_bgColor::after {
			position: absolute;
			width: 750rpx;
			height: 100vh;
			background: rgba(210, 169, 111, 0.6) !important;
			content: "";
			top: 0;
			left: 0;
		}

		.silver_color {
			color: #2E5A7F;
		}

		.silver_background_btn {
			background: linear-gradient(225deg, #9FB4CD 0%, #DDE4EE 100%)
		}

		.gold_color {
			color: #7F5D2E;
		}

		.gold_background_btn {
			background: linear-gradient(90deg, #EFD4AF 0%, #C1914B 100%);
		}

		.silver_border {
			border: 2rpx solid #84A1C2 !important;
			background: rgba(227, 235, 247, 0.8);
		}

		.gold_border {
			border: 2rpx solid #D2A96F !important;
			background: rgba(249, 244, 239, 0.8);
		}

		.silver_bgColor {
			background: rgba(228, 241, 255, 0.6) !important;
		}

		.gold_bgColor {
			background: rgba(210, 169, 111, 0.6) !important;
		}

		.silver_member_price_color {
			color: #84A1C2;
		}

		.gold_member_price_color {
			color: #D2A96F;
		}
	}
</style>
