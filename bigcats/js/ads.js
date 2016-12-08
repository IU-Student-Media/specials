$(document).on('ready', function() {
	var winHeight = $(window).height(), 
     	docHeight = $(document).height(),
     	position, load_ad, endChange;

     	$(document).on('scroll', function (){ 
     		position = $(window).scrollTop(),
     		
     		// Copy this everytime you want a new transition and change the var/id name.
     		load_ad = $('#nav_invisible').offset(),
     		endChange = $('#nav_visible').offset();
     		// If you're using sublime text, cmd+d will select other apperances of the highlighted
     		load_ad1 = $('#nav_invisible1').offset(),
     		endChange1 = $('#nav_visible1').offset();

     		// This first if statment is if you want to start w/transparent. 
     		// If not, remove it, move the other if statements up and remove the trasnparent class from the html 
     		if (position == 0) { 
     			$('nav').addClass('transparent');

     		} else if ((position > load_ad.top && position < endChange.top)){
     			$('nav').addClass('invisible');
                $(".logo").html("<img src='../img/w.logo.svg'>");
                // $(".dropbtn").html("<img src=''>");
                $(".twitter-logo").html("<img src='../img/w.twitter.svg'>");
                $(".fb-logo").html("<img src='../img/w.facebook.svg'>");
                $(".comments-logo").html("<img src='../img/w.comments.svg'>");

     		// add a new else if for every change you want
     		} else if ((position > load_ad1.top && position < endChange1.top)){
     			$('nav').addClass('invisible');
                $(".logo").html("<img src='../img/w.logo.svg'>");
                // $(".dropbtn").html("<img src=''>");
                $(".twitter-logo").html("<img src='../img/w.twitter.svg'>");
                $(".fb-logo").html("<img src='../img/w.facebook.svg'>");
                $(".comments-logo").html("<img src='../img/w.comments.svg'>");	
     		// This is the only time you'll need to remove the invisible class
     		} else{
     			$('nav').removeClass('invisible');
     			$(".logo").html("<img src='../img/b.logo.svg'>");
                // $(".dropbtn").html("<img src='../img/arrow_down.svg'>");


		        $(".twitter-logo").html("<img src='../img/b.twitter.svg'>");
		        $(".fb-logo").html("<img src='../img/b.facebook.svg'>");
                $(".comments-logo").html("<img src='../img/b.comments.svg'>");
     		} 	
     	});
});
