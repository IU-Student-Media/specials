class LiveUpdate extends HTMLElement {

    connectedCallback() {
        const title = this.getAttribute('title');
        const author = this.getAttribute('author');
        const time = this.getAttribute('time');
        const link = this.getAttribute('href');
        this.innerHTML = `
        <a href="${link}" rel="noopener" target="_blank">
          <article>
            <h3>${title}</h3>
            <div class="head">
                    <p class="author">${author}</p>
                <p class="time">${time}</p>
            </div>
          </article>
        </a>
        `

    }

}

customElements.define("live-update", LiveUpdate);


class PollingPercent extends HTMLElement {

    constructor() {
        super();
        this.value = this.hasAttribute('value');
    }

    static get observedAttributes() {
        return ['value'];
      }

      get value() {
        return this.hasAttribute('value');
      }
    
      set value(val) {
        if (val) {
          this.setAttribute('value', '');
        } else {
          this.removeAttribute('value');
        }
      }


    render() {
        const party = this.getAttribute('party');
        const value = this.getAttribute('value');
        const label = this.getAttribute('label');
        this.innerHTML = `
        <div class="perc ${party}">
            <p class="value">${value}%</p>
            <p class="candidate">${label}</p>
        </div>
        `
    }

    connectedCallback() {
        this.render();
      }
    
      attributeChangedCallback() {
        this.render();
      }
}

customElements.define("poll-percent", PollingPercent);
