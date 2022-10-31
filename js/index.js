
const fetchCategory = async () => {
  try {
    const url = `https://openapi.programming-hero.com/api/news/categories`
    const wait = await fetch(url);
    const data = await wait.json();
    return data.data;
  }
  catch (err) {

    alert('error');
  }
}



const setAllCategory = async () => {
  const fetch = await fetchCategory();
  const categories = document.getElementById('all_category');

  const allData = fetch.news_category;

  allData.forEach(data => {
    const categoryDiv = document.createElement('div');
    categoryDiv.classList.add('col');
    categoryDiv.innerHTML = `
        <div class="card-body">
        <button  onclick="individualCategory('${data.category_id}');toggleSpinner(true)" class="btn btn-link shadow-none text-decoration-none"><h5 class="card-title text-dark fw-bold">${data.category_name}</h5></button>
       
        </div>
      `;

    categories.appendChild(categoryDiv);
  })
}
setAllCategory();


const toggleSpinner = isLoading => {
  const loader = document.getElementById('spinner');
  if (isLoading) {
    loader.classList.remove('d-none');
  }
  else {
    loader.classList.add('d-none');
  }

}




const individualCategory = async (id) => {
  try {
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`

    const wait = await fetch(url);
    const data = await wait.json();
    if (data.data.length === 0) {
      alert('Data not found');
      setIndividualCategory(data.data);
    }
    else {
      setIndividualCategory(data.data);
    }


  }
  catch (err) {

    alert('error');
  }

  toggleSpinner(false);

}



const setIndividualCategory = async (load) => {

  const category = document.getElementById('individual_category');

  category.textContent = '';

  const articles = load;
  const allDataLength = load.length;

  articles.sort((e1, e2) => {
    return e2.total_view - e1.total_view
  });
  console.log(articles)
  const allData = articles;

  categoryLength(allDataLength);

  allData.forEach(data => {
    const individualCategoryDiv = document.createElement('div');

    individualCategoryDiv.classList.add('row');
    individualCategoryDiv.innerHTML = `

      <div class=" col-lg-10 col-sm-12 g-4">
            <div class="card  d-flex flex-sm-row flex-lg-row ">
              <div class=" col-lg-5 col-sm-7">
              <img src="${data.thumbnail_url}" class="card-img-top img-fluid" alt="...">
              </div>
              <div class="card-body col-lg-5 col-sm-6 d-flex flex-column  justify-content-center">
                  <h6 class="card-title fw-bold fs-3">${data.title}</h6>                
                  <p class="card-text text-limit font-size:2vw">${data.details}</p>
                  <div  class=" col-lg-5 col-sm-5">
                      <div class="mr-5 d-flex">
                          <img src="${data.author.img}" class="rounded-circle img-size img-fluid" alt="...">
                          <h6 class="card-title fw-bold m-3">${data.author.name ? data.author.name : '<span class="text-info">Unknown</span>'}</h6>
                        </div>
                        <div class="mt-5 pl-5 ">
                      <h6 class="card-title fw-bold "><svg xmlns="http://www.w3.org/2000/svg" class="m-3" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>${data.total_view} M</h6>
                      </div>
                  </div>
                  <button  onclick=" loadArticleDetails('${data._id}') " type="button" class="btn btn-info" data-toggle="modal" data-target="#articleDetailsModal">
                  More Details
                  </button>
                 </div>
            </div>
          </div>
   
      `;

    category.appendChild(individualCategoryDiv);
  })


}


const categoryLength = (len) => {
  const div = document.getElementById('total-article')
  div.textContent = '';
  const totalArticle = document.createElement('div');
  if (len > 0) {
    totalArticle.innerHTML = `
      <h4 class="fw-bold m-5 text-info border border-primary p-4">${len} article found for this category </h4>
               
     
      `;
  }
  else {
    totalArticle.innerHTML = `
      <h4 class="fw-bold m-5 text-info border border-primary p-4">No article is found for this category</h4>
      `;
  }

  div.appendChild(totalArticle);

}

const loadArticleDetails = async news_id => {
  const url = ` https://openapi.programming-hero.com/api/news/${news_id}`;
  const wait = await fetch(url);
  const data = await wait.json();
  displayArticleDetails(data.data);

}




const displayArticleDetails = article => {
  const modalTitle = document.getElementById('articleDetailsModalLabel');
  modalTitle.innerText = article[0].title;

  const modalDetails = document.getElementById('single');
  modalDetails.innerHTML = `
  <div class="m-3 d-flex">
      <img src="${article[0].author.img}" class="rounded-circle  img-size img-fluid" alt="...">
      <h6 class="card-title fw-bold m-3 mt-2">Author Name: ${article[0].author.name ? article[0].author.name : '<span class="text-info">Unknown</span>'}</h6>
 
  </div> 
  
  <p> ${article[0].details}</p>

  <h6 class="card-title fw-bold "><svg xmlns="http://www.w3.org/2000/svg" class="m-3" height="24px" viewBox="0 0 24 24" width="20px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>${article[0].total_view ? article[0].total_view : '<span class="text-info">No view</span>'} M</h6>`;
}












