function init() {
    form = document.getElementById("booking"); //ID som ger tillgång till hela formuläret 
    
    for(i = 0;i < form.roomType.length;i++){ //forloop som lägger till click event
        form.roomType[i].addEventListener("click", checkFamilyRoom); 
        form.roomType[i].addEventListener("click", calculatePrice);
    }
    for(j = 0;j < form.addition.length;j++){
        form.addition[j].addEventListener("click", checkFamilyRoom);
        form.addition[j].addEventListener("click", calculatePrice);
    }
    form.nights.addEventListener("change", calculatePrice) //byter pris beroende på hur många nights/dagar man valt

    document.getElementById("city").style.textTransform = "uppercase"; //allt blirt till uppercase när man skriver ort

    document.getElementById("telephone").addEventListener("input", regex);
    document.getElementById("zipcode").addEventListener("input", regex); 
    
    checkFamilyRoom();
    calculatePrice();
    addEventListener("input", regex);
} 
window.addEventListener("load", init);

function checkFamilyRoom(){
    if(form.roomType[2].checked == true){ 
        form.persons.parentNode.style.color = "#000"; //om man har valt familjerum byts färgen till svart
        form.persons.disabled = false; //döljer inte texten om familjerum är vald

        form.addition[2].parentNode.style.color = "#999"; //byter färgen till grå på sjöutsikt om familjerum punkten är vald
        form.addition[2].disabled = true; //döljer sjöutsikt om man valt familjerum
    }
    else{
        form.persons.parentNode.style.color = "#999";
        form.persons.disabled = true;

        form.addition[2].disabled = false;
        form.addition[2].parentNode.style.color = "#000";
    }
}

function calculatePrice(){
    let totalCost = document.getElementById("totalCost");
    let i;
    
    for(i = 0;i < form.roomType.length;i++){ 
        if(form.roomType[i].checked == true){ //kollar vilket rum som är valt
            price = parseInt(form.roomType[i].value.split(",")[1]); //delar priset från en string internet,40 till internet 40 och väljer endast 40
            break;
        }
    }

    for(i = 0;i < form.addition.length;i++){
        if(form.addition[i].checked == true && form.addition[i].disabled == false){
            price += parseInt(form.addition[i].value.split(",")[1]);
        }
    }

    let tPrice = parseInt(form.nights.value);
    totalCost.innerHTML = price * tPrice;
}

function regex(){
    let telefon = /^0[0-9]{1,3}[0-9 & "" & / & -]{1}[0-9]{5,8}$/m; //reguljärt uttryck för att kontrollera korrekt formaterat telefonnummer
    if(telefon.test(form.telephone.value)){ // om telefon.test stämmer med form.telephone.value så blir det true annars false
        form.telephone.style.color = "green";
    }
    else{
        
        form.telephone.style.color = "red";
    }
    
    let post = /^[0-9]{3}[" "]{0,1}[0-9]{2}$/m;// reguljärt uttryck för att kontrollera att minst 5 nummer skrivs i postnummer
    if(post.test(form.zipcode.value)){
        form.zipcode.style.color = "green";
    }
    else{
        form.zipcode.style.color = "red";
    }

    let kampanj = /^[a-zA-Z]{3}-[0-9]{2}-[a-zA-Z]{1}[0-9]{1}$/m;
    if(kampanj.test(form.campaigncode.value)){
        form.campaigncode.style.color = "green";
    }
    else{
        form.campaigncode.style.color = "red";
    }
}