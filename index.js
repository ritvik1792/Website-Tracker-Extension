
let links=[];
const input=document.querySelector('.input-field');
const inputbtn=document.querySelector('.button-field');
const list=document.querySelector('.list')

const clearBtn=document.querySelector('.clear-btn')
const savetab=document.querySelector(".save-tab-btn");

let icon=document.querySelector(".fa-circle-xmark");
let icon2=document.querySelector('.fa-bookmark')

let loadlinks=JSON.parse(localStorage.getItem("links"));



if(loadlinks){
    links=loadlinks;
    render(links);
}

input.addEventListener('keypress',function(e){
    if(e.key==="Enter"){
        inputbtn.click();
    }
})

inputbtn.addEventListener('click',function(){
    links.push(input.value);
    input.value="";
    localStorage.setItem("links",JSON.stringify(links))
    render(links);
})



clearBtn.addEventListener('click',function(){
    localStorage.clear();
    links=[];
    render(links);
})



savetab.addEventListener('click',function(){
    chrome.tabs.query({active:true, currentWindow: true}, function(tabs){
        /* tabs ={url: ""} */
        links.push(tabs[0].url);
        localStorage.setItem("links",JSON.stringify(links));
        render(links);
    })
})

function render(mylinks){
    let listItems="";
    mylinks.forEach(element => {
        listItems+=`
        <li>
            <a target='_blank' href='${element}'>${element}</a>
        </li>`
    });

    list.innerHTML=listItems;
}

// changes in icons
clearBtn.addEventListener('mouseover',()=>{
    icon.classList.remove("fa-spin");
    icon.classList.add("fa-bounce");
})
clearBtn.addEventListener('mouseout',()=>{
    icon.classList.remove("fa-bounce");
})

icon2.addEventListener('mouseover',()=>{
    icon2.classList.add('fa-shake')
})
icon2.addEventListener('mouseout',()=>{
    icon2.classList.remove('fa-shake')
})