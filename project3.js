// ここからJavaScriptを記述してください。
function displayNone(ele){
    ele.classList.remove("d-block");
    ele.classList.add("d-none");
}

function displayBlock(ele){
    ele.classList.remove("d-none");
    ele.classList.add("d-block");
}

const config = {
    target: document.getElementById("target"),
    initialForm: document.getElementById("initial-form"),
    mainPage: document.getElementById("main-page"),
    newGame: document.getElementById("new-game")

}

class Item{
    constructor(img, name, maxQty, profit, price, qty){
        this.img = img;
        this.name = name;
        this.maxQty = maxQty;
        this.profit = profit;
        this.price = price;
        this.qty = qty;
    }
}

function makeItemList(){
    let itemList = [
        new Item("https://thumb.photo-ac.com/e3/e3491a342f319024c2b96130eea9a72d_w.jpeg", "Flip machine", 500, 25, 15000, 1),
        new Item("https://thumb.photo-ac.com/82/8277f548a2c22491eec3a3f38fdbefba_w.jpg", "ETF Stock", Infinity, 0.001, 300000, 0),
        new Item("https://thumb.photo-ac.com/9f/9fcd5550b08adc434a880f55f83573ed_w.jpg", "ETF Bond", Infinity, 0.0007, 300000, 0),
        new Item("https://thumb.photo-ac.com/8c/8c49b472e3a953c24f98f4d60c67b173_w.jpg", "Lemonade Stand", 1000, 30, 30000, 0),
        new Item("https://thumb.photo-ac.com/8d/8dfe8bf83dd7768b6e3c504a5669a2be_w.jpg", "Ice Cream Truck", 500, 120, 100000, 0),
        new Item("https://thumb.photo-ac.com/00/008268c5c2fd1b4bdaf2a3e32d140a88_w.jpg", "House", 100, 32000, 20000000, 0),
        new Item("https://thumb.photo-ac.com/d7/d7ef1c724c2c3e605f78d7cb2af4cbae_w.jpg", "TownHouse", 100, 64000, 40000000, 0),
        new Item("https://thumb.photo-ac.com/b3/b3a98b40447619ad93426ea3a3cdc8ab_w.jpg", "Mansion", 20, 500000, 250000000, 0),
        new Item("https://thumb.photo-ac.com/02/02255d780a5eed04adf155e6b7f00c56_w.jpg", "Industrial Space", 10, 2200000, 1000000000, 0),
        new Item("https://thumb.photo-ac.com/a8/a8ce747cc246b9fa4a3a81fc78c8e17c_w.jpg", "Hotel Skyscraper", 5, 25000000, 10000000000, 0),
        new Item("https://thumb.photo-ac.com/8a/8aa16334f199dd2c991e6012ba679da4_w.jpg", "Bullet-Speed Sky Railway", 1, 30000000000, 10000000000000, 0)
    ]
    return itemList;
}



class User{
    constructor(name, age, days, money, userBurgers, etfStock, userItemList){
        this.name = name;
        this.age = age;
        this.days = days;
        this.money = money;
        this.userBurgers = userBurgers;
        this.etfStock = etfStock;
        this.userItemList = userItemList;
    }

    countBurgers(){
        // console.log(this.userBurgers++);
        this.userBurgers += this.userItemList[0].qty;
        return this.userBurgers;
    }

    sumEtfStockPrice(buyQty){
        this.etfStock += this.userItemList[1].price * buyQty;
        return this.etfStock;
    }

}

function initializeUserAccount(){
    const form = document.getElementById("new-game-form");
    let itemList = makeItemList();
    let userAccount = new User(
        form.querySelectorAll('input[name="userName"]').item(0).value,
        20,
        0,
        50000,
        0,
        0,
        itemList);
    // console.log(userAccount);
    // config.newGame.classList.remove("d-block");
    // config.newGame.classList.add("d-none");
    displayNone(config.newGame);
    config.mainPage.innerHTML = "";
    config.mainPage.append(makeMainPage(userAccount));
    updateUserInfo(userAccount);
    // config.mainPage.classList.add("d-block");
    displayBlock(config.mainPage);
}

