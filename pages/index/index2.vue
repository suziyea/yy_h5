<template>
  <view class="home_container">
    <!-- <flipcard ref="stack" :pages="stackList" @click="handleStackClicked"></flipcard> -->
    <view
      class="
        home_content
        u-flex u-flex-column u-flex-center u-flex-items-center
      "
    >
      <view class="mm_card_container">
        <!-- <view v-if="actionName!=''"
					style="color:#fff;background: rgba(0,0,0,.3);padding:10px 20px;font-size:24px;position: absolute;z-index:999;left: 50%;top:50%;transform: translate(-50%,-50%);">
					{{actionName}}</view> -->
        <Flycard
          @onDragMove="onCardDragMove"
          @onDragStop="onCardDragStop"
          @onThrowDone="onCardThrowDone"
          :cardWidth="654"
          :cardHeight="892"
          :throwTriggerDistance="100"
          dragDirection="horizontal"
          :hasShadow="true"
        >
          <view slot="firstCard" style="width: 100%; height: 100%">
            <view v-if="cards[0]" class="tantanCard" @click="clickCard">
              <image
                :src="cards[0].index_image_url"
                style="width: 100%; height: 100%"
                mode="aspectFill"
              >
              </image>
            </view>
          </view>
          <view slot="secondCard" style="width: 100%; height: 100%">
            <view v-if="cards[1]" class="tantanCard">
              <image
                :src="cards[1].index_image_url"
                style="width: 100%; height: 100%"
                mode="aspectFill"
              >
              </image>
            </view>
          </view>
          <view slot="thirdCard" style="width: 100%; height: 100%">
            <view v-if="cards[2]" class="tantanCard">
              <image
                :src="cards[2].index_image_url"
                style="width: 100%; height: 100%"
                mode="aspectFill"
              >
              </image>
            </view>
          </view>
        </Flycard>
        <view class="desc_container">
          <view class="sister_name u-flex u-flex-items-center">
            {{ cards[0].name || "珍妮Jenny" }}
          </view>
          <view class="address u-flex u-flex-items-center">
            <image src="/static/icon/home_map.png" mode="aspectFill"></image>
            <view class="add u-flex u-flex-center u-flex-items-center">
              {{ cards[0].address || "上海" }}
            </view>
          </view>
        </view>
      </view>

      <!-- {{this.lon}}---{{this.lat}} -->

      <!-- 操作按钮 -->
      <view class="actionBar u-flex u-flex-center u-flex-items-center">
        <view
          class="action_container u-flex u-flex-items-center u-flex-between"
        >
          <view
            class="
              next_view
              action_img
              u-flex u-flex-center u-flex-items-center
            "
            @click="nextSister"
          >
            <image src="/static/img/home_next.png" mode="aspectFill"></image>
          </view>
          <view
            class="
              like_view
              action_img
              u-flex u-flex-center u-flex-items-center
            "
          >
            <image
              v-if="cards.length >= 1 && cards[0].is_like"
              src="/static/img/home_like.png"
              mode="aspectFill"
              @click="handleLikeSister(cards[0], 1)"
            ></image>
            <image
              v-else
              src="/static/img/home_cancel_like.png"
              mode="aspectFill"
              @click="handleLikeSister(cards[0], 2)"
            ></image>
          </view>
        </view>
      </view>
    </view>
    <!-- tabs -->
    <!-- <view class="tab">
			<Tabbar currentPage="index"></Tabbar>
		</view> -->
  </view>
</template>

