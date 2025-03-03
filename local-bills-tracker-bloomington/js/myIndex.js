function renderBills(bills) {
    const cardContainer = document.getElementById("card-container");

    // Function to create a card dynamically
    function createCard(bill) {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.billId = bill.id; // Store bill ID for event handling
        card.dataset.category = bill.category;
        card.addEventListener("click", onBillClick);

        card.innerHTML = `
                <div class="icon">
                    <span>${bill.type.split(" ")[0]}</span>
                </div>
                <div class="content">
                    <p class="bill-number">• ${bill.type}</p>
                    <div class="title-container">
                        <h3 class="card-title">${bill.title}</h3>
                        <span class="card-status">${bill.status}</span>
                    </div>
                    <p class="card-description">${bill.description}</p>
                    <div class="read-more">
                        ${bill.link ? `<a href="${bill.link}" target="_blank">Read more on IDS &rarr;</a>` : ``}
                    </div>
                </div>
            `;

        return card;
    }

    const filtersContainer = document.querySelector(".filters");
    const paginationContainers = [document.getElementById("pagination-container1"), document.getElementById("pagination-container2")];


    let filteredBills = [...bills]; // Store currently displayed bills
    const itemsPerPage = 4; // Number of bills per page
    let currentPage = 1;

    filtersContainer.addEventListener("click", BillsFilterBtn);


    function BillsFilterBtn(e) {
        e.preventDefault();

        const billFilter = e.target.value; // Get clicked button's value
        if (!billFilter) return;

        console.log(`Filtering by category: ${billFilter}`);

        // Filter bills based on category
        filteredBills = bills.filter(bill => billFilter === "all" || bill.category === billFilter || bill.type.slice(0, 2) === billFilter);

        // Reset pagination
        currentPage = 1;
        displayPaginatedItems();

        // Update active filter button styling
        document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
        e.target.classList.add("active");
    }

    function displayPaginatedItems() {
        if (filteredBills.length == 0) {
            cardContainer.innerHTML = `
            <div class=card>
              <p class="section-description">There are no bills currently in this category</p>
            </div>`
        } else {
            cardContainer.innerHTML = ""; // Clear existing cards

            // Calculate start and end indexes for pagination
            const start = (currentPage - 1) * itemsPerPage;
            const end = start + itemsPerPage;
            const paginatedItems = filteredBills.slice(start, end);

            // Append cards for the current page
            paginatedItems.forEach(bill => {
                const cardElement = createCard(bill);
                cardContainer.appendChild(cardElement);
            });
        }
        updatePaginationControls();
    }

    function scrollPagination(y0, e) {
        // const x = e.offsetLeft;
        const y = e.offsetTop;
        // console.log(y0, y);
        window.scrollBy(0, y - y0);


    }

    function updatePaginationControls() {
        paginationContainers.forEach(paginationContainer => {
            paginationContainer.innerHTML = ""; // Clear previous controls
            let totalPages = Math.ceil(filteredBills.length / itemsPerPage);
            let y0 = paginationContainer.offsetTop;
            // console.log(y0)

            if (totalPages === 0) { totalPages = 1; }

            // Previous Button
            const prevBtn = document.createElement("button");
            prevBtn.innerText = "Previous";
            prevBtn.disabled = currentPage === 1;
            prevBtn.addEventListener("click", () => {
                if (currentPage > 1) {
                    currentPage--;
                    displayPaginatedItems();
                    scrollPagination(y0, paginationContainer);
                }
            });
            paginationContainer.appendChild(prevBtn);

            // Page Numbers
            for (let i = 1; i <= totalPages; i++) {
                const pageBtn = document.createElement("button");
                pageBtn.innerText = i;
                pageBtn.classList.add("page-btn");
                if (i === currentPage) {
                    pageBtn.classList.add("active");
                }
                pageBtn.addEventListener("click", () => {
                    currentPage = i;
                    displayPaginatedItems();
                    scrollPagination(y0, paginationContainer);
                });
                paginationContainer.appendChild(pageBtn);
            }

            // Next Button
            const nextBtn = document.createElement("button");
            nextBtn.innerText = "Next";
            nextBtn.disabled = currentPage === totalPages;
            nextBtn.addEventListener("click", () => {
                if (currentPage < totalPages) {
                    currentPage++;
                    displayPaginatedItems();
                    scrollPagination(y0, paginationContainer);
                }
            });
            paginationContainer.appendChild(nextBtn);

            
        });

    }

    displayPaginatedItems();


    // Event handler for bill clicks
    function onBillClick(event) {
        // event.preventDefault();
        const billId = event.currentTarget.dataset.billId;

        // Remove red border from all cards
        document.querySelectorAll(".card").forEach(card => card.classList.remove("selected-card"));

        // Add red border to the clicked card
        event.currentTarget.classList.add("selected-card");

        // Find and update the timeline
        const selectedBill = bills.find(bill => bill.id === billId);
        if (selectedBill) {
            updateTimeline({ "timelineData": selectedBill.timeline, "billType": selectedBill.type, "billTitle": selectedBill.title });
        }
    }



    function updateTimeline(data) {
        console.log(data)
        const timelineList = document.getElementById("timeline-list");
        const timelineContainer = document.querySelector(".timeline");
        const timelineDescription = document.querySelector(".timeline-description");
        timelineDescription.innerHTML = `
            <p class="process-description">${data.billType} - ${data.billTitle}</p>
            
        `;

        // Fade out current timeline before updating
        timelineList.classList.add("fade-out");

        setTimeout(() => {
            timelineList.innerHTML = ""; // Clear old timeline

            let completedCount = 0;

            data.timelineData.forEach((item, index) => {
                const li = document.createElement("li");
                const iconColor = item.date ? "#48b918" : "#cccfd1";

                li.classList.add("timeline-item"); // Add transition class
                li.style.animationDelay = `${index * 0.1}s`; // Staggered effect

                li.innerHTML = `
                        
                        <span class="icon ${item.date ? '' : 'pending'}">
                            <i class="fa-solid fa-circle-check fa-2xl" style="color: ${iconColor};"></i>
                        </span>
                        <div>
                            <p class="${item.date ? 'status-completed' : 'pending'}">
                                ${item.status}
                            </p>
                            <small>${item.date}</small>
                        </div>
                    `;

                timelineList.appendChild(li);

                if (item.date) {
                    completedCount = index + 1;
                }
            });

            // Fade in new timeline
            timelineList.classList.remove("fade-out");
            timelineList.classList.add("fade-in");

            // Delay progress bar update until timeline is visible
            setTimeout(() => {
                const totalItems = data.timelineData.length;
                const completedHeight = (completedCount / totalItems) * 100;

                timelineContainer.style.setProperty("--completed-height", `${completedHeight}%`);
            }, 400); // Ensure smooth update after animations

        }, 300); // Delay clearing old items to match fade-out duration
    }
}

