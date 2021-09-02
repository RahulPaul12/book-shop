// for search book

const searchbook = () => {
    const searchfield = document.getElementById('search-field');
    const searchtext = searchfield.value;

    // block spinner

    spinner('block');

    //  fetch api

    searchfield.value = '';
    const url = `https://openlibrary.org/search.json?q=${searchtext}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayresult(data))

}

// spinner style

const spinner = displaystyle => {

    document.getElementById('spinner').style.display = displaystyle;
}


// total search result


const displaytotal = data => {

    const total = document.getElementById('total');


    total.innerHTML = `<h6 class="text-center text-primary ">Search Found : ${data.numFound}</h6>
                       <hr class="w-25 mb-3 mx-auto">`;

}


// display result

const displayresult = data => {

    const docs = data.docs;


    // no result found 

    if (data.numFound <= 0) {

        document.getElementById('total').style.display = 'none';
        const alert = document.getElementById('alert');
        alert.innerHTML = `<h1>No result Found!</h1>`;
    }
    else {

        displaytotal(data);

        const searchresult = document.getElementById('search-result');
        searchresult.textContent = '';


        docs.forEach(doc => {

            const cover = (doc.cover_i);


            // display result


            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML =
                `<div class="card h-100">
        
            <img class="w-50 mx-auto pt-3"src="https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${doc.text[1]}</h5>
            
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">${doc.author_name}</li>
                <li class="list-group-item">First Published : ${doc.first_publish_year}</li>
                <li class="list-group-item">First Published : ${doc.publisher}</li>
            </ul>

        </div>`;

            // append result to display


            searchresult.appendChild(div);

        });

    }

    spinner('none');


}