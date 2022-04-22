
const inputSection = document.querySelector('.input-section');
const addInputSectionBtn = document.querySelector('.nav__items-button');
const cost = document.querySelector('#cost');
const groupArticle = document.querySelector('#group-article');
const additionalInformation = document.querySelector('#additional-information');
const date = document.querySelector('#date');
const buttonAddCost = document.querySelector('.addform-item__button');
const buttonAddBalance = document.querySelector('.balance-item__button');
const balanceSection = document.querySelector('.bill-section--balance_sum');
const balanceInput = document.querySelector('#balance');
const chartPie = document.querySelector('.section-chart');
const chartBtnHide = document.querySelector('.chart-btn-hide');
const chartBtn = document.querySelector('.chart-btn');
const billArea = document.querySelector('.bill-section');




let sum = 0;
let sumRevenues = 0;
let sumShopping = 0;
let sumEntertainment = 0;
let sumBills = 0;
let sumClothes = 0;
let sumOther = 0;
let numberCost;
const arrayNumbers = [];

// SHOW INPUTS 

const showInput = () => {
    inputSection.classList.toggle('input-section--show');
}

// FORM CHECK -----------------------

const formCheck = (e) => {
    const formCheckVaild = document.querySelector('.formCheckVaild');
    e.preventDefault();
    if (cost.value > "" && groupArticle.value > "" && additionalInformation.value > "" && date.value > "") {
        addNewBill();
        formCheckVaild.style.display = "none";
    } else {
        formCheckVaild.style.display = "block";
    }
}

// ADD NEW BILL ------------------

const addNewBill = () => {
    const billSection = document.querySelector('.bill-section');

    const newCost = document.createElement('div');
    newCost.setAttribute('class', 'bill-section--new');
    billSection.appendChild(newCost);

    const costTextSection = document.createElement('div');
    const costText = document.createElement('p');

    costText.setAttribute('class', 'bill-section-cost');
    costText.innerText = `${cost.value}`;

    const costTextSpan = document.createElement('span');
    costTextSpan.innerText = "zł"
    costTextSection.appendChild(costText);
    costTextSection.appendChild(costTextSpan);
    newCost.appendChild(costTextSection);

    const groupArticleTextSection = document.createElement('div');
    const groupArticleText = document.createElement('p');
    groupArticleText.innerText = groupArticle.value;
    groupArticleTextSection.appendChild(groupArticleText);
    newCost.appendChild(groupArticleTextSection);

    const additionalInformationTextSection = document.createElement('div');
    const additionalInformationText = document.createElement('textarea');
    additionalInformationText.setAttribute('readonly', true);
    additionalInformationText.setAttribute('class', 'additionalInfo');
    additionalInformationText.innerText = additionalInformation.value;
    additionalInformationTextSection.appendChild(additionalInformationText);
    newCost.appendChild(additionalInformationTextSection);

    const dateTextSection = document.createElement('div')
    const dateText = document.createElement('p');
    dateText.innerText = date.value;
    dateTextSection.appendChild(dateText);    
    newCost.appendChild(dateTextSection);

    const btnArea = document.createElement('div');
    btnArea.classList.add('btn-area');
    const removeButton = document.createElement('button');
    removeButton.classList.add('remove-btn');
    removeButton.innerHTML = '<i class="fas fa-minus-circle remove-btn"></i>';
    const editButton = document.createElement('button');
    editButton.innerHTML = '<i class="far fa-edit edit-btn"></i>'
    editButton.classList.add('edit-btn');
    btnArea.appendChild(removeButton);
    btnArea.appendChild(editButton);
    newCost.appendChild(btnArea);

    const items = newCost.querySelectorAll('div');

    
    for(const item of items) {
        item.classList.add('bill-section--new-item')
    }

    allBillSum();
    reduceBalance();

    cost.value = '';
    groupArticle.value = '';
    additionalInformation.value = '';
    date.value = '';

    costSum(numberCost);
    addData();

    


}