function makeNewGame(){
    // config.initialForm.classList.remove("d-block");
    // config.initialForm.classList.add("d-none");
    displayNone(config.initialForm);
    config.newGame.innerHTML = "";
    config.newGame.classList.add("bg-white", "col-12", "text-center", "p-4", "d-block");  
    config.newGame.append(makeNewGamePage());
}

function makeLoadGame(){
    let userJsonString = prompt("Jsonを貼り付けてください。");
    let loadUserJSON = JSON.parse(userJsonString);
    let LoadUser = new User(
        loadUserJSON.name, loadUserJSON.age, loadUserJSON.days, loadUserJSON.money, loadUserJSON.userBurgers, loadUserJSON.etfStock,loadUserJSON.userItemList);
    displayNone(config.initialForm);
    config.mainPage.innerHTML = "";
    config.mainPage.append(makeMainPage(LoadUser));
    updateUserInfo(LoadUser);
    displayBlock(config.mainPage);
}

function backNextBtn(backString, nextString){
    let container = document.createElement("div");

    container.innerHTML =
    `
    <div class="d-flex justify-content-between">
        <div class="col-6 pl-0">
            <button class="btn btn-outline-light col-12 back-btn">${backString}</button>
        </div>
        <div class="col-6 pr-0">
            <button class="btn btn-light col-12 next-btn mb-1">${nextString}</button>
        </div>
    </div>
    `
    return container;
}

function makeNewGamePage(){
    let container = document.createElement("div");
    container.innerHTML = `
        <h1 class="mb-5">Click Empire Game</h1>
        <h3 class="pb-3">Please type your name below</h3>
        <form id="new-game-form" class="form" onsubmit="initializeUserAccount(); event.preventDefault()">
            <div class="form-group pb-3">
                <div class="row d-flex justify-content-center align-items-center">
                    <div class="col-3">
                        <label>Name</label>
                    </div>
                    <div class="col-9">
                        <input type="text" name="userName" class="form-control col" placeholder="your name" value="nanashinogonbe" required>
                    </div>
                </div>
            </div>
            <button type="submit" class="btn btn-primary col-12 mb-4">Start!</button>
        </form>
    `
    return container;
}

function makeItemListBtns(User){
    config.mainPage.querySelectorAll("#right-btn")[0].innerHTML = "";
    config.mainPage.querySelectorAll("#right-btn")[0].append(backNextBtn("Go Back","Next"));
    itemContents(User);
    makeBuyBtn(User);
    let nextBtn = config.mainPage.querySelectorAll(".next-btn")[0];
    nextBtn.addEventListener("click",function(){
        let currPage = parseInt(config.mainPage.querySelectorAll("#item-contents")[0].getAttribute("data-id"));
        if (currPage >= User.userItemList.length/3-1) currPage = -1;
        config.mainPage.querySelectorAll("#item-contents")[0].setAttribute("data-id", currPage+1);
        
        itemContents(User);
        makeBuyBtn(User);
    })

    let backBtn = config.mainPage.querySelectorAll(".back-btn")[0];
    backBtn.addEventListener("click",function(){
        let currPage = parseInt(config.mainPage.querySelectorAll("#item-contents")[0].getAttribute("data-id"));
        if (currPage <= 0) currPage = User.userItemList.length/3+1;
        config.mainPage.querySelectorAll("#item-contents")[0].setAttribute("data-id", currPage-1);
        
        itemContents(User);
        makeBuyBtn(User);
    })
}

