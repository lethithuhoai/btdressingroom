const getElement = (selector) => document.querySelector(selector);
const getElementAll = (selector) => document.querySelectorAll(selector);

function callAPIGet() {
  const promise = axios({
    url: "https://649e04749bac4a8e669e8718.mockapi.io/dresssingroom",
    method: "GET",
  });
  promise
    .then(function (result) {
      let contentTab = "";
      const navPills = result.data[0].navPills;
      const tabPanes = result.data[0].tabPanes;
      localStorage.setItem("navPills", JSON.stringify(navPills));
      localStorage.setItem("tabPanes", JSON.stringify(tabPanes));
      navPills.forEach((e) => {
        let contentItem = "";
        if (e.showName == "Áo") {
          contentTab += `
			<li class="nav-item">
			<a class="nav-link active" data-toggle="tab" id="${e.tabName}" href="#${e.type}" onclick=zIndex(${e.tabName}) >${e.showName}</a>
		  </li>`;
          getElement(
            ".tab-content"
          ).innerHTML += `<div id="${e.type}" style="display:flex"   class="tab-pane fade active in show"></div>	`;
        } else {
          contentTab += `
		<li class="nav-item">
		<a class="nav-link" data-toggle="tab" id="${e.tabName}" href="#${e.type}" onclick=zIndex(${e.tabName}) >${e.showName}</a>
	  </li>`;
          getElement(
            ".tab-content"
          ).innerHTML += `<div id="${e.type}" style="display: none" class="tab-pane fade"></div>	`;
        }

        let typeItem = tabPanes.filter((b) => b.type == e.type);
        typeItem.forEach((c) => {
          contentItem += `
			<div class="card" ">
 			 <img class="card-img-top" src="${c.imgSrc_jpg}" alt="Card image cap">
  			<div class="card-body">
    		<h5 class="card-title">${c.name}</h5>
    		<button class="btn btn-primary" id="${c.id}" onclick="choseItem(${c.id})">Thử đồ</button>
  		</div>
		</div>`;
        });
        getElement(`#${e.type}`).innerHTML = contentItem;
      });
      getElement(".nav-pills").innerHTML = contentTab;
    })
    .catch(function (err) {
      alert(err);
    });
}
callAPIGet();

const choseItem = (id) => {
  const item = JSON.parse(localStorage.getItem("tabPanes")).filter(
    (i) => i.id == id.id
  );
  if (item[0].type == "topclothes") {
    getElement(".bikinitop").style.background =
      "url(" + item[0].imgSrc_png + ")";
  } else if (item[0].type == "botclothes") {
    getElement(".bikinibottom").style.background =
      "url(" + item[0].imgSrc_png + ")";
  } else if (item[0].type == "shoes") {
    getElement(".feet").style.background = "url(" + item[0].imgSrc_png + ")";
  } else if (item[0].type == "handbags") {
    getElement(".handbag").style.background = "url(" + item[0].imgSrc_png + ")";
  } else if (item[0].type == "necklaces") {
    getElement(".necklace").style.background =
      "url(" + item[0].imgSrc_png + ")";
  } else {
    console.log(item[0].type);
    getElement(`.${item[0].type}`).style.background =
      "url(" + item[0].imgSrc_png + ")";
  }
};

const zIndex = (tabname) => {
  let listItem = JSON.parse(localStorage.getItem("navPills"));
  listItem.forEach((e) => {
    if (e.tabName === tabname.id) {
      getElement(`#${e.type}`).style.display = "flex";
    } else {
      getElement(`#${e.type}`).style.display = "none";
    }
  });
};
