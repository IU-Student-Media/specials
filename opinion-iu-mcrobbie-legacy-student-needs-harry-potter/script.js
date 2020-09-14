(function() {
    var mousePos;

    document.onmousemove = handleMouseMove;
    setInterval(getMousePosition, 100); // setInterval repeats every X ms

    function handleMouseMove(event) {
        var dot, eventDoc, doc, body, pageX, pageY;

        event = event || window.event ; // IE-ism

        // If pageX/Y aren't available and clientX/Y are,
        // calculate pageX/Y - logic taken from jQuery.
        // (This is to support old IE)
        if (event.pageX == null && event.clientX != null || event.type == 'touchstart') {
            eventDoc = (event.target && event.target.ownerDocument) || document;
            doc = eventDoc.documentElement;
            body = eventDoc.body;

            event.pageX = event.clientX +
              (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
              (doc && doc.clientLeft || body && body.clientLeft || 0);
            event.pageY = event.clientY +
              (doc && doc.scrollTop  || body && body.scrollTop  || 0) -
              (doc && doc.clientTop  || body && body.clientTop  || 0 );
        }

        mousePos = {
            x: event.pageX,
            y: event.pageY
        };
    }
    function getMousePosition() {
        var pos = mousePos;
        if (!pos) {
          //when cursor hasn't moved
        }
        else {
          //on mouseEvent Properties

            //get info for head
            var h = document.getElementById('head');
            h.style.position = 'absolute';
            h.style.left = (pos.x+10) + 'px';
            h.style.top = pos.y + 'px';

            //get info for scroll
            var s = document.getElementById('scroll');
            s.style.position = 'absolute';
            s.style.left = (pos.x+15) + 'px';
            s.style.top = (pos.y-25) + 'px';
        }
    }
})();

// function footsteps() {
// document.addEventListener('touchstart', function(e) {
//   // Iterate through the touch points and log each screenX/Y coordinate.
//   // The unit of each coordinate is CSS pixels.
//   var i;
//   for (i=0; i < e.touches.length; i++) {
//     var f = document.getElementById('footsteps');
//     f.style.position = 'absolute';
//     f.style.left = (e.touches[i].screenX-323) + 'px';
//     f.style.top = (e.touches[i].screenY-175) + 'px';
//     console.log((e.touches[i].screenX-323) + ', ' + (e.touches[i].screenY-175));
//
//     // console.log("touchpoint[" + i + "].screenX = " + e.touches[i].screenX);
//     // console.log("touchpoint[" + i + "].screenY = " + e.touches[i].screenY);
//   }
// }, false);
// };