<script>
import Flycard from "../../components/flycard/flycard.vue";
import Tabbar from "../../components/tabbar/Tarbar.vue";
import commonDialog from "@/components/common-dialog/common-dialog.vue";
import common from "@/utils/common";
import { mapGetters, mapMutations } from "vuex";
import {
  getSisterList,
  likeSisterApi,
  cancelLikeSisterApi,
} from "@/config/api/sister.js";
export default {
  components: {
    Flycard,
    Tabbar,
    commonDialog,
  },
  data() {
    return {
      title: "Home",
      actionName: "22",
      // cards: [{
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
      cards: [
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
      // cards: [],
      sisterList: [],
      lon: "",
      lat: "",
      lon_js: "",
      lat_js: "",
    };
  },
  mounted() {
    // uni.getLocation({
    // 	type: 'wgs84',
    // 	success: (res) => {
    // 		uni.showToast({
    // 			title: `${res.longitude} -- 当前位置的纬度 ${res.latitude}`,
    // 			icon: 'none',
    // 			duration: 200000
    // 		});
    // 		this.lon = res?.longitude; //当前位置精度
    // 		this.lat = res?.latitude; //当前位置的纬度
    // 		console.log('当前位置的经度：' + res.longitude);
    // 		console.log('当前位置的纬度：' + res.latitude);
    // 	}
    // });
    // const hello = common.getLocation()
    // console.log(hello, "有位置吗原生js");
    // uni.showToast({
    // 	title: JSON.stringify(hello),
    // 	icon: 'none',
    // 	duration: 200000
    // });
    // this.lon_js = hello?.coords?.longitude; //当前位置精度
    // this.lat_js = hello?.coords?.latitude; //当前位置的纬度
    // this.getInitList();
  },
  computed: {
    ...mapGetters(["isLogin", "getUserInfos"]),
    isListStatus() {
      return this.cards[0].is_like || false;
    },
    // 初始化 喜欢或者不喜欢
  },
   onPullDownRefresh() {
    console.log("refresh");
    setTimeout(() => {
      this.initDataCards();
      uni.stopPullDownRefresh();
    }, 600);
  },

  created() {
    // uni.getLocation({
    // 	type: "wgs84",
    // 	success: (res) => {
    // 		console.log(res, "unipap");
    // 		this.lon = res.longitude;
    // 		this.lat = res.latitude;
    // 		console.log("当前位置的经度：" + res.longitude);
    // 		console.log("当前位置的纬度：" + res.latitude);
    // 	},
    // });
    // this.getLongitudeLatitude()

    // if (navigator.geolocation) {
    // 	alert(' 浏览器支持 geolocation ');
    // } else {
    // 	alert(' 浏览器不支持 geolocation ');
    // }
    // can
    // this.getLocationH5()
    // this.address()
    this.initDataCards();
  },
  onLoad() {},
  methods: {
    initDataCards() {
      // console.log(uni.getStorageSync('home_noLookSister_list'),'快看看')
    //   if (
    //     uni.getStorageSync("home_noLookSister_list") &&
    //     uni.getStorageSync("home_noLookSister_list").length > 1
    //   ) {
    //     this.cards = uni.getStorageSync("home_noLookSister_list");
    //     console.log("这里if", "niaho");
    //   } else
	   if (
        uni.getStorageSync("home_sister_list_total") &&
        uni.getStorageSync("home_sister_list_total").length > 1
      ) {
        this.cards = uni.getStorageSync("home_sister_list_total");
        console.log("这里elseif", "niaho");
      } else {
        this.address();
        console.log("else", "niaho");
      }
    },
    address() {
      let that = this;
      uni.getLocation({
        type: "wgs84",
        success: function (res) {
          console.log(res, "没手吗");
          // uni.showToast({
          // 	title: `${res.longitude} -你好啊- 当前位置的纬度 ${res.latitude}`,
          // 	icon: 'none',
          // 	duration: 200000
          // });
          that.lon = res.longitude;
          that.lat = res.latitude;
          getSisterList({
            lat: that.lat || res.latitude,
            lon: that.lon || res.longitude,
          })
            .then((res) => {
              if (res.code === 100000) {
                console.log("quickly");
                that.sisterList = res?.data;
                that.cards = res?.data;
				// 缓存所有客户小姐姐信息
                uni.setStorageSync("home_sister_list_total", res?.data);
				// 缓存没有看过的客户小姐姐信息
                uni.setStorageSync("home_noLookSister_list", res?.data);
              }
            })
            .catch((err) => {
              console.log(err, "err");
            });
          console.log("当前位置的经度：" + res.longitude);
          console.log("当前位置的纬度：" + res.latitude);
        },
      });
    },
    clickCard() {
      uni.navigateTo({
        url: `/pages/dataDetail/dataDetail?id=${
          this.cards[0].id
        }&name=${new Date().getTime()}`,
      });
    },
    nextSister() {
      // this.cards.splice(0, 1);
		console.log('next,==----')

    //   uni.setStorageSync("home_noLookSister_list", this.cards.splice(0, 1));
    },
    async handleLikeSister(item, type) {
      console.log(item, "嘿宝贝",type);
	  this.$set(this.cards, 0, {
        ...item,
        is_like: item.is_like ? false : true,
      });
      if (type === 2 && !this.isLogin) {
        uni.$u.route("/pages/login/login");
        return;
      }
      // type === 1, 取消喜欢 2，喜欢
    //   this.isListStatus = (type === 1) ? false : true;
      let noSeeList = [];
      if (
        uni.getStorageSync("home_sister_list_total") &&
        uni.getStorageSync("home_sister_list_total").length >= 1
      ) {
        noSeeList = JSON.parse(JSON.stringify(uni.getStorageSync("home_sister_list_total")));
		console.log('缓存的裂变--',noSeeList)
        let index = noSeeList.findIndex(
          (noseeitem) => (noseeitem.id === item.id)
        );
		console.log(index,'这里是下表---')
		noSeeList.splice(index, 1, {
          ...noSeeList[index],
          is_like: item.is_like ? false : true,
        });
        if (index > -1) {
          noSeeList.splice(index, 1, {
            ...noSeeList[index],
            is_like: item.is_like ? false : true,
          });
          uni.setStorageSync("home_sister_list_total", noSeeList);
        }
      }

      let method = likeSisterApi;
      if (type === 1) {
        method = cancelLikeSisterApi;
      }
      await method({
        sister_id: item.id,
      });
    },

    getInitList(lat, lon) {
      getSisterList({
        lat: lat || this.lat_js,
        lon: lon || this.lon_js,
      })
        .then((res) => {
          if (res.code === 100000) {
            this.sisterList = res?.data;
            this.cards = res?.data;
          }
        })
        .catch((err) => {
          console.log(err, "err");
        })
        .finally(() => {
          this.showOrderFlag = true;
        });
      return;
    },
    onCardDragMove(obj) {
      console.log(obj);

      if (obj.left < -10) {
        this.actionName = "不喜欢";
      } else if (obj.left > 10) {
        this.actionName = "喜欢";
      } else {
        this.actionName = "";
      }
    },
    onCardDragStop(obj) {
      this.actionName = "";
    },
    onCardThrowDone(obj) {
		console.log('obj,',obj)
      // 没有浏览过的数据
    //   uni.setStorageSync("home_noLookSister_list", this.cards.splice(0, 1));
      this.cards.splice(0, 1);
    },
    getLongitudeLatitude() {
      let that = this;
      //如果该对象存在，那么地理位置服务可用。
      if ("geolocation" in navigator) {
        /* 地理位置服务可用 */
        var options = {
          enableHighAccuracy: false, //布尔值，表示系统是否使用最高精度来表示结果，注意，这会导致较慢的响应时间或者增加电量消耗（比如对于支持gps的移动设备来说）。如果值为false ，设备会通过更快响应以及/或者使用更少的电量等方法来尽可能的节约资源。默认值fasle
          timeout: 5000, //它表明的是设备必须在多长时间（单位毫秒）内返回一个位置。默认直到获取到位置才会返回值。
          maximumAge: 0, //表明可以返回多长时间（即最长年龄，单位毫秒）内的可获取的缓存位置。如果设置为 0, 说明设备不能使用一个缓存位置，而且必须去获取一个真实的当前位置。默认0
        };

        function success(position) {
          //position.coords (只读) 返回一个定义了当前位置的Coordinates对象。
          //position.timestamp (只读) 返回一个时间戳DOMTimeStamp， 这个时间戳表示获取到的位置的时间。
          var lat = position.coords.latitude; //当前位置的纬度
          var lng = position.coords.longitude; //当前位置精度
          that.lat_js = lat;
          that.lon_js = lng;
          console("lat", lat, "lat_js", that.lat_js, that.lon_js, "位置");
        }

        function error(err) {
          var errorType = [
            "您拒绝共享位置信息",
            "获取不到位置信息",
            "获取位置信息超时",
          ];
          console.log(errorType[err.code - 1]);
        }

        navigator.geolocation.getCurrentPosition(success, error, options);
      } else {
        /* 地理位置服务不可用 */
        console.log("无法获取您的位置，请检查定位是否开启或刷新重试");
      }
    },
    getLocationH5() {
      //方法二 H5 获取当前地理位置得到经纬度
      let that = this;
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          this.showLocation,
          this.locationError
        );
      } else {
        alert("您的设备不支持定位功能");
      }
    },
    showLocation(position) {
      var x = position.coords.longitude;
      var y = position.coords.latitude;
      console.log(x, y, "h5定位"); //coords:需转换的源坐标，多组坐标以“；”分隔（经度，纬度）　　　　　//from :源坐标类型　　　　　　//to:目标坐标类型
      this.getInitList(x, y);
    },
    locationError(error) {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          alert("用户拒绝地理定位请求。");
          break;
        case error.POSITION_UNAVAILABLE:
          alert("位置信息不可用。");
          break;
        case error.TIMEOUT:
          alert("获取用户位置的请求超时。");
          break;
        case error.UNKNOWN_ERROR:
          alert("发生未知错误。");
          break;
      }
    },
  },
  watch: {
    cards(newVal, oldVal) {
      console.log(newVal, oldVal, "嘿嘿嘿", newVal.length);
      if (newVal.length <= 0) {
        console.log("wathc接口 调用了");
        this.address();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
view {
  box-sizing: border-box;
}

.home_container {
  width: 750rpx;
  // height: calc(100vh - 156rpx);
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;

  .home_content {
    width: 100%;
    height: 100%;

    .mm_card_container {
      width: 100%;
      height: 940rpx;
      padding: 0 48rpx;
      box-sizing: border-box;
      position: relative;
      box-sizing: border-box;

      .desc_container {
        position: absolute;
        bottom: 40rpx;
        left: 48rpx;
        box-sizing: border-box;

        .sister_name {
          width: 400rpx;
          height: 76rpx;
          font-size: 48rpx;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #ffffff;
          margin-left: 16rpx;
        }

        .address {
          image {
            width: 48rpx;
            height: 48rpx;
          }

          .add {
            font-size: 28rpx;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #ffffff;
          }
        }
      }
    }

    .mm_card_container::after {
      position: absolute;
      width: 750rpx;
      height: 940rpx;
      background: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 0.5) 100%
      );
      border-radius: 32rpx;
      top: 0;
      left: 0;
      z-index: 99;
    }

    .actionBar {
      width: 100%;
      height: 240rpx;

      .action_container {
        width: 100%;
        height: 100%;
        padding: 0 100rpx;
        box-sizing: border-box;

        // border: 2px solid hotpink;
        .next_view {
        }

        .like_view {
        }

        .action_img {
          image {
            width: 120rpx;
            height: 120rpx;
          }
        }
      }
    }
  }

  .tantan_card {
    // height: 100%;
    margin-top: 44rpx;
    // height: 892rpx;
    height: 100%;
  }

  .tantanCardLike {
    width: 750rpx;
    margin-top: 32rpx;
    box-sizing: border-box;

    .imgs {
      width: 502rpx;
      height: 100%;

      // width: 120rpx;
      // height: 120rpx;
      image {
        width: 120rpx;
        height: 120rpx;
      }
    }
  }
}

.tantanCard {
  width: 100%;
  height: 100%;
  position: relative;
}

.tantanCard::after {
  width: 100%;
  height: 100%;
  position: absolute;
  background: linear-gradient(360deg, #000000 0%, rgba(0, 0, 0, 0) 100%);
  border-radius: 10rpx;
  content: "";
  top: 0;
  left: 0;
}
</style>
