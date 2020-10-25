$('body').on('click', '.btn-add', async(e) => {
    if(!form.item_id) {
        swal({
            title: "กรุณาเพิ่มวัสดุที่ต้องการเบิก !",
            text: ' ',
            icon: "error",
            button: false,
            timer: 1500
        })
    }
    let errCount = 0;

    
    if(errCount > 0) return false;
    
    var dateVal = prepareDate(form.order_date.value);
    let formData = new FormData(form);
    formData.append('order_date', dateVal)
    // formData.set('product_price', removeComma(formProduct.product_price.value));
    // formData.set('product_status', formProduct.product_status.checked)
    // formData.forEach((val, key, parent) => {
    //     console.log(val, key, parent)
    // })
    let pSelect = $('.table_product');
    $.each(pSelect, (index, elem) => {
        console.log(elem);
    })
    let { typed, action, editbyid } = e.target.dataset;
    console.log(editbyid);
    let urlPost = editbyid == undefined ? gUrl + '/api/itemwithdraw/' + action : gUrl + '/api/itemwithdraw/' + action +'/' + editbyid;
    console.log(urlPost);
    let addData = await $.ajax({
        url: urlPost,
        method:"POST",
        // cache: false,
        data: $(form).serialize(),
        success: (result) => {
            return result;
        }
    })
    console.log(addData)
    
    if(addData.data !== undefined) {
        if(addData.action == 'add') {
            swal({
                title: "เพิ่มข้อมูลเรียบร้อยแล้ว !",
                text: ' ',
                icon: "success",
                button: false,
                timer: 1500
            })
            // tablesx.ajax.reload();
            $('#ajaxLargeModalIndex').modal('hide')
        } else if (addData.action == 'edit') {
            swal({
                title: "แก้ไขข้อมูลเรียบร้อยแล้ว !",
                text: ' ',
                icon: "success",
                button: false,
                timer: 1500
            })
            // tablesx.ajax.reload();
            $('#ajaxLargeModalIndex').modal('hide')
        }
    } 
    // $('.modal').modal('toggle')
})
