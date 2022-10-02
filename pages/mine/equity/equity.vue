<template>
	<view class="container_equity">
		<view class="container_equity_bg" :class="[this.current === 1 ? 'gold_bgColor' : '']">
			<!-- <view class="container_equity_bg"> -->
			<image :src="
          this.current === 0
            ? '/static/img/login/login_bg.jpeg'
            : '/static/img/login/p3.jpeg'
        " mode="">
			</image>
		</view>
		<!-- 头部 -->
		<view class="top"></view>
		<!-- 轮播图 -->
		<view class="swiper_container">
			<!-- #ifndef APP-NVUE || MP-TOUTIAO -->
			<view class="u-demo-block">
				<u-swiper :list="list3" previousMargin="30" nextMargin="30" :current="current" circular
					:autoplay="false" radius="5" @change="changeSwiper" @click="clickSwiper">
					<view slot="indicator" class="indicator">
						<view class="indicator__dot" v-for="(item, index) in list3" :key="index"
							:class="[index === current && 'indicator__dot--active']">
						</view>
					</view>
				</u-swiper>
				<view class="member_status u-flex u-flex-center u-flex-items-center">
					<image src="/static/icon/avatar.png" mode=""></image>
					<view class="tip">
						<!-- {{ true ? "暂未" : "已" }}激活{{ current | formatMemberText }} -->
						{{ membershipLevel.descStatus }}
					</view>
				</view>

				<!-- 会员名称 -->
				<view class="member_name u-flex u-flex-items-center">
					{{ this.current === 0 ? "普通会员" : "高级会员" }}
				</view>
			</view>
			<!-- #endif -->
		</view>
		<!-- tip -->
		<view class="websiteTip u-flex u-flex-center u-flex-items-center">
			<view class="text u-flex u-flex-center u-flex-items-center" :class="[
          this.current === 1
            ? ' gold_member_price_color'
            : ' silver_member_price_color',
        ]">
				本站所有小妹即可预约（时间自行沟通）
			</view>
		</view>

		<!-- 会员价格 -->
		<view class="member_price u-flex u-flex-center u-flex-items-center">
			<view class="content u-flex u-flex-items-center u-flex-between" :class="[
          this.current === 1
            ? 'gold_border gold_member_price_color'
            : 'silver_border silver_member_price_color',
        ]">
				<view class="month"> 12个月 </view>
				<view class="price u-flex u-flex-center u-flex-items-center">
					<text class="sign">¥</text>
					<text class="money">{{ memberPrice }}</text>
				</view>
				<view class="borderImg">
					<image :src="
              this.current === 0
                ? '/static/icon/silver_border.png'
                : '/static/icon/gold_border.png'
            " mode=""></image>
				</view>

				<view v-if="current === 1" class="
            tips_content
            gold_member_price_color
            u-flex u-flex-center u-flex-items-center
          ">
					新人首次免费安排
				</view>
			</view>
		</view>
		<!-- 会员权益 -->
		<view class="privilege_container">
			<view class="privilege">
				<view class="title u-flex u-flex-items-center" :class="[current === 1 ? 'gold_color' : 'silver_color']">
					VIP特权
				</view>

				<view class="groupIcon u-flex u-flex-wrap">
					<view class="
              iconInfo
              u-flex u-flex-column u-flex-center u-flex-items-center
            " v-for="(item, index) in privilegeList" :key="index">
						<image :src="item.img" mode=""></image>
						<view class="text u-flex u-flex-center"
							:class="[current === 1 ? 'gold_color' : 'silver_color']">
							{{ item.text }}
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="bottomTabbar u-flex u-flex-center u-flex-items-center" v-if="membershipLevel.bottomBtn">
			<view class="subscribe_view u-flex u-flex-items-center">
				<view class="subscribeBtn u-flex u-flex-center u-flex-items-center" @click="beforeBecomeMember"
					:class="membershipLevel.levelstyle">
					<view class="text">{{ membershipLevel.levelName }}</view>
				</view>
			</view>
		</view>
		<!-- 选择支付 -->
		<view v-if="showSelectPayPopup">
			<selectModal :showBottomPopup="showSelectPayPopup" @on-click-pay-mode="handlePayMode"
				@on-click-modal-close="closeSelectModal"></selectModal>
		</view>

		<!-- 展示图片 -->
		<view v-if="showPreImgModalVisible">
			<payImgModal :showModal="showPreImgModalVisible" :payQrcode="paySrcImg"
				@on-click-preimgmodal-cancel="closePreimgmodalOverlay" @on-click-preimgmodal-close="closePreImgModal">
			</payImgModal>
		</view>
	</view>
