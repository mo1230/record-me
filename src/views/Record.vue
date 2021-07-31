<template>
  <v-container class="m-video-container m-wh">
    <video id="myVideo" ref="video" controls autoplay playsinline></video>
    <br>
    <div>
      <v-btn ref="btnCapture" class="m-btn" depressed color="info" @click="startCapture()">Capture</v-btn>
      <v-btn ref="btnStart" class="m-btn" depressed color="success" @click="startRecord()">start</v-btn>
      <v-btn ref="btnStop" class="m-btn" depressed color="error" @click="stopRecord()">stop</v-btn>
    </div>

  </v-container>
</template>

<script>
import RecordRTC from 'recordrtc'
// import videojs from 'video.js'
// import {desktopCapturer} from 'electron'
const {desktopCapturer, ipcRenderer} = window.require('electron')
// import domify from 'domify'
const domify = window.require('domify')
const moment = window.require('moment')
export default {
  name: "Record",
  data: function (){
    return {
      // stream:  navigator.mediaDevices.getUserMedia({video: true, audio: true}),
      recorder: null,
      stream: null

    }
  },
  methods: {
    startCapture: function (){
      ipcRenderer.send("show-picker", ["window","screen"])
      ipcRenderer.on("source-id-selected", (event, id)=>{
        console.log(id)
        this.capture(id)
      })
    },
    startRecord: function () {
      this.recorder = new RecordRTC(this.stream, { type: "video",mimeType: "video/webm; codecs=vp9" })
      this.recorder.startRecording()
      this.$refs.btnStart.disabled = true
    },
    handleStream: function (stream) {
      const video = document.querySelector('video')
      video.srcObject = stream
      // video.src = window.URL.createObjectURL(stream)
      video.onloadedmetadata = (e) => video.play()

    },
    handleError: function(e){
      console.log(e)
    },
    capture: function(id){
      desktopCapturer.getSources({ types: ['window', 'screen'] }).then(async sources => {
        console.log(sources)
        for (const source of sources) {
          if (source.id === id) {
            try {
              this.stream = await navigator.mediaDevices.getUserMedia({
                audio: {
                  mandatory: {
                    chromeMediaSource: "desktop"
                  }
                },
                video: {
                  mandatory: {
                    chromeMediaSource: 'desktop',
                    chromeMediaSourceId: id,
                    minWidth: 1280,
                    maxWidth: 1280,
                    minHeight: 720,
                    maxHeight: 720
                  }
                }
              })
              this.handleStream(this.stream)

            } catch (e) {
              this.handleError(e)
            }
            return
          }
        }
      })
    },
    stopRecord: function () {
      let that = this
      this.recorder.stopRecording(function (blob) {
        that.recorder.save(moment().format('YYYY-MM-DD HH:mm:ss') + "")
      })
      const video = document.querySelector('video')
      video.srcObject = null
      this.$refs.btnStart.disabled = false
    }
  },


}
</script>

<style scoped>
  .m-video-container {
    display: flex;
    flex-direction: column;
    justify-items: center;
  }
  .m-btn {
    margin-right: 5px;
  }
</style>
