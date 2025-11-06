

loadCatagories=()=>{
    const url='https://openapi.programming-hero.com/api/categories'
    fetch(url)
    .then(response=>response.json())
    .then(data=>displayCatagories(data.categories))
}


// creat a function for display catagories

const displayCatagories=(catagories)=>{

    // select the catagories container
    const catagoriesConatainer=document.getElementById('catagories-container')
// Empty the container
    catagoriesConatainer.innerHTML=''
// using loop to console one by one element
    catagories.forEach(element => {
        
// creat HTML button
const catagoriesButton=document.createElement('div')
catagoriesButton.innerHTML=`
 <div onclick="catagoies_Sets(${element.id})" id="cat-btn-${element.id}"  class="btn-catagory block p-2 rounded-lg text-gray-700 hover:bg-gray-100 font-semibold transition">${element.category_name}</div>

`

// append the child

catagoriesConatainer.append(catagoriesButton)




    });



}


// button ways catagories loading


catagoies_Sets=(id)=>{
// spinner
  document.getElementById("loading-spinner").classList.remove("hidden");
document.getElementById("card-box").classList.add("hidden");

    const url1=`https://openapi.programming-hero.com/api/category/${id}`
    fetch(url1)
    .then(res=>res.json())
    .then(data=>catagories_types(data.plants))

    // Highlight the active catagory

    // 1. select all the catagory btn

const catBtns=document.querySelectorAll(".btn-catagory")
// 2.use function for if anyone have the highlight style class to remov the class

catBtns.forEach((btn)=>btn.classList.remove("cat-btn"))

// 3.select the catagory dynamically which you clicked

const clickedCard=document.getElementById(`cat-btn-${id}`)
// 4.add the style class list
clickedCard.classList.add("cat-btn")



    
}

const catagories_types=(type)=>{
     
    const card_container=document.getElementById('tree-container')
    
    card_container.innerHTML=''
    
    type.forEach(element1=>{

const type_card=document.createElement('div')
type_card.innerHTML=`
<div onclick="cartDetails(${element1.id})" class="bg-white rounded-xl shadow-lg p-4 border border-gray-100">
           <div class="  rounded-lg mb-4">
               <img class='w-full h-48 object-cover' src="${element1.image}" alt="">
           </div>
        <div>
          <h3 class="text-xl font-bold text-gray-800 mb-1">${element1.name}</h3>
          <p class="text-sm text-gray-600 mb-4">
          ${element1.description}
          </p>
          <div class="flex justify-between items-center mb-4">
            <span class="text-xs font-semibold bg-green-100 text-green-700 py-1 px-3 rounded-full">${element1.category}</span>
            <span class="text-lg font-bold text-gray-800">${`${element1.price}`}</span>
          </div>
          <button onclick="addCart(event,this)" class="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-3 rounded-xl transition shadow-md">
            Add to Cart
          </button>
        </div>
      </div>
`
card_container.append(type_card)
    })
// spinner
document.getElementById("loading-spinner").classList.add("hidden")
document.getElementById("card-box").classList.remove("hidden")
}

// cart details
cartDetails=(id)=>{
  const url=`https://openapi.programming-hero.com/api/plant/${id}`
  fetch(url)
  .then(res=>res.json())
  .then(data=>cardDetailShow(data.plants))
}
const cardDetailShow=(trees)=>{
const detailsContainer=document.getElementById("detail-container")
detailsContainer.innerHTML="";
detailsContainer.innerHTML=`<h1 class="text-xl font-bold text-gray-800 mb-1">${trees.name}</h1>
    <img class="w-full h-64 object-cover rounded-lg mb-4" src="${trees.image}" alt="">
    <p class="text-sm text-gray-600 mb-4">${trees.description}</p>
    <span class="text-xs font-semibold bg-green-100 text-green-700 py-1 px-3 rounded-full"> ${trees.category} </span> <span  class="text-lg font-bold text-gray-800">৳${trees.price}
</span>`;

    document.getElementById("my_modal_3").showModal()
}











// All tree  loading

loadAlldata=()=>{

  // spinner
  document.getElementById("loading-spinner").classList.remove("hidden");
document.getElementById("card-box").classList.add("hidden");
  
    const url2='https://openapi.programming-hero.com/api/plants'
    fetch(url2)
    .then(res=>res.json())
    .then(data=>allTrees(data.plants))
}

const allTrees=(allTree)=>{

const allTreeContainer=document.getElementById('tree-container')
allTreeContainer.innerHTML=''

allTree.forEach(element2=>{

const Alltype_card=document.createElement('div')
Alltype_card.innerHTML=`
<div onclick="cartDetails(${element2.id})" class="bg-white rounded-xl shadow-lg p-4 border border-gray-100">
           <div class=" w-full object-contain rounded-lg mb-4 ">
               <img class='w-full h-48 object-cover' src="${element2.image}" alt="">
           </div>
        <div>
          <h3 class="text-xl font-bold text-gray-800 mb-1">${element2.name}</h3>
          <p class="text-sm text-gray-600 mb-4">
          ${element2.description}
          </p>
          <div class="flex justify-between items-center mb-4">
            <span class="text-xs font-semibold bg-green-100 text-green-700 py-1 px-3 rounded-full">${element2.category}</span>
           
           
          <span class="text-lg font-bold text-gray-800">${element2.price}</span>
          
          </div>
          <button  onclick="addCart(event,this)" class="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-3 rounded-xl transition shadow-md">
            Add to Cart
          </button>
        </div>
      </div>
`
allTreeContainer.append(Alltype_card)
})
// spinner
document.getElementById("loading-spinner").classList.add("hidden")
document.getElementById("card-box").classList.remove("hidden")
}


// add to cart funtionality

addCart=(event,btn)=>{
  event.stopPropagation()
  
  const cardTitle=btn.parentNode.parentNode.children[1].children[0]
  const treePrice=btn.parentNode.children[2].children[1]
  
const cartContainer=document.getElementById('cart-box')


 newCart=document.createElement('div')
newCart.innerHTML=`
<div class="flex items-center justify-between p-3 mb-2 rounded-lg bg-green-50">

        <div>
         <p class="font-semibold text-gray-800">${cardTitle.innerText}</p>
        <p class="text-sm text-gray-600">${`${treePrice.innerText} `}</p>
        </div>
        <button onclick="deleteItem(this)" class="text-gray-400 hover:text-red-500 transition">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none"
            viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
`
cartContainer.append(newCart)

// calcutalte the total price

const totalPrice=document.getElementById('total-price')

const finalPrice=Number(totalPrice.innerText) + Number(treePrice.innerText)

totalPrice.innerText=Number(finalPrice)
}

// delete item
deleteItem=(btn)=>{
  const cartPrice=btn.parentNode.parentNode.children[0].children[0].children[1].innerText
const totalPrice=document.getElementById('total-price')
  const cartdiv=btn.parentNode.parentNode

cartdiv.classList.add('hidden')

const finalPrice=Number(totalPrice.innerText) - Number(cartPrice)
totalPrice.innerText=Number(finalPrice)

}






loadCatagories()