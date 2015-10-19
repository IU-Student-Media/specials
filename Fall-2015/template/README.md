# ids-buildout-base

<em>A work in progress guide to developing long form article designs for the Indiana Daily Student outside of our CMS.</em>
<p>This template is adapted from <a href="http://wwww.specials.idsnews.com/caps/"> Waiting for Help</a> pubished in the Spring of 2015 at the <a href="http://www.idsnews.com">Indiana Daily Student</a>. It is being developed for stories from Bonnie Layton's mutlimedia section of the Words and Pictures course at IU in the Fall of 2015. Please don't hesitate to shoot me an email if you have any question. 

<h2>Rules if you plan on publishing in the IDS</h2>
<p>Follow all commented instructions and call all ids.css or ids.js last in your html. There is no absolute style rulebook, and we're open to changes as long as you have a compelling justification. </p>

<p>Try to keep the digital desk updated on your story throughout your reporting and not just when you're ready to publish. The earlier we know how you're going to tell the story the better it will work online. I'm excited if you want a featured added so just let me know if you have any ideas. We will likely be debugging eight to ten stories at the end of the semester, so we need to already be familiar with your code and its issues before then.</p>

<p>We host everything on github, but if you're not comfortable working with it you can also just give us your code. It can't include any server-side programming like Ruby, Python, PHP, etc. but I don't imagine you would ever need to. 
All project folders must be less than 100MB, so size down all your media to only what's needed for the web. Try to keep as much media in your folder as possible, but if you need to use an external service to host it use an official IDS news account.</p>
<h4>Prefered Services for large or confusing files</h4>
<ul>
	<li>Youtube</li>
	<li>Soundcloud</li>
	<li>JS fiddle</li>
</ul>

<h2>Working Notes</h2>
<p>This is still early on and things are probably going to move around a lot quickly.  Expect the first template with a layout grid and basic css by Oct. 17 and another template with working media examples by the end of the following week. The structure should be finalized by the end of October. Then I'm going to work on improving functionality and the overall smoothness throughout the semester. The more feedback I get from you guys, the more bugs will be exposed and the better the final project will be.</p>

<p>There a pretty big range of experience here so I'm going to try and include more notes on my working process and planned features below in case anyone is interested. I tend to ramble so I appologize if it gets long.</p> 

<h4>Types of Supported Media</h4>
<p>italicized items will likely be implemented after Nov. 1</p> 
<ul>
	<li>Photo</li>
	<li>Video</li>
	<li>Gifs</li>
	<li>Audio</li>
	<li>Pulled Quotes / Numbers</li>
	<li><em>Teaser / related content</em></li>
	<li>Highcharts.js</li>
	<li><em>Mapbox</em> or Google Maps</li>
	<li><em>Live data tables</em></li>
	<li><em>slideshow</em></li>
	<li>storymap.js</li>
	<li>juxtapostion.js</li>
	<li>timeline.js</li>
	<li>soundcite.js</li>
</ul>

<h4>Things I've used so far</h4>
<ul>
	<li><a href="https://www.google.com/fonts">Google Fonts</a></li>
	<li><a href="http://www.getbootstrap.com/getting-started/#download">Bootstrap 3.3.5</a></li>
	<li><a href="http://https://www.fortawesome.github.io/Font-Awesome">Font Awesome</a></li>
	<li><a href="http://www.highcharts.com/download">Highcharts 4.1.9</a></li>
	<li><a href="https://www.knightlab.northwestern.edu/">Knightlab tools</a></li>
	<li><a href="http://www.ezgif.com/video-to-gif">Online Gif Converter</a></li>
	<li><a href="https://www.jsfiddle.net/">jsfiddle</a></li>
</ul>

<h4>Oct. 18 Notes</h4>
<p>The breakpoints for the led image are acting up, so right now I'm just loading one and sticking with it. In the future, there will be a small, medium and large image loaded, depending on the screen resolution.</p>
	
