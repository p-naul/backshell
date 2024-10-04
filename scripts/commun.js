client.init(uid, { autostart: 1, autospin: 0, success: success, error: error });
// Camera logs
// const cameraData = {
//   "useCameraConstraints": true,
//   "usePanConstraints": false,
//   "useZoomConstraints": true,
//   "usePitchConstraints": true,
//   "useYawConstraints": false,
//   "zoomIn": 50,
//   "zoomOut": 1500,
  // rotations horizontales et verticales
  // "left": -3.1416,
  // "right": 3.1416,
  // "up": 1.57,
  // "down": 0.1,
// };
// var annotInitiale = [];

function move(ID, TX, TY, TZ) {
  api.getMatrix(ID, function(err, matrix) {
    // window.console.log('matrix', matrix);
    matrix.local[12]=TX/1000;
    matrix.local[13]=TZ/1000;
    matrix.local[14]=TY/1000;
    matrice = matrix.local;
    // window.console.log('matrix', matrice);
    api.setMatrix(ID, matrice, function(err, matrix) {
    });
  });
}

function scale(ID, SX, SY, SZ) { //2=Y, 5=Z, 8=X
  api.getMatrix(ID, function(err, matrix) {
    window.console.log('matrix', matrix);
    matrix.local[8]=.5+SX/2;
    matrix.local[2]=.5+SY/2;
    matrix.local[5]=.5+SZ/2;
    matrice = matrix.local;
    window.console.log('matrix', matrice);
    api.setMatrix(ID, matrice, function(err, matrix) {
    });
  });
}
function moveRotate(ID, vX1, vX2, vX3, vY1, vY2, vY3, vZ1, vZ2, vZ3, TX, TY, TZ) {
  api.getMatrix(ID, function(err, matrix) {
    // window.console.log('matrix', matrix);
    matrix.local[0]=vX1;
    matrix.local[1]=vX2;
    matrix.local[2]=vX3;
    matrix.local[4]=vY1;
    matrix.local[5]=vY2;
    matrix.local[6]=vY3;
    matrix.local[8]=vZ1;
    matrix.local[9]=vZ2;
    matrix.local[10]=vZ3;
    matrix.local[12]=TX/1000;
    matrix.local[13]=TZ/1000;
    matrix.local[14]=TY/1000;
    matrice = matrix.local;
    // window.console.log('matrix', matrice);
    api.setMatrix(ID, matrice, function(err, matrix) {
    });
  });
}

  function displayPopup() {
    const currentTime =
      addLeadingZero(hours) +
      ":" +
      addLeadingZero(minutes) +
      ":" +
      addLeadingZero(seconds);
    document.getElementById("popupTimer").textContent = currentTime;
    document.getElementById("timerPopup").style.display = "block";
  }

  function closePopup() {
    document.getElementById("timerPopup").style.display = "none";
  }

  document.querySelectorAll(".favorite").forEach((button) => {
    button.addEventListener("click", startTimer);
  });

  // document.getElementById("resetButton").addEventListener("click", resetTimer);
  // document.getElementById("closePopup").addEventListener("click", closePopup);

  window.onclick = function (event) {
    if (event.target == document.getElementById("timerPopup")) {
      closePopup();
    }
  };


client.init(uid, {
// annotation: 0, // Usage: Setting to [1 – 100] will automatically load that annotation when the viewer starts.
// annotations_visible: 1, // Usage: Setting to 0 will hide annotations by default.
//   annotation_cycle: 0, // Déroule les annotations avec le nombre de secondes indiquées.
autospin: 0, // Usage: Setting to any other number will cause the model to automatically spin around the z-axis after loading.
autostart: 1, // Usage: Setting to 1 will make the model load immediately once the page is ready, rather than waiting for a user to click the Play button.
camera: 1, // Usage: Setting to 0 will skip the initial animation that occurs when a model is loaded, and immediately show the model in its default position.
ui_stop: 0, // Usage: Setting to 0 will hide the "Disable Viewer" button in the top right so that users cannot stop the 3D render once it is started.
transparent: 0, // Usage: Setting to 1 will make the model's background transparent
ui_animations: 0, // Usage: Setting to 0 will hide the animation menu and timeline.
ui_annotations: 0, // Usage: Setting to 0 will hide the Annotation menu.
ui_controls: 1, // Usage: Setting to 0 will hide all the viewer controls at the bottom of the viewer (Help, Settings, Inspector, VR, Fullscreen, Annotations, and Animations).
ui_fullscreen: 0, // Usage: Setting to 0 will hide the Fullscreen button.
ui_general_controls: 1, // Usage: Setting to 0 will hide main control buttons in the bottom right of the viewer (Help, Settings, Inspector, VR, Fullscreen).
ui_help: 1, // Usage: Setting to 0 will hide the Help button.
ui_hint: 0, // Usage: Setting to 0 will always hide the viewer hint animation ("click & hold to rotate"). Setting to 1 will show the hint the first time per browser session (using a cookie). Setting to 2 will always show the hint.
ui_infos: 0, // Usage: Setting to 0 will hide the model info bar at the top of the viewer. Share sign etc.
ui_inspector: 0, // Usage: Setting to 0 will hide the inspector button.
ui_settings: 0, // Usage: Setting to 0 will hide the Settings button.
ui_vr: 0, // Usage: Setting to 0 will hide the View in VR button.
ui_watermark_link: 0, // Usage: Setting to 0 remove the link from the Sketchfab logo watermark.
ui_color: '00a8c0', // Usage: Setting to a hexidecimal color code (without the #) or a HTML color name will change the color of the viewer loading bar.
ui_watermark: 0, // Usage: Setting to 0 remove the Sketchfab logo watermark.

success: success,
error: error
});
