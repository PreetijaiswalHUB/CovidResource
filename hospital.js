function getHospital() {
    $("#elements").html(`<div id="loader-center"><div class="loader">   
    <span class="box"></span>   
    <span class="box"></span>  
    <div class="code"> 
    </div>    
    <span class="txt" style="font-family:calibri; font-size:15px;top:90%;"><br><b>Best when its on YOU!</b></span>
    </div></div>`)
  
  
    fetch("/get_hospital").then((res) =>
      res
      .json()
      .then((data) => {
        array = data;
        //console.log(data);
  
        myVar = showPage();
  
        function showPage() {
          document.getElementsByClassName("city")[0].style.display = "none";
  
          for (i = 1; i < 40; i++) {
            var div = document.createElement("div");
            div.id = "grid-item-" + i;
            div.setAttribute("class", "grid-item");
            document.getElementById("elements").appendChild(div);
            document.getElementById(
              div.id
            ).innerHTML = `<img src="${array[i].src}" class="zoom"></img><div id="name" style="font-family:Verdana;">${array[i].name}</div><span>${array[i].city}</span><div style="display:none">${array[i].address}</div>`;
          }
        }
      })
      .catch((err) => console.log(err))
    );
  }