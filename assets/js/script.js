$(document).ready( function() {
    // this is called an "object
    // It is how we program sticky to do things
    // Objects make it easier to tell things what to do in games
    var time = 60;
    var timer = function() {
      
        time--;
       if ( time < 1 ) {
           clearInterval(this);
           $("#messages").text("TIME'S UP");
       } else {           
	       $("#timer").text(time);
       }
    }
    setInterval(timer, 1000);
        
    var sticky = {
		sprite: '#sticky',
		x: 0,
   		right: function () {
	        this.x = this.x+6;
	        this.move();
	    },
	    left: function () {
	        this.x = this.x-6;
	        this.move();
	    },
	    move: function() {
	        $(this.sprite).css('left', this.x)
        },
        hit: function() { 
        }
	};
    
    var tree = {
        x: 0,
        numapples: 100,
        sprite: '.tree',
        initiate: function() {
          	var position = $(this.sprite).offset();
            this.x = position.left;
        },
    	isHit: function() {
            if ( sticky.x+60 > tree.x ) {
                this.dropApple();
            }
        },
        dropApple: function() {
            if ( this.numapples > 0 ) {
                var $apple = $(' <div class="goldendelicious apple, apple, granny smith"></div>');
                $(this.sprite).append($apple);
                $apple.animate({'top': '340px'});
        		tree.numapples--;
            }
        }
    };
    
    $('.tree').css('left', '143px');
    tree.initiate();
	$(document).keypress( function(event) {
        event.preventDefault();
        if ( time == 0 ) return;
        
        var keys = event.which;
        $('#messages').text( event.which );
        switch (keys) {
            case 100:
            //$('#sticky').animate({'left': 400});
              sticky.right(); 
             //$('.apple').css('top', '340px');
            // $('.grannysmith').css('top', '342px');
            break;
            case 97:
                sticky.left();
            break;
            case 32:
                sticky.hit();
                tree.isHit();
            break;
           }
       });
    });