// replace <div class="ad"></div> with proper ad code
let adDivs = document.querySelectorAll('.ad');
let adCount = 2;
for (let ad of adDivs) {
    adCount++;
    let adIndex = adCount % 5 == 0 ? 5 - 1 : (adCount % 5) - 1;
    ad.outerHTML = `
                <!-- AD BLOCK -->
                <div class="ad-block">
                    <p class="ad-caption">Advertisement</p>
                    <div class="ad-code">
                        <div id='div-gpt-ad-1512489859064-${adIndex}' align="center">
                            <script>
                                googletag.cmd.push(function() { googletag.display('div-gpt-ad-1512489859064-${adIndex}'); }); 
                            </script>
                        </div>
                    </div>
                </div> 
                <!-- END AD BLOCK -->`;
}