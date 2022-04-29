
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
const expensesValue = document.querySelector('.bill-section--balance_expenses');
const editPopup = document.querySelector('.edit-popup');
const costEdit = document.querySelector('#cost-edit');
const groupArticleEdit = document.querySelector('#group-article-edit');
const additionalInformationEdit = document.querySelector('#additional-information-edit');
const dateEdit = document.querySelector('#date-edit');
const buttonEdit = document.querySelector('.addform-item__button-edit');
const hidePopupBtn = document.querySelector('.edit-popup-hideBtn');



let costSumOld; 
let shopCategoryOld; 
let additionalInformationOld; 
let dateBillOld;


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

// TOOL AREA BILL

const handleClickDeleteOrEdit = e => {
    if (e.target.matches('.remove-btn')) {
        removeBill(e);
    } else if (e.target.matches('.edit-btn')) {
        editBill(e)
    }
}

// OPENING EDIT POPUP

const editBill = e => {
    costSumOld = e.target.closest('.bill-section--new').children[0].firstElementChild;
    shopCategoryOld = e.target.closest('.bill-section--new').children[1].firstElementChild;
    additionalInformationOld = e.target.closest('.bill-section--new').children[2].firstElementChild;
    dateBillOld = e.target.closest('.bill-section--new').children[3].firstElementChild

    
    costEdit.value = costSumOld.textContent;
    groupArticleEdit.value = shopCategoryOld.textContent;
    additionalInformationEdit.value = additionalInformationOld.textContent;
    dateEdit.value = dateBillOld.textContent;

    editPopup.classList.add('edit-popup-show');
}

// ADDING EDIT BILL

const changeBill = (e) => {
    e.preventDefault();

    let shopCategoryTextContent = shopCategoryOld.textContent;

    if (shopCategoryTextContent == 'zakupy spożywcze') {
        sumShopping = sumShopping - Number(costSumOld.textContent);
    } else if (shopCategoryTextContent == 'rozrywka i sport') {
        sumEntertainment = sumEntertainment - Number(costSumOld.textContent);
    } else if (shopCategoryTextContent == 'rachunki stałe') {
        sumBills = sumBills - Number(costSumOld.textContent);
    } else if (shopCategoryTextContent == 'ubrania') {
        sumClothes = sumClothes - Number(costSumOld.textContent);
    } else if (shopCategoryTextContent == 'pozostałe wydatki') {
        sumOther = sumOther - Number(costSumOld.textContent);
    }

    let balanceSectionSum = Number(balanceSection.textContent) + Number(costSumOld.textContent);
    let balanceExpensesValue = Number(expensesValue.textContent) - Number(costSumOld.textContent);

    expensesValue.innerText = balanceExpensesValue;
    balanceSection.innerText = balanceSectionSum;

    if (groupArticleEdit.value == 'zakupy spożywcze') {
        sumShopping = sumShopping + Number(costEdit.value);
    } else if (groupArticleEdit.value == 'rozrywka i sport') {
        sumEntertainment = sumEntertainment +  Number(costEdit.value);
    } else if (groupArticleEdit.value == 'rachunki stałe') {
        sumBills = sumBills + Number(costEdit.value);
    } else if (groupArticleEdit.value == 'ubrania') {
        sumClothes = sumClothes +  Number(costEdit.value);
    } else if (groupArticleEdit.value == 'pozostałe wydatki') {
        sumOther = sumOther +  Number(costEdit.value);
    }

    balanceSectionSum = Number(balanceSection.textContent) - Number(costEdit.value);
    balanceExpensesValue = Number(expensesValue.textContent) + Number(costEdit.value);

    expensesValue.innerText = balanceExpensesValue;
    balanceSection.innerText = balanceSectionSum;

    addData();

    costSumOld.innerText = costEdit.value;
    shopCategoryOld.innerText = groupArticleEdit.value;
    additionalInformationOld.innerText = additionalInformationEdit.value;
    dateBillOld.innerText = dateEdit.value;


    costEdit.value = '';
    groupArticleEdit.value = '';
    additionalInformationEdit.value = '';
    dateEdit.value = '';

    editPopup.classList.remove('edit-popup-show');

}

const hidePopup = () => {
    editPopup.classList.remove('edit-popup-show');
}

// REMOVING BILL AND UPTADE NUMBERS

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

    const balanceSectionSum = Number(balanceSection.textContent) + Number(costSum);
    const balanceExpensesValue = Number(expensesValue.textContent) - Number(costSum);

    expensesValue.innerText = balanceExpensesValue;
    balanceSection.innerText = balanceSectionSum;

    addData();

    e.target.closest('.bill-section--new').remove();
}




// document.addEventListener('DOMContentLoaded', main);

// LISTENERY ------------
hidePopupBtn.addEventListener('click', hidePopup);
billArea.addEventListener('click', handleClickDeleteOrEdit);
chartBtnHide.addEventListener('click', hideCart);
chartBtn.addEventListener('click', showChart);
addInputSectionBtn.addEventListener('click', showInput);
buttonAddCost.addEventListener('click', formCheck);
buttonAddBalance.addEventListener('click', addBalance);
buttonEdit.addEventListener('click', changeBill);







