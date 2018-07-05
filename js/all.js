var ary = JSON.parse(localStorage.getItem("thing")) || [];
var btn = document.querySelector('.btn');
var text = document.querySelector('.text');
var list = document.querySelector('.list');
function update(){
    var str = "";
    for(i=0;i<ary.length;i++){
        str += '<li data-num="'+i+'"><a href="#" class="delete">X</a>' + ary[i] + '</li>';
    }
    list.innerHTML = str;
}
function checkAdd(){
    if(text.value !== ""){
        ary.push(text.value);
        update();
        text.value = "";
        localStorage.setItem("thing", JSON.stringify(ary));
    }
}
function checkDelete(e){
    if(e.target.nodeName == "A"){
        e.preventDefault();
        ary.splice(e.target.parentNode.dataset.num,1);
        update();
        localStorage.setItem("thing", JSON.stringify(ary));
    }
}
update();
btn.addEventListener('click',checkAdd,false);
list.addEventListener('click',checkDelete,false);
text.addEventListener('keydown',function(e){
    if(e.keyCode == 13){
        checkAdd();
    }
},false)