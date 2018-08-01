
import {config,getServerUrl} from './config'

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


function upload(page, path,callback) {
  wx.showToast({
      icon: "loading",
      title: "正在上传"
  }),
        
      wx.uploadFile({
      url: getServerUrl() + "/miniup",
      filePath: path[0], 
      name: 'photo',
      header: { "Content-Type": "multipart/form-data" },
      formData: {
          //和服务器约定的token, 一般也可以放在header中
          'session_token': wx.getStorageSync('session_token')
      },
      success: function (res) {
          console.log(res);
          if (res.statusCode != 200) { 
          wx.showModal({
              title: '提示',
              content: '上传失败',
              showCancel: false
          })
          return;
          }
          var data = res.data
          callback(res)
      },
      fail: function (e) {
          console.log(e);
          wx.showModal({
          title: '提示',
          content: '上传失败',
          showCancel: false
          })
          callback({})
      },
      complete: function () {
          wx.hideToast();  //隐藏Toast
      }
      })
  }

module.exports = {
  formatTime: formatTime,
  upload:upload
}
