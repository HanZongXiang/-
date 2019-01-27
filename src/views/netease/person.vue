<template>
  <div class="person-center w960">
    <el-card>
      <div class="form-wrap" v-if="!userInfo.nickname">
        <h3>网易云登录</h3>
        <el-form style="margin-top: 15px">
          <el-form-item label="账号">
            <el-input v-model="formData.tel" size="mini" placeholder="请输入手机号"></el-input>
          </el-form-item>

          <el-form-item label="密码">
            <el-input type="password" size="mini" v-model="formData.password" placeholder="请输入密码" @keyup.enter.native="handleLogin"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" style="width:100%" size="mini" @click="handleLogin">
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </div>
      <div v-else>
        <div class="user-wrap">
          <img :src="userInfo.avatarUrl">
          <span>{{userInfo.nickname}}</span>
        </div>
        <div class="album-wrap">
          <h3>我喜欢的音乐</h3>
          <div class="table-title">
            <div></div>
            <div>歌曲标题</div>
            <div>歌手</div>
            <div>专辑</div>
          </div>
          <ul class="table-content">
            <li v-for="(item, index) in likeMusic" :key="index" @click="getSongDetail(item.id)">
              <div>{{index + 1}}</div>
              <div :title="item.name">{{item.name}}</div>
              <div>{{item.ar[0].name}}</div>
              <div>{{item.al.name}}</div>
            </li>
          </ul>
        </div>
      </div>
      
    </el-card>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name:'person',
  data() {
    return {
      formData: {
        tel: '15738252686',
        password: '970806'
      },
      userInfo: {

      },
      likeMusic: []
    }
  },
  components: {

  },
  methods: {
    handleLogin () {
      axios.post(`http://120.77.46.171:3000/login/cellphone?phone=${this.formData.tel}&password=${this.formData.password}`).then(res => {
        if (res.data.code === 200) {
          this.userInfo = res.data.profile
        }
        axios.get(`http://120.77.46.171:3000/user/playlist?uid=${res.data.profile.userId}`).then(res1 => {
          axios.get(`http://120.77.46.171:3000/playlist/detail?id=${res1.data.playlist[0].id}`).then(res2 => {
            this.likeMusic = res2.data.playlist.tracks
          })
        })
      })
    },
    getSongDetail (id) {
      this.$bus.$emit('sendId', {id,playlist: this.likeMusic})
    }
  }
}
</script>

<style scoped lang="scss">
.user-wrap {
  display: flex;
  align-items: center;
  font-size: 12px;
  padding-bottom: 15px;
  border-bottom: 1px solid #ddd;
  img {
    display: block;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 15px;
  }
}
.album-wrap {
  h3 {
    margin: 15px 0;
    border-bottom: 2px solid #c20c0c;
    padding-bottom: 15px;
  }
}
.table-title {
  display: flex;
  div {
    height: 45px;
    border: 1px solid #ddd;
    color: #333;
    line-height: 45px;
    box-sizing: border-box;
    padding-left: 15px;
    background-color: rgb(212, 204, 204);
  }
  div:nth-child(1) {
    width: 10%;
  }
  div:nth-child(2) {
    width: 30%;
    border-left: none;
  }
  div:nth-child(3) {
    width: 30%;
    border-left: none;
  }
  div:nth-child(4) {
    width: 30%;
    border-left: none;
  }
}
.table-content {
  border: 1px solid #ddd;
  margin-bottom: 15px;
  li:nth-child(2n-1) {
    background-color: #f7f7f7;
  }
  li:hover {
    color: #c20c0c;
  }
  li {
    display: flex;
    color: #333;
    font-size: 12px;
    height: 30px;
    line-height: 30px;
    cursor: pointer;
    div:nth-child(1) {
      width: 10%;
      color: #999;
      text-align: center;
    }
    div:nth-child(2) {
      width: 30%;
      padding-left: 15px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    div:nth-child(3) {
      width: 30%;
      padding-left: 15px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    div:nth-child(4) {
      width: 30%;
      padding-left: 15px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>
