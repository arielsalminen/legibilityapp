/*--------------------------------------------------------------
Draggable
alternative to jQuery UI’s draggable
based on comments from: http://css-tricks.com/snippets/jquery/draggable-without-jquery-ui/
usage example: $('.post-thumbnail, article header').draggable();
--------------------------------------------------------------*/
(function($) {
    if (!jQuery().draggable) {
        $.fn.draggable = function(opt) {
          opt = $.extend({handle:"",cursor:"move"}, opt);

          if (opt.handle === "") {
            var $el = this;
          } else {
              var $el = this.find(opt.handle);
          }

            var _fixMobileEvent = function (e) {
                if (e.originalEvent && e.originalEvent.targetTouches && e.originalEvent.targetTouches[0]) {
                    var t = e.originalEvent.targetTouches[0];
                    e.pageX = t.clientX;
                    e.pageY = t.clientY;
                    return true;
                } else {
                    return false;
                }
            };
            $el
                .css('cursor', 'move')
                .on('mousedown touchstart', function(e) {
                    _fixMobileEvent(e);

                    var $dragged;
                    if(opt.handle === "") {
                      $dragged = $(this);
                   } else {
                      $dragged = $(this).parent();
                   }


                    var startOffset = $dragged.offset();
                    var x = startOffset.left - e.pageX,
                        y = startOffset.top - e.pageY;

                    stack = $.fn.draggable.stack;
                    var firstMove = true;
                    var $preventClick = null;

                    $(window)
                        .on('mousemove.draggable touchmove.draggable', function(e) {
                            _fixMobileEvent(e);

                            if (firstMove) {
                                firstMove = false;
                                $dragged
                                    .css({
                                          'bottom': 'auto', 'right': 'auto'
                                    });
                                var $target = $(e.target);
                                if ($target.is('a')) {
                                    $preventClick = $target;
                                    $target.one('click.draggable', function(e) {
                                        e.preventDefault();
                                        e.stopImmediatePropagation();
                                        //$("#log").text("link: click prevented " + stack);
                                    });
                                } else if ($dragged.is('a')) {
                                    $preventClick = $dragged;
                                    $dragged.one('click.draggable', function(e) {
                                        e.preventDefault();
                                        e.stopImmediatePropagation();
                                        //$("#log").text("dragged: click prevented " + stack);
                                    });
                                }
                            }
                            $dragged.offset({
                                left: x + e.pageX,
                                top: y + e.pageY
                            });
                            e.preventDefault();
                        })
                        .one('mouseup touchend touchcancel', function() {
                            $(this).off('mousemove.draggable touchmove.draggable');
                            if (_fixMobileEvent(e)) {
                                if ($preventClick) $preventClick.off('click.draggable');
                                var endOffset = $dragged.offset();
                                if (Math.abs(endOffset.left - startOffset.left) <= 3
                                        && Math.abs(endOffset.top - startOffset.top) <= 3) {

                                    if ($preventClick) {
                                        $preventClick[0].click();
                                    } else {
                                        var $target = $(e.target);
                                        if ($target.is('a')) {
                                            e.target.click();
                                        } else if ($dragged.is('a')) {
                                            $dragged[0].click();
                                        }
                                    }
                                }
                            }
                        });

                    e.preventDefault();
                });
            return this;
        };
    }
})(jQuery);
