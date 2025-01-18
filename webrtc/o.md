[从前端工程师到高级AR工程师](https://zhuanlan.zhihu.com/p/30529860)
[WebVR开发教程——深度剖析](https://zhuanlan.zhihu.com/p/28324884)

### read
* [How Different WebRTC Multiparty Video Conferencing Technologies Look Like on the Wire](http://testrtc.com/different-multiparty-video-conferencing/)
* [Getting Started with WebRTC](http://www.html5rocks.com/en/tutorials/webrtc/basics/)
* [announcing-media-capture-functionality-in-microsoft-edge/](https://blogs.windows.com/msedgedev/2015/05/13/announcing-media-capture-functionality-in-microsoft-edge/)
* [Capturing Audio & Video in HTML5](http://www.html5rocks.com/en/tutorials/getusermedia/intro/)
*  [Web-Audio-Changes-in-m36](https://developers.google.com/web/updates/2014/07/Web-Audio-Changes-in-m36?hl=en)
*  [WebRTC in the real world: STUN, TURN and signaling](http://www.html5rocks.com/en/tutorials/webrtc/infrastructure/)
*  [WebRTC data channels](http://www.html5rocks.com/en/tutorials/webrtc/datachannels/) 
*  [webrtcstandards](https://webrtcstandards.info/)
* [bloggeek](https://bloggeek.me/)

###spec
* [Media Capture and Streams](http://w3c.github.io/mediacapture-main/getusermedia.html)
* [Web Real-Time Communications Working Group](https://www.w3.org/2011/04/webrtc/)
* [ebRTC Data Channel Protocol draft](https://tools.ietf.org/html/draft-jesup-rtcweb-data-protocol-01)
* [Javascript Session Establishment Protocol draft](https://tools.ietf.org/html/draft-uberti-rtcweb-jsep-02)
* [Security Architecture](http://www.ietf.org/proceedings/82/slides/rtcweb-13.pdf)



### company
Dialogic® PowerMedia™ XMS
jitsi.org
WebRTC PaaS Vendors as Twitter One-Liners
Peer5
Streamroot
Twilio
SaferMobility
Ziggeo
Fone.do
Tellybean
WIT Software
3CX
http://www.rtc.news/
http://www.nojitter.com/post/240171156/telemedicine--webrtc-enterprise-comms-missing-out
https://easyrtc.com/news/article/blue-dude-says-iot-can-play-with-webrtc
http://www.waterstechnology.com/waters/opinion/2441559/webrtc-a-comet-that-will-kill-off-trading-turret-dinosaurs
http://www.infoq.com/articles/webrtc-implementation-ideas?utm_campaign=infoq_content&utm_source=infoq&utm_medium=feed&utm_term=global

https://temasys.com
http://www.callstats.io/
https://ring.com/
http://www.um-labs.com/
https://www.voxbone.com
http://blog.vidyo.com/
http://www.sightcall.com/
https://opentokrtc.com/
http://bit6.com/

https://software.intel.com/en-us/webrtc-sdk
[webrtc开发者大会](http://www.cnblogs.com/lingyunhu/p/rtc42.html)




[A Developer’s Guide to Annotating WebRTC Video](http://www.oxagile.com/company/blog/a-developers-guide-to-annotating-webrtc-video/?utm_source=twitter&utm_medium=social&utm_campaign=video_annotating)





# Release
## M54
- Recording RTC Event Logs for multiple PeerConnections simultaneously
- Upgrade to Opus 1.1.3
- New screen share picker UI (Tab sharing)
- Setting UDP port ranges


# tmp
[webrtcstats](http://webrtcstats.com/)








https://www.jianshu.com/p/5bf3bd5a1075
https://zhuanlan.zhihu.com/p/609950122
https://fippo.github.io/webrtc-dump-importer/


1. UDP
1.1  STUN: 从包头的第一个字节 < 2
1.2  DTLS(UDP的TLS): 从包头的第一个字节 > 19 并且 < 64 
1.2.1 用于 Datachannel 的加密, 和 SRTP 的协商阶段(通过 DTLS 协商出加密密钥之后，RTP 也需要升级为 SRTP)
1.2.2 通信的双方有 Client 和 Server 之分, 通过SDP中的 a=setup 来区分
1.3  RTP(RTCP, SRTP, SRTCP):  从包头的第一个字节 > 127 并且 < 192





# SDP
// SDP = 一个会话级描述 + 多个媒体级描述

v=0 //当前规范版本为0, 会话级

o=<username> <sess-id> <sess-version> <nettype> <addrtype> <unicast-address>
// o=- 6374322312345551840 2 IN IP4 127.0.0.1\r\n
// 会话的发起者, 会话级
username: 会话发起者的名称。如果不提供则用"-"表示，用户名不能包含空格
sess-id: 主叫方的会话标识符
sess-version: 主叫方的会话标识符
nettype: 网络类型。IN表示Internet网络类型，目前仅定义该网络类型
addrtype: 地址类型。目前支持IPV4和IPV6两种地址类型
unicast-address: 会话发起者的IP地址

s=<session name>
// s=-\r\n
// 会话级	
session name: 本次会话的标题或会话的名称, 如果不提供则用"-"表示


c=<nettype> <addrtype> <connection-address>
// 会话级 也可以是 媒体级
nettype: 网络类型。IN表示Internet网络类型，目前仅定义该网络类型
addrtype: 目前支持IPV4和IPV6两种地址类型
connection-address: 会话发起者的IP地址


t=<start-time> <stop-time>
// t=0 0\r\n
// 会话级	
start-time: 会话的起始时间
stop-time: 会话的结束时间


m=<media> <port>/<number of ports> <proto> <fmt> ...
// 媒体级
media: 媒体名称(audio/video)	
port: 流传输端口号, 对于webrtc而言由于它不适用SDP中描述的网络信息，所以该端口号对它没任何意义	
proto: 流传输协议
       RTP/SAVPF //表示用UDP传输RTP包
       TCP/RTP/SAVPF //表示用TCP传输RTP包
       UDP/TLS/RTP/SAVPF // 表示用UDP来传输RTP包，并使用TLS加密
       //AVP(audio video profile), AVPF(audio video profile feedback), SAVPF(safe audio video profile feedback)   
fmt: 媒体格式描述, 根据 proto 的不同，fmt 的含义也不同。⽐如 proto 为RTP/SAVP 时，fmt 表示 RTP payload 的类型。如果有多个，表示在这次会话中，多种payload类型可能会⽤到，且第⼀个为默认的payload类型。
对于RTP/SAVP，payload type又分为两种类型：静态类型 动态类型(在a=fmtp/rtpmap中定义)




## a=<attribute> | <attribute>:<value>
// attribute: 分为会话级属性和媒体级属性, 
// 会话级属性：添加在第一个媒体描述之前，传达的信息适用于整个会议而不是单个媒体
// 会话级 也可以是 媒体级

a=group:BUNDLE audio video
// 通过mid标识符把多个媒体属性连接起来, 定义了这一行就是公用一个传输通道传输媒体，
// 如果没有这一行，音视频数据就会分别单独使用一个udp端口传输
// 其中 audio 和 video 有a=mid:xx来定义, 比如 a=mid:0 和 a=mid: 1,  a=group:BUNDLE 0 1 就表示 0 和 1 号的媒体用一个端口发送

a=msid-semantic: WMS ma
// 表示是webrtc媒体流（Webrtc Media Streams）


a=mid:audio

a=ssrc-group:FID 3004200836 146948263	
SSRC（146948263）是SSRC（3004200836）的重传流。也就说3004200836是真正代表视频的SSRC，而146948263是视频流3004200836丢包时使用的SSRC，也就是为什么在同一个视频描述中有两个SSRC

a=ssrc:3004200836 cname:hO7txeyp3DC4HQ6j

a=setup:active
setup:active  //在dtls协商过程中 作为 client，主动发起协商  
setup:passive //在dtls协商过程中 作为 sever，等待发起协商 
setup:actpass //在dtls协商过程中 作为 client，主动发起协商。作为 server，等待发起协商


a=rtpmap:<payload type> <endcoding name>/<clock rate>/[/<encodingparameters>]
// a=rtpmap:111 opus/48000/2
payload type: 111
endcoding name: opus
时钟频率即采样率(clock rate): 48000
音频通道数(encodingparameters): 2



a=fmtp:<format> <format specific parameters>
// a=fmtp:111 minptime=10;useinbandfec=1
类型为111的数据
以10ms长的音频为一帧
数据是经FEC编码的
//a=fmtp:123 level-asymmetry-allowed=1;packetization-mode=1;profile-level-id=64001f
level-asymmetry-allowed=1指明通信双方使用的H264Level是否要保持一致，0必须一致，1可以不一致
packetization-mode指明经H264编码后的视频数据如何打包：0单包、1非交错包、2交错包
profile-level-id由三部分组成，即profile_idc、profile_iop以及level_idc，每个组成占8位，因此可以推测出profile_idc=64、profile_iop=00、level-idc=1f

a=rtpmap:96 VP8/90000
payload值为96表示媒体数据使用的编码器是VP8，其时钟频率为90000。又因为其排在m=列表的第一位所以它是视频的默认编码器。


a=rtpmap:97 rtx/90000
a=fmtp:97 apt=96
// payload值为97, rtx表示丢包重传, 结合 a=fmtp:97 apt=96 一起看,  当webrtc使用媒体类型是96时如果出现丢包需要重传，重传数据包类型为97

a=rtpmap:114 red/90000，red是一种在webrtc中使用的FEC（引入前向纠错）算法，用于防止丢包



a=candidate:0 1 udp 2130706431 116.62.127.81 8000 typ host generation 0

a=rtcp-mux
// 表示 Sender 使用一个传输通道（单一端口）发送 RTP 和 RTCP


## PlanB VS UnifiedPlan
PlanB：只有两个媒体描述，即音频媒体描述（m=audio…）和视频媒体描述（m=video…）。如果要传输多路视频，则他们在视频媒体描述中需要通过SSRC来区分
UnifiedPlan: 可以有多个媒体描述，因此对于多路视频，将其拆成多个视频媒体描述即可

//PlanB
m=audio...
a=ssrc:11223344
m=video ...
a=ssrc:22223333 cname:video1
a=ssrc:33334444 cname:video2

//UnifiedPlan
m=audio...
a=ssrc:11223344
m=video..
a=ssrc:22223333 cname:video1
m=video..
a=ssrc:33334444 cname:video2
// 也就是说在 UnifiedPlan 中每一路视频都可以有自己的 m= 描述