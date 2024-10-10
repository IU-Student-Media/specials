// Create a class for the element
class StoryCard extends HTMLElement {
    constructor() {
        // Always call super first in constructor
        super();
    }

    connectedCallback() {
        // Create a shadow root
        const shadow = this.attachShadow({ mode: "open" });

        const section = document.createElement("section");
        section.setAttribute("class","story-card");

        const a = document.createElement("a");
        if (this.hasAttribute("href")) {
            const elementURL = this.getAttribute("href");
            a.setAttribute("href", elementURL);
            a.setAttribute("target", "_blank");
        } else {
            a.setAttribute("href", "#");
        }
        section.appendChild(a);
        

        const card = document.createElement("div");
        card.setAttribute("class", "story-card-vert");
        section.appendChild(card);

        const storyImage = document.createElement("img");
        if (this.hasAttribute("image-src")) {
            const imageSrc = this.getAttribute("image-src");
            storyImage.src = imageSrc;
            card.appendChild(storyImage);
        } else {
            storyImage.src = "ballot.png";
            card.appendChild(storyImage);
        }

        const headline = document.createElement("h3");
        if (this.hasAttribute("headline")) {
            const headlineText = this.getAttribute("headline");
            headline.innerText = headlineText;
            card.appendChild(headline);
        } else {
            headline.innerText = "STORY NAME HERE"
            card.appendChild(headline);
        }

        const credit = document.createElement("p");
        if (this.hasAttribute("credit")) {
            const creditText = this.getAttribute("credit");
            credit.innerText = creditText;
            card.appendChild(credit);
        } else {
            credit.innerText = "AUTHOR NAME HERE"
            card.appendChild(credit);
        }
        credit.setAttribute("class","credit");

        const pillTag = document.createElement("span");
        if (this.hasAttribute("tag")) {
            const tagText = this.getAttribute("tag");
            pillTag.setAttribute("class","pill");
            if (tagText.toLowerCase() == "national") {
                pillTag.classList.add("bg-natl");
            } else if (tagText.toLowerCase() == "state") {
                pillTag.classList.add("bg-state");
            } else if (tagText.toLowerCase() == "local") {
                pillTag.classList.add("bg-local");
            } else {}
            pillTag.innerText = tagText;
            card.appendChild(pillTag);
        } else {
            pillTag.innerText = ""
            card.appendChild(pillTag);
        }

        // Apply external styles to the shadow dom
        const linkElem = document.createElement("link");
        linkElem.setAttribute("rel", "stylesheet");
        linkElem.setAttribute("href", "css/style.css"); 

        // Attach the created elements to the shadow dom
        shadow.appendChild(linkElem);
        shadow.appendChild(section);
    }
}


customElements.define("story-card", StoryCard);
