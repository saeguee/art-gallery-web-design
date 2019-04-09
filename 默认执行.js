function defaultOnload(){
    deleteAutoInput();
    loadLoginInfo();
    createCode();
    loadPopBox();
}

function searchOnload() {
    defaultOnload();
    pageButtonHideCheck();
    switchToPage();
    changeKeyword();
}

function shoppingListOnload() {
    defaultOnload();
    pageButtonHideCheck();
    switchToPage();
    chooseItem();
}

window.onload = function () {
    defaultOnload();
};

let play = true;

function homePageOnload(){
    defaultOnload();
    let imgNum = 3;
    let imgWidth = 1200;
    setInterval(function () {
        if(play)setCarousel(imgNum, imgWidth);
    },10);
    function setCarousel(imgNum, imgWidth) {
        let x=document.getElementById("cra").style.left;
        x = x.replace("px",""); //过滤掉后面的px
        if((Number(x)%imgWidth)===0){
            play = false;
            setTimeout("move()", 2000);
        }
        if(Number(x) === (-imgNum*imgWidth))
            document.getElementById("cra").style.left = "0px";
        else{
            x = Number(x)-1;//左移1px的距离
            document.getElementById("cra").style.left = x+"px";
        }
    }
    // document.getElementById("wrapper").addEventListener("mouseenter", ()=>{play = false;})
    // document.getElementById("wrapper").addEventListener("mouseleave", ()=>{play = true;})
}

function move(){
    play = true;
}

function deleteAutoInput() {
    let inputList = document.getElementsByTagName("input");
    for (let i = 0; i < inputList.length; i++) {
        inputList[i].autocomplete = "off";
    }
}

function loadLoginInfo(){
    let un = localStorage.getItem("username");
    if(un !== null){
        let a1 = document.getElementById('loginOrUsername');
        let a2 = document.getElementById('registerOrExit');
        a1.textContent = un;
        a1.onclick = null;
        a1.href="个人信息界面.html";

        a2.textContent ='Exit';
        a2.onclick = ()=>{
            localStorage.clear();
            location.reload();
        }
        let navShoppingCart = document.createElement("a");
        navShoppingCart.setAttribute("id",  "nav-shopping-cart");
        if(localStorage.getItem("cart")===null)
            localStorage.setItem("cart","0");
        navShoppingCart.textContent = `Shopping cart (${localStorage.getItem("cart")})`;
        navShoppingCart.href = "购物车.html";
        document.getElementsByClassName("nav-list")[0].appendChild(navShoppingCart);
    }
}

var EventUtil={
    addHandler:function(element,type,handler){ //添加事件
        if(element.addEventListener){
            element.addEventListener(type,handler,false);  //使用DOM2级方法添加事件
        }else if(element.attachEvent){                    //使用IE方法添加事件
            element.attachEvent("on"+type,handler);
        }else{
            element["on"+type]=handler;          //使用DOM0级方法添加事件
        }
    },

    getEvent:function(event){  //使用这个方法跨浏览器取得event对象
        return event?event:window.event;
    },

    getTarget:function(event){  //返回事件的实际目标
        return event.target||event.srcElement;
    },
};

function switchToPage(){
    let list = document.getElementById("change-page");
    EventUtil.addHandler(list, "click", function(event){
        event = EventUtil.getEvent(event);
        let target = EventUtil.getTarget(event), cp = document.getElementById("current-page"), pp = document.getElementById("previous-page"), np = document.getElementById("next-page");
        if(target !== cp){
            if(!(target === pp || target === np || target.className === "pc"))
                return;
            if(target === pp){
                if(cp.textContent !== "1")
                    cp.previousElementSibling.id="current-page";
            }
            else if(target === np) {
                if(cp.textContent !== "10")
                    cp.nextElementSibling.id="current-page";
            }
            else
                target.id="current-page";
            cp.removeAttribute("id");
            pageButtonHideCheck();
        }
    });
}

function pageButtonHideCheck(){
    let newP = document.getElementById("current-page"), pp = document.getElementById("previous-page"), np = document.getElementById("next-page");
    pp.style.display = (newP.textContent === "1")?"none":"inline";
    np.style.display = (newP.textContent === "10")?"none":"inline";
}

// 商品详情.js
function addToCart() {
    if(localStorage.getItem("username")===null)
        loginPopBox();
    else{
        let rand = Math.random();
        if(rand < 0.5){
            alert("Fail to add to cart. Network interruption.");
        }
        else{
            alert(`Add it to cart successfully!`);
            let currentCart = parseInt(localStorage.getItem("cart"))+1;
            localStorage.setItem("cart", currentCart.toString());
            document.getElementById("nav-shopping-cart").textContent = `Shopping cart (${localStorage.getItem("cart")})`;
            if(currentCart === 1)
                window.location.reload();
        }
    }
    return false;
}