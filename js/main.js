// Variables ========================================================

// inputs
let money_get = document.getElementById("MDebt");
let pay_term = document.getElementById("MTerm");
let i_rate = document.getElementById("IRate");
let m_pay = document.getElementById("m-paymant");
let w_pay = document.getElementById("whole-price");

// selects
let select_cur = document.getElementById("cur");
let cur = select_cur.options[select_cur.selectedIndex].value;

let select_period = document.getElementById("period");
let period = select_period.options[select_period.selectedIndex].value;

// buttons
let butt_calk = document.getElementById("calc");

// numbers
let p_money_get = Number(document.getElementById("MDebt").value);
let p_pay_term = Number(document.getElementById("MTerm").value);
let p_i_rate = Number(document.getElementById("IRate").value) / 1200;
let p_m_pay = Number(document.getElementById("m-paymant").value);
let p_w_pay = Number(document.getElementById("whole-price").value);
let n_pay = 0;
let temp = 0;

// REGEX
let regex = new RegExp("^-*[0 - 9]+[\.]?[0-9]+");

// Functions =======================================================

// VALIDATION
function isFilled(elem) {
    if (elem.value == 0)
    {
        return false;
    }
    else{
        return true;
    }
}

let getNumOfPeymentsMulty = function () {
    if (period == "year") {
        return 12;
    }
    else {
        return 1;
    }
}

function filterInput(elem, nums)
{
    var getValue = elem.value;
    elem.value = getValue.replace(/^\./, '');
    var n = nums.toString();
    if(getValue.indexOf('.') > 0)
    {
        var reg = new RegExp("([^\\d]*)(\\d*(\\.\\d{0," + n + "})?)(.*)");
        elem.value = getValue.replace(reg, '$2');
    }
}


function validateNumberOrFloat(elem)
{
    var getValue = elem.value;
    if(!isNaN(parseFloat(getValue)) && getValue != "")
    {
        document.getElementById('err-mess-1').innerText = "";
        if(getValue.indexOf('.') != -1 && getValue.indexOf('.') >= 1)
        {
            var first_value = getValue.substring(0, getValue.indexOf('.'));
            var first_elements = first_value.match(/[1-9]/g);
            if(getValue.indexOf('.') == getValue.length - 1)
            {
                elem.value = getValue.substring(0, getValue.indexOf('.') - 1);
            }
            if(first_elements != null)
            {
                elem.value = getValue.replace(/^0+/, '');
                elem.value = parseFloat(elem.value).toFixed(2);
                getValue = elem.value;
                var second_value = getValue.substring(getValue.indexOf('.') + 1, getValue.length);
                var second_elements = second_value.match(/[1-9]/g);
                if(second_elements == null)
                {
                    elem.value = getValue.substring(0, getValue.indexOf('.'));
                }
            }
            else
            {
                elem.value = getValue.substring(getValue.indexOf('.') - 1, getValue.length);
                getValue = elem.value.toString();
                var second_value = getValue.substring(getValue.indexOf('.') + 1, getValue.length);
                var second_elements = second_value.match(/[1-9]/g);
                if(second_elements == null)
                {
                    elem.value = getValue.substring(0, getValue.indexOf('.'));
                    elem.value = parseInt(elem.value);
                }
                else
                {
                    elem.value = parseFloat(elem.value);
                }

            }
        }
        else if(getValue.indexOf('.') == -1)
        {
            elem.value = parseInt(elem.value);
        }
    }

}

function floatNumbers(evt)
{
    if (evt.charCode == 46)
    {
        return true;
    }
    if(evt.keyCode == 8)
    {
        return true;
    }
    if(evt.charCode >= 48 && evt.charCode <=57)
    {
        return true;
    }
    else
    {
        return false;
    }
}

// cALCULATIONS

let calc_m_pey = function () {
    n_pay = parseInt(p_pay_term * getNumOfPeymentsMulty());

    temp = 0;
    temp = Math.round((p_money_get * p_i_rate * Math.pow((1 + p_i_rate), n_pay)) / (Math.pow((1 + p_i_rate), n_pay) - 1) * 100) / 100;

    document.getElementById("m-paymant").value = temp;
    document.getElementById("whole-price").value = temp*n_pay;

    m_pay = document.getElementById("m-paymant");
    p_m_pay = Number(m_pay.value);
    w_pay = document.getElementById("whole-price");
    p_w_pay = Number(w_pay.value);
}

