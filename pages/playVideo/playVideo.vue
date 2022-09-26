<template>
	<view class="container_video">
		<view class="video_content">
			<video id="myVideo" :src="src" :show-center-play-btn='false' :show-mute-btn='true' title="视频标题" :enable-play-gesture='true'
				@timeupdate="video_timeupdate" @play='handleplayVideo' @error="videoErrorCallback" @pause='pauseVideo'></video>
			<view class="playImg" @click="playVideo" v-if="playVideoBtnStatus">
				<image src="/static/icon/big_play.png" mode=""></image>
			</view>
		</view>

		<!-- 视频介绍 -->
		<view class="video_introduce u-flex u-flex-column u-flex-center ">
			<view class="desc ">
				视频标题视频标题视频标题视频标题视频标题
				视频标题视频标题视频标题视频标题视频标题
				视频标题视频标题视频标题视频标题视频标题

			</view>
			<view class="info u-flex">
				<view class="left_text ellipsis">
					珍妮Jenny
				</view>
				<view class="right_text ellipsis">
					china
				</view>
			</view>
		</view>
		<!-- 热门推荐 -->
		<view class="hotvideo">
			<view class="title u-flex u-flex-center u-flex-items-center">
				<image src="/static/icon/line_icon.png" mode=""></image>
				<view class="text">
					热门推荐
				</view>
				<image src="/static/icon/line_icon.png" mode=""></image>
			</view>
			<view class="video_list u-flex u-flex-wrap u-flex-between">
				<view class="single_video" v-for="(item,index) in 20" :key="index">
					<view class="video">

						<view class="img">
							<image src="/static/icon/small_play.png" mode=""></image>
						</view>
					</view>
					<view class="desc u-flex  u-flex-items-center">
						<view class="left">珍妮Jenny</view>
						<view class="right">上海</view>
					</view>

				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				src: 'https://api.yeyuesm.com/resource/mp4/2022-09/c4e83f904c6fb7a3.mp4',
				createVideoContext: '',
				playVideoBtnStatus: true, // 默认显示
			}
		},
		onReady(res) {
			this.createVideoContext = uni.createVideoContext('myVideo')
		},
		onLoad(options) {
			// this.createVideoContext = uni.createVideoContext('myVideo');
		},
		methods: {
			videoErrorCallback: function(e) {
				console.log('视频错误信息:')
				console.log(e.target.errMsg)
			},
			video_timeupdate() {
				console.log('你好啊video---')
			},
			handleplayVideo(e) {
				console.log(e, '这是')
			},
			playVideo() {
				console.log(this.createVideoContext,'哈哈哈00')
				this.createVideoContext.play()
				this.playVideoBtnStatus = false
			},
			pauseVideo() {
				this.playVideoBtnStatus = true
			}
		}
	}
</script>
<style lang="scss" scoped>
	.container_video {
		width: 750rpx;
		height: 1888rpx;
		background: #F9F9F9;
		box-sizing: border-box;

		.video_content {
			width: 750rpx;
			height: 468rpx;
			background: rgba(0, 0, 0, 0.3);
			box-sizing: border-box;
			position: relative;

			video {
				width: 750rpx;
				height: 468rpx;
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
			height: 198rpx;
			padding: 0 48rpx;
			box-sizing: border-box;
			margin-bottom: 16rpx;
			background: #FFFFFF;

			.desc {
				width: 654rpx;
				height: 80rpx;
				font-size: 28rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
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
					width: 400rpx;
					height: 36rpx;
					font-size: 24rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #444444;
					line-height: 34rpx;
				}

				.right_text {
					margin-left: auto;
					width: 200rpx;
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
			width: 750rpx;
			height: 812rpx;
			background: #FFFFFF;
			padding: 0 48rpx;
			box-sizing: border-box;

			.title {
				height: 90rpx;
				font-size: 30rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #7F5D2E;
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
				background: #FFFFFF;
				height: 380rpx;
				box-sizing: border-box;

				.single_video {
					width: 312rpx;
					height: 380rpx;
					// border: 1px solid green;
					margin-bottom: 28rpx;

					.video {
						width: 312rpx;
						height: 312rpx;
						border-radius: 30rpx;
						border: 2rpx solid #EDDBC3;
						box-sizing: border-box;
						position: relative;

						.img {
							position: absolute;
							right: 20rpx;
							bottom: 20rpx;
							width: 36rpx;
							height: 36rpx;

							image {
								width: 100%;
								height: 100%;
							}
						}
					}

					.desc {
						width: 100%;
						height: 40rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						margin: 14rpx 0rpx;

						.left {
							width: 150rpx;
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
