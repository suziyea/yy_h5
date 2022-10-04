<template>
	<view class="container_video">
		<view class="video_content">
			<video id="myVideo" :src="videoInfos.video" :show-center-play-btn="true" :show-mute-btn="true"
				:title="videoInfos.title" :enable-play-gesture="true" @error="videoErrorCallback"
				@pause="pauseVideo"></video>
			<!-- <view class="playImg" @click="isPlayVideo" v-if="playVideoBtnStatus">
        <image src="/static/icon/big_play.png" mode=""></image>
      </view> -->
		</view>

		<!-- 视频介绍 -->
		<view class="video_introduce u-flex u-flex-column u-flex-center">
			<view class="video_title">
				{{ videoInfos.title }}
			</view>
			<view class="desc">
				{{ videoInfos.remark }}
			</view>
			<view class="info u-flex">
				<view class="left_text ellipsis"> </view>
				<view class="right_text ellipsis">
					{{ videoInfos.created_at | formatDateTime }}
				</view>
			</view>
		</view>
		<!-- 热门推荐 -->
		<view class="hotvideo">
			<view class="title u-flex u-flex-center u-flex-items-center">
				<image src="/static/icon/line_icon.png" mode=""></image>
				<view class="text"> 热门推荐 </view>
				<image src="/static/icon/line_icon.png" mode=""></image>
			</view>
			<view class="video_list u-flex u-flex-wrap u-flex-between">
				<view class="single_video" v-for="(item, index) in videoList" :key="index">
					<view class="video" @click="playOtherVideo(item)">
						<view class="img">
							<image src="/static/icon/small_play.png" mode=""></image>
						</view>
						<image :src="item.image || videoCoverImg" mode="aspectFill"></image>
					</view>
					<view class="desc u-flex u-flex-items-center">
						{{ item.title }}
					</view>
				</view>
			</view>
		</view>
		<view class="grace_loading" v-if="videoList.length > 0">
			<u-loadmore :status="status" :loading-text="loadingText" :loadmore-text="loadmoreText"
				:nomore-text="nomoreText" />
		</view>
		<u-back-top :scroll-top="scrollTop" top="600" :iconStyle="iconStyle"></u-back-top>
	</view>
</template>

<script>
	import moment from "moment";
	import {
		scoreVideo,
		getVideoList
	} from "@/config/api/product.js";
	import {
		mapGetters,
		mapMutations
	} from "vuex";
	export default {
		data() {
			return {
				createVideoContext: "",
				playVideoBtnStatus: true, // 默认显示
				videoInfos: {
					video: "",
				},
				videoId: "",
				videoList: [],
				videoCoverImg: "/static/img/login/p2.jpeg",
				pageNum: 1,
				pageSize: 16,
				totalPages: 1, // 总页数
				status: "loadmore",
				loadingText: "努力加载中,先喝杯茶",
				loadmoreText: "轻轻上拉",
				nomoreText: "小主,更新已经在路上了",
				scrollTop: 0,
				iconStyle: {
					fontSize: "32rpx",
					color: "#2979ff",
				},
			};
		},
		onReady(res) {
			this.createVideoContext = uni.createVideoContext("myVideo");
		},
		onLoad(options) {
			this.videoId = options.id || "";
		},
		onPullDownRefresh() {
			setTimeout(() => {
				this.getPageInit();
				uni.stopPullDownRefresh();
			}, 600);
		},

		created() {
			this.getPageInit();
		},
		// uni-app页面滚动到底部的事件，常用于上滑加载下一页数据
		onReachBottom() {
			// 判断当前页是否大于等于总页数
			if (this.totalPages <= this.pageNum) {
				this.status = "nomore";
			} else {
				this.pageNum++;
				this.status = "loading";
				// console.log('加载中')
				this.getInitVideoList(); // 每次滑动请求接口，实现上拉加载更多数据
			}
		},

		methods: {
			onPageScroll(e) {
				this.scrollTop = e.scrollTop;
			},
			getPageInit() {
				if (uni.getStorageSync("about_video_info")) {
					this.videoInfos = uni.getStorageSync("about_video_info");
				} else {
					this.videoInfos.video =
						"https://api.yeyuesm.com/resource/mp4/2022-10/6593ef8374514151.mp4";
				}
				this.changeVideoScore();
				this.getInitVideoList();
			},
			videoErrorCallback: function(e) {
				console.log("视频错误信息:");
				console.log(e.target.errMsg);
			},
			playVideo() {
				this.createVideoContext.play();
			},
			pauseVideo() {
				this.createVideoContext.pause();
			},
			changeVideoScore() {
				scoreVideo({
						id: this.videoId || this.videoInfos.id,
					})
					.then((res) => {
						if (res.code === 100000) {
							console.log(res?.data);
						}
					})
					.catch((err) => {
						console.log(err, "err");
					});
			},
			isPlayVideo() {
				if (this.playVideoBtnStatus) {
					this.playVideo();
					this.playVideoBtnStatus = false;
				} else {
					this.playVideoBtnStatus = true;
					this.pauseVideo();
				}
			},
			getInitVideoList() {
				getVideoList({
						is_pay: this.getUserInfos?.status === 1 ? 2 : 1,
						limit: this.pageSize + "",
						page: this.pageNum + "",
					})
					.then((res) => {
						if (res.code === 100000) {
							this.totalPages = parseInt(
								(Number(res.data.total_row * 1) + this.pageSize - 1) /
								this.pageSize
							);
							this.videoList = [...this.videoList, ...res.data.list];
						}
					})
					.catch((err) => {
						console.log(err, "err");
					})
					.finally(() => {
						this.showOrderFlag = true;
					});
			},
			playOtherVideo(val) {
				uni.removeStorageSync("about_video_info");
				uni.setStorageSync("about_video_info", val);
				uni.redirectTo({
					url: `/pages/playVideo/playVideo?id=${
          val.id
        }&timer=${new Date().getTime()}`,
				});
			},
		},
		filters: {
			formatDateTime(val) {
				return moment(val).format("YYYY-MM-DD HH:mm:ss");
			},
			formatDate(val) {
				return moment(val).format("MM-DD");
			},
		},
		computed: {
			...mapGetters(["isLogin", "getUserInfos"]),
		},
	};
