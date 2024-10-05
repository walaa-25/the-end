let title=document.getElementById('title');
let price=document.getElementById('price');
let taxes=document.getElementById('taxes');
let ads=document.getElementById('ads');
let discount=document.getElementById('discount');
let total=document.getElementById('total');
let count=document.getElementById('count');
let catogery=document.getElementById('catogery');
let create=document.getElementById('create');
let mood='create';
let temp;
function getTotal(){
    if(price.value !='')
    {
        let result=(+price.value+ +taxes.value + +ads.value )- +discount.value;
        total.innerHTML=result;
        total.style.background='green';
    }
    else{
        total.style.background='red';
    }
}
let dataPro;
if(localStorage.product!=null){
    dataPro=JSON.parse(localStorage.product);
}
else{
    dataPro=[];
}

create.onclick=function(){
    let newPro={
        title:title.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        catogery:catogery.value,
    }
    if(mood==='create'){
        if(newPro.count>1){
            for(let i=0;i<newPro.count;i++)
            {
                dataPro.push(newPro);
            }
        }
        else
        {dataPro.push(newPro);
    
        }

    }
    else{
        dataPro=[temp]=newPro;
        mood='create';
        create.innerHTML='create';
    }

    localStorage.setItem( 'product',JSON.stringify(dataPro));
    clear();
    dataShow()
}
function clear(){
    title.value='';
    price.value='';
    taxes.value='';
    ads.value='';
    discount.value='';
    total.innerHTML='';
    count.value='';
    catogery.value='';
}
function dataShow(){
    getTotal();
    let table='';
    for(let i=0;i<dataPro.length;i++)
    {
        table +=`
                            <tr>
                        <td>${i}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].catogery}</td>
                        <td><button onclick="updateData(${i})" id="update" >update</button></td>
                        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                    </tr>`
    }
    document.getElementById('tbody').innerHTML=table;
    let btndelete=document.getElementById('deleteAll');
    if(dataPro.length>0){
        btndelete.innerHTML=`
        <button onclick="deleteall()">delete All(${dataPro.length})</button>`
    }
    else{
        btndelete.innerHTML='';
    }
}
function deleteall(){
    localStorage.clear();
    dataPro.splice(0);
    dataShow();
}
dataShow();
function deleteData(i){
    dataPro.splice(i,1);
    localStorage.product=JSON.stringify(dataPro);
    dataShow();
}
function updateData(i){
    title.value=dataPro[i].title;
    price.value=dataPro[i].price;
    taxes.value=dataPro[i].taxes;
    ads.value=dataPro[i].ads;
    discount.value=dataPro[i].discount;
    getTotal();
    count.style.display='none';
    catogery.value=dataPro[i].catogery;
    create.innerHTML='update';
    mood='update';
    temp=i;
    scroll({
        top:0,
        behavior:'smooth',
    })
    dataShow();
}

