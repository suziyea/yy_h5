<template>
  <view class="maskDialog">
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
          <!-- <view class="text"> 便于小妹联系到你! </view> -->
          <view class="text"> 便于联系到你! </view>
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
        <view class="confirm" @click.stop="confirmSubmit">提交</view>
      </view>
    </view>
    <view class="mask" @touchmove.stop.prevent="stopScroll"></view>
  </view>
</template>
<script>
export default {
  name: "common-dialog",
  props: {
    title: {
      type: String,
      default: "请扫码支付",
    },
    tips: {
      type: String,
      default: "付款后请联系客服获取最新支付状态",
    },
    payQrcode: {
      type: String,
      default: "",
    },
    confirmText: {
      type: String,
      default: "确定",
    },
    cancelText: {
      type: String,
      default: "取消",
    },
    showCancel: {
      type: Boolean,
      default: false,
    },
    showModal: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      reservePhone: "",
    };
  },
  created() {},
  mounted() {},
  methods: {
    close() {
      this.$emit("closePhoneModal", "close");
    },
    stopScroll() {
      return false;
    },
    confirmSubmit() {
      this.$emit("confirmSubmit", this.reservePhone);
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
  },
};
</script>

<style lang="scss" scoped>
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
  
  /deep/ .uni-input-placeholder {
    color: #7f5d2e;
    font-size: 28rpx;
  }
}
</style>