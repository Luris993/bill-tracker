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


let sum = 0;
let sumRevenues = 0;
let sumShopping = 0;
let sumEntertainment = 0;
let sumBills = 0;
let sumClothes = 0;
let sumOther = 0;
let numberCost;
const arrayNumbers = [];



const showInput = () => {
    inputSection.classList.toggle('input-section--show');
}

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


const reduceBalance = () => {
    let balanceSectionEdit = document.querySelector('.bill-section--balance_sum');
    balanceSectionEdit = balanceSectionEdit.innerHTML;
    let balance = Number(balanceSectionEdit) - cost.value;
    balanceSection.innerText = balance;
    console.log(balance);
}

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



const showChart = () => {
    

    chartPie.classList.add('chart-container_show');
}

const hideCart = () => {
    chartPie.classList.remove('chart-container_show');
}


chartBtnHide.addEventListener('click', hideCart);
chartBtn.addEventListener('click', showChart);
addInputSectionBtn.addEventListener('click', showInput);
buttonAddCost.addEventListener('click', formCheck);
buttonAddBalance.addEventListener('click', addBalance);








