// const searchForm = document.getElementById("search_form");
// const input = document.getElementById("search");
// const btn = document.getElementById("search_btn");
// const filmCard = document.getElementById("film-card");

// searchForm.addEventListener("submit", searchFilm);

// function searchFilm(e) {
//     e.preventDefault();
//     const filmName = input.value.trim();
//     if (!filmName) return;

//     fetch(`https://api.tvmaze.com/shows?q=${filmName}`)
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error(`HTTP error! Status: ${response.status}`);
//             }

//             return response.json();
//         })
//         .then(data => {
//             filmCard.innerHTML = `
//                 <h2>${data.name}</h2>
//                 <img>${data.image[0]}</img>
//                 <p>${data.genres.join(", ")}</p>
//             `;
//         })
//         .catch(error=>{
//             console.error(`Error: ${error}`);
//         })
// }

const searchForm = document.getElementById("search_form");
const input = document.getElementById("search");
const filmCard = document.getElementById("film-card");

searchForm.addEventListener("submit", searchFilm);

function searchFilm(e) {
    e.preventDefault();
    const filmName = input.value.trim();
    if (!filmName) return;

    fetch(`https://api.tvmaze.com/search/shows?q=${filmName}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            setTimeout(() => {
                if (data.length === 0) {
                    filmCard.innerHTML = `<p></p>`;
                    return;
                }

                const show = data[0].show;
                filmCard.innerHTML = `
                <h2>${show.name}</h2>
                <img src="${show.image?.medium || ''}" alt="${show.name}">
                <p>${show.genres.join(", ")}</p>
            `;

            }, 1500);
            filmCard.textContent = `Завантаження...`;
        })
        .catch(error => {
            console.error(`Error: ${error}`);
        });
}
