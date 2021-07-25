<template>
  <v-container>
    <v-btn depressed @click="startRecord()">start</v-btn>
    <v-btn depressed @click="stopRecord()">stop</v-btn>
  </v-container>
</template>

<script>
import RecordRTC from 'recordrtc'
export default {
  name: "Record",
  data: function (){
    return {
      // stream:  navigator.mediaDevices.getUserMedia({video: true, audio: true}),
      recorder: null,

    }
  },
  methods: {
    startRecord: function () {
      // navigator.mediaDevices.getUserMedia({video: true, audio: true})
      // this.recorder = new RecordRTC.RecordRTCPromisesHandler(, {
      //   type: 'video',
      //   mimeType: "video/wav",

        // recorderType: RecordRTC.WebAssemblyRecorder

      const that = this

      // navigator.mediaDevices.getDisplayMedia({ audio: true, video: true }).then(function (stream) 		{
      //   // camera就是一个媒体流
      //   that.recorder = RecordRTC(stream, {
      //     type: 'video',
      //     mimeType: "video/webm"
      //   });
      //   that.recorder.startRecording()
      //   console.log("start   ", that.recorder)
      // }).catch(function (error) {
      //   // alert('Unable to capture your camera. Please check console logs.');
      //   console.error(error)
      // })
      // })

      // this.recorder.startRecording()

      // const sleep = m => new Promise(r => setTimeout(r, m));
      // await sleep(5000);
      navigator.mediaDevices.getUserMedia({audio: true, video: true}).then(function (mediaStream) {
        const config = {
          mimeType: 'video/webm', // vp8, vp9, h264, mkv, opus/vorbis
          audioBitsPerSecond : 256 * 8 * 1024,
          videoBitsPerSecond : 256 * 8 * 1024,
          bitsPerSecond: 256 * 8 * 1024,  // if this is provided, skip above two
          checkForInactiveTracks: true,
          timeSlice: 1000, // concatenate intervals based blobs
          ondataavailable: function() {} // get intervals based blobs
        }
        that.recorder = new RecordRTC.MediaStreamRecorder(mediaStream, config);
        that.recorder.record();

      })


    },
    stopRecord: function () {
      console.log(this.recorder)
      // this.recorder.stopRecord()
      // // this.recorder.save("1.mkv")
      // let blob = this.recorder.getBlob();
      // console.log("blog   ", blob)
      // // RecordRTC.invokeSaveAsDialog(blob, "blob.mkv");
      // // this.recorder.stopRecording();
      const that = this
      this.recorder.stop(function () {
        // that.recorder.save("1")

        // let blob = that.recorder.getBlob()
        let blob = that.recorder.blob
        RecordRTC.invokeSaveAsDialog(blob, "filename.webm")
      })
    }
  }
}
</script>

<style scoped>

</style>
