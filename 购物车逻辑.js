function chooseItem(){
    let shoppingList = document.getElementById("shopping-cart");
    EventUtil.addHandler(shoppingList, "click", function(event){
        // event = EventUtil.getEvent(event);
        let target = (EventUtil.getTarget(event).className == "cell")?EventUtil.getTarget(event): ((EventUtil.getTarget(event).parentElement.className == "cell")?(EventUtil.getTarget(event).parentElement):(EventUtil.getTarget(event).parentElement.parentElement));
        if(target.className == "cell") {
            let checkbox = getCheckbox(target);
            checkbox.checked = (checkbox.checked) ? false : true;
            document.getElementById("total-price").textContent = countTotalPrice().toString();
        }
    });
}

function deleteItem(self) {
    // 不会冒泡触发父元素的勾选事件
    event.stopPropagation();
    let cell = self.parentElement.parentElement;
    getCheckbox(cell).checked = false;
    document.getElementById("total-price").textContent = countTotalPrice().toString();
    cell.style.display = "none";
    hidePageIfNull();
    // 取消button的默认行为submit 同时 <button class="del" onclick="return deleteItem(this);">Delete</button>
    return false;
}

// 当购物车为空时隐藏翻页选项
function hidePageIfNull() {
    let count = 0;
    let cellList = document.getElementsByClassName("cell");
    for (let i = 0; i < cellList.length; i++)
        if(cellList[i].style.display == "none") count++;
    if(count == cellList.length){
        document.getElementById("change-page").style.display = "none";
    }
}

// 获取商品的被选状态
function getCheckbox(cell) {
    return cell.firstElementChild.firstElementChild;
}

//获取商品的价格
function getCellPrice(cell) {
    return parseInt(cell.lastElementChild.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.getAttribute("data-price"));
}

function countTotalPrice() {
    let tp = 0;
    let cellList = document.getElementsByClassName("cell");
    for (let i = 0; i < cellList.length; i++)
        if(getCheckbox(cellList[i]).checked){
            tp += getCellPrice(cellList[i]);
        }
    return tp;
}

function pay() {
    if(countTotalPrice()>0){
        let tp = document.getElementById("total-price");
        let cellList = document.getElementsByClassName("cell");
        alert(`Payment Success: $ ${tp.textContent} .`);
        for (let i = 0; i < cellList.length; i++){
            if(getCheckbox(cellList[i]).checked){
                cellList[i].style.display = "none";
                tp.textContent = "0";
            }
        }
        hidePageIfNull();
    }
    else{
        alert("Payment failure. Please choose at least 1 item.")
    }
    return false;
}