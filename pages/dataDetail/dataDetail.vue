<template>
  <view class="container_detail" v-if="showFlag">
    <!-- 详情图片 -->
    <view class="sisterImg">
      <!-- <img src="/static/img/login/p1.jpeg" alt=""> -->
      <!-- <image src="/static/img/login/p1.jpeg" mode=""></image> -->
      <u-swiper
        :list="list3"
        indicator
        indicatorMode="dot"
        height="416"
        indicatorStyle="bottom: 90px"
        indicatorActiveColor="#BD9762"
        circular
      ></u-swiper>
    </view>
    <!-- 资料卡 -->
    <view class="data_card">
      <!-- 昵称 -->
      <view class="address_info u-flex u-flex-center u-flex-items-center">
        <view class="petusename">
          <view class="info_name ellipsis">
            {{ mm_sisterInfo.name || "" }}
          </view>
          <view class="base u-flex u-flex-center u-flex-items-center">
            <image src="/static/icon/detail_map.png" mode=""></image>
            <view class="text ellipsis">{{ mm_sisterInfo.address }}</view>
          </view>
        </view>
        <view class="age"> {{ mm_sisterInfo.age }} 岁 </view>
      </view>

      <!-- 基本资料 -->
      <view class="baseInfoTips">
        <view class="base_title"> 基本资料 </view>
        <view class="tips_container u-flex u-flex-wrap">
          <view
            class="tip ml_12 u-flex u-flex-center u-flex-items-center"
            v-for="(item, index) in mm_sisterInfo.base_data"
            :key="index"
          >
            {{ item }}
          </view>
        </view>
      </view>

      <!-- 更多联系方式 -->
      <view class="baseInfoTips">
        <view class="base_title"> 更多联系方式 </view>
        <view class="tips_container u-flex u-flex-wrap u-flex-between">
          <view class="tip u-flex u-flex-center u-flex-items-center">
            <!-- 空闲时间段：晚上8-凌晨6点 -->
            {{ mm_sisterInfo.free_time }}
          </view>
          <view
            class="view_contact u-flex u-flex-center u-flex-items-center"
            @click="lookContact"
          >
            查看联系方式
          </view>
        </view>
      </view>

      <!-- 自我描述 -->
      <view class="baseInfoTips">
        <view class="base_title"> 自我描述 </view>
        <view class="tips_container u-flex u-flex-wrap u-flex-between">
          <view class="tip u-flex u-flex-center u-flex-items-center">
            {{ mm_sisterInfo.remark }}
          </view>
        </view>
      </view>

      <!-- 预约细则 -->
      <view class="baseInfoTips">
        <view class="base_title"> 预约细则 </view>
        <view class="tips_container u-flex u-flex-wrap u-flex-between">
          <view class="tip u-flex u-flex-center u-flex-items-center">
            {{
              sister_rules ||
              "本站价格是小妹的服务价格，来回路费需要哥哥承担哦，空降费用联系上小妹自行商议（本站价格可抵扣）"
            }}
          </view>
        </view>
      </view>
    </view>
    <view class="bottomTabbar u-flex u-flex-center u-flex-items-center">
      <view class="subscribe_view u-flex u-flex-items-center">
        <view class="price">
          <view class="money">{{ mm_sisterInfo.price }}</view>
          <view class="text">元/次</view>
        </view>
        <view class="subscribeBtn u-flex u-flex-center u-flex-items-center">
          <view class="text" @click="clicksubscribe">立即预约</view>
        </view>
      </view>
    </view>

    <view class="maskDialog" v-if="payModal">
      <view class="dialog">
        <view class="title"
          >温馨提示
          <view class="close" @click.stop="close">
            <image src="/static/icon/close_icon.png" mode="aspectFill"></image>
          </view>
        </view>
        <view
          class="content u-flex u-flex-column u-flex-center u-flex-items-center"
        >
          <view class="desc_dialog">
            <view class="text"> 请填写真实的联系方式， </view>
            <view class="text"> 便于小妹联系到你! </view>
          </view>
          <view class="inputView u-flex u-flex-items-center">
            <input
              class="inputText"
              placeholder-class="input-placeholder"
              v-model="reservePhone"
              placeholder="请输入手机号"
              @input="handleTelInput"
            />
          </view>
        </view>
        <view class="button_layout">
          <!-- <view v-if="showCancel" class="cancel" @click.stop="cancel">{{
            cancelText
          }}</view> -->
          <view class="confirm" @click.stop="confirm">提交</view>
        </view>
      </view>
      <view class="mask" @touchmove.stop.prevent="stopScroll"></view>
    </view>

    <!-- 付款选项弹窗 -->
    <u-popup
      :show="showBottomPopup"
      mode="bottom"
      :round="10"
      @close="closePopup"
      @open="openPopup"
    >
      <view class="popup_container">
        <view class="title_view u-flex u-flex-center u-flex-items-center">
          请选择
          <view class="close_popup" @click.stop="closePopup">
            <image src="/static/icon/close_icon.png" mode="aspectFill"></image>
          </view>
        </view>
        <!-- <text>人生若只如初见，何事秋风悲画扇</text> -->
        <!-- <view class="pay_view u-flex u-flex-items-center">
          <view class="icon_pay u-flex u-flex-center u-flex-items-center">
            <u-icon name="weixin-circle-fill" size="28"></u-icon>
          </view>
          <view class="pay_type u-flex u-flex-items-center"> 微信支付 </view>
          <view class="rightIcon">
            <image src="/static/icon/mine_jump.png" mode=""></image>
          </view>
        </view> -->
        <view
          class="pay_view u-flex u-flex-items-center"
          v-for="(item, index) in payTypeList"
          :key="index"
          @click="handlePayMode(item)"
        >
          <!-- 2 -->
          <view class="icon_pay u-flex u-flex-center u-flex-items-center">
            <u-icon :name="item.icon" size="28"></u-icon>
          </view>
          <view class="pay_type u-flex u-flex-items-center">
            {{ item.typeText }}支付
          </view>
          <view class="rightIcon">
            <image src="/static/icon/mine_jump.png" mode="aspectFill"></image>
          </view>
        </view>
      </view>
    </u-popup>

    <!--  展示图片  -->
    <u-modal
      :show="showModal"
      title="请扫码支付"
      confirmColor="#7f5d2e"
      @confirm="handleCoonfirmModal"
    >
      <view class="slot-content">
        <view class="text u-flex u-flex-center u-flex-items-center">
          付款后请联系客服获取最新支付状态
        </view>
        <image :src="payQrcode" mode="aspectFill"></image>
      </view>
    </u-modal>
  </view>
