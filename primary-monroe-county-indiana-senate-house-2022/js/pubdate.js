// TODO: replace title and slug based on metadata
fetch("../metadata.json")
    .then(response => response.json())
    .then(data => {
        document.querySelector('#pubdate').innerHTML = "Published " + data.pub_date;
    })
    .catch(err => console.log(err))