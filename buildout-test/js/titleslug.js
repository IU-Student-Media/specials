// TODO: replace title and slug based on metadata
fetch("../metadata.json")
    .then(response => response.json())
    .then(data => {
        document.querySelector('title').innerHTML = data.title + ' | Indiana Daily Student';
        document.querySelector('#slug').innerHTML = data.slug;
    })
    .catch(err => console.log(err))