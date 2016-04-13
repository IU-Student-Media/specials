var windw = this;

$.fn.followTo = function (from, bumper) {
    var $this = this,
        $window = $(windw),
        $from = $(from),
        $bumper = $(bumper),
        $startPos = $from.offset().top + $from.height(),
        bumperPos = $bumper.offset().top,
        thisHeight = $this.outerHeight(),
        setPosition = function(){
            if ($window.scrollTop() < $startPos) { 
                $this.css({
                    position: 'absolute',
                    top: $startPos
                });
            } else if ($window.scrollTop() > (bumperPos - thisHeight)) {
                $this.css({
                    position: 'absolute',
                    top: (bumperPos - thisHeight)
                });
            } else {
                $this.css({
                    position: 'fixed',
                    top: 0
                });
            }
        };
    $window.resize(function()
    {
        bumperPos = pos.offset().top;
        thisHeight = $this.outerHeight();
        setPosition();
    });
    $window.scroll(setPosition);
    setPosition();
};

$('#one').followTo('#half', '#two');