function itemContents(User){
    let itemCnts = config.mainPage.querySelectorAll("#item-contents")[0];
    itemCnts.innerHTML = "";
    let pageNum = parseInt(itemCnts.getAttribute("data-id"));
    // console.log(pageNum);
    
    let displayItems = (pageNum+1)*3;
    if ((pageNum+1)*3 > User.userItemList.length) displayItems = User.userItemList.length;

    for(let i = pageNum*3; i < displayItems; i++){
        let tempQty = User.userItemList[i].qty;
        if (tempQty === 0) tempQty = 1;
        itemCnts.innerHTML += `
            <div class="row col-12 d-flex mx-0 my-1 px-0 justify-content-between bg-info align-items-center border-solid hover text-white items" id="${i}">
                <div class="col-3">
                    <img class="w-100 fit" src=${User.userItemList[i].img}>
                </div>
                <div class="col">
                    <div class="text-left">${User.userItemList[i].name}</div>
                    <div class="row col-12 d-flex justify-content-between">
                        <div class="font0p8rem">JPY ${User.userItemList[i].price} </div>
                        <div class="font0p8rem profit-display">+JPY ${User.userItemList[i].profit * tempQty} / sec </div>
                    </div>
                </div>
                <div class="col-3">
                    <h3>${User.userItemList[i].qty}</h3>
                </div>
            </div>
        `
        if (i === 1){
            itemCnts.querySelectorAll(".profit-display")[i].innerHTML = `+JPY (total ETF Stock)*${Math.round(User.userItemList[i].profit * 10000)/100}% / sec`;
        } else if (i == 2){
            itemCnts.querySelectorAll(".profit-display")[i].innerHTML = `+JPY (total ETF Bond)*${Math.round(User.userItemList[i].profit * 10000)/100}% / sec`;
        } else if (i === 0){
            itemCnts.querySelectorAll(".profit-display")[i].innerHTML = `+JPY ${User.userItemList[i].profit * User.userItemList[i].qty} / click `;
        }
    }
    // itemCnts.innerHTML += `
    //     <div id="right-btn" class="col-12">
                        
    //     </div>
    // `
    
}

function makeBuyBtn(User){
    let buyBtnList = config.mainPage.querySelectorAll(".items");
    for (let i = 0; i < buyBtnList.length; i++){
        let buyItemNum = parseInt(buyBtnList[i].id);
        let currPage = parseInt(config.mainPage.querySelectorAll("#item-contents")[0].getAttribute("data-id"));
        buyBtnList[i].addEventListener("click",function(){
            buyPage(User,buyItemNum,currPage);
        })
    }
}

function calcTotalPrice(qty, User, id){
    let buyMaxQty = Math.floor(User.money/User.userItemList[id].price);
    if (buyMaxQty > User.userItemList[id].maxQty - User.userItemList[id].qty) buyMaxQty = User.userItemList[id].maxQty - User.userItemList[id].qty;
    if (qty < 0) qty = 0;
    if (qty > buyMaxQty) qty = buyMaxQty;
    return qty * User.userItemList[id].price;
}

