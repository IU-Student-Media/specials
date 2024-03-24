const eventLocationLinks = {
    "308 W. Fourth St": {
        "Apple": "https://maps.apple.com/?address=308%20W%20Fourth%20St,%20Bloomington,%20IN%20%2047408,%20%C3%89tats-Unis&ll=39.165922,-86.536597&q=308%20W%20Fourth%20St&t=m",
        "Google": "https://maps.google.com/?address=308%20W%20Fourth%20St,%20Bloomington,%20IN%20%2047408,%20%C3%89tats-Unis&ll=39.165922,-86.536597&q=308%20W%20Fourth%20St&t=m"
    }  ,"Switchyard Park" : {
        "Apple": "https://maps.apple.com/?address=245%20W%20Grimes%20Ln,%20Bloomington,%20IN%20%2047403,%20%C3%89tats-Unis&ll=39.153087,-86.535984&q=245%20W%20Grimes%20Ln&t=m",
        "Google": "https://maps.google.com/?address=245%20W%20Grimes%20Ln,%20Bloomington,%20IN%20%2047403,%20%C3%89tats-Unis&ll=39.153087,-86.535984&q=245%20W%20Grimes%20Ln&t=m"
    }, "5060 N. Greene County Line Road" : {
        "Apple": "https://maps.apple.com/?address=5060%20N%20Greene%20County%20Line%20Rd,%20Bloomington,%20IN%20%2047459,%20%C3%89tats-Unis&ll=39.095617,-86.682689&q=5060%20N%20Greene%20County%20Line%20Rd&t=m",
        "Google": "https://maps.google.com/?address=5060%20N%20Greene%20County%20Line%20Rd,%20Bloomington,%20IN%20%2047459,%20%C3%89tats-Unis&ll=39.095617,-86.682689&q=5060%20N%20Greene%20County%20Line%20Rd&t=m"
    }, "7640 S. Old State Road 37": {
        "Apple": "https://maps.apple.com/?address=7640%20South%20Old%20State%20Rd%2037,%20Bloomington,%20IN%20%2047403,%20%C3%89tats-Unis&ll=39.058554,-86.543132&q=7640%20South%20Old%20State%20Rd%2037&t=m",
        "Google": "https://maps.google.com/?address=7640%20South%20Old%20State%20Rd%2037,%20Bloomington,%20IN%20%2047403,%20%C3%89tats-Unis&ll=39.058554,-86.543132&q=7640%20South%20Old%20State%20Rd%2037&t=m"
    }, "Cox Arboretum" : {
        "Apple": "https://maps.apple.com/?address=1025%20E%20Seventh%20St,%20Bloomington,%20IN%20%2047405,%20United%20States&auid=7223976243651859684&ll=39.170654,-86.519606&lsp=9902&q=Arthur%20Metz%20Bicentennial%20Grand%20Carillon&t=m",
        "Google": "https://maps.google.com/?address=1025%20E%20Seventh%20St,%20Bloomington,%20IN%20%2047405,%20United%20States&auid=7223976243651859684&ll=39.170654,-86.519606&lsp=9902&q=Arthur%20Metz%20Bicentennial%20Grand%20Carillon&t=m"
    }, "406 N. Rogers St": {
        "Apple": "https://maps.apple.com/?address=406%20N%20Rogers%20St,%20Bloomington,%20IN%20%2047404,%20%C3%89tats-Unis&ll=39.169712,-86.538431&q=406%20N%20Rogers%20St&t=m",
        "Google": "https://maps.google.com/?address=406%20N%20Rogers%20St,%20Bloomington,%20IN%20%2047404,%20%C3%89tats-Unis&ll=39.169712,-86.538431&q=406%20N%20Rogers%20St&t=m"
    }, "Memorial Stadium": {
        "Apple": "https://maps.apple.com/?address=701%20E%2017th%20St,%20Bloomington,%20IN%2047408,%20United%20States&auid=11379592418982821125&ll=39.180899,-86.525584&lsp=9902&q=Memorial%20Stadium&t=m",
        "Google": "https://maps.google.com/?address=701%20E%2017th%20St,%20Bloomington,%20IN%2047408,%20United%20States&auid=11379592418982821125&ll=39.180899,-86.525584&lsp=9902&q=Memorial%20Stadium&t=m"
    }, "718 E. Seventh St": {
        "Apple": "https://maps.apple.com/?address=718%20E%20Seventh%20St,%20Bloomington,%20IN%20%2047408,%20%C3%89tats-Unis&ll=39.168337,-86.525663&q=718%20E%20Seventh%20St&t=m",
        "Google": "https://maps.google.com/?address=718%20E%20Seventh%20St,%20Bloomington,%20IN%20%2047408,%20%C3%89tats-Unis&ll=39.168337,-86.525663&q=718%20E%20Seventh%20St&t=m"
    }, "308 W. Fourth St": {
        "Apple": "https://maps.apple.com/?address=308%20W%20Fourth%20St,%20Bloomington,%20IN%20%2047408,%20%C3%89tats-Unis&ll=39.165922,-86.536597&q=308%20W%20Fourth%20St&t=m",
        "Google": "https://maps.google.com/?address=308%20W%20Fourth%20St,%20Bloomington,%20IN%20%2047408,%20%C3%89tats-Unis&ll=39.165922,-86.536597&q=308%20W%20Fourth%20St&t=m"
    }, "Dunn Meadow": {
        "Apple": "https://maps.apple.com/?address=Indiana%20University%20Bloomington,%20658%E2%80%93698%20E%20Seventh%20St,%20Bloomington,%20IN%2047408,%20United%20States&auid=6764380115291572608&ll=39.168252,-86.526348&lsp=9902&q=Dunn%20Meadow&t=m",
        "Google": "https://maps.google.com/?address=Indiana%20University%20Bloomington,%20658%E2%80%93698%20E%20Seventh%20St,%20Bloomington,%20IN%2047408,%20United%20States&auid=6764380115291572608&ll=39.168252,-86.526348&lsp=9902&q=Dunn%20Meadow&t=m"
    }, "Waldron Arts Center Rose Firebay Theater": {
        "Apple": "https://maps.apple.com/?address=122%20S%20Walnut%20St,%20Bloomington,%20IN%20%2047404,%20United%20States&auid=2152415544822457038&ll=39.165791,-86.534001&lsp=9902&q=Waldron%20Arts%20Center&t=m",
        "Google": "https://maps.google.com/?address=122%20S%20Walnut%20St,%20Bloomington,%20IN%20%2047404,%20United%20States&auid=2152415544822457038&ll=39.165791,-86.534001&lsp=9902&q=Waldron%20Arts%20Center&t=m"
    }, "IU Auditorium" : {
        "Apple": "https://maps.apple.com/?address=1211%20E%20Seventh%20St,%20Bloomington,%20IN%2047405,%20United%20States&auid=3219813805344071572&ll=39.168437,-86.517951&lsp=9902&q=IU%20Auditorium&t=m",
        "Google": "https://maps.google.com/?address=1211%20E%20Seventh%20St,%20Bloomington,%20IN%2047405,%20United%20States&auid=3219813805344071572&ll=39.168437,-86.517951&lsp=9902&q=IU%20Auditorium&t=m"
    }
}


function getMobileOperatingSystem() {
    var userAgent = navigator.userAgent || window.opera;

    

    // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
        return "Windows Phone";
    }

    if (/android/i.test(userAgent)) {
        return "Android";
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod|Macintosh/.test(userAgent) && !window.MSStream) {
        return "iOS";
    }

    return "unknown";
}


const mobileOS = getMobileOperatingSystem();


const eventLocations = document.getElementsByClassName("location");
for(let i=0; i<eventLocations.length; ++i){    
    let link;
    if(mobileOS == "iOS") link = eventLocationLinks[eventLocations[i].innerText]["Apple"];
    else link = eventLocationLinks[eventLocations[i].innerText]["Google"];

    // second link should always be location link
    eventLocations[i].href = link;
}


