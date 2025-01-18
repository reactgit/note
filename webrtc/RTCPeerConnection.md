[WebRTC RTCPeerConnection. One to rule them all, or one per stream](https://bloggeek.me/webrtc-rtcpeerconnection-one-per-stream/)

### 同一个域名下 RTCPeerConnection 的数量有限制吗, 可以多个 stream 在一个 connection 上发送吗
1. 大概 256 个吧
2. 如果多个stream 复用一个 connection,  缺点就是如果有设备的增减 那么所有的都需要重新协商
3. 如果一个 stream 用一个 connection, 有点是独立 灵活, 缺点是每个 RTCPeerConnection 都需要自己的 NAT 配置
### 中心服务器会创建多个 RTCPeerConnection 还是只创建一个 RTCPeerConnection
都可以
### 为什么需要每个流一个RTCPeerConnection
1. 每个连接都有自己的信令状态和ICE状态。信令状态用于协商和建立连接，而ICE状态用于确定在两个对等方之间建立连接的最佳方式
2. 每个连接只能发送/接收一种类型的媒体。例如，如果要同时发送音频和视频，则需要两个单独的连接，一个用于音频，另一个用于视频。//??


```
var pc = new RTCPeerConnection({//RTCConfiguration
  iceServers: [{//RTCIceServer
    urls: "url"/ ["url"],
    username: '', credential: "", credentialType: "password"/"oauth"
  }],
  iceTransportPolicy: "all"/"relay",
  bundlePolicy: "balanced"/"max-compat"/"max-bundle",
  rtcpMuxPolicy: "require"/"negotiate",
  peerIdentity: "",
  certificates: [{expires: ""}]
}) 
```

bundlePolicy:
[sdp-bundle](https://webrtcstandards.info/sdp-bundle/)
[BundlePolicy](https://groups.google.com/forum/#!topic/discuss-webrtc/FDvrOitgPZQ)
// 如果  remote endpoint is BUNDLE-aware 那么所有的 track 和 data channels都复用一个传输通道, 即使指定了 bundlePolicy
// Balanced: 多路音频轨 多路视频轨 和 datachannel分别使用一个传输通道, 每个通道都会创建证书。
// max-compat: 每一个轨(track)都有自己的通道。等到Balanced策略不成功的时候，就使用max-compat这种方式。
// max-bundle: 就是最大化的使用一个绑定，那就是将所有的这些这个媒体的这个流都用一个这个通道进行传输。这是webrtc建议的方式，这样的话对于底层来说就比较简单了，而且你建立这个连接之后，只需要一个证书，而不需要一堆证书，否则的话，你每一个连接都需要一个证书，就会非常的耗费时间。

iceCandidatePoolSize: 0
// 最多获取多少个 candidate



## RTCRtcpMuxPolicy
RTCP和RTCP要端口复用
- negotiate, 如果对方不支持就不复用, 分开
- require, 如果对方不支持就失败

## iceTransportPolicy
- relay, 只考虑通过 turn 转发的 candidate 
- public, 只考虑有公网ip的candidate, 该选项已被废弃
- all

## peerIdentity
默认为 null, 如果设置了 就需要对方用设置的值进行认证 只有认证过了才会链接


# RTCOfferAnswerOptions 

```
{
    boolean: voiceActivityDetection: true // 如果检测出来只有噪音 就丢弃噪音 也就是静音
}
```

# RTCOfferOptions

```
{
    boolean: iceRestart: false
}

const offer = await peerConnection.createOffer({
  iceRestart: false, //true
  voiceActivityDetection: true
});

```
// iceRestart为true的好处
1. 就是当我们使用手机的时候从4G换成wifi，或者从wifi换成4G的时候，实际它的链路已经发生了变化，就是说我们的IP地址和出口都发生了变化，这时我们应该重新进行链路选择
2. 就是说我们的传输网络是动态变化的（与数据流量的多少，是否有人抢占带宽等等都是有关的），当我们最开始选择的线路，是比较高效的，连通性比较好。但是过了一端时间后，由于某种原因产生拥塞，这时如果有其他更好的通路的话，我们有必要重新选择一条路
3. 就是比如说我们在服务器端增加了新的中继节点 （TURN服务），比如我们又增加了三个TURN服务，需要将这些TURN服务增加到连接的配置服务中去，那这个时候也应该重新启动ICE让它重新选路
// 当有以上场景的变化的时候就可以触发重新选路，自动的去帮我们去选择新的有效的数据传输的线路，这是一个非常好的机制


# RTCAnswerOptions
```
{}
```

# RTCPeerConnection
https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection
```
var pc = new RTCPeerConnection(RTCConfiguration)
// 当调用 setLocalDescription, 浏览器就会开始采集 candidate, 然后通过信令服务器将candidate发送给对方, 当收到对方的candidate后 通过 pc.addIceCandidate(candidate), 添加后浏览器就会根据 ICE 服务器测试这些 candidate 的联通性, 选一个联通性最好的. 也可以等所有的 candidate都采集完了一起发给对方.
// 通过信令服务器交互 createOffer 和 createAnswer 产生的 sdp 这样双方就知道对方的 音视频能力




pc.createOffer({
  iceRestart: false/true,
  voiceActivityDetection: true/false
}).then((offer) => {
  pc.setLocalDescription(offer)
  sendSDPToRemotePeer(offer)
});
onReceiveRemotePeerSDP(answer) {// 发送端
  pc.setRemoteDescription(answer);
}

onReceiveRemotePeerSDP(offer) {// 接收端
  pc.setRemoteDescription(offer);
  pc.createAnswer({}).then((answer) => {
    pc.setLocalDescription(answer)
    sendSDPToRemotePeer(answer)
  })
}



const localStream = await getUserMedia({vide: true, audio: true});
localStream.getTracks().forEach(track => {
    pc.addTrack(track, localStream);
});
pc.addEventListener('track', async (event) => {
    const [remoteStream] = event.streams;
    remoteVideo.srcObject = remoteStream;
});

pc.onicegatheringstatechange = (ev) => {
  let connection = ev.target;
  connection.iceGatheringState:
  new: 刚刚创建，还没有开始收集ICE候选者信息
  gathering: 正在收集ICE候选者信息 
  complete
}
// 本地产生了一个 candidate
pc.onicecandidate = (event) => {
  if (event.candidate) {
    sendCandidateToRemotePeer(event.candidate)
  } else {
    /* there are no more candidates coming during this negotiation */
  }
}
onReceiveRemotePeerCandidate(candidate) {
  pc.addIceCandidate(candidate)
}
pc.oniceconnectionstatechange = () => {
  //pc.iceConnectionState: new, checking, connected, completed
  // 有可能没有 connected
}


pc.onsignalingstatechange = () => {
  pc.signalingState: 
    stable: 要么是刚刚创建，还没有开始SDP交换；要么是协商已经完成，连接成功建立
    have-local-offer  //已经调用 SetLocalDescription 
    have-remote-offer //已经调用 SetRemoteDescription
    have-remote-pranswer //已经调用 SetRemoteDescription
    close
}

pc.onconnectionstatechange = () => {
  if (pc.connectionState === 'connected') {
        // Peers connected!
  }
}

pc.onnegotiationneeded = () => { // 当需要重新协商时，例如添加或移除媒体流、改变编解码器等，pc 会触发此事件。
   pc.createOffer().then((offer) =>     pc.setLocalDescription(offer))
  .then(() => sendSignalingMessage({
    type: "video-offer",
    sdp: pc.localDescription
  }))
  .catch((err) => {});
}


pc.onicecandidateerror = function


const dataChannel = pc.createDataChannel();
pc.ondatachannel = (event) => {
  const dataChannel = event.channel;
} 
dataChannel.onopen = () => {
}
dataChannel.onclose = () => {
}
dataChannel.send();
dataChannel.onmessage = (event) => {
  //event.data
}






pc.getDefaultIceServers()
pc.getConfiguration()
pc.setConfiguration(RTCConfiguration)
pc.addIceCandidate(candidate)
pc.close()
pc.setIdentityProvider(domainname [, protocol] [, username])
pc.restartIce()
pc.removeTrack(sender)
pc.getTransceivers()
pc.getStats(selector)
pc.getSenders()
pc.getReceivers()
pc.getIdentityAssertion()
pc.createDataChannel(label, {ordered: true/false, maxPacketLifeTime: null, maxRetransmits: null, protocol: "", negotiated: false/true, id: 0})
pc.addTrack(track[, stream])

RTCPeerConnection.generateCertificate(keygenAlgorithm)

pc.localDescription
pc.pendingLocalDescription
pc.currentLocalDescription
pc.remoteDescription
pc.currentRemoteDescription
pc.pendingRemoteDescription

pc.signalingState
pc.iceGatheringState
pc.iceConnectionState
pc.connectionState
pc.canTrickleIceCandidates
pc.sctp
pc.peerIdentity
```
### canTrickleIceCandidates
当  pc.setRemoteDescription(remoteOffer) 后 如果 pc.canTrickleIceCandidates 为true, 则不需要创建answer给peer, 而是在每个 icecandidate 创建时 将 candidate 发送给peer


## candidate
type: 
  host: 能够直连的ip地址(比如在同一个内网)
  srflx: 通过stun服务器获取的 (nat转换)的地址
  prflx: 在联通测试中从对端数据报文中获取到的地址
  relay: 需要turn中转的地址


```
MediaStream.onremovetrack
```

## RTCSessionDescription

```
{
    RTCSdpType type;
    DOMString  sdp;
    serializer = {attribute};
}
```

### RTCSdpType

- offer
- pranswer
- answer
- rollback

## RTCSignalingState

- stable
- have-local-offer
- have-remote-offer
- have-local-pranswer
- have-remote-pranswer
[rtcsignalingstate-stable](https://www.w3.org/TR/webrtc/#dom-rtcsignalingstate-stable)

## RTCIceGatheringState

- new
- gathering
- complete

## RTCPeerConnectionState

- new
- connecting
- connected
- disconnected
- failed
- closed

## RTCIceConnectionState

- new
- checking
- connected
- completed
- failed
- disconnected
- closed


https://bloggeek.me/blog/
https://webrtccourse.com/course/webrtc-codelab/module/fiddle-of-the-month/lesson/ice-candidate-gathering/