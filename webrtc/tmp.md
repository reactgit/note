- remove some nonstandard uses of RTCPeerConnection legacy methods.(c50)
- RTCPeerConnection promise-based methods(c51l f, e, s)
- WebRTC: Storing RTCCertificate in IndexedDB(c52, f)

- H.264 software encoder/decoder in Chrome for WebRTC(c52, f, e)
- Promise-based getUserMedia(c53, f, e)
- Media Source EventHandler attributes(c53, e)
- MediaStreamTrack constraints API(c53, f, e)
- remove: MediaStream ended event and onended attribute(c54)
- MediaStreamTrackEvent constructor(c55, f, e)
- MediaStream constructor(c55, f, e)
- Intervention: Web Audio user gesture requirement on cross origin iframes on Android(c55, f, s)
- EME: onwaitingforkey, onkeystatuseschange, & onmessage event handler attributes(c55, f, e)
- remove MediaStreamTrack.getSources()(c56)
- remove: Web MIDI MIDIMessageEvent.receivedTime deprecation(c56)
- Remote Playback API(c56, s)
- Rename RTCIceCandidateEvent to RTCPeerConnectionIceEvent and expose(c56, f)
- RTCConfiguration iceTransportPolicy member(c56, f)
- RTCPeerConnection unprefixed interface(c56, f, e)
- OPUS codec support in WebAudio's decodeAudioData() API(c56, f, e)
- FLAC codec support for <audio> and WebAudio(c56, f)
- Fullscreen Media Orientation(c57)
- RTCDataChannelEvent constructor(57, f)
- Remove MediaRecorder |ignoreMutedMedia|(c57)
- MediaDevices devicechange event(c57, f, e)
- Add |timecode| to MediaRecorder's BlobEvent(c57, f)
- remove: Remove EME from Unsecure Contexts(c58)
- remove: WebAudio: Remove AudioSourceNode interface(c58)
- Make navigator.requestMediaKeySystemAccess() spec compliant(c58)
- Native media controls customization(c58,)
- RTCPeerConnection.setConfiguration(c58, f)
- RTCPeerConnection.getStats(c58, f, e)
- Partial RTCRtpReceiver and RTCRtpContributingSource support(c59, f, e)
- RTCConfiguration.iceCandidatePoolSize(c59, f, e, s)
- RTCPeerConnection.onicegatheringstatechange(c59, f, e)
- New VP9 codec string and Profile 2 support(c60, e)
- Support VP9 in ISO-BMFF(c60)
- MediaStream Image Capture - getPhotoSettings() method(c61, f)
- MediaStreamTrack.getSettings()(c61, f)
- RTCCertificate.getFingerprints()(c61, f)
- remove: RTCPeerConnection.getStreamById(c62)
- Support FLAC in ISO-BMFF with MSE(c62)
- MediaStreamTrack.applyConstraints(c63, f, e, s)
- RTCRtpSender(c64, f)
- RTCRtpSender: dtmf attribute(c66, f)
- RTCRtpSender/RTCRtpReceiver.getStats and RTCPeerConnection.getStats(MediaStreamTrack?)(c67, f)

###o
- Since version M25, Chromium-based browsers (Chrome and Opera) allow audio data from getUserMedia to be passed to an audio or video element (but note that by default the media element will be muted in this case)
- getUserMedia constraints set in one browser tab affect constraints for all tabs opened subsequently
- The expression 'finding candidates' refers to the process of finding network interfaces and ports using the ICE framework
- RTCPeerConnection won't start gathering candidates until setLocalDescription() is called
- RTCRtpSender and RTCRtpReceiver extensions to RTCPeerConnection(c65, f)
- RTCRtpSender.replaceTrack(c65, f)


```
getUserMedia.catch(function(error) {
  if (error.name === 'ConstraintNotSatisfiedError') {
    errorMsg('The resolution ' + constraints.video.width.exact + 'x' +
        constraints.video.width.exact + ' px is not supported by your device.');
  } else if (error.name === 'PermissionDeniedError') {
    errorMsg('Permissions have not been granted to use your camera and ' +
      'microphone, you need to allow the page access to your devices in ' +
      'order for the demo to work.');
  }
  errorMsg('getUserMedia error: ' + error.name, error);
});

```

interop 
getStats


### article
[WebRTC tips & tricks, tutorials](http://muaz-khan.blogspot.com)
[WebRTC interoperability tests](https://github.com/fippo/testbed)
[bandwidth](https://github.com/webrtc/samples/blob/gh-pages/src/content/peerconnection/bandwidth/js/main.js)

[stackoverflow](http://stackoverflow.com/questions/tagged/webrtc)
[google groups](https://groups.google.com/forum/?fromgroups#!forum/discuss-webrtc)
[Working around WebRTC bugs](https://medium.com/the-making-of-appear-in/working-around-webrtc-bugs-d4f6fdb763f#.33ccb1kf1)
[know-where-to-turn-when-deploying-webrtc](http://www.nojitter.com/post/240171717/know-where-to-turn-when-deploying-webrtc)
[How WebRTC Is Transforming The Online Experience](http://blog.hbcommunications.com/how-webrtc-is-transforming-the-online-experience)
https://hpbn.co/webrtc/
http://www.cnblogs.com/lingyunhu/category/626157.html
https://github.com/otalk/hark
[WebRTC @5](https://groups.google.com/forum/#!topic/discuss-webrtc/I0GqzwfKJfQ)
[codelabs](https://codelabs.developers.google.com/codelabs/webrtc-web/#0)
[Understand WebRTC basics to maximize deployment and adoption](http://searchunifiedcommunications.techtarget.com/essentialguide/Understand-WebRTC-basics-to-maximize-deployment-and-adoption#guideSection1)