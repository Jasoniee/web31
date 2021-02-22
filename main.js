fetch("data.json")
  .then(response => {
    return response.json();
  })
  .then(data => {
    const queryString = window.location.search;
    renderPage(queryString, data);
  });
function renderPage(queryString,data){
  if(queryString.includes("project")){
    var proj=queryString.replace("?project=","");
    data.projects.forEach(function(project){
      if(project.id===proj){
        renderProjectPage(project);
      }
                          });
  }
    else{
      renderMainPage(data);
    }
}
function renderProjectPage(pdata){
  document.querySelector(".container").innerHTML=`
    <section>
      <ul class="goBack">
        <li><a href="index.html">Go Back</a></li>
      </ul>
      <div class="project-header">
      <h1>${pdata.title}</h1>
        <div class="tagContainer">
          ${renderTags(pdata.tags)}
        </div>
      </div>
      ${renderProjectImages(pdata.teaser)}
      <p>${pdata.description}</p>
      <a href="${pdata.materials[0].path}">${pdata.materials[0].label}</a>
    </section>
    `
}
function renderMainPage(data) {
  document.querySelector(".container").innerHTML= `
        ${renderNavbar("main", Object.keys(data))}
        ${renderAbout(data.about)}
        ${renderNews(data.news)}
        ${renderProjects(data.projects)}
    `;
}
function renderNavbar(pname,page){
  var links='';
  page.forEach(function(item,index){
               console.log(item,index);
    links+=`<li><a href="#${item}">${item}</a></li>`;
  });
  var whole=`
      <nav>
      <ul>
        ${links}</ul></nav>
      `;
  return whole;
}
function renderAbout(about){
  return `<section id="about" class="a-container">
  <h1> ${about.name}</<h1>
    <div class="row">
    <div class="col-6">
      <div class="subsection">
      <img class="ab-container"id="profile-png" src="${about.photo}"/></div></div>
      <div class="col-6">
      <div class="subsection">
          <p><strong>${about.title} </strong></p>
        <p>${about.email}</p>
    </div>
    <div class="subsection">
    <p>
      ${about.intro}</p>
    </div>
            </div>
            </div>
            </section>
            `;
}
function renderNews(news) {
  return `
  <section id="news" class="a-container">
      <h1>
        News
      </h1>
      <div class="subsection">
        ${renderNewsList(news)}
      </div>
    </section>
  `;
}
function renderNewsList(news) {
  return news
    .map(
      d => `
  <p>${d.title}</p>
        <p>${d.date}</p>
  `
    )
    .join("");
}
function renderProjects(projects) {
  return `
    <section id="projects" class="a-container">
      <h1>
        Projects
      </h1>
      ${renderProjectItems(projects)}
    </section>`;
}
function renderProjectItems(projects) {
  return projects
    .map(
      d => `
	  <div class="subsection">
        <div class="proj-header">
          <a href="?project=${d.id}" class="proj-title"><h3>${d.title}</h3></a>
          <div class="tag-container">
            ${renderTags(d.tags)}
          </div>
        </div>
        <p>${d.description}</p>
        ${renderProjectImages(d.teaser)}
      </div>
	`
    )
    .join("");
}
function renderTags(tags) {
  return `
  <label class="tag ML-tag">Machine Learning <br><br></label>
            <label class="tag NLP-tag">NLP</label>
  `;
}

function renderProjectImages(teaser) {
  var cols = ``;

  teaser.forEach(function(item) {
    cols += `<div class="col-6">
            <img
              src="${item}"
            />
          </div>`;
  });

  return `<div class="row">
          ${cols}
        </div>`;
}