</template>

<script>
	import {
		becomeMemberOrder,
		getUserStatusApi,
		getPayQrcode,
	} from "@/config/api/sister.js";
	import {
		getProductOtherInfos
	} from "@/config/api/user.js";
	import {
		mapGetters,
		mapMutations
	} from "vuex";
	import selectModal from "@/components/selectModal/selectModal.vue";
	import payImgModal from "@/components/payImgModal/payImgModal.vue";
	import phoneModal from "@/components/phoneModal/phoneModal.vue";

	export default {
		components: {
			selectModal,
			payImgModal,
			phoneModal,
		},
		data() {
			return {
				current: 0,
				showSelectPayPopup: false, // 选择支付 弹窗状态
				showPreImgModalVisible: false, // 展示 图片组件 弹窗状态
				list3: [
					"/static/img/mine_equity_silver.png",
					"/static/img/mine_equity_gold.png",
				],
				swiperList: [{
						pagePath: "/pages/mine/mine",
						page: "silver",
						text: "银卡",
						img: "/static/img/mine_equity_silver.png",
					},
					{
						pagePath: "/pages/index/index",
						page: "gold",
						text: "金卡",
						img: "/static/img/mine_equity_gold.png",
					},
				],
				paySrcImg: "", // 支付弹窗展示的图片
				memberPrice: "",
				pay_type: "", // 选择支付方式 wx、zfb
			};
		},
		filters: {
			formatMemberText(value) {
				if (value === 0) {
					return "普通会员";
				}
				if (value === 1) {
					return "高级会员";
				}
			},
		},
		onLoad(options) {
			this.current = Number(options.id) || 0;
		},
		created() {
			this.getMemberPriceInfos(
				this.current === 0 ? "ordinary_member_price" : "premium_member_price"
			);
			this.getMemberStatus()
		},
		methods: {
			...mapMutations(["SET_USERINFO"]),
			// 轮播图切换时
			changeSwiper(e) {
				this.current = e.current;
			},
			// 点击轮播图时
			clickSwiper(val) {
				this.current = val;
			},
			async becomeMember() {
				// type=2 普通会员 3-高级会员
				let type = 2;
				if (this.current === 1) {
					type = 3;
				}
				let res = await becomeMemberOrder({
					type,
					pay_type: this.pay_type
				});
			},
			async getMemberPriceInfos(code = "ordinary_member_price") {
				try {
					let res = await getProductOtherInfos({
						code,
					});
					if (res.code === 100000) {
						this.memberPrice = res?.data?.value?.value;
					}
				} catch (e) {
					// error
				}
			},
			// 选择支付方式
			async handlePayMode(item) {
				let res = await getPayQrcode({});
				if (res.code === 100000) {
					this.paySrcImg = "";
					if (item.typeStatus === 1) {
						this.pay_type = 'wx'
						this.paySrcImg = res.data.wx;
					}
					if (item.typeStatus === 2) {
						this.pay_type = 'zfb'
						this.paySrcImg = res.data.zfb;
					}
				}
				this.showSelectPayPopup = false;
				this.showPreImgModalVisible = true;
			},
			closeSelectModal() {
				this.showSelectPayPopup = false;
			},
			// 允许点击遮罩关闭Modal
			closePreimgmodalOverlay(val) {
				if (val == 'cancel') {
					this.showPreImgModalVisible = false;
				}
			},

			closePreImgModal() {
				this.showPreImgModalVisible = false;
				this.becomeMember();
				this.getMemberStatus()
			},
			async getMemberStatus() {
				let res = await getUserStatusApi({});
				if (res.code === 100000) {
					this.SET_USERINFO(res.data.status)
				}
				//   if (res.code === 100000) {
				//     this.paySrcImg = "";
				//     if (item.typeStatus === 1) {
				//       this.paySrcImg = res.data.wx;
				//     }
				//     if (item.typeStatus === 2) {
				//       this.paySrcImg = res.data.zfb;
				//     }
				//   }
			},
			// 成为会员前操作
			beforeBecomeMember() {
				this.showSelectPayPopup = true;
			},
		},
		computed: {
			...mapGetters(["isLogin", "getUserInfos"]),
			membershipLevel() {
				/**	membershipLevel
				 * @param
				 *
				 * 1-普通用户
				 * 2-普通会员
				 * 3-高级会员
				 */
				let obj = {
					levelName: "成为会员",
					levelstyle: {
						silver_color: true,
						silver_background_btn: true,
					},
					descStatus: "暂未激活普通会员",
					bottomBtn: true,
					levelStatus: "ordinary",
				};
				if (this.current === 0) {
					if (this.getUserInfos?.status === 2 || this.getUserInfos?.status === 3) {
						(obj.descStatus = "您好，尊敬的普通会员"), (obj.bottomBtn = false);
					}
					(obj.levelName = "立即成为普通会员"), (obj.levelStatus = "silver");
					return obj;
				}
				if (this.current === 1 && this.getUserInfos?.status === 2) {
					obj.bottomBtn = true;
					(obj.descStatus = "暂未激活高级会员"),
					(obj.levelName = "立即成为高级会员"),
					(obj.levelstyle = {
						gold_color: true,
						gold_background_btn: true,
					});
					obj.levelStatus = "gold";
					return obj;
				}
				if (this.current === 1 && this.getUserInfos?.status === 3) {
					obj.bottomBtn = false;
					(obj.descStatus = "您好，尊敬的高级会员"),
					(obj.levelName = "已开通高级会员"),
					(obj.levelstyle = {
						gold_color: true,
						gold_background_btn: true,
					});
					obj.levelStatus = "gold";
					return obj;
				}
				if (this.current === 1) {
					(obj.levelName = "立即成为高级会员"),
					(obj.descStatus = "暂未激活高级会员"),
					(obj.levelstyle = {
						gold_color: true,
						gold_background_btn: true,
					});
					obj.levelStatus = "gold";
					return obj;
				}
				return obj;
			},
			privilegeList() {
				let privilegeObj = [{
						text: "一对一福利",
						img: "/static/icon/privilege_silver_welfare.png",
					},
					{
						text: "推荐福利APP",
						img: "/static/icon/privilege_silver_app.png",
					},
					{
						text: "福利网站地址",
						img: "/static/icon/privilege_silver_web.png",
					},
				];
				if (this.current === 1) {
					privilegeObj = [];
					privilegeObj = [{
							text: "一对一福利",
							img: "/static/icon/privilege_gold_welfare.png",
						},
						{
							text: "推荐福利APP",
							img: "/static/icon/privilege_gold_app.png",
						},
						{
							text: "福利网站地址",
							img: "/static/icon/privilege_gold_web.png",
						},
						{
							text: "新人首次免费安排",
							img: "/static/icon/privilege_gold_newMember.png",
						},
						{
							text: "会员福利群",
							img: "/static/icon/privilege_gold_membergroup.png",
						},
						{
							text: "专属客服一对一服务",
							img: "/static/icon/privilege_gold_kefu.png",
						},
					];
				}
				return privilegeObj;
			},
		},
		watch: {
			current(newName, oldName) {
				this.getMemberPriceInfos(
					this.current === 0 ? "ordinary_member_price" : "premium_member_price"
				);
			},
		},
	};
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
			background: #3d3c3a;
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
					color: #ffffff;
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
						background: #bd9762;
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
				background: #ffffff;
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
					width: 292rpx;
					height: 48rpx;
					background: linear-gradient(180deg, #3a3938 0%, #93908b 100%);
					border-radius: 48rpx;
					font-size: 24rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #eddbc3;
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
			background: #ffffff;
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
			color: #2e5a7f;
		}

		.silver_background_btn {
			background: linear-gradient(225deg, #9fb4cd 0%, #dde4ee 100%);
		}

		.gold_color {
			color: #7f5d2e;
		}

		.gold_background_btn {
			background: linear-gradient(90deg, #efd4af 0%, #c1914b 100%);
		}

		.silver_border {
			border: 2rpx solid #84a1c2 !important;
			background: rgba(227, 235, 247, 0.8);
		}

		.gold_border {
			border: 2rpx solid #d2a96f !important;
			background: rgba(249, 244, 239, 0.8);
		}

		.silver_bgColor {
			background: rgba(228, 241, 255, 0.6) !important;
		}

		.gold_bgColor {
			background: rgba(210, 169, 111, 0.6) !important;
		}

		.silver_member_price_color {
			color: #84a1c2;
		}

		.gold_member_price_color {
			color: #d2a96f;
		}
	}
</style>
