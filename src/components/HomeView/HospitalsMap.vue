<template>
  <div>
    <input id='tipinput' type="text">
    <div id="map-container" ref="amap"></div>
    <div id="panel"></div>
  </div>
</template>
 
<script>
/* eslint-disable */
import axios from 'axios';
import AMapLoader from '@amap/amap-jsapi-loader'
export default {
    name: 'HospitalMap',
  data() {
    return {
      map: null,
      placeSearch: null,
      mapModule: null, // AMap
      marker1: null,
      marker2: null,
      marker3: null,
      infoWindow: null,
      latitudes: [],
      longitudes: [],
      hospitalInfoList: [],
    }
  },
  mounted() {
    window._AMapSecurityConfig = {
      securityJsCode: 'bc3517c76077639446ad6001b4015cd6' // 申请key对应的秘钥 -> 注意了，如果不搭配密钥使用，搜索将没有结果
    }
  
    // 初始化地图
    this.initAMap()
    // 加载页面时获取所有医院的信息列表
    this.loadHospitalInfo();
  },
  destroyed() {
    // 销毁地图
    this.map.destroy()
  },
  methods: {
    // 初始化地图函数
    initAMap() {
      const _this = this
      AMapLoader.load({
        key: '89897adfafea7685bf5cbf5955177107', // 申请好的Web端开发者Key，首次调用 load 时必填
        version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: []
      })
        .then((AMap) => {
          // 保存AMap实例
          _this.mapModule = AMap
          const map = new AMap.Map('map-container', {
            // 设置地图容器id
            viewMode: '3D', // 默认2d地图模式
            zoom: 15, // 初始化地图级别
            zooms: [5, 30],
            // 可以设置初始化当前位置
            //center: [121.21362611,31.28576211],
            resizeEnable: true
          })
          
          // 添加控件
          AMap.plugin(
            [
              'AMap.ElasticMarker',
              'AMap.Scale',
              'AMap.ToolBar',
              'AMap.HawkEye',
              'AMap.MapType',
              'AMap.Geolocation',
              'AMap.AutoComplete',
              'AMap.PlaceSearch'
            ],
            () => {
              //灵活点标记
              //map.addControl(new AMap.ElasticMarker())
              //比例尺
              map.addControl(new AMap.Scale())
              //地图大小控件
              //map.addControl(new AMap.ToolBar())
              //鹰眼
              //map.addControl(new AMap.HawkEye())
              //地图类型：标准图层/卫星图；路网/路况
              //map.addControl(new AMap.MapType())
              //定位
              map.addControl(new AMap.Geolocation())
            }
          )
          
          // 添加点覆盖物，表示医院的位置
          this.marker1 = new AMap.Marker({
            icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
            position: [121.232528,31.300411]
          });
          this.marker2 = new AMap.Marker({
            icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
            position: [121.224375,31.263955]
          });
          this.marker3 = new AMap.Marker({
            icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
            position: [121.195965,31.286769]
          });
          map.add(this.marker1)
          map.add(this.marker2)
          map.add(this.marker3)

          // 设置地图的显示范围
          var mybounds = new AMap.Bounds([121.245777,31.301068], [121.187412,31.253973]);
          map.setBounds(mybounds);

          // 鼠标移入覆盖物，显示医院的名称
          this.marker1.on('mouseover', () => {
            this.openInfo(1);
          });
          this.marker2.on('mouseover', () => {
            this.openInfo(2);
          });
          this.marker3.on('mouseover', () => {
            this.openInfo(3);
          });

          // 鼠标点击覆盖物，跳转到对应医院的页面
          this.marker1.on('click', () => {
            this.toHospitalPage(1);
          });
          this.marker2.on('click', () => {
            this.toHospitalPage(2);
          });
          this.marker3.on('click', () => {
            this.toHospitalPage(3);
          });

          _this.map = map
          // 搜索功能
          _this.toSearch()
        })
        .catch((e) => {
          console.log(e)
        })
    },
    
    // 打开信息窗体，显示医院信息
    openInfo(hospitalID) {
      // 检查地图是否已初始化
      if (this.map) {
        // 构建信息窗体中显示的内容
        var info = [];
        info.push("<div class='input-card content-window-card'><div><img style=\"float:left;\" src=\" https://webapi.amap.com/images/autonavi.png \"/></div> ");
        info.push(this.hospitalInfoList[hospitalID - 1].hospitalName)
  
        this.infoWindow = new AMap.InfoWindow({
          content: info.join(""), // 使用默认信息窗体框样式，显示信息内容
        });

        if(hospitalID == 1){
          this.infoWindow.open(this.map,  this.marker1.getPosition());
        }
        else if(hospitalID == 2) {
          this.infoWindow.open(this.map,  this.marker2.getPosition());
        }
        else {
          this.infoWindow.open(this.map,  this.marker3.getPosition());
        }
      }
      else{
        console.log("map为空")
      }
    },

    // 跳转到医院详情页
    toHospitalPage(hospitalID) {
      this.$router.push({ name: 'HospitalView', params: { id: hospitalID } }); 
    },
    
    // 搜索地名
    toSearch() {
      const _this = this
      // 实例化AutoComplete
      const autoOptions = {
        // input 为绑定输入提示功能的input的DOM ID,注意这个id要个搜索输入框的id一致
        input: 'tipinput' 
      }
      const autoComplete = new _this.mapModule.AutoComplete(autoOptions)
      autoComplete.on('select', _this.select)// 注册监听，当选中某条记录时会触发
    },
    select(e) {
      const _this = this
      // 无需再手动执行search方法，autoComplete会根据传入input对应的DOM动态触发search
      // { map: _this.map } ==> 这个对象是能配置的 --> 根据官方文档配置即可，需要什么配置什么
      const placeSearch = new _this.mapModule.PlaceSearch({
        map: _this.map
      })
      placeSearch.setCity(e.poi.adcode)
      placeSearch.search(e.poi.name) // 关键字查询查询
    },


    // 获取医院信息列表
    async loadHospitalInfo() {
      // 使用 this.$http 进行网络请求
      try {
        const response = await axios.get('http://118.195.236.254:8401/api/hospital/');
        console.log(response.data.code)
        if (response.data.code) {
          this.hospitalInfoList = response.data.data;
          console.log(this.hospitalInfoList);

          this.hospitalInfoList.forEach(hospitalInfo => {
            const positionArray = hospitalInfo.position.split(',');
            const latitude = parseFloat(positionArray[0]);
            const longitude = parseFloat(positionArray[1]);
          
            this.latitudes.push(latitude);
            this.longitudes.push(longitude);
          });
          // 打印结果
          // console.log("Latitudes:", this.latitudes);
          // console.log("Longitudes:", this.longitudes);
        } else {
          this.$message.error(response.data.message);
        }
      } catch (error) {
        console.log('网络请求失败：', error);
      }
    },
}
}
</script>

<style lang='less' scoped>
#map-container {
  width: 24%;
  height: 350px;
  margin-top: 20px;
  margin-left: 1%;
  border: 1px solid #ccc;
  float: left;
  font-family: "微软雅黑";
}

/* 隐藏高德logo  */
.amap-logo {
  display: none !important;
}
/* 隐藏高德版权  */
.amap-copyright {
  display: none !important;
}

#info-container {
  width: 24%;
  height: 200px;
  margin-top: 20px;
  margin-left: 1%;
  border: 1px solid #ccc;
}
#tipinput {
  width: 24%;
  margin-top: 20px;
  margin-left: 1%;
  border: 1px solid #ccc;
  float: left;
  font-family: "微软雅黑";
}



html, body, #container {
            height: 100%;
            width: 100%;
        }

        .custom-input-card{
            width: 18rem;
        }

        .custom-input-card .btn:last-child{
            margin-left: 1rem;
        }

        .content-window-card{
            position: relative;
            width: 23rem;
            padding: 0.75rem 0 0 1.25rem;
            box-shadow: none;
            bottom: 0;
            left: 0;
        }

        .content-window-card p{
            height: 2rem;
        }
</style>