// ALL SUM OF COST -----------------

const costSum = () => {
    const costTextValue = document.querySelectorAll('.bill-section-cost');
    const expensesValue = document.querySelector('.bill-section--balance_expenses');

    for(item of costTextValue) {
        item = item.innerHTML;
        numberCost = Number(item);
        sum = numberCost + sum
    }

    expensesValue.innerText = sum;

    console.log(sum);

    sum = 0;
}

// REDUCE BALANCE WHEN ADD BILL -------------

const reduceBalance = () => {
    let balanceSectionEdit = document.querySelector('.bill-section--balance_sum');
    balanceSectionEdit = balanceSectionEdit.innerHTML;
    let balance = Number(balanceSectionEdit) - cost.value;
    balanceSection.innerText = balance;
    console.log(balance);
}

// ADD BALLANCE ------------------

const addBalance = (e) => {
    e.preventDefault();
    const revenuesSum = document.querySelector(".bill-section--balance_revenues");
    const balanceSectionBorder = document.querySelector('.bill-section--balance');
    let balanceSectionEdit = document.querySelector('.bill-section--balance_sum');


    balanceSectionEdit = balanceSectionEdit.innerHTML;
    let balance = Number(balanceInput.value) + Number(balanceSectionEdit);
    balanceSection.innerText = balance;


    sumRevenues = Number(balanceInput.value) + sumRevenues;
    revenuesSum.innerText = sumRevenues;

    balanceInput.value = '';
      
}

// CATEGORY SUM -------------

const allBillSum = () => {
    let groupArticleValue = groupArticle.selectedIndex;
    if(groupArticleValue == 1) {
        sumShopping = Number(cost.value) + sumShopping;
        console.log(sumShopping + "zł");
    } else if (groupArticleValue == 2) {
        sumEntertainment = Number(cost.value) + sumEntertainment;
    } else if (groupArticleValue == 3) {
        sumBills = Number(cost.value) + sumBills;
    } else if (groupArticleValue == 4) {
        sumClothes = Number(cost.value) + sumClothes;
    } else if (groupArticleValue == 5) {
        sumOther = Number(cost.value) + sumOther;
    }

    console.log(groupArticleValue + "index");
}

// SHOW PIECHART ---------------

const showChart = () => {
    chartPie.classList.add('chart-container_show');
}

const hideCart = () => {
    chartPie.classList.remove('chart-container_show');
}


const handleClickDeleteOrEdit = e => {
    if (e.target.matches('.remove-btn')) {
        removeBill(e);
    } 
}

const removeBill = e => {
    const costSum = e.target.closest('.bill-section--new').children[0].firstElementChild.textContent;

    const shopCategory = e.target.closest('.bill-section--new').children[1].firstElementChild.textContent;

    if (shopCategory == 'zakupy spożywcze') {
        sumShopping = sumShopping - Number(costSum);
    } else if (shopCategory == 'rozrywka i sport') {
        sumEntertainment = sumEntertainment - Number(costSum);
    } else if (shopCategory == 'rachunki stałe') {
        sumBills = sumBills - Number(costSum);
    } else if (shopCategory == 'ubrania') {
        sumClothes = sumClothes - Number(costSum);
    } else if (shopCategory == 'pozostałe wydatki') {
        sumOther = sumOther - Number(costSum);
    }

    addData();

    console.log(Number(costSum));
    console.log(shopCategory);

    e.target.closest('.bill-section--new').remove();

}




// document.addEventListener('DOMContentLoaded', main);

// LISTENERY ------------

billArea.addEventListener('click', handleClickDeleteOrEdit);
chartBtnHide.addEventListener('click', hideCart);
chartBtn.addEventListener('click', showChart);
addInputSectionBtn.addEventListener('click', showInput);
buttonAddCost.addEventListener('click', formCheck);
buttonAddBalance.addEventListener('click', addBalance);







