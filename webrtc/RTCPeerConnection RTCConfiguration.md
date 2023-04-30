[WebRTC RTCPeerConnection. One to rule them all, or one per stream](https://bloggeek.me/webrtc-rtcpeerconnection-one-per-stream/)

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

[sdp-bundle](https://webrtcstandards.info/sdp-bundle/)
[BundlePolicy](https://groups.google.com/forum/#!topic/discuss-webrtc/FDvrOitgPZQ)

## RTCRtcpMuxPolicy
RTCP和RTCP要端口复用
- negotiate, 如果对方不支持就不复用, 分开
- require, 如果对方不支持就失败



# RTCOfferAnswerOptions 

```
{
    boolean: voiceActivityDetection: true
}
```

# RTCOfferOptions

```
{
    boolean: iceRestart: false
}
```

# RTCAnswerOptions
```
{}
```

# RTCPeerConnection
https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection
```
var pc = new RTCPeerConnection(RTCConfiguration)

// 本地产生了一个 candidate
pc.onicecandidate = (event) => {
  if (event.candidate) {
    sendCandidateToRemotePeer(event.candidate)
  } else {
    /* there are no more candidates coming during this negotiation */
  }
}
pc.ontrack = (e) => {
  //e.streams
}
pc.onnegotiationneeded = () => {
   pc.createOffer().then((offer) =>     pc.setLocalDescription(offer))
  .then(() => sendSignalingMessage({
    type: "video-offer",
    sdp: pc.localDescription
  }))
  .catch((err) => {});
}

pc.oniceconnectionstatechange = () => {
  //pc.iceConnectionState: new, checking, connected, completed
  // 有可能没有 connected
}
pc.onicegatheringstatechange = (ev) => {
  let connection = ev.target;
  connection.iceGatheringState:
  new: 刚刚创建，还没有开始收集ICE候选者信息
  gathering: 正在收集ICE候选者信息 
  complete
}
pc.onsignalingstatechange = () => {
  pc.signalingState: 
    stable: 要么是刚刚创建，还没有开始SDP交换；要么是协商已经完成，连接成功建立
    have-local-offer  //已经调用 SetLocalDescription 
    have-remote-offer //已经调用 SetRemoteDescription
    have-local-pranswer //已经调用 SetLocalDescription 
    have-remote-pranswer //已经调用 SetRemoteDescription
    close
}

pc.onicecandidateerror = function
pc.onconnectionstatechange = function
pc.ondatachannel = function 

pc.createOffer({
  iceRestart: false/true,
  voiceActivityDetection: true/false
}).then((offer) => {
  pc.setLocalDescription(offer)
  //pc.setRemoteDescription(answer)
})

pc.createAnswer({}).then((answer) => {
  pc.setLocalDescription(answer)
  //pc.setRemoteDescription(offer)
})



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