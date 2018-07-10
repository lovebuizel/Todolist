var ary = JSON.parse(localStorage.getItem("thing")) || [];
var btn = document.querySelector('.btn');
var text = document.querySelector('.text');
var list = document.querySelector('.list');
//繪製清單
function update(){
    var str = "";
    for(i=0;i<ary.length;i++){
        str += '<input type="text" class="addInput"></input><li data-num="'+i+'" class = "clearfix">' + ary[i] + '<a href="#"><i class="icon-trash-empty delete"></i></a><a href="#"><i class="icon-pencil edit"></i></a></li>';
    }
    list.innerHTML = str;
}
//新增清單
function checkAdd(){
    if(text.value !== ""){
        ary.push(text.value);
        update();
        text.value = "";
        localStorage.setItem("thing", JSON.stringify(ary));
    }
}
//刪除清單
function checkDelete(e){
    if(e.target.nodeName == "I" && e.target.className == "icon-trash-empty delete"){
        e.preventDefault();
        ary.splice(e.target.parentNode.parentNode.dataset.num,1);
        update();
        localStorage.setItem("thing", JSON.stringify(ary));
    }
}
//開啟編輯清單
function checkEdit(e){
    if(e.target.nodeName == "I" && e.target.className == "icon-pencil edit"){
        e.preventDefault();
        e.target.parentNode.parentNode.previousElementSibling.style.display = "block";
        e.target.parentNode.parentNode.previousElementSibling.focus();
        e.target.parentNode.parentNode.previousElementSibling.value = ary[e.target.parentNode.parentNode.dataset.num];
        e.target.parentNode.parentNode.previousElementSibling.addEventListener('blur',editUpdate,false);
        e.target.parentNode.parentNode.previousElementSibling.addEventListener('keydown',function(e){
            if(e.keyCode == 13){
                editUpdate(e);
            }
        },false);
    }
}
//關閉編輯清單並更新
function editUpdate(e){
    e.target.style.display = "none";
    num = e.target.nextElementSibling.dataset.num;
    ary[num] = e.target.value;
    update();
    localStorage.setItem("thing", JSON.stringify(ary));
}
//初始化
update();
btn.addEventListener('click',checkAdd,false);
list.addEventListener('click',checkDelete,false);
list.addEventListener('click',checkEdit,false);
text.addEventListener('keydown',function(e){
    if(e.keyCode == 13){
        checkAdd();
    }
},false);