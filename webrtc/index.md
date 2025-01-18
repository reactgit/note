
https://groups.google.com/forum/#!forum/discuss-webrtc
http://stackoverflow.com/questions/tagged/webrtc

# WebRTC的优缺点
### 优点
1. 方便, 用户无需安装插件和客户端, 开发者使用简单的HTML标签和JavaScript API就能够实现Web音/视频通信的功能
2. 免费, 开源

### 缺点
- 缺乏服务器方案的设计和部署
- 复杂网络下传输质量难以保证, 没有针对大规模群聊的优化
- 兼容性和互操作性

# webrtc vs ortc
- The main difference with ORTC is that it uses separate send and receive objects, with support for simulcast and layered video coding. Also, it might be an easier fit devs using legacy systems.
- ORTC doesn’t use SDP, How do I tell the remote party what media I support?
- more control and capabilities offered to the developer

- Application may build its own objects or use the structure already defined in ORTC and send that between the parties as was done with SDP 应用可以构建自己的sdp对象 或者在ortc定义好的结构上扩展
- A server may dictate media settings to both parties by pushing this information to them and have them set the parameters on each browser 客户端可以从服务端获取一些预定义设置?
- An application that lives in a well controlled environment and network may have these settings predefined and exchange no media information between parties 也就是说如果环境确定的话 就不需要sdp的交换了?
- What media parameters are send and how they are sent between parties is up to the application to decide


# key
plugin-free cross-platform-browser p2p Interoperability
怎样绕过安全和防火墙的保护定位另外一方
客户同意通信
getStats


#link
https://webrtcweekly.com/
[WebRTC Media Servers](http://webrtcbydralex.com/index.php/2016/09/08/webrtc-media-servers/)
[working-to-make-edge-dull-extended-qa-for-rtc-devs](https://webrtchacks.com/working-to-make-edge-dull-extended-qa-for-rtc-devs/)
[ortc-webrtc](https://thenewdialtone.com/ortc-webrtc/)
https://webrtcstandards.info/
[getusermedia-resolutions-3](https://webrtchacks.com/getusermedia-resolutions-3/)
https://www.blaccspot.com/blog/articles/webrtc-build-vs-buy/
http://webrtcbydralex.com/index.php/2016/03/01/testing-webrtc-ortc-js-apis-across-browsers/
https://bloggeek.me/webrtc-sfu-challenges/
https://webrtchacks.com/dear-slack/
https://twilioinc.wpengine.com/2016/03/chrome-vs-firefox-webrtc-stats-api-with-twilio-video.html

http://testrtc.com/different-multiparty-video-conferencing/
[The WebRTC browser lifecycle](https://medium.com/the-making-of-appear-in/the-webrtc-browser-lifecycle-cf816000a878#.jctjnptel)


http://webrtc-security.github.io/
Dave Michels
chris kranky
https://www.chriskranky.com
https://bloggeek.me/quality-webrtc-resources/
http://blog.csdn.net/nonmarking/article/category/5629755


http://www.cnblogs.com/lingyunhu/
https://github.com/webrtc/samples
https://github.com/muaz-khan/WebRTC-Experiment
https://www.chriskranky.com/





WebTransport(QUIC/HTTP3) + WebCodecs
region capture: https://region-capture-demo.glitch.me/
https://tinyurl.com/mse-in-workers-demo
https://github.com/wolenetz/mse-in-workers-demo/
Capture Handle: https://w3c.github.io/mediacapture-handle/identity/demos/remote_control/capturer.html

https://zhuanlan.zhihu.com/p/515375929
https://webrtchacks.com/sdp-anatomy/
https://www.bilibili.com/video/BV1Td4y167Sa/


navigator.mediaDevices.getUserMedia({
	audio: true,
	audio: { echoCancellation: true },
	video: true,
	video: { 
		width: 1280,  // {min: 1024, ideal: 1280, max: 1920,   exact: 1280}
		height: 720 
	},
	video: { facingMode: 'user' } // 优先取前置摄像头 
	video: { facingMode: { exact: 'environment'}} // 只要后置摄像头
	video: { 
		deviceId: '',
		deviceId: {exact: ''}
	},
	video: {frameRate: { ideal: 10, max: 15 }}
})
.then((stream) => {
	const video = document.querySelector('video');
  video.srcObject = stream;
  video.onloadedmetadata = () => {
    video.play();
  };
})
.catch((err) => {
	// NotFoundError
	// OverconstrainedError
	// NotAllowedError
	// AbortError
	// NotReadableError
	// TypeError //配置的constraint不合理, 或者在http环境调用这个接口
	// SecurityError
});


navigator.mediaDevices.enumerateDevices()
.then((devices) => {
  //MediaDeviceInfo
	//device.kind // videoinput audioinput audiooutput
	//device.label // 要授权后才有
	//device.deviceId //不同域下 id 值不一样? 清除cookie后会变
	//devkice.groupId // 音频和视频来自于同一个设备时 具有相同的  groupId
}).catch((err) => {})


const supportedConstraints = navigator.mediaDevices.getSupportedConstraints();
for (const constraint of Object.keys(supportedConstraints)) {
	console.log(constraint);
}


const videoTrack = stream.getVideoTracks()[0];
await videoTrack.applyConstraints(constraints)


MediaStream.active
MediaStream.id


navigator.mediaDevices.addEventListener('devicechange', event => {
    //新的设备加入 或者 设备移除
});




navigator.mediaDevices.getDisplayMedia({
	systemAudio: true // 默认提供的是共享的tab页的audio
})




// 发送端
const peerConnection = new RTCPeerConnection({
	iceServers: [{url: 'xx'}],
	bundlePolicy: 'balanced', //'max-compat', 'max-bundle',
	iceCandidatePoolSize: 0,
	iceTransportPolicy: 'all', //'relay'
	rtcpMuxPolicy: 'negotiate', //'require' 
});




const offer = await peerConnection.createOffer({
	iceRestart: false, //true
	voiceActivityDetection: true
});


await peerConnection.setLocalDescription(offer);
send({offer: offer})// 将 offer 发给远端
function onmessage(message) {
	if (message.answer) {
    const remoteDesc = new RTCSessionDescription(message.answer);
    await peerConnection.setRemoteDescription(remoteDesc);
  }
  if (message.iceCandidate) {
    try {
        await peerConnection.addIceCandidate(message.iceCandidate);
    } catch (e) {
        console.error('Error adding received ice candidate', e);
    }
  }
}
peerConnection.addEventListener('icecandidate', event => {
    if (event.candidate) {
        send({'new-ice-candidate': event.candidate});
    }
});
peerConnection.addEventListener('connectionstatechange', event => {
    if (peerConnection.connectionState === 'connected') {
        // Peers connected!
        localStream.getTracks().forEach(track => {
				    peerConnection.addTrack(track, localStream);
				});
    }
});
peerConnection.addEventListener('track', async (event) => {
    const [remoteStream] = event.streams;
    remoteVideo.srcObject = remoteStream;
});


//接收端
const peerConnection = new RTCPeerConnection({
	iceServers: [{url: 'xx'}]
});

function onmessage(message) {
	if (message.offer) {
    peerConnection.setRemoteDescription(new RTCSessionDescription(message.offer));
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);
    send({answer: answer})// 将 answer 发给远端
  }
}