</template>

<script>
import {
  getSisterDetail,
  getMoreSisterContact,
  amOrder,
  getPayQrcode,
} from "@/config/api/sister.js";
import { getProductOtherInfos } from "@/config/api/user.js";
export default {
  data() {
    return {
      list3: [
        // '/static/img/login/p1.jpeg',
        // '/static/img/login/p2.jpeg',
        // '/static/img/login/p3.jpeg',
        "https://t7.baidu.com/it/u=2788258239,1192178650&fm=193&f=GIF",
        "https://t7.baidu.com/it/u=2295973985,242574375&fm=193&f=GIF",
      ],
      payTypeList: [
        {
          icon: "weixin-circle-fill",
          typeStatus: 1,
          typeText: "微信",
        },
        {
          icon: "zhifubao-circle-fill",
          typeStatus: 2,
          typeText: "支付宝",
        },
      ],
      indicatorStyle: {
        bottom: 66,
      },
      // detailImgs: [{
      // 		image: "/static/img/login/p1.jpeg"
      // 	},
      // 	{
      // 		image: "/static/img/login/p2.jpeg"
      // 	},
      // 	{
      // 		image: "/static/img/login/p3.jpeg"
      // 	},
      // 	{
      // 		image: "/static/img/login/p4.jpeg"
      // 	},
      // 	{
      // 		image: "/static/img/login/p5.jpeg"
      // 	},
      // 	{
      // 		image: "/static/img/login/p8.jpeg"
      // 	}
      // ],
      detailImgs: [
        {
          image: "https://t7.baidu.com/it/u=2788258239,1192178650&fm=193&f=GIF",
        },
        {
          image: "https://t7.baidu.com/it/u=2295973985,242574375&fm=193&f=GIF",
        },
        {
          image: "https://t7.baidu.com/it/u=1522757721,1408622889&fm=193&f=GIF",
        },
        {
          image: "https://t7.baidu.com/it/u=192600061,2605776202&fm=193&f=GIF",
        },
        {
          image: "https://t7.baidu.com/it/u=1385589637,1465073693&fm=193&f=GIF",
        },
        {
          image: "https://t7.baidu.com/it/u=27018761,936335273&fm=193&f=GIF",
        },
      ],
      mm_sisterInfo: {
        name: "",
      },
      moreContactInfo: [],
      order_no: "",
      sisterId: "",
      showFlag: false,
      sister_rules: "",
      payModal: false,
      showBottomPopup: false,
      reservePhone: "", // 预留手机号
      showModal: false,
      payQrcode: "",
    };
  },
  onLoad(options) {
    this.sisterId = options.id || "";
  },
  created() {
    this.storageUserInfo = uni.getStorageSync("userInfo");
    this.initData();
    this.getJumpInfos("reservation_detail");
  },
  methods: {
    initData() {
      this.getDetails();
    },
    getDetails() {
      getSisterDetail({
        id: this.sisterId,
      })
        .then((res) => {
          if (res.code === 100000) {
            this.mm_sisterInfo = res?.data || {};
          }
        })
        .catch((err) => {
          console.log(err, "err");
        })
        .finally(() => {
          this.showFlag = true;
        });
    },
    lookContact() {
      getMoreSisterContact({
        id: this.sisterId,
      })
        .then((res) => {
          if (res.code === 100000) {
            this.moreContactInfo = res?.data?.more_contract || [];
          }
        })
        .catch((err) => {
          console.log(err, "err");
        });
    },
    clicksubscribe() {
      //   this.payModal = true;
      this.showBottomPopup = true;
      amOrder({
        sister_id: this.sisterId,
      })
        .then((res) => {
          if (res.code === 100000) {
            this.order_no = res?.data?.order_no || "";
          }
        })
        .catch((err) => {
          console.log(err, "err");
        });
    },
    async getJumpInfos(code) {
      let res = await getProductOtherInfos({
        code,
      });
      //   this.sister_rules = res.data.value.value;
      console.log(res, "反悔的数据");
    },
    close() {
      // this.$emit('on-click-dialog', 'close')
      this.payModal = false;
      console.log("close");
    },
    confirm() {
      let phone = this.reservePhone.replace(/\s*/g, "");
      // this.$emit('on-click-dialog', 'confirm')
      if (!uni.$u.test.mobile(phone)) {
        console.log("手机号不正确", phone);
        return;
      }
      console.log("confirm", phone);
    },
    cancel() {
      // this.$emit('on-click-dialog', 'cancel')
      console.log("ceancel");
    },
    stopScroll() {
      return false;
    },
    handleTelInput(e) {
      var len = this.reservePhone.length;
      // var {phone} = this.formContent
      var reg = new RegExp("\\s", "g");
      var mobile_ = "";
      this.reservePhone = this.reservePhone.replace(reg, "");
      for (var i = 0; i < len; i++) {
        if (i == 2 || i == 6) {
          // charAt(int index)方法是一个能够用来检索特定索引下的字符的String实例的方法。
          //这里用来检索this.reservePhone 的index为2和6
          mobile_ = mobile_ + this.reservePhone.charAt(i) + " "; //当检索到2和6时，将原本的mobile_值加上新增的this.reservePhone 值再加一个" "后再赋值给mobile_自己
        } else {
          mobile_ += this.reservePhone.charAt(i);
        }
      }
      this.reservePhone = mobile_;
    },
    openPopup() {
      // console.log('open');
    },
    closePopup() {
      this.showBottomPopup = false;
      // console.log('close');
    },
    async handlePayMode(item) {
      let res = await getPayQrcode({});
      if (res.code === 100000) {
        this.payQrcode = "";
        if (item.typeStatus === 1) {
          this.payQrcode = res.data.wx;
        }
        if (item.typeStatus === 2) {
          this.payQrcode = res.data.zfb;
        }
      }
      this.showModal = true;
    },
    handleCoonfirmModal() {
      this.showModal = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.container_detail {
  width: 750rpx;
  height: 100%;
  position: relative;

  .sisterImg {
    width: 750rpx;
    height: 832rpx;
    box-sizing: border-box;

    image {
      width: 750rpx;
      height: 832rpx;
    }
  }

  .data_card {
    margin-top: -120rpx;
    width: 750rpx;
    // height: 1800rpx;
    height: 100%;
    box-sizing: border-box;
    position: relative;
    padding: 50rpx 48rpx;
    z-index: 23;
    border-radius: 40px 40px 0px 0px;
    background: #fff;

    .address_info {
      width: 100%;
      height: 130rpx;
      box-sizing: border-box;
      margin-bottom: 8rpx;

      .petusename {
        height: 130rpx;
        box-sizing: border-box;

        .info_name {
          width: 308rpx;
          // height: 76rpx;
          font-size: 48rpx;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          // color: #FFFFFF;
          line-height: 76rpx;
        }

        .base {
          image {
            width: 48rpx;
            height: 48rpx;
          }

          .text {
            width: 276rpx;
            font-size: 28rpx;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            line-height: 40rpx;
          }
        }
      }

      .age {
        margin-left: auto;
        font-size: 32rpx;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #444444;
        line-height: 44rpx;
      }
    }

    .baseInfoTips {
      width: 100%;
      margin-top: 72rpx;

      .base_title {
        width: 100%;
        height: 44rpx;
        font-size: 32rpx;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #000000;
        line-height: 44rpx;
        margin-bottom: 20rpx;
      }

      .tips_container {
        font-size: 28rpx;

        .tip {
          background: rgba(210, 169, 111, 0.14);
          border-radius: 8rpx;
          margin-bottom: 20rpx;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #d2a96f;
          line-height: 40rpx;
          padding: 20rpx 20rpx;
          box-sizing: border-box;
        }

        .ml_12 {
          margin-left: 12rpx;
        }

        .view_contact {
          width: 100%;
          height: 80rpx;
          border-radius: 12rpx;
          border: 2rpx solid #d2a96f;
          margin-top: 20rpx;
          color: #d2a96f;
        }
      }
    }

    .baseInfoTips:last-child {
      margin-bottom: 128rpx;
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
    box-shadow: 0rpx -12rpx 32px 0rpx rgba(0, 0, 0, 0.05);
    box-sizing: border-box;
    z-index: 108;

    .subscribe_view {
      width: 100%;

      .price {
        margin-right: auto;

        .money {
          font-size: 32rpx;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: #f72b2b;
          line-height: 44rpx;
        }

        .text {
          font-size: 24rpx;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #17204d;
          line-height: 34rpx;
        }
      }

      .subscribeBtn {
        width: 548rpx;
        height: 96rpx;
        background: linear-gradient(90deg, #efd4af 0%, #c1914b 100%);
        border-radius: 48rpx;
        font-size: 32rpx;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #7f5d2e;
        line-height: 40rpx;
      }
    }
  }

  .sisterImg::after {
    position: absolute;
    width: 750rpx;
    height: 832rpx;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.5) 100%
    );
    content: "";
    top: 0;
    left: 0;
  }

  /deep/ .u-swiper {
    position: relative;
    z-index: 21;
  }
  .maskDialog {
    .dialog {
      position: fixed;
      z-index: 100000;
      top: 30%;
      left: 50%;
      margin-left: -40%;
      width: 622rpx;
      height: 468rpx;
      background: #ffffff;
      border-radius: 32rpx;
      padding: 0 32rpx;
      box-sizing: border-box;
      .title {
        width: 100%;
        text-align: center;
        font-weight: 600;
        position: relative;
        font-size: 36rpx;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #000000;
        margin-top: 48rpx;
        // line-height: 50rpx;

        .close {
          position: absolute;
          right: -8rpx;
          top: 0rpx;
          width: 30rpx;
          height: 31rpx;

          image {
            width: 100%;
            height: 100%;
          }
        }
      }

      .content {
        width: 100%;
        // margin: 24rpx 0rpx 32rpx 0rpx;
        text-align: center;
        font-size: 28rpx;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #444444;
        .desc_dialog {
          width: 100%;
          margin: 30rpx 0rpx;
          height: 80rpx;

          .text {
            width: 558rpx;
            font-size: 28rpx;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #444444;
          }
        }

        .inputView {
          width: 100%;
          height: 82rpx;
          background: #f9f3eb;
          border-radius: 48rpx;
          display: flex;

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
            width: 100%;
            box-sizing: border-box;
            font-weight: 500;
            color: #7f5d2e;
          }
        }
      }

      .content_bottom {
        width: 100%;
        // width: 558rpx;

        // margin: 0 auto;
        font-size: 28rpx;
        color: #333333;
      }

      .cancel {
        width: 100%;
        height: 82rpx;
        text-align: center;
        line-height: 82rpx;
        color: rgb(111, 111, 111);
        margin: 30rpx 30rpx 0 auto;
        background: rgb(255, 255, 255);
        border-radius: 42rpx;
        border: 1px solid rgb(179, 179, 179);
      }

      .confirm {
        width: 100%;
        height: 82rpx;
        text-align: center;
        line-height: 82rpx;
        margin: 30rpx auto 0 auto;
        background: linear-gradient(90deg, #efd4af 0%, #c1914b 100%);
        border-radius: 48rpx;
        font-size: 32rpx;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #7f5d2e;
      }

      .button_layout {
        display: flex;
        flex-direction: row;
      }
    }

    .mask {
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 99999;
      background: rgba(0, 0, 0, 0.5);
    }
  }

  /deep/ .uni-input-placeholder {
    color: #7f5d2e;
    font-size: 28rpx;
  }

  /deep/ .u-popup {
    // background: rgb(245, 245, 245) !important;
    .popup_container {
      width: 100%;
      padding: 0 32rpx !important;
      // border: 1px solid green;
      box-sizing: border-box;
      background: #f5f5f5;
      border-radius: 20rpx !important;
      .title_view {
        width: 100%;
        font-size: 28rpx;
        height: 60rpx;
        font-weight: 500;
        // border: 1px solid orange;
        margin-top: 24rpx;
        position: relative;
        .close_popup {
          position: absolute;
          left: -8rpx;
          top: 14rpx;
          width: 30rpx;
          height: 31rpx;

          image {
            width: 100%;
            height: 100%;
          }
        }
      }
      .pay_view {
        width: 100%;
        height: 140rpx;
        // border: 1px solid hotpink;
        margin: 24rpx 0;
        border-radius: 30rpx;
        background: #fff;
        .icon_pay {
          width: 120rpx;
          height: 120rpx;
          // border:1px solid skyblue;
        }
        .pay_type {
          width: 300rpx;
          // border: 1px solid gold;
        }
        .rightIcon {
          margin-left: auto;
          margin-right: 32rpx;

          image {
            width: 28rpx;
            height: 28rpx;
          }
        }
      }
    }
  }
  /deep/ .slot-content {
    height: 800rpx !important;
    .text {
      width: 100%;
      margin: 30rpx 0rpx;
      height: 80rpx;
      font-size: 28rpx;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #7f5d2e;
    }
    image {
      height: 600rpx;
    }
    /deep/ .u-modal__button-group {
      background: linear-gradient(90deg, #efd4af 0%, #c1914b 100%) !important;
    }
  }
}
</style>
