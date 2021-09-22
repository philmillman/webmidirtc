
window.startCall = function () {
  window.callFrame = window.DailyIframe.createFrame({
    showLeaveButton: true
  });
  window.callFrame.join({ url: 'https://dailyphil.daily.co/hello' });
}

window.endCall = function () {
  window.callFrame.leave();
  window.callFrame.destroy();
}

