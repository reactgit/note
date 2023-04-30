chrome://webrtc-internals 

### list
* [webrtchacks](https://webrtchacks.com/)
* [webrtcweekly](https://webrtcweekly.com/)

## key
 * need STUN and TURN servers to help establishing the connection and cope with NATs and firewalls
 * For signaling: to enable the exchange of media(resolution and codecs) and network metadata to bootstrap a peer connection(report errors and initiate or close sessions)
 * To cope with NATs and firewalls: by using the ICE framework to establish the best possible network path between peers, by working with STUN servers (to ascertain a publicly accessible IP and port for each peer) and TURN servers (if direct connection fails and data relaying is required)
 
###RTCPeerConnection
* audio or video calling, with facilities for encryption and bandwidth management

### why RTCDataChannel
 * WebSocket is bidirectional, but all these technologies are designed for communication to or from a server
 * RTCDataChannel works with the RTCPeerConnection API, which enables peer to peer connectivity. This can result in lower latency: no intermediary server, fewer 'hops'
 * RTCDataChannel uses Stream Control Transmission Protocol (SCTP), allowing configurable delivery semantics: out-of-order delivery and retransmit configuration
 * RTCDataChannel supports strings as well as some of the binary types in JavaScript such as Blob, ArrayBuffer and ArrayBufferView
 * RTCDataChannel can work in either unreliable mode(UDP)  or reliable mode(TCP)
 * Encryption is mandatory for all WebRTC components. With RTCDataChannel all data is secured with Datagram Transport Layer Security (DTLS)

### 通话的信令服务器(Signaling Server)
1. 用来控制通信发起或者结束的连接控制消息
2. 发生错误时用来相互通告的消息
3. 各自一方媒体流元数据，比如像解码器、解码器的配置、带宽、媒体类型等等
4. 两两之间用来建立安全连接的关键数据
5. 外界所能看到的网络上的数据，比如广域网IP地址、端口等﻿



##WebRTC applications need to do several things:

Get streaming audio, video or other data.
Get network information such as IP addresses and ports, and exchange this with other WebRTC clients (known as peers) to enable connection, even through NATs and firewalls.
Coordinate signaling communication to report errors and initiate or close sessions.
Exchange information about media and client capability, such as resolution and codecs.
Communicate streaming audio, video or data.
##To acquire and communicate streaming data, WebRTC implements the following APIs:

MediaStream: get access to data streams, such as from the user's camera and microphone.
RTCPeerConnection: audio or video calling, with facilities for encryption and bandwidth management.
RTCDataChannel: peer-to-peer communication of generic data.

##Signaling is used to exchange three types of information:

Session control messages: to initialize or close communication and report errors.
Network configuration: to the outside world, what's my computer's IP address and port?
Media capabilities: what codecs and resolutions can be handled by my browser and the browser it wants to communicate with?





###  the WebRTC protocols and its security model do not lend it to compliant enterprise use
- WebRTC implements a number of different protocols, while these include SIP which is widely implemented in commercial VoIP and UC products; the WebRTC implementation is not directly compatible with the SIP implementations in those commercial products.
- The security in WebRTC prevents call recording for compliance and legal intercept. This means that WebRTC cannot be used where compliance regulations comply.
- WebRTC does not mandate the use of authentication; calls may be made without identifying or authenticating the user. This makes it difficult to link WebRTC with corporate user databases or to use it where there is a requirement to authenticate users before providing access to communication services.

it’s a set of Javascript APIs not suited for Javascript developers, Web developers getting into WebRTC need to understand multidisciplinary concepts that are often out of their grasp: Codecs, gateways, signaling frameworks, STUN/TURN/ICE servers, mobile SDKs, and much more







### trivial
 Since version M25, Chromium-based browsers (Chrome and Opera) allow audio data from getUserMedia to be passed to an audio or video element (but note that by default the media element will be muted in this case).

[What Developers Should Know About ORTC Versus WebRTC](http://www.programmableweb.com/news/what-developers-should-know-about-ortc-versus-webrtc/analysis/2015/10/12)
https://github.com/openpeer/ortc-node
https://github.com/openpeer/ortc-js-shim
微软为揭示现有WebRTC存在的不足，进而推动其不断向前发展，提出了WebRTC的另一种形式，即CU-RTC-Web([Customizable, Ubiquitous Real Time Communication over the Web](http://html5labs.interoperabilitybridges.com/cu-rtc-web/cu-rtc-web.htm))
[ORTC以及WebRTC的未来](http://www.infoq.com/cn/news/2014/08/ortc-webrtc)








