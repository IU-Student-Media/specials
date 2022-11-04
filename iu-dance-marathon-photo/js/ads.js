// replace <div class="ad"></div> with proper ad code
let adDivs = document.querySelectorAll('.ad');
let adCount = 0;
for (let ad of adDivs) {
    adCount++;
    ad.outerHTML = `
                <div class="ad-block">
                    <p class="ad-caption">Advertisement</p>
                    <div class="ad-code">
                        <div id='div-gpt-ad-1512489859064-${adCount % 5 == 0 ? 5 : adCount % 5}' align="center">
                            <script>
                                googletag.cmd.push(function() { googletag.display('div-gpt-ad-1512489859064-${adCount % 5 == 0 ? 5 : adCount % 5}'); }); 
                            </script>
                        </div>
                    </div>
                </div> `;
}
