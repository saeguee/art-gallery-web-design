/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2019-03-21 00:34:10
 * @version $Id$
 */
function loginPopBox() {
    let popBox = document.getElementById("login-popBox");
    let popLayer = document.getElementById("login-popLayer");
    popBox.style.display = "block";
    popLayer.style.display = "block";
};

// 点击关闭按钮
function loginCloseBox() {
    let popBox = document.getElementById("login-popBox");
    let popLayer = document.getElementById("login-popLayer");
    popBox.style.display = "none";
    popLayer.style.display = "none";
}

// 全局变量code保存验证码
var code;
function createCode(){
    // 默认code为空字符串
    code = '';
    // 长度4
    let codeLength = 4;
    let codeV = document.getElementById('code');
    // 设置随机字符
    let random = new Array(0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R', 'S','T','U','V','W','X','Y','Z');
    // 循环codeLength
    for(let i = 0; i < codeLength; i++){
        // 随机数范围0-36
        let index = Math.floor(Math.random()*36);
        // 将每次随机的字符拼接
        code += random[index];
    }
    // 拼接好的字符串赋值给展示的Value
    codeV.value = code;
}

function validate(){
    let oValue = document.getElementById('captcha-input').value.toUpperCase();
    let loginUserName = document.getElementById('login-username').value;
    // let loginPassword = document.getElementById('login-password').value;
    // let a1 = document.getElementById('loginOrUsername');
    // let a2 = document.getElementById('registerOrExit');
    if(oValue != code){
        alert('验证码不正确，请重新输入！');
        createCode();
    }
    else if(loginUserName == "hlt"){
        alert("登录失败！用户不存在！");
    }
    else if(loginUserName =='sqq'){
        alert('登录失败！密码错误！');
    }
    else{
        localStorage.setItem("username", loginUserName);
        localStorage.setItem("cart", "0");
        loadLoginInfo();
        loginCloseBox();
    }
    return false;
}

function registerError() {
    let rand = Math.random();
    if(rand < 0.5){
        alert("Fail to register. Username already exists.");
        return false;
    }
    else{
        alert("Register successfully！");
    }
}

// 点击弹出按钮
function registerPopBox() {
    let popBox = document.getElementById("register-popBox");
    let popLayer = document.getElementById("register-popLayer");
    popBox.style.display = "block";
    popLayer.style.display = "block";
}

// 点击关闭按钮
function registerCloseBox() {
    let popBox = document.getElementById("register-popBox");
    let popLayer = document.getElementById("register-popLayer");
    popBox.style.display = "none";
    popLayer.style.display = "none";
}

function regExpMatch(){
    let pattern = getRegExpPattern(this);

    // 每个input的错误提示(若有)显示在其右侧的span中
    let checkSpan = this.nextElementSibling;
    checkSpan.style.visibility = "visible";
    if(this.value === "")
        checkSpan.innerText =`${this.name.toUpperCase()} cannot be empty`;
    else{
        // 错误:密码不能与用户名相同
        if(this.name === "password"){
            let un =  this.parentElement.previousElementSibling.firstElementChild.nextElementSibling;
            if(this.value === un.value){
                checkSpan.innerText = `PASSWORD cannot be the same as the USERNAME.`;
                return;
            }
        }
        // 错误：确认密码必须与密码不一致
        else if(this.name === "repeat-password"){
            let pw =  this.parentElement.previousElementSibling.firstElementChild.nextElementSibling;
            if(this.value !== pw.value){
                checkSpan.innerText = `This PASSWORD must be the same as the above one.`;
                return;
            }
        }
        // 其他输入格式错误
        if(!pattern.test(this.value)){
            checkSpan.innerText = getCheckSpan(this);
        }
        else{
            checkSpan.style.visibility = "hidden";
        }
    }
}

function getCheckSpan(input){
    switch (input.name) {
        case "username":
            return `USERNAME contains >= 6 characters, including at least 1 letter and 1 number. e.g"christ304".`;
        case "password":
            return `PASSWORD contains >= 6 characters, not the same as the username, e.g."peppep".`;
        case "repeat-password":
            return `This PASSWORD must be the same as the above one.`;
        case "phone":
            return `TEL must be 11 pure number, e.g."13577913125"`;
        case "captcha":
            return `CAPTCHA contains 4 characters.`
        default:
            return "";
    }
}
function getRegExpPattern(input){
    switch (input.name) {
        case "username":
            return /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}$/;
        case "password":
            return /^.{6,}$/;
        case "repeat-password":
            return /^.{6,}$/;
        case "phone":
            return /^\d{11}$/;
        case "captcha":
            return /^[0-9a-zA-Z]{4}$/
        default:
            return /^.{6,20}$/;
    }
}

function setSubmit(submitID, state) {
    if(submitID !== null && submitID !=="" && document.getElementById(submitID) !== null){
        let s = document.getElementById(submitID);
        s.disabled = (!state);
        s.style.backgroundColor = (state)?"black":"grey";
    }
}

function checkSubmit(formN, submitID) {
    let checkSpanList = document.getElementsByTagName("form")[formN].getElementsByTagName("span");
    let invalid = checkSpanList.length;
    for (let i = 0; i < checkSpanList.length; i++)
        if(checkSpanList[i].style.visibility === "hidden")
            invalid--;
    setSubmit(submitID,(invalid===0));
    return false;
}

function RegExpCheckIn(formID){
    let inputList = document.getElementById(formID).getElementsByTagName("input");
    for (let i = 0; i < inputList.length; i++) {
        inputList[i].addEventListener("keyup",regExpMatch);
    }
}

function loadPopBox() {
    //表单输入实时错误提示功能 register-form与login-form中的input每输入1个字符进行实时错误提示
    RegExpCheckIn("register-form");
    RegExpCheckIn("login-form");

    // disabled 的 true和false 不用加引号
    setSubmit("login-submit",false);
    setSubmit("register-submit",false);

    // 完整的 key press 过程分为两个部分，按键被按下，然后按键被松开并复位。
    // 当按钮被松开时，发生 keyup 事件。它发生在当前获得焦点的元素上
    document.getElementsByTagName("form")[1].addEventListener("keyup",checkSubmit.bind(null, 1,"login-submit"));
    document.getElementsByTagName("form")[2].addEventListener("keyup",checkSubmit.bind(null, 2,"register-submit"));
}