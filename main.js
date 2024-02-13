const cname=document.getElementById('CName');
const pros=document.getElementById('pros');
const cons=document.getElementById('cons');
const form=document.getElementById('reviewForm');
const searchForm=document.getElementById('searchForm');
const msg = document.querySelector('.msg');
const searchMsg = document.querySelector('.searchMsg');
const stars=document.getElementsByName('rating');
const rate=document.getElementById('rate');
const searchName=document.getElementById('searchName');
let reviewDiv=document.querySelector('.reviews');



form.addEventListener('submit',onSubmit);
searchForm.addEventListener('submit',searchReview);

stars.forEach(star=>{
    star.addEventListener('click',()=>{
        rate.value=star.value;
    })
})



async function onSubmit(e){
    e.preventDefault(); 
    reviewDiv.innerHTML='';

    if (cname.value == ''|| pros.value=='' || cons.value ==''|| rate.value == '') {
        msg.innerHTML = '<b>Please enter all fields</b>';
        
        setTimeout(() => {
            msg.removeChild(msg.firstChild);
        }, 2000);
    }
    else{
        
        try{

            // console.log(rate.value);
    
            const review={
                name:cname.value,
                pros:pros.value,
                cons:cons.value,
                rating:rate.value
            }
    
            let response= await axios.post("http://localhost:3000/add-review/",review);
            form.reset();
        }
        catch(err){
            console.log(err);
        }

        
    }
}



async function searchReview(e){
    e.preventDefault(); 

   
    if (searchName.value=='') {
        searchMsg.innerHTML = '<b>Please enter company name</b>';
        
        setTimeout(() => {
            searchMsg.removeChild(searchMsg.firstChild);
        }, 2000);
    }
    else{
        
        try{
            
            reviewDiv.innerHTML='';

            let reviews=await axios.get(`http://localhost:3000/comapny-review/${searchName.value}`);

           

            const child=`<h2> Company Name : ${searchName.value} </h2>
            <br>`;

            reviewDiv.innerHTML=reviewDiv.innerHTML+child;

            // console.log(reviews.data);
            for(let review in reviews.data){
                // console.log(reviews.data[review]);
                showReview(reviews.data[review],searchName.value);
            }

            searchForm.reset();

        }
        catch(err){
            console.log(err);
        }
    }

}


function showReview(obj,sname ){
    // let parent=document.querySelector('.reviews');
    // let stars;

    

    let child= `
    <h5>Pros: </h5>  ${obj.pros}
    <h5>Cons: </h5>  ${obj.cons}
    <h5>Rating: </h5> 
    <div class="stars">`
    // console.log(obj.rating);
    for(let i=1; i<=5;i++){
        // console.log(child);
        if(i<=obj.rating)
        {
            child+=`<img src="pngimg.com - star_PNG41474.png" alt="checked">`
        }
        else{
            child+=` <img src="1279251.png" alt="unchecked">`

        }
    }
    
    child+=`</div><hr>`

    

    reviewDiv.innerHTML=reviewDiv.innerHTML+child;
}