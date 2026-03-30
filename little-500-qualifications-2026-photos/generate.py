import csv

def generate_index_html(images, captions): 
    return f"""
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <!-- Title (pulls from metadata.json) -->
    <title></title>

    <!-- favicon -->
    <link rel="SHORTCUT ICON"
        href="https://s3.amazonaws.com/snwceomedia/ids/f07d2fab-1ce4-46fd-b3b3-44a57ab9fb95.sized-1000x1000.jpg">

    <!-- CSS stylesheets -->
    <link rel="stylesheet" href="css/normalize.css"> <!-- normalize — removes default browser styles -->
    <link rel="stylesheet" href="css/ids.css"> <!-- IDS stylesheet — default IDS styles -->
    <link rel="stylesheet" href="css/style.css"> <!-- Local stylesheet — put all your design choices here -->

    <!-- Font Awesome — for the social media icons and hamburger menu icon -->
    <script src="https://kit.fontawesome.com/ea52966d59.js" crossorigin="anonymous"></script>

    <!-- @TODO SOCIAL CARDS — make sure to update these. -->
    <meta property="og:url" content="http://specials.idsnews.com/url" />
    <meta property="og:type" content="article" />
    <meta property="og:title" content="Headline" />
    <meta property="og:description" content="Abstract" />
    <meta property="og:site_name" content="IDS News">
    <meta property="og:image" content="" />
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" content="@idsnews">
    <meta name="twitter:creator" content="@idsnews">
    <meta name="twitter:title" content="Headline">
    <meta name="twitter:description" content="Abstract">
    <meta name="twitter:image" content="">

    <!-- START Ad content: this goes in the head content -->
    <!-- don't mess with this — it will work all on it's own :-) -->
    <script async='async' src='https://www.googletagservices.com/tag/js/gpt.js'></script>
    <script>
        var googletag = googletag || {{}};
        googletag.cmd = googletag.cmd || [];
    </script>
    <script>
        googletag.cmd.push(function () {{
            //all other leaderboards
            var mapping1 = googletag.sizeMapping()
                .addSize([768, 0], [728, 90]) // Desktops and Tablets
                .addSize([0, 0], [320, 50]) // Mobile devices
                .build();
            googletag.defineSlot('/32635621/ids_specials1_leaderboard_728x90', [[728, 90], [320, 50]], 'div-gpt-ad-1512489859064-0').defineSizeMapping(mapping1).addService(googletag.pubads());
            googletag.defineSlot('/32635621/ids_specials2_leaderboard_728x90', [[728, 90], [320, 50]], 'div-gpt-ad-1512489859064-1').defineSizeMapping(mapping1).addService(googletag.pubads());
            googletag.defineSlot('/32635621/ids_specials3_rectangle_300x250', [300, 250], 'div-gpt-ad-1512489859064-2').addService(googletag.pubads());
            googletag.defineSlot('/32635621/ids_specials4_rectangle_300x250', [300, 250], 'div-gpt-ad-1512489859064-3').addService(googletag.pubads());
            googletag.defineSlot('/32635621/ids_specials5_rectangle_300x250', [300, 250], 'div-gpt-ad-1512489859064-4').addService(googletag.pubads());
            googletag.pubads().enableSingleRequest();
            googletag.pubads().collapseEmptyDivs();
            googletag.enableServices();
        }});
    </script>
</head>

<body>
    <!-- Google Tag Manager -->
    <!-- (also don't have to worry about this at all) -->
    <noscript>
        <iframe src="//www.googletagmanager.com/ns.html?id=GTM-NBJX8F" height="0" width="0"
            style="display:none;visibility:hidden"></iframe>
    </noscript>
    <script src="js/googleTagManager.js"></script>

    <div class="helper"></div>

    <!--Header-->
    <header>

        <!-- Transparent navbar -->
        <nav>
            <ul>
                <li class="logo">
                    <a href="https://www.idsnews.com">
                        <!-- IDS LOGO SVG -->
                        <svg viewBox="0 0 163.17 68.85">
                            <path style="fill:white;" d="M0,67.77V1.08H19.89V67.77Z" />
                            <path style="fill:white;"
                                d="M32.85,67.77V1.08H58.32c19.44,0,38.34,6.21,38.34,33.3,0,26.64-20.07,33.39-39.6,33.39ZM52.74,50.4h5.85c12.06,0,17.91-4.41,17.91-16s-5.67-15.3-18.81-15.3H52.74Z" />
                            <path style="fill:white;"
                                d="M98.82,59l9.54-13.59c6.66,4.59,15.93,7,23.31,7,9.45,0,11.7-2.16,11.7-4.86s-2.7-3.78-12.51-4.59c-14.31-1.17-28.26-4.86-28.26-21.15C102.6,5.67,115.83,0,131,0c15.84,0,24.48,4.05,29.16,7.83l-9.9,14.31c-3.78-2.52-12.33-4.77-19-4.77s-8.73,1.08-8.73,3.69c0,3.24,2.79,4.05,12.69,4.86,14.94,1.26,28,4.14,28,20.7,0,13.5-11.52,22.23-30.87,22.23C114.66,68.85,105.84,64.53,98.82,59Z" />
                        </svg>
                    </a>
                    <span id="slug"></span> <!-- slug auto pulls from metadata.json -->
                </li>
                <li class="toggle">
                    <i class="fas fa-bars fa-lg"></i>
                </li>
                <li id="socials" class="item">
                    <!-- links generate automatically from metadata.json -->
                </li>
            </ul>
        </nav>


    </header>

    <!-- main article -->
    <main>
        <article>

            <div class="headline-container">
                <h1>PHOTOS</h1>
                <h2>Bloomington residents attend Pridefest to celebrate pride, community</h2>
                <div class="bylines">
                    <div id="bylines">
                    </div>
                    <p id="pubdate"></p>
                </div>
            </div>

            <div class="scrolly">
                <div class="sticky-image">

                    <!-- 
                        Each of these <figure>s contains one of the images
                        Each image has an "object-position" style set
                            This determines the focal point of the image. So if you make the screen smaller,
                            that certain point of the photo will remain in the frame. Make sure to check how
                            each photo looks in a mobile view, and update those styles accordingly to avoid
                            cutting off important parts of the image, like the top of someone's head
                        Each image also has alt text, which will appear if the photo doesn't load, such as if 
                            the viewer has slow internet, and is important for people who use screen readers
                            so they know what's going on. 
                    -->
                    {images}
                </div>

                <!-- 
                    Each of these captions appears on top of one of the photos above. 
                    If there are multiple photographers, include a credit on each caption. 
                    If there is only one photographer, remove the credits because they will have
                    their own byline at the top of the story.
                 -->
                <div class="steps">
                    {captions}
                </div>

            </div>
            <div class="story">

                <p class="donate">
                    <em>Like what you're reading?</em><br>
                    Support independent, award-winning student journalism.
                    <a href="" target="_blank">Donate.</a>
                </p>
            </div>
        </article>

    </main>

    <footer>

        <div class="footer-row">
            <!-- IDS LOGO SVG -->
            <div class="logo">
                <a href="https://idsnews.com">
                    <svg viewBox="0 0 163.17 68.85">
                        <path style="fill:#990000;" d="M0,67.77V1.08H19.89V67.77Z" />
                        <path style="fill:#990000;"
                            d="M32.85,67.77V1.08H58.32c19.44,0,38.34,6.21,38.34,33.3,0,26.64-20.07,33.39-39.6,33.39ZM52.74,50.4h5.85c12.06,0,17.91-4.41,17.91-16s-5.67-15.3-18.81-15.3H52.74Z" />
                        <path style="fill:#990000;"
                            d="M98.82,59l9.54-13.59c6.66,4.59,15.93,7,23.31,7,9.45,0,11.7-2.16,11.7-4.86s-2.7-3.78-12.51-4.59c-14.31-1.17-28.26-4.86-28.26-21.15C102.6,5.67,115.83,0,131,0c15.84,0,24.48,4.05,29.16,7.83l-9.9,14.31c-3.78-2.52-12.33-4.77-19-4.77s-8.73,1.08-8.73,3.69c0,3.24,2.79,4.05,12.69,4.86,14.94,1.26,28,4.14,28,20.7,0,13.5-11.52,22.23-30.87,22.23C114.66,68.85,105.84,64.53,98.82,59Z" />
                    </svg>
                    <span class="show-desktop"> | Indiana Daily Student</span>
                </a>
            </div>
            <a class="subscribe show-desktop" href="https://www.idsnews.com/page/newsletters" target="_blank">
                SUBSCRIBE
            </a>
            <div class="socials">
                <a href="https://www.facebook.com/idsnews" target="_blank"><i class="fab fa-facebook"></i></a>
                <a href="https://twitter.com/idsnews" target="_blank"><i class="fab fa-twitter"></i></a>
                <a href="https://www.instagram.com/idsnews/" target="_blank"><i class="fab fa-instagram"></i></a>
                <a href="https://open.spotify.com/show/2XFEmhbtKuLVV6tAJl7Lx3?si=h1A1_1ETSL-GVcjgRqynqw&nd=1"
                    target="_blank"><i class="fab fa-spotify"></i></a>
            </div>
        </div>
        <div class="links">
            <p><a href="https://www.idsnews.com/page/contact" target="_blank">Contact us</a></p>
            <p><a href="https://www.idsnews.com/page/employment" target="_blank">Employment</a></p>
            <p><a href="https://www.idsnews.com/page/policies" target="_blank">Policies</a></p>
            <p><a href="https://s3.amazonaws.com/snwceomedia/ids/45e13f9c-6411-4947-8db6-2bf00b0e8d93.original.pdf"
                    target="_blank">Advertising</a></p>
            <p><a href="https://issuu.com/idsnews/docs/binder1_357aeeb2b95e46" target="_blank">Print edition</a></p>
            <p><a href="https://www.idsnews.com/page/contact" target="_blank">Write to us</a></p>
        </div>
        <p class="copyright"><small>All content &copy; 2024 Indiana Daily Student</small></p>
    </footer>

    <!-- Jquery cdn — used to set data scroll speed (set in ids.js file) -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="js/ads.js"></script>
    <script src="js/ids.js"></script>
    <script src="js/metadata.js"></script>
    <script src="https://unpkg.com/scrollama@2.0.1/build/scrollama.js"></script>
    <script src="js/scrolly.js"></script>
</body>

</html>
"""

