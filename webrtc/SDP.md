# SDP
https://www.ietf.org/archive/id/draft-nandakumar-rtcweb-sdp-08.txt
SDP描述由许多文本行组成，文本行的格式为<类型>=<值>，<类型>是一个字母，<值>是结构化的文本串，其格式依<类型>而定

### version
v=0 //协议版本

### Origin
o=- 7614219274584779017 2 IN IP4 127.0.0.1 //前面的-应该表示没有用户名
o=`<username> <session id> <version> <network type> <address type><address>`
username=-
session id=7614219274584779017
version=2
network type=IN
address type=IP4
address=127.0.0.1

### Session Name
s=`<session name>`

i=`<session description>`

### Times, Repeat Times and Time Zones
t=`<start time>  <stop time>` //描述该会议的开始和结束时间，如果该会议在多个不规则的时间间隔内激活，可以使用多行t.如果时间间隔为规则的，可以使用"r="重复定义
`<start time>`: 开始时间，以秒表示的NTP时间，开始结束时间都为0时被认为时永久的会议
`<stop time>`: 结束时间，以秒表示的NTP时间，结束时间为0时，该会议直到过了开始时间才开始

r=`<repeat interval>` `<active duration>` `<list of offsets from start-time>`
`<repeat interval>`：重复间隔
`<active duration>`：持续时间
`<list of offsets from start-time>`：相对开始时间的偏移

### Attributes
 a=`<attribute>`
 a=`<attribute>`:`<value>`
 
 ```
 a=cat:<category> //根据分类接收者隔离相应的会话
 a=keywds:<keywords> //根据关键字隔离相应的会话
 a=tool: <name and version of tool> //创建任务描述的工具的名称及版本号
 a=ptime:<packet time> //在一个包里面的以毫秒为单位的媒体长度
 a=maxptime:<maximum packet time> //以毫秒为单位，能够压缩进一个包的媒体量
 a=rtpmap:<payload type> <encoding name>/<clock rate> [/<encoding parameters>]
 a=recvonly //sendrecv sendonly
 a=inactive
 a=orient:portrait //landscape seascape
 a=type:<conference type> //broadcast meeting moderated test H332
 a=charset:<character set>
 a=sdplang:<language tag> //指定会话或者是媒体级别使用的语言
 a=framerate:<frame rate> //设置最大视频帧速率
 a=quality:<quality> //值是0-10
 a=fmtp:<format> <format specific parameters>
 ```


### Media Announcements
m=`<media>` `<port>` `<transport>` `<fmt list>`
`<media>`:媒体类型, 包括audio/video/application/data/control