const spreadsheet = "https://docs.google.com/spreadsheets/d/1N-hq_WWkWgC2Gea2XJcr6Vkreb1Tp1Rxmlp-tRrKHTY/edit?gid=0#gid=0"

document.addEventListener("DOMContentLoaded", () => {

    $('#statistics').sheetrock({
        url: spreadsheet,
        callback: (err, opt, res) => {
            if (err) {
                console.error(err);
                return;
            }

            // Get just the data
            let rows = res.rows.slice(1).map(r => r.cellsArray);
            // console.log(rows);

            // const label_to_index = {
            //     "id": 0,
            //     "type": 1,
            //     "title": 2,
            //     "status": 3,
            //     "category": 4,
            //     "description": 5,
            //     "date_introduced": 6,
            //     "date_house_passed": 7,
            //     "date_senate_passed": 8,
            //     "date_conference": 9,
            //     "date_house_again": 10,
            //     "date_senate_again": 11,
            //     "date_signed": 12,
            // }



            let bills = rows.map(r => {

                let timeline; 

                if (!r[9]) {
                    timeline = [
                        { status: "Introduced", date: r[6] },
                        { status: "House Passed", date: r[7] },
                        { status: "Senate Passed", date: r[8] },
                        { status: "Signed", date: r[12] }
                    ];
                } else {
                    timeline = [
                        { status: "Introduced", date: r[6] },
                        { status: "House Passed", date: r[7] },
                        { status: "Senate Passed", date: r[8] },
                        { status: "Conference", date: r[9] },
                        { status: "House Approval", date: r[10] },
                        { status: "Senate Approval", date: r[11] },
                        { status: "Signed", date: r[12] }
                    ];
                }

                console.log(timeline);

                return {
                    id: r[0],
                    type: r[1],
                    title: r[2],
                    status: r[3],
                    category: r[4],
                    description: r[5],
                    link: r[13],
                    timeline: timeline
                };
            })

            // In order of priority
            bills.sort((a, b) => a.id - b.id);

            renderBills(bills)

        }
    })
});
