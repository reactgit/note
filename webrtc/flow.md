A -> B
```
// A
navigator.mediaDevices.getUserMedia(constraints).then((localStream: MediaStream) => {});
var remoteStream = new MediaStream();
var config =  {iceServers: [{url:'stun:stun.voipbuster.com'}]};
var pc = new RTCPeerConnection(config);

pc.onicecandidate = function (evnt) {
   sendMessage(event.candidate); //让信令服务器转发candidate到另一端
};

/*  addStream 和 onaddstream 已经被 addTrack 和 ontrack 取代
  pc.addStream(mediaStream); //添加本地音视频流
  pc.onaddstream = function (event) { // 收到另外一端的音视频流
   //get a remote stream: event.stream
  };
*/
localStream.getTracks().forEach((track) => {//添加本地音视频流
  pc.addTrack(track, localStream)
});
pc.ontrack = (event) => {// 收到另外一端的音视频流
   event.streams[0].getTracks().forEach((track) => {
      remoteStream.addTrack(track)
  })
}


 pc.createOffer().then(function(offer) {
    return pc.setLocalDescription(offer);
 }).then( function() {
   sendMessage(pc.localDescription) //将本机的元数据通过信令服务器发给另一端
 });

app.on('candidate', function (data) { //收到信令服务器发来的candidate消息
   pc.addIceCandidate(new RTCIceCandidate(data.candidate));
});


```


```
// B
 
 app.on('sdp-offer', function (data) { //收到元数据后把它保存起来, 并获取本机的元数据作为answer返回
    pc.setRemoteDescription(new RTCSessionDescription(data.sdp), function () {
      pc.createAnswer().then(function(answer) {
         return pc.setLocalDescription(answer);
      }).then(function() {
        sendMessage(pc.localDescription)
      })
    });
});

```

var dc = pc.createDataChannel("channelName", option);
dc.onopen = function () {};
dc.onmessage = function () {};
dc.onclose = function () {};

pc.ondatachannel = function (event) {
    event.channel.onmessage = function () {};
    event.channel.onopen = function () {};
    event.channel.onclose = function () {};
};



https://www.youtube.com/watch?v=Otcv3ZqWkn4
https://www.youtube.com/watch?v=WEUb-G4oSAg
mediasoup

av1 
Lyra V2