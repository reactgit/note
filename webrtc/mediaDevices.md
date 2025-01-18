# mediaDevices
https://developer.mozilla.org/zh-CN/docs/Web/API/MediaDevices

## event
```

navigator.mediaDevices.addEventListener('devicechange', function(event) {
// 通过 MediaDevices.enumerateDevices 重新获取列表
});
```

## MediaDevices.enumerateDevices
```
navigator.mediaDevices.enumerateDevices().then(function(devices) {
  devices.forEach(function(device: MediaDeviceInfo) {
    console.log(device.kind, device.label, device.deviceId, device.groupId);
  });
}).catch(function(err) {
  console.log(err.name + ": " + err.message);
});
```

## MediaDeviceInfo
### deviceId
 清空cookie 或者 隐私环境下 deviceId 的值会变
### groupId
  同一个硬件上的摄像头和麦克风有相同的 groupId
### kind
 videoinput, audioinput, audiooutput
### label
  只有被授权访问后才会有值
 
 
## mediaDevices.getUserMedia
```
navigator.mediaDevices.getUserMedia({//MediaStreamConstraints
  audio: true/false/{//MediaTrackConstraints
    deviceId: 'id'/['ids']/{exact: 'id'/['ids'], ideal: 'id'/['ids']},
    groupId: 'id'/['ids']/{exact: 'id'/['ids'], ideal: 'id'/['ids']},
    
    autoGainControl: true/false/{exact: true/false, ideal: true/false},
    channelCount: 1/{exact: 1, ideal: 1, max: 1, min: 1},
    echoCancellation: true/false/{exact: true/false, ideal: true/false},
    latency: 1/{exact: 1.1, ideal: 1.1},
    noiseSuppression: true/false/{exact: true/false, ideal: true/false},
    sampleRate: 1/{exact: 1, ideal: 1, max: 1, min: 1},
    sampleSize:1/{exact: 1, ideal: 1, max: 1, min: 1},
    volume: 1/{exact: 1.1, ideal: 1.1}
  },
  
  video: true/false/{//MediaTrackConstraints
    deviceId: 'id'/['ids']/{exact: 'id'/['ids'], ideal: 'id'/['ids']},
    groupId: 'id'/['ids']/{exact: 'id'/['ids'], ideal: 'id'/['ids']},
    
    aspectRatio: 1/{exact: 1.1, ideal: 1.1},
    facingMode: 'user'/'environment'/'left'/'right'/['']/{
      exact: ''/[''], ideal: ''/['']},
    frameRate: 1/{ exact: 1.1, ideal: 1.1},
    height: 1/{ exact: 1, ideal: 1, max: 1, min: 1},
    width: 1/{ exact: 1, ideal: 1, max: 1, min: 1},
    resizeMode: 'none'/'crop-and-scale'/['']/{
      exact: ''/[''], ideal: ''/['']}
  }
})
// backgroundBlur, brightness, colorTemperature, contrast, exposureCompensation, exposureMode, exposureTime, focusDistance, focusMode, iso, pan, pointsOfInterest, saturation, sharpness, tilt, torch, whiteBalanceMode, zoom
```
### autoGainControl
可以使音量控制在一个稳定的水平

## mediaDevices.getDisplayMedia
https://developer.mozilla.org/zh-CN/docs/Web/API/Screen_Capture_API

```
navigator.mediaDevices.getDisplayMedia({
  displaySurface: 'browser'/'monitor'/'window', // 没有 application 了?
  // cursor: 'always'/'motion'/'never', // 没有 cursor 了?
  logicalSurface: true/false,
  suppressLocalAudioPlayback: flase/true, //当tab被captured了, 本地扬声器是否还继续播放
})
```

## MediaDevices.getSupportedConstraints
```
var supportedConstraints = navigator.mediaDevices.getSupportedConstraints();
```

## mediaDevices.selectAudioOutput
```
navigator.mediaDevices.selectAudioOutput()
.then((device) => {}).catch((err) => {});
```


