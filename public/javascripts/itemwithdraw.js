// var formData = new FormData(form)
var arrCheckStock = [];
$(document).ready(($) => {

    let dataArray = $('.dataArr');
    let tbProduct = $('#table_product');
    $.each(dataArray, (index, elem) => {
        let nJSON = JSON.parse(elem.value);
        console.log(nJSON);
        let json = {_id:nJSON.product_id._id, name:nJSON.product_id.product_code + ' - ' + nJSON.product_id.product_name  , quantity:nJSON.item_quantity, price:nJSON.product_id.product_price, total:addComma(parseFloat(nJSON.product_id.product_price) * parseInt(nJSON.item_quantity)), count:parseInt(nJSON.item_quantity), index:arrCheckStock.length, product_quantity:nJSON.product_id.product_quantity - parseInt(nJSON.item_quantity)};
        tbProduct.append(`
                    <tr class='table_product'>
                        <td>
                            <input class='form-control' type='text' name='item_desc'  value='${json.name}'  readonly />
                            <input class='form-control' type='hidden' name='item_id'  value='${json._id}' />
                        </td>
                        <td>
                            <input class='form-control quantity' type='text' style='width:80px;' name='item_quantity' class='quantity' value='${json.count}' readonly />
                        </td>
                        <td>
                            <input class='form-control price t-right' type='text' name='item_price' value='${addComma(json.price)}' readonly />
                        </td>
                        <td>

                        </td>
                        <td>
                        </td>
                        <td>
                            <input class='form-control total t-right' type='text' value='${addComma((parseFloat(json.price) * parseInt(json.count).toFixed(2)))}' readonly />
                        </td>
                        <td>
                            <button type='button' class='btn btn-block btn-danger btn-del' value='${json.index}'>ลบ</button>
                        </td>
                    </tr>
                `)
        arrCheckStock.push(json);
    })
    
    $("#order-date").on('focus', (e) => {
        console.log(e);
    })

    let setDatePicker = ($("#order-date").data('date') ? $("#order-date").data('date') : new Date);
    $("#order-date").datepicker({
        format: "dd/mm/yyyy",
        todayBtn: false,
        language: "th",
        thaiyear: true,
        autoclose: true,
        maxViewMode: 2,
    }).datepicker('setDate', setDatePicker)
    .on('hide', function(e) {
        // `e` here contains the extra attributes
        let dateSelected = prepareDate(e.format());
        $('input[name="order_date"]').val(e.format());
        $("#order-date").val(compareDate2TextTH(dateSelected))
        form.order_date.value = dateSelected;
    });

    
    if($("#order-date").data('date')) {
        $("#order-date").val(compareDate2TextTH(new Date($("#order-date").data('date'))));
    } else {
        $("#order-date").val(compareDate2TextTH(new Date(Date.now())));
        let d = new Date()
        let setDate = new Date(d.getTime());
        $(form.order_date).val(setDate)
    }
    $('#add-list').on('click', (e) => {
        e.preventDefault();
        let input = $('#order_code_show');
        let getObj = input.attr('data-obj');
        if(!getObj) {
            $('span[data-from="order_code_show"]').addClass('error')
            return false;
        };
        let obj = JSON.parse(getObj.toString())
    
        let reqQuantity = $('[name="order_p_quantity"]');
        let spanAlert = $('span.error-block[data-from="order_p_quantity"]');
        if(input.val().length > 0){
            if(parseInt(reqQuantity.val()) >  parseInt(obj.product_quantity)) {
                reqQuantity.addClass('is-invalid');
                spanAlert.text('จำนวนมากกว่าปริมาณวัสดุ กรุณาเปลี่ยนจำนวน !')
                spanAlert.addClass('invalid-feedback');
                return false;
            } else {
                spanAlert.text('')
                spanAlert.removeClass('invalid-feedback');
                let tbProduct = $('#table_product');
                let checkStock = arrCheckStock.find(({_id}) => _id === obj._id);
                if(!checkStock){
                    tbProduct.append(`
                        <tr class='table_product'>
                            <td>
                                <input class='form-control' type='text' name='item_desc'  value='${obj.name.split(' / ')[0].trim()}'  readonly />
                                <input class='form-control' type='hidden' name='item_id'  value='${obj._id}' />
                            </td>
                            <td>
                                <input class='form-control quantity' type='text' style='width:80px;' name='item_quantity' class='quantity' value='${reqQuantity.val()}' readonly />
                            </td>
                            <td>
                                <input class='form-control price t-right' type='text' name='item_price' value='${addComma(obj.product_price)}' readonly />
                            </td>
                            <td>
    
                            </td>
                            <td>
                            </td>
                            <td>
                                <input class='form-control total t-right' type='text' value='${addComma((parseFloat(obj.product_price) * parseInt(reqQuantity.val()).toFixed(2)))}' readonly />
                            </td>
                            <td>
                                <button type='button' class='btn btn-block btn-danger btn-del' value='${arrCheckStock.length}'>ลบ</button>
                            </td>
                        </tr>
                    `)
                    arrCheckStock[arrCheckStock.length] = {_id:obj._id, quantity:reqQuantity.val(), price:addComma(obj.product_price), total:addComma((parseFloat(obj.product_price) * parseInt(reqQuantity.val()).toFixed(2))), count:parseInt(reqQuantity.val()), index:arrCheckStock.length, product_quantity:obj.product_quantity - parseInt(reqQuantity.val())};
                } else {
                    let tb = document.querySelector('.table_product');
                    checkStock.count += parseInt(reqQuantity.val());
                    let cost = checkStock.product_quantity - parseInt(reqQuantity.val());
                    if(cost >= 0) {
                        checkStock.product_quantity = cost;
                        let quantity = $('.quantity')[checkStock.index];
                        let price = $('.price')[checkStock.index];
                        let total = $('.total')[checkStock.index];
                        let sumTotal = parseFloat(removeComma(price.value)) * checkStock.count;
                        quantity.value = checkStock.count;
                        total.value = addComma(sumTotal.toFixed(2));
                    } else {
                        reqQuantity.addClass('is-invalid');
                        spanAlert.text('จำนวนมากกว่าปริมาณวัสดุ กรุณาเปลี่ยนจำนวน !')
                        spanAlert.addClass('invalid-feedback');
                        return false;
                    }
    
                }
                input.val('')
    
                
            }
        } else {
            $('span[data-from="order_code_show"]').addClass('error');
        }
        let sum = $('.total');
        let calTotal = 0;
        $.each(sum, (index, elem) => {
            calTotal += parseFloat(removeComma(elem.value));
            if(index == (sum.length - 1)) {
                console.log($('#order-totalmoney'))
                $('#order-totalmoney').val(addComma(calTotal))
            }
        })
    })
    
    $('body').on('click', '.btn-del', (e) => {
        e.preventDefault();
        swal({
            title: "ยืนยันการทำรายการ ?",
            text: `ต้องลบรายการเบิกใช่หรือไม่`,
            icon: "warning",
            buttons: {
                "ยืนยัน": {
                    value: 'confirm'
                },
                cancel: "ยกเลิก"
            },
            dangerMode: true,
        }).then(async(value) => {
            if(value == 'confirm'){
                swal({
                    title: "ลบข้อมูลเรียบร้อยแล้ว !",
                    text: ' ',
                    icon: "success",
                    button: false,
                    timer: 1500
                }).then(async() => {
                    let pointer = e.target.value
                    let remove = $('#table_product').children('tr').eq(pointer).remove();
                    let sorting = $('.btn-del');
                    $.each(sorting, (index, elem) => {
                        elem.value = index
                    })
                    
                    
                    let total = $('input.total');
                    let calSum = 0;
                    $.each(total, (index, elem) => {
                        calSum += parseFloat(removeComma(elem.value))
                    })
                    $('#order-totalmoney').val(addComma(calSum))
                    arrCheckStock.splice(pointer, 1)
                    arrCheckStock.map((obj, index) => {
                        obj.index = index;
                    })
                    console.log(arrCheckStock);
                })
            }   
        })

    })
    let testx = [];
    // fetch(gUrl+'/api/product/showallitem/checkitem')
    //     .then(response => response.json())
    //     .then(result => {
    //         testx.push(result)
    //         console.log(testx);
    // });
    console.log(testx);
    new Autocomplete('#autocomplete', {
        search: async input => {
            var arr=[];
            console.log(arrCheckStock);
            await fetch(gUrl+'/api/product/showallitem')
                .then(response => response.json())
                .then(async(result) => {
                    for(let i = 0;i < result.length;i++) {
                        let objAppend = {};
                        let { product_code:pc, product_name:pn, product_quantity:pqi,product_onStock:pq, _id:id, product_price:pp } = result[i]
                        let checkSt = arrCheckStock.find(({_id}) => _id === id);
                        // console.log(checkSt)
                        console.log(result[i]);
                        var totalpq = 0
                        if(checkSt) {
                            totalpq = pq + checkSt.count
                            totalpq -= checkSt.count
                        } else {
                            totalpq = pq
                        };
                        objAppend = {name:`${pc} - ${pn} / คงเหลือ ${totalpq}`, product_code:pc, product_name:pn, product_quantity:pq, _id:id, product_price:pp };
                        if(pq > 0) arr.push(objAppend);
                    }
                });
            return arr;
        },
        getResultValue : result => result.name,
        onSubmit: result => {
            $('[name="order_code_show"]').attr('data-obj', JSON.stringify(result));
            // alert(`You selected ${result}`)
        },
      })    
    
    
    
})



$(".modal")[0].onscroll = () => {
  $(".datepicker").css("display", "none");
  $("#order-date").blur();
};

async function postData(url = '') {
    // Default options are marked with *
    const response = await fetch(url);
    return response.json(); // parses JSON response into native JavaScript objects
}