</script>
<style lang="scss" scoped>
	.container_video {
		width: 750rpx;
		min-height: 100vh;
		height: 100%;
		background: #f9f9f9;
		box-sizing: border-box;

		.grace_loading {
			width: 100%;
			padding: 30rpx 0rpx;
		}

		.video_content {
			width: 750rpx;
			height: 100%;
			background: rgba(0, 0, 0, 0.3);
			box-sizing: border-box;
			position: relative;

			video {
				width: 750rpx;
				height: 468rpx;
				position: relative;
			}

			.playImg {
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%, -50%);

				image {
					width: 120rpx;
					height: 120rpx;
				}
			}
		}

		.video_introduce {
			width: 750rpx;
			padding: 0 48rpx;
			box-sizing: border-box;
			margin-bottom: 16rpx;
			background: #ffffff;

			.video_title {
				width: 654rpx;
				font-size: 28rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #444444;
				line-height: 34rpx;
				margin: 16rpx 0;
			}

			.desc {
				width: 654rpx;
				height: 80rpx;
				font-size: 24rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 400;
				color: #000000;
				line-height: 40rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
			}

			.info {
				margin-top: 22rpx;

				.left_text {
					width: 160rpx;
					height: 36rpx;
					font-size: 24rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #444444;
					line-height: 34rpx;
				}

				.right_text {
					margin-left: auto;
					height: 40rpx;
					font-size: 20rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #666666;
					line-height: 40rpx;
					text-align: right;
				}
			}
		}

		.hotvideo {
			width: 100%;
			height: 100%;
			background: #ffffff;
			padding: 0 48rpx;
			box-sizing: border-box;

			.title {
				height: 90rpx;
				font-size: 30rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #7f5d2e;
				line-height: 42rpx;
				margin-bottom: 8rpx;
				box-sizing: border-box;

				.text {
					margin: 0 18rpx;
				}

				image {
					width: 16rpx;
					height: 20rpx;
				}
			}

			.video_list {
				width: 100%;
				background: #ffffff;
				height: 100%;
				box-sizing: border-box;

				.single_video {
					width: 312rpx;
					margin-bottom: 28rpx;

					.video {
						width: 312rpx;
						height: 312rpx;
						border-radius: 30rpx;
						border: 2rpx solid #eddbc3;
						box-sizing: border-box;
						position: relative;
						//   z-index: 99;

						image {
							width: 100%;
							height: 100%;
							border-radius: 30rpx;
						}

						.img {
							position: absolute;
							right: 20rpx;
							bottom: 20rpx;
							width: 36rpx;
							height: 36rpx;
							z-index: 3;

							image {
								width: 100%;
								height: 100%;
							}
						}
					}

					.desc {
						width: 100%;
						min-height: 40rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						margin: 14rpx 0rpx;
						font-size: 24rpx;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;

						.left {
							width: 220rpx;
							font-size: 24rpx;
							font-weight: 500;
							color: #444444;
						}

						.right {
							margin-left: auto;
							font-size: 20rpx;
							color: #666666;
						}
					}
				}
			}

			.vide_list :last-child {
				margin-bottom: 60rpx;
			}
		}
	}
</style>
