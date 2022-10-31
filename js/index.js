const fetchCategory = async () => {
  try {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const data = await res.json();
    return data.data;
  } catch (err) {
    alert("error");
  }
};

const setAllCategory = async () => {
  const fetch = await fetchCategory();
  const categories = document.getElementById("all-category");

  const allData = fetch.news_category;

  allData.forEach(data => {
    const categoryDiv = document.createElement("div");
    categoryDiv.classList.add("col");
    categoryDiv.innerHTML = `
        <div class="card-body ">
        <button  onclick="individualCategory('${data.category_id}');toggleSpinner(true)" class="btn btn-link shadow-none text-decoration-none"><h6 class="card-title text-primary fw-bold">${data.category_name}</h6></button>
       
        </div>
      `;

    categories.appendChild(categoryDiv);
  });
};

setAllCategory();
