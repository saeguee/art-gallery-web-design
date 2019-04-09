var cell = document.getElementsByClassName("cell");
function changeKeyword(){
    let keyword = localStorage.getItem("keyword");
    document.getElementsByClassName("searched-keyword")[0].textContent = keyword;
    if(keyword === "33"){
        showResult();
    }
    else{
        foundNothing();
    }
}

function showResult() {
    // 商品正常展示
    for (let i = 0; i < cell.length; i++) {
        cell[i].style.display="inline";
    }
    // 页码正常展示
    for (let i = 1; i < 10; i++) {
        document.getElementsByClassName("pc")[i].style.display="inline";
    }
    if(document.getElementById("search-result").lastChild.nodeName=="H1"){
        document.getElementById("search-result").lastChild.display="none";
    }
}

function foundNothing() {
    document.getElementById("change-page").style.display="none";
    for (let i = 0; i < cell.length; i++) {
        cell[i].style.display="none";
    }
    // nodeName全大写 如"BODY"
    if(document.getElementById("search-result").lastChild.nodeName!="H1"){
        let resultNothing = document.createElement("h1");
        resultNothing.innerText="Oh NO!!!Nothing is found!!! 😫";
        resultNothing.style.margin="50px auto";
        resultNothing.style.fontSize="50px";
        document.getElementById("search-result").appendChild(resultNothing);
    }
    else{
        document.getElementById("search-result").lastChild.style.display="inline";
    }
}

function returnSearchResult(){
    let keyword = document.getElementById("search-form").getElementsByTagName("input")[0].value;
    localStorage.setItem("keyword", keyword);
    window.open("搜索.html");
}

function sortByPrice() {
    let tmp = cell[0].innerHTML;
    cell[0].innerHTML = cell[1].innerHTML;
    cell[1].innerHTML = tmp;
}

function sortByDate() {
    let tmp = cell[0].innerHTML;
    cell[0].innerHTML = cell[2].innerHTML;
    cell[2].innerHTML = tmp;
}

function sortByHeat() {
    let tmp = cell[1].innerHTML;
    cell[1].innerHTML = cell[2].innerHTML;
    cell[2].innerHTML = tmp;
}