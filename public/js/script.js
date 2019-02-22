const books_table = document.querySelector("tbody");
const books = document.querySelectorAll("#db_table .book_row");
const book_to_search = document.querySelector("#search_bar");

class book_found {
    constructor (title, link, author, genre, year) {
        this.title= title,
        this.link= link,
        this.author= author,
        this.genre= genre,
        this.year= year
    }
}

const searchFunction = () => {

  const value_to_search = book_to_search.value.toUpperCase();
  const title = document.querySelectorAll(".title_col");
  const link = document.querySelectorAll("table a");
  const author = document.querySelectorAll(".author_col");
  const genre = document.querySelectorAll(".genre_col");
  const year_published = document.querySelectorAll(".year_col");
  const initial_list = document.querySelector(".student-list");
  const search_results = [];

  books_table.style.display = "none";

  for (let i = 0; i < books.length; i += 1) {

      if (title[i].textContent.toUpperCase().indexOf(value_to_search) > -1 ||
       author[i].textContent.toUpperCase().indexOf(value_to_search) > -1 ||
        genre[i].textContent.toUpperCase().indexOf(value_to_search) > -1 ||
         year_published[i].textContent.toUpperCase().indexOf(value_to_search) > -1) {

            search_results.push(new book_found(title[i].textContent,
                link[i].getAttribute("href"),
                author[i].textContent,
                genre[i].textContent,
                year_published[i].textContent));

      }

  }

  const results_to_display = search_results.map( book =>
      `<tr class="book_row">
      <td class="title_col"><a href="${book.link}">${book.title}</a></td>
      <td class="author_col">${book.author}</td><td class="genre_col">${book.genre}</td>
      <td class="year_col">${book.year}</td>
      </tr>`
  ).join("");

  const table = document.querySelector("table");

  const create_table = () => {

    const new_table = document.createElement("tbody");
    table.appendChild(new_table);
    new_table.className = "results_table";

  }

  if (document.querySelector(".results_table")) {
    table.removeChild(document.querySelector(".results_table"));
    create_table();
  } else {
    create_table();
  }

  const results_table = document.querySelector(".results_table");
  results_table.innerHTML = results_to_display;

}

const pagination_container = (reference_list = books) => {
    const container = document.querySelector(".pagination_container");
    const pagination_list = document.createElement("ul");
    container.appendChild(pagination_list);
    pagination_list.innerHTML = pagination_links(reference_list);
}

const pagination_links = (books_to_asses) => {

    const total_links =  Math.ceil(books_to_asses.length / 7);
    const links_to_print = [];

    for (let i = 0; i <= total_links; i += 1) {

        if( i != 0) {
            let a = `<li><a>${i}</a></li>`
        links_to_print.push(a);
        }

    }

    return links_to_print.join("")
}

const display_seven_results = (table, link_number = 1) => {

    const chosen_table_books = document.querySelectorAll(`${table} .book_row`);

    const max_to_display = parseInt(link_number) * 7;
    const min_to_display = max_to_display - 7;

    for (let i = 0; i < chosen_table_books.length; i += 1) {
            chosen_table_books[i].style.display = "none";
    }

    for (let i = min_to_display; i <= max_to_display - 1; i += 1) {

        if (i >= chosen_table_books.length) {
            break
        } else {
            chosen_table_books[i].style.display = "";
        }

    }

}


book_to_search.addEventListener("keyup", () => {

    searchFunction();

    const results_to_paginate = document.querySelectorAll(".results_table .book_row");
    const links_container = document.querySelector(".pagination_container");
    const previous_links = document.querySelector(".pagination_container ul");

    links_container.removeChild(previous_links);
    pagination_container(results_to_paginate);
    display_seven_results(".results_table");
});


const links_container = document.querySelector(".pagination_container");

links_container.addEventListener("click", (event) => {

    const results_table = document.querySelector(".results_table");

    if (event.target.tagName === "A") {
        const link_number = event.target.textContent;

        if (results_table) {
            display_seven_results(".results_table", link_number);
        } else {
            display_seven_results("#db_table", link_number);
        }

    }

})

pagination_container();
display_seven_results("#db_table");