let calc_money_get = function () {
    n_pay = parseInt(p_pay_term * getNumOfPeymentsMulty());

    temp = 0;
    temp = Math.round((p_m_pay * (Math.pow((1 + p_i_rate), n_pay) - 1 )) / (p_i_rate * Math.pow((1 + p_i_rate), n_pay))) ;

    document.getElementById("MDebt").value = temp;
    document.getElementById("whole-price").value = p_m_pay * n_pay;

    w_pay = document.getElementById("whole-price");
    p_w_pay = w_pay.value;
    money_get = document.getElementById("MDebt");
    p_money_get = money_get.value;
}

let calc_n_pay = function () {
    n_pay = parseInt(p_pay_term * getNumOfPeymentsMulty());

    temp = 0;
    temp = Math.round(Math.log(p_m_pay / (p_m_pay - (p_money_get * p_i_rate))) / Math.log(p_i_rate + 1) * 100 ) / 100;

    document.getElementById("MTerm").value = temp;
    document.getElementById("whole-price").value = temp * p_m_pay;

    w_pay = document.getElementById("whole-price");
    p_w_pay = w_pay.value;
    pay_term = document.getElementById("MTerm");
    p_pay_term = pay_term.value;
}

let calc_n_pay_2 = function () {
    document.getElementById("MTerm").value = p_w_pay / p_m_pay;
    pay_term = document.getElementById("MTerm");
    p_pay_term = pay_term.value;

    n_pay = parseInt(p_pay_term * getNumOfPeymentsMulty());

    temp = 0;
    temp = Math.round((p_m_pay * (Math.pow((1 + p_i_rate), n_pay) - 1)) / (p_i_rate * Math.pow((1 + p_i_rate), n_pay)));

    document.getElementById("MDebt").value = temp;
    money_get = document.getElementById("MDebt");
    p_money_get = money_get.value;
}

function calculate() {
    // n_pay = parseInt(p_pay_term * getNumOfPeymentsMulty());

    if (isFilled(m_pay) && isFilled(pay_term) && isFilled(i_rate)) {
        calc_money_get();
        return;
    }
    if (isFilled(money_get) && isFilled(m_pay) && isFilled(i_rate)) {
        calc_n_pay();
        return;
    }
    if (isFilled(money_get) && isFilled(pay_term) && isFilled(i_rate)) {
        calc_m_pey();
        return;
    }
    if (isFilled(m_pay) && isFilled(w_pay) && isFilled(i_rate)) {
        calc_n_pay_2();
        return;
    }

    document.getElementById("err-mess-6").innerText = "Недостатъчно параметри";
}

// Event listeners ===================================================

money_get.addEventListener("change", function () {
    money_get = document.getElementById("MDebt");
    p_money_get = Number(money_get.value);
})

pay_term.addEventListener("change", function () {
    pay_term = document.getElementById("MTerm");
    p_pay_term = Number(pay_term.value);
})

i_rate.addEventListener("change", function () {
    i_rate = document.getElementById("IRate");
    p_i_rate = Number(i_rate.value) / 1200;
})

m_pay.addEventListener("change", function () {
    m_pay = document.getElementById("m-paymant");
    p_m_pay = Number(m_pay.value);
})

w_pay.addEventListener("change", function () {
    w_pay = document.getElementById("whole-price");
    p_w_pay = Number(w_pay.value);
})


select_cur.addEventListener("change", function () {
    select_cur = document.getElementById("cur");
    cur = select_cur.options[select_cur.selectedIndex].value;

    document.getElementById("currency1").innerText = select_cur.options[select_cur.selectedIndex].innerText;
    document.getElementById("currency2").innerText = select_cur.options[select_cur.selectedIndex].innerText
})

select_period.addEventListener("change", function () {
    select_period = document.getElementById("period");
    period = select_period.options[select_period.selectedIndex].value;
})

document.getElementById("clear").addEventListener("click", function () {
        document.getElementById("MDebt").value = null;
        document.getElementById("MTerm").value = null;
        document.getElementById("IRate").value = null;
        document.getElementById("m-paymant").value = null;
        document.getElementById("whole-price").value = null;

        money_get = document.getElementById("MDebt");
        p_money_get = money_get.value;

        pay_term = document.getElementById("MTerm");
        p_pay_term = pay_term.value;

        i_rate = document.getElementById("IRate");
        p_i_rate = i_rate.value / 1200;


        m_pay = document.getElementById("m-paymant");
        p_m_pay = m_pay.value;

        w_pay = document.getElementById("whole-price");
        p_w_pay = w_pay.value;

})

butt_calk.addEventListener("click", function () {
    calculate();
})