function buyPage(User, id, currPage){
    // console.log(id);
    let itemCnts = config.mainPage.querySelectorAll("#item-contents")[0];
    if (id === 1 || id === 2){
        User.userItemList[id].maxQty = Infinity;
    }
    itemCnts.innerHTML = "";
    itemCnts.innerHTML = `
        <div class="row col-12 d-flex mx-0 my-1 px-0 justify-content-between bg-info align-items-center text-white" id="${id}">
            <div class="col-8">
                <div class="text-left font2rem">${User.userItemList[id].name}</div>
                <div class="text-left">Max Purchase: ${User.userItemList[id].maxQty}</div>
                <div class="text-left">Price: JPY ${User.userItemList[id].price} </div>
                <div id="displayProfit" class="text-left">Get JPY ${User.userItemList[id].profit} /sec </div>
            </div>
            <div class="col-4">
                <img class="w-100 fit" src=${User.userItemList[id].img}>
            </div>
        </div>
        <form>
            <div class="form-group row col-12 text-white flex-column align-items-starts">                
                <div class="col-12 text-left">
                    <label class="" for="qty">How many would you like to purchase?</label>
                </div>
                <div class="col-12 ">
                    <input type="number" id="qty" class="form-control">
                </div>                
            </div>
        </form>
        <div class="row col-12 d-flex mx-0 my-1 px-0 justify-content-end bg-info align-items-center text-white pr-3" id="totalPrice">
            TOTAL: JPY 0 (Qty: 0)
        </div>
    `
    let displayProfit = config.mainPage.querySelectorAll("#displayProfit")[0];
    if (id === 1){
        displayProfit.innerHTML = `Get JPY (total ETF Stock)*0.1% /sec`;
    } else if (id === 2){
        displayProfit.innerHTML = `Get JPY (total ETF Bond)*0.07% /sec`;
    }

    let displayTotalPrice = config.mainPage.querySelectorAll("#totalPrice")[0];
    let inputQty = config.mainPage.querySelectorAll(".form-control")[0];

    inputQty.addEventListener("change",function(){
        // event.preventDefault();
        let totalPrice = calcTotalPrice(inputQty.value, User, id);        
        displayTotalPrice.innerHTML = `TOTAL: JPY ${totalPrice}  (Qty: ${totalPrice/User.userItemList[id].price})`;

        if (inputQty.value >= totalPrice/User.userItemList[id].price){
            inputQty.value = totalPrice/User.userItemList[id].price;
        } else if (inputQty.value < 0) {
            inputQty.value = 0;
        }

        if (calcTotalPrice(inputQty.value, User, id) == 0) buyBtn.disabled = true;
        else buyBtn.disabled = false;
        
    })

    let btns = config.mainPage.querySelectorAll("#right-btn")[0];
    btns.innerHTML = "";
    btns.append(backNextBtn("Cancel", "Buy"));

    let cancelBtn = config.mainPage.querySelectorAll(".back-btn")[0];
    cancelBtn.addEventListener("click",function(){
        config.mainPage.querySelectorAll("#item-contents")[0].setAttribute("data-id", currPage);
        
        makeItemListBtns(User);
    })

    let buyBtn = config.mainPage.querySelectorAll(".next-btn")[0];
    buyBtn.disabled = true;
    buyBtn.addEventListener("click",function(){
        let totalPrice = calcTotalPrice(inputQty.value, User, id);
        User.userItemList[id].qty += parseInt(totalPrice/User.userItemList[id].price);
        User.money -= totalPrice;

        if (id === 0){
            config.mainPage.querySelectorAll("#countBGRs")[0].innerHTML = "";
            config.mainPage.querySelectorAll("#countBGRs")[0].innerHTML = `
                <h3 class="text-white">${User.userBurgers} Burgers</h3>
                <p class="text-white">+JPY ${User.userItemList[id].profit * User.userItemList[id].qty} / click</p>  `
        }

        if (id === 1){
            User.sumEtfStockPrice(totalPrice/User.userItemList[id].price);
            User.userItemList[id].price = Math.floor(1.1 * User.userItemList[id].price);
        }

        makeItemListBtns(User);
        updateUserInfo(User);
    })
}

function updateUserInfo(User){
    let userInfo = config.mainPage.querySelectorAll("#rightDiv-top")[0];
    userInfo.innerHTML = "";
    userInfo.innerHTML = `
        <div class="col-6 d-flex justify-content-center align-items-center text-white border-solid bg-info p-0">
            ${User.name}
        </div>
        <div class="col-6 d-flex justify-content-center align-items-center text-white border-solid bg-info p-0">
            ${User.age} years old
        </div>
        <div class="col-6 d-flex justify-content-center align-items-center text-white border-solid bg-info p-0">
            ${User.days} days
        </div>
        <div class="col-6 d-flex justify-content-center align-items-center text-white border-solid bg-info p-0">
            JPY ${User.money}
        </div>    
    `
}

