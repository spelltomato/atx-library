let books;
const renderBooks = async (filter) => {
  //   console.log("render books");
  const booksWrapper = document.querySelector(".books");
  // add loading spinner
  booksWrapper.classList += " books__loading";

  if (!books) {
    books = await getBooks();
  }
  console.log(books);

  //   remove loading spinner after books are loaded
  booksWrapper.classList.remove("books__loading");

  if (filter === "LOW_TO_HIGH") {
    books.sort(
      (a, b) =>
        (a.salePrice || a.originalPrice) - (b.salePrice || b.originalPrice)
    );
  } else if (filter === "HIGH_TO_LOW") {
    books.sort(
      (a, b) =>
        (b.salePrice || b.originalPrice) - (a.salePrice || a.originalPrice)
    );
  } else if (filter === "RATING") {
    books.sort((a, b) => b.rating - a.rating);
  }

  const ratingsHTML = (rating) => {
    //   Rating fnction
    let ratingHTML = "";
    for (let i = 0; i < Math.floor(rating); ++i) {
      ratingHTML += '<i class="fas fa-star"></i>';
    }
    //   console.log(ratingHTML);
    if (!Number.isInteger(rating)) {
      ratingHTML += '<i class="fas fa-star-half-alt"></i>';
    }
    // console.log(ratingHTML);

    return ratingHTML;
  };

  //    price display
  const priceHTML = (originalPrice, salePrice) => {
    for (let i = 0; i < books.length; ++i) {
      console.log(books[i].originalPrice, books[i].salePrice);

      if (!salePrice) {
        return `$${originalPrice.toFixed(2)}`;
      }
      return `<span class="book__price--normal">$${originalPrice.toFixed(
        2
      )}</span> $${salePrice.toFixed(2)}   `;
    }
  };
  //   clear the existing books before re-rendering again
  booksWrapper.innerHTML = "";

  //   loop through books or use map
  for (let i = 0; i < books.length; ++i) {
    // console.log(books[i].title);

    booksWrapper.innerHTML += `<div class="book">
  <div class="book__img--wrapper">
    <img
      src=${books[i].url}
      alt="cash flow quandrant"
      class="book__img"
    />
  </div>
  <div class="book__title">${books[i].title}</div>
  <div class="reviews__wrapper">
    <div class="book__ratings">
      ${ratingsHTML(books[i].rating)}
    </div>
  </div>
  <div class="price">
${priceHTML(books[i].originalPrice, books[i].salePrice)}
   </div>
  </div>`;
  }
};
setTimeout(() => {
  renderBooks();
}, 1000);

// filter books
const filterBooks = (event) => {
  renderBooks(event.target.value);
};

// DUMMY DATA
function getBooks() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          title: "Crack the Coding Interview",
          url: "assets/crackTheCodingInterview.png",
          originalPrice: 49.95,
          salePrice: 14.95,
          rating: 4.5,
        },
        {
          id: 2,
          title: "Atomic Habits",
          url: "assets/AtomicHabits.jpg",
          originalPrice: 39,
          salePrice: null,
          rating: 5,
        },
        {
          id: 3,
          title: "Deep Work",
          url: "assets/deepWork.jpeg",
          originalPrice: 29,
          salePrice: 12,
          rating: 5,
        },
        {
          id: 4,
          title: "The 10X Rule",
          url: "assets/book-1.jpeg",
          originalPrice: 44,
          salePrice: 19,
          rating: 4.5,
        },
        {
          id: 5,
          title: "Be Obsessed Or Be Average",
          url: "assets/book-2.jpeg",
          originalPrice: 32,
          salePrice: 17,
          rating: 4,
        },
        {
          id: 6,
          title: "Rich Dad Poor Dad",
          url: "assets/book-3.jpeg",
          originalPrice: 70,
          salePrice: 12.5,
          rating: 5,
        },
        {
          id: 7,
          title: "Cashflow Quadrant",
          url: "assets/book-4.jpeg",
          originalPrice: 11,
          salePrice: 10,
          rating: 4,
        },
        {
          id: 8,
          title: "48 Laws of Power",
          url: "assets/book-5.jpeg",
          originalPrice: 38,
          salePrice: 17.95,
          rating: 4.5,
        },
        {
          id: 9,
          title: "The 5 Second Rule",
          url: "assets/book-6.jpeg",
          originalPrice: 35,
          salePrice: null,
          rating: 2,
        },
        {
          id: 10,
          title: "Your Next Five Moves",
          url: "assets/book-7.jpg",
          originalPrice: 40,
          salePrice: null,
          rating: 4,
        },
        {
          id: 11,
          title: "Mastery",
          url: "assets/book-8.jpeg",
          originalPrice: 30,
          salePrice: null,
          rating: 3,
        },
      ]);
    }, 1000);
  });
}
