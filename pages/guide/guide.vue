<template>
  <view class="weixinTip" v-if="isWeat">
    <view class="wechatImg">
      <image src="/static/img/guide/isWechat.jpeg"></image>
    </view>
  </view>
  <view class="guide_container" v-else>
    <!-- 图片提示 -->
    <view class="img_tips u-flex u-flex-center u-flex-items-center">
      <view class="img">
        <image src="/static/img/guide/tips.png" mode="aspectFill"></image>
      </view>
    </view>

    <!-- app 认证 -->
    <view class="app_img_tips u-flex u-flex-center u-flex-items-center">
      <view class="img">
        <image
          :src="`/static/img/guide/banner${
            parseInt(3 * Math.random()) + 1
          }.jpeg`"
          mode="aspectFill"
        ></image>
      </view>
    </view>

    <!-- 热门推荐 -->
    <view class="hotlist u-flex u-flex-center u-flex-items-center">
      <view class="mm_list u-flex u-flex-column u-flex-items-center">
        <view class="title_content u-flex u-flex-center u-flex-items-center">
          <view class="top_tip u-flex u-flex-center u-flex-items-center">
            <image
              src="/static/img/guide/line_icon.png"
              mode="aspectFill"
            ></image>
            <view class="text"> 热门推荐 </view>
            <image
              src="/static/img/guide/line_icon.png"
              mode="aspectFill"
            ></image>
          </view>
        </view>
        <view class="mm_photos u-flex u-flex-center u-flex-wrap">
          <view
            class="single_video u-flex u-flex-column u-flex-items-center"
            v-for="(item, index) in photoList"
            :key="index"
          >
            <view class="video">
              <image :src="item.img" mode="aspectFill"></image>
            </view>
            <view class="desc u-flex u-flex-items-center">
              <view class="left">{{ item.name }}</view>
              <view class="right">{{ item.age }}</view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 预约流程 -->
    <view class="step_container u-flex u-flex-center">
      <view class="step_view">
        <view class="title_content u-flex u-flex-center u-flex-items-center">
          <view class="top_tip u-flex u-flex-center u-flex-items-center">
            <image
              src="/static/img/guide/line_icon.png"
              mode="aspectFill"
            ></image>
            <view class="text"> 预约流程 </view>
            <image
              src="/static/img/guide/line_icon.png"
              mode="aspectFill"
            ></image>
          </view>
        </view>

        <view class="icon_step u-flex u-flex-items-center">
          <view
            class="step u-flex u-flex-column u-flex-center u-flex-items-center"
          >
            <image src="/static/img/guide/step2.png" mode="aspectFill"></image>
            <view class="text"> 联系小妹 </view>
          </view>
          <view class="line"> </view>

          <view
            class="step u-flex u-flex-column u-flex-center u-flex-items-center"
          >
            <image src="/static/img/guide/step3.png" mode="aspectFill"></image>
            <view class="text"> 上门服务 </view>
          </view>
          <view class="line"> </view>

          <view
            class="step u-flex u-flex-column u-flex-center u-flex-items-center"
          >
            <image src="/static/img/guide/step4.png" mode="aspectFill"></image>
            <view class="text"> 评价反馈 </view>
          </view>
          <view class="line"> </view>
          <view
            class="step u-flex u-flex-column u-flex-center u-flex-items-center"
          >
            <image src="/static/img/guide/step1.png" mode="aspectFill"></image>
            <view class="text"> 预约小妹 </view>
          </view>
        </view>
      </view>
    </view>

    <view class="zero"></view>

    <view class="bottom_btn u-flex u-flex-center u-flex-items-center">
      <view class="logo">
        <image src="/static/img/guide/logo_2.png" mode="aspectFill"></image>
      </view>
      <view class="desc">
        <view class="text"> 上门按摩 </view>
        <view class="text"> 我们只服务高端用户 </view>
      </view>

      <view
        class="download_btn u-flex u-flex-center u-flex-items-center"
        @click="downloadApp('')"
      >
        点击下载
      </view>
    </view>
  </view>
</template>

<script>
import { addDrainage } from "@/config/api/product.js";
export default {
  data() {
    return {
      photoList: [
        {
          name: "语嫣",
          addr: "上海",
          age: "22岁",
          img: "/static/img/guide/p1.jpeg",
        },
        {
          name: "乐菱",
          addr: "上海",
          age: "20岁",
          img: "/static/img/guide/p2.jpeg",
        },
        {
          name: "茹萱",
          addr: "上海",
          age: "24岁",
          img: "/static/img/guide/p3.jpeg",
        },
        {
          name: "之柔",
          addr: "上海",
          age: "23岁",
          img: "/static/img/guide/p4.jpeg",
        },
        {
          name: "思雨",
          addr: "上海",
          age: "21岁",
          img: "/static/img/guide/p5.jpeg",
        },
        {
          name: "香巧",
          addr: "上海",
          age: "18岁",
          img: "/static/img/guide/p8.jpeg",
        },
      ],
      isWeat: false,
      channel_code: "",
    };
  },
  onLoad() {
    this.isWeat = this.is_weixin();
    let routes = getCurrentPages();
    let curRoute = routes[routes.length - 1].route; //获取当前页面路由
    let curParam = routes[routes.length - 1].options; //获取路由参数

    let keys = Object.keys(curParam); //获取对象的key 返回对象key的数组
    if (keys.length >= 1) {
      if (curParam.source) {
        this.channel_code = curParam.source;
        addDrainage({
          source: curParam.source,
        })
          .then((res) => {
            if (res.code === 100000) {
              // 这里此提示会被this.start()方法中的提示覆盖
              console.log("引流", res);
            }
          })
          .catch((err) => {
            uni.showToast({
              icon: "none",
              title: err.msg || "请稍后再试",
            });
          });
      }
    }
  },
  created() {
    // console.log(parseInt(3*Math.random())+1)
  },
  methods: {
    downloadApp(val = "") {
      var u = navigator.userAgent;
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1;
      var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      console.log(isAndroid, "isAndroid", isIOS, "iso");
      if (isAndroid) {
        this.downloadAppAndroid();
		return;
      }
      uni.navigateTo({
        url: `/pages/iosDownload/iosDownload?random=${new Date().getTime()}`,
      });
      return;
    },
    is_weixin() {
      var ua = navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
      } else {
        return false;
      }
    },
    downloadAppAndroid() {
      let href = "";
      if (val === "android") {
        href = `https://apk.yeyuesm.com/yeyuesm.apk?v=${new Date().getTime()}`;
      }
      if (val) {
        const link = document.createElement("a");
        link.style.display = "none";
        link.href = href;
        // 触发点击方法
        link.setAttribute("download", "夜约");
        document.body.appendChild(link);
        link.click();
        return;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.weixinTip {
  width: 750rpx;
  height: 100vh;

  .wechatImg {
    width: 100%;
    height: 100%;
    box-sizing: border-box;

    image {
      width: 750rpx;
      height: 1000rpx;
    }
  }
}

.guide_container {
  width: 750rpx;
  height: 2304rpx;
  background: url(/static/img/guide/guide_bg.png) no-repeat;
  background-size: cover;
  // overflow: hidden;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  .img_tips {
    margin: 32rpx 0;
    width: 750rpx;
    height: 284rpx;
    box-sizing: border-box;

    image {
      width: 626rpx;
      height: 284rpx;
    }
  }

  .app_img_tips {
    width: 750rpx;
    height: 336rpx;
    box-sizing: border-box;
    margin-bottom: 48rpx;

    image {
      width: 688rpx;
      height: 336rpx;
    }
  }

  .hotlist {
    width: 750rpx;
    height: 1232rpx;
    box-sizing: border-box;

    .mm_list {
      width: 686rpx;
      height: 1232rpx;
      background-color: rgba(68, 68, 68, 0.65);
      border-radius: 24rpx;
      padding: 0rpx 36rpx;
      box-sizing: border-box;

      .mm_photos {
        width: 650rpx;
        margin-top: 24rpx;
        box-sizing: border-box;
      }

      .single_video {
        width: 312rpx;
        height: 352rpx;
        box-sizing: border-box;
        margin-bottom: 28rpx;

        .video {
          width: 288rpx;
          height: 288rpx;
          border-radius: 28rpx;
          border: 2rpx solid #eddbc3;
          box-sizing: border-box;

          image {
            width: 288rpx;
            height: 288rpx;
            border-radius: 28rpx;
          }
        }

        .desc {
          width: 100%;
          height: 32rpx;
          font-family: PingFangSC-Medium, PingFang SC;
          margin: 16rpx 0rpx;
          padding: 0 12rpx;
          box-sizing: border-box;

          .left {
            width: 150rpx;
            font-size: 24rpx;
            font-weight: 500;
            // color: #444444;
            color: #eddbc3;
          }

          .right {
            margin-left: auto;
            font-size: 20rpx;
            color: #f9f9f9;
            font-weight: 400;
          }
        }
      }
    }
  }

  .step_container {
    width: 750rpx;
    height: 364rpx;
    margin-top: 48rpx;
    box-sizing: border-box;
    margin-bottom: 164rpx !important;

    .step_view {
      width: 662rpx;
      height: 264rpx;
      background-color: rgba(68, 68, 68, 0.65);
      border-radius: 30rpx;
      padding: 0 26rpx;
      box-sizing: border-box;

      .title_content {
        width: 100%;

        .top_tip {
          width: 344rpx;
          height: 68rpx;
          background: url(/static/img/guide/title_bg.png) no-repeat;
          background-size: cover;
          // overflow: hidden;
          box-sizing: border-box;

          image {
            width: 16rpx;
            height: 20rpx;
          }

          .text {
            font-size: 30rpx;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #f9f9f9;
            line-height: 42rpx;
            margin: 0 18rpx;
          }
        }
      }

      .icon_step {
        width: 100%;
        height: 130rpx;
        padding: 0 16rpx;
        box-sizing: border-box;
        margin-top: 28rpx;

        .step {
          width: 98rpx;
          height: 100%;

          image {
            width: 80rpx;
            height: 80rpx;
          }

          .text {
            width: 98rpx;
            font-size: 24rpx;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #eddbc3;
            line-height: 34rpx;
          }
        }

        .line {
          width: 56rpx;
          height: 1rpx;
          border: 1rpx solid;
          flex: 0 1 auto;
          border-image: linear-gradient(
              180deg,
              rgba(231, 209, 171, 1),
              rgba(227, 170, 142, 1)
            )
            1 1;
        }
      }
    }
  }

  .zero {
    width: 750rpx;
    height: 200rpx;
    border: 2px solid #ffffff;
    box-sizing: border-box;
  }

  .bottom_btn {
    width: 750rpx;
    height: 128rpx;
    background: #fffaf4;
    box-shadow: 0rpx -12rpx 32px 0rpx rgba(0, 0, 0, 0.05);
    padding: 0 36rpx;
    box-sizing: border-box;
    position: fixed;
    left: 0;
    bottom: 0;

    .logo {
      width: 100rpx;
      height: 100rpx;

      image {
        width: 100rpx;
        height: 100rpx;
      }
    }

    .desc {
      width: 302rpx;
      height: 68rpx;
      font-size: 24rpx;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #444444;
      line-height: 34rpx;
      margin-left: 16rpx;
    }

    .download_btn {
      margin-left: auto;
      width: 180rpx;
      height: 64rpx;
      background: linear-gradient(90deg, #efd4af 0%, #c1914b 100%);
      border-radius: 48rpx;
      font-size: 28rpx;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #7f5d2e;
      line-height: 40rpx;
    }
  }

  .title_content {
    width: 100%;

    .top_tip {
      width: 344rpx;
      height: 68rpx;
      background: url(/static/img/guide/title_bg.png) no-repeat;
      background-size: cover;
      // overflow: hidden;
      box-sizing: border-box;

      image {
        width: 16rpx;
        height: 20rpx;
      }

      .text {
        font-size: 30rpx;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #f9f9f9;
        line-height: 42rpx;
        margin: 0 18rpx;
      }
    }
  }
}

// .guide_container::after {
// 	position: absolute;
// 	width: 750rpx;
// 	height: 2304rpx;
// 	background: rgba(228, 241, 255, 0.6);
// 	content: "";
// 	top: 0;
// 	left: 0;
// }
</style>