def generate_scrolly_js(num):
    return f'''
'use strict';

/***************************************
*   UTILITIES                          *
***************************************/
// detect page size to adjust scrollytelling/graphic 
let mobile;
if (window.innerWidth <= 600) {{
    mobile = true;
}}
window.addEventListener('resize', () => {{
    if (window.innerWidth <= 600) {{
        mobile = true;
    }} else {{
        mobile = false;
    }}
}});

/***************************************
*   SCROLLYTELLING GRAPHIC             *
***************************************/

// select DOM elements
const scrolly = document.querySelector('.scrolly');

// insert image divs
const graphicDiv = document.querySelector('.graphic');

const images = document.querySelectorAll('.scrolly figure');

images.forEach((figure) => figure.style.opacity = 0)
images[0].style.opacity = 1;


// initialize scrollama
let scroller = scrollama();

// scrollama event handlers
function handleStepEnter(event) {{

    let index = event.element.dataset.step;

    // console.log(index);

    if (index == {num}) {{
        document.querySelector('.sticky-image').style.opacity = 0;
        document.querySelector('.sticky-image').style.pointerEvents = "none";
    }} else {{
        images[index].style.opacity = 1;
    }}

}}

function handleStepExit(event) {{

    if (event.direction === 'up') {{

        let index = event.element.dataset.step;

        if (index == {num}) {{
            document.querySelector('.sticky-image').style.opacity = 1;
            document.querySelector('.sticky-image').style.pointerEvents = "initial";
        }} else {{
            images[index].style.opacity = 0;
        }}
    }}
}}

scroller
    .setup({{
        step: '.step',
        // debug: true,
        offset: 1,
    }})
    .onStepEnter(handleStepEnter)
    .onStepExit(handleStepExit);


    '''

def generate_image_html(src, alt, step):
    return f'''
                    <figure class="grid-image-{step}">
                        <img style="object-position: center center;"
                            src="{src}"
                            alt="{alt}">
                    </figure>
    '''

def generate_caption_html(caption, credit, step):
    return f'''
                    <div class="step" {'' if step==0 else f'data-step="{step}"'}>
                        <p class="caption">
                            {caption}
                        </p>
                        {'' if credit is None or credit=='' else f'<p class="credit">{credit} | <strong>IDS</strong></p>'}
                    </div>   
    '''

with open('content.csv', newline='') as csvfile:
    content_reader = csv.DictReader(csvfile)

    images = []
    captions = []

    i = 0
    for row in content_reader:
        images.append(generate_image_html(row['url'], row['alt'], i+1))
        captions.append(generate_caption_html(row['caption'], row['credit'], i))
        i+=1

    captions.append(f'<div class="step" data-step="{i}" style=" background-color: transparent; margin-bottom:0;"></div>')


    with open('index.html', 'w') as f:
        print(generate_index_html('\n'.join(images), '\n'.join(captions)), file=f)
    with open('js/scrolly.js', 'w') as f:
        print(generate_scrolly_js(i), file=f)