function makeMainPage(User){
    let container = document.createElement("div");
    container.classList.add("bg-white","container","col-12", "text-center", "py-2");
    container.innerHTML = `
        <div class="row mb-2 d-flex justify-content-center">
            <div id="leftDiv-top" class="col-4">
                <div id="countBGRs" class="bg-info h-100 p-1">
                    <h3 class="text-white">${User.userBurgers} Burgers</h3>
                    <p class="text-white">+ JPY ${User.userItemList[0].qty * User.userItemList[0].profit} / click</p> 
                </div>
            </div>
            <div id="rightDiv-top" class="col-8 d-flex flex-wrap">
                <div class="col-6 d-flex justify-content-center align-items-center text-white border-solid bg-info p-0">
                    ${User.name}
                </div>
                <div class="col-6 d-flex justify-content-center align-items-center text-white border-solid bg-info p-0">
                    ${User.age} years old
                </div>
                <div class="col-6 d-flex justify-content-center align-items-center text-white border-solid bg-info p-0">
                    ${User.days} days
                </div>
                <div class="col-6 d-flex justify-content-center align-items-center text-white border-solid bg-info p-0">
                    JPY ${User.money}
                </div>
            </div>
        </div>
        <div class="row d-flex justify-content-center">
            <div id="leftDiv-Btm" class="col-4 hover">
                <img class="w-100 fit" src=${User.userItemList[0].img}>
            </div>
            <div id="rightDiv-Btm" class="col-8">
                <div id ="right-btm" class="col-12 bg-info p-1">
                    <div id="item-contents" data-id="0">
                        <div class="row col-12 d-flex mx-0 my-1 px-0 justify-content-between bg-info align-items-center border-solid hover text-white items" id="0">
                            <div class="col-3">
                                <img class="w-100 fit" src=${User.userItemList[0].img}>
                            </div>
                            <div class="col text-left">
                                <div>${User.userItemList[0].name}</div>
                                <div class="row col-12 d-flex justify-content-between">
                                    <div class="font0p8rem">JPY ${User.userItemList[0].price} </div>
                                    <div class="text-left font0p8rem">+JPY ${User.userItemList[0].profit * User.userItemList[0].qty} / click </div>
                                </div>
                            </div>
                            <div class="col-3">
                                <h3>${User.userItemList[0].qty}</h3>
                            </div>
                        </div>
                        <div class="row col-12 d-flex mx-0 my-1 px-0 justify-content-between bg-info align-items-center border-solid hover text-white items" id="1">
                            <div class="col-3">
                                <img class="w-100 fit" src=${User.userItemList[1].img}>
                            </div>
                            <div class="col text-left">
                                <div>${User.userItemList[1].name}</div>
                                <div class="row col-12 d-flex justify-content-between">
                                    <div class="font0p8rem">JPY ${User.userItemList[1].price} </div>
                                    <div class="text-left font0p8rem">+JPY (total ETF Stock)*${Math.round(User.userItemList[1].profit * 10000)/100}% / sec </div>
                                </div>
                            </div>
                            <div class="col-3">
                                <h3>${User.userItemList[1].qty}</h3>
                            </div>
                        </div>
                        <div class="row col-12 d-flex mx-0 my-1 px-0 justify-content-between bg-info align-items-center border-solid hover text-white items" id="2">
                            <div class="col-3">
                                <img class="w-100 fit" src=${User.userItemList[2].img}>
                            </div>
                            <div class="col text-left">
                                <div>${User.userItemList[2].name}</div>
                                <div class="row col-12 d-flex justify-content-between">
                                    <div class="font0p8rem">JPY ${User.userItemList[2].price} </div>
                                    <div class="text-left font0p8rem">+JPY (total ETF Bond)*${Math.round(User.userItemList[2].profit * 10000)/100}% /sec </div>
                                </div>
                            </div>
                            <div class="col-3">
                                <h3>${User.userItemList[2].qty}</h3>
                            </div>
                        </div>
                    </div>
                    <div id="right-btn" class="col-12">                        
                    </div>                    
                </div>
                <div id ="right-icn" class="col-12 bg-info d-flex justify-content-end py-1">
                    <div class="mx-2 border-solid bg-white w-15 hover reset">
                        <i class="fas fa-undo-alt fa-3x"></i>
                    </div>
                    <div class="mx-2 border-solid bg-white w-15 hover save">
                        <i class="far fa-save fa-3x"></i>
                    </div>
                </div>
            </div>
        </div>
    `
    container.querySelectorAll(".reset")[0].addEventListener("click", function(){
        displayNone(config.mainPage);
        displayBlock(config.initialForm);
        clearInterval(calcMoneyTimer);
        delete User;
    });

    container.querySelectorAll(".save")[0].addEventListener("click", function(){
        alert("以下をクリップボードにコピーしました！！:"+JSON.stringify(User));
        navigator.clipboard.writeText(JSON.stringify(User));
    });

    container.querySelectorAll("#leftDiv-Btm")[0].addEventListener("click",function(){
        User.countBurgers();
        container.querySelectorAll("#countBGRs")[0].innerHTML = "";
        container.querySelectorAll("#countBGRs")[0].innerHTML = `
            <h3 class="text-white">${User.userBurgers} Burgers</h3>
            <p class="text-white">+JPY ${User.userItemList[0].profit * User.userItemList[0].qty} / click</p>        
        `
        User.money += User.userItemList[0].profit * User.userItemList[0].qty;
        updateUserInfo(User);
    });

    container.querySelectorAll("#right-btn")[0].append(backNextBtn("Go Back","Next"));
    let nextBtn = container.querySelectorAll(".next-btn")[0];
    nextBtn.addEventListener("click",function(){
        let currPage = parseInt(container.querySelectorAll("#item-contents")[0].getAttribute("data-id"));
        if (currPage >= User.userItemList.length/3-1) currPage = -1;
        container.querySelectorAll("#item-contents")[0].setAttribute("data-id", currPage+1);
        
        itemContents(User);
        makeBuyBtn(User);
    })

    let backBtn = container.querySelectorAll(".back-btn")[0];
    backBtn.addEventListener("click",function(){
        let currPage = parseInt(container.querySelectorAll("#item-contents")[0].getAttribute("data-id"));
        if (currPage <= 0) currPage = User.userItemList.length/3+1;
        container.querySelectorAll("#item-contents")[0].setAttribute("data-id", currPage-1);
        
        itemContents(User);
        makeBuyBtn(User);
    })

    let buyBtnList = container.querySelectorAll(".items");
    for (let i = 0; i < buyBtnList.length; i++){
        let buyItemNum = parseInt(buyBtnList[i].id);
        let currPage = parseInt(container.querySelectorAll("#item-contents")[0].getAttribute("data-id"));
        buyBtnList[i].addEventListener("click",function(){
            buyPage(User,buyItemNum,currPage);
        })
    }

    let calcMoneyTimer = setInterval(function(){
    // console.log(User.name);
    
    for (let i = 0; i < User.userItemList.length; i++){
        if (i === 0){
            // User.money += User.userBurgers * User.userItemList[i].profit * User.userItemList[i].qty;
            continue;
        }else if (i === 1){
            User.money += Math.floor(User.etfStock * User.userItemList[i].profit)
        }else if (i === 2){
            User.money += Math.floor(User.userItemList[i].price * User.userItemList[i].profit * User.userItemList[i].qty);
        } else {
            User.money += User.userItemList[i].profit * User.userItemList[i].qty;
        }
    }
    User.days++;
    if (User.days % 365 === 0 && User.days !== 0) User.age++;
    updateUserInfo(User);
    },1000);

    return container;
}