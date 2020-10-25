'use strict'

$("#main").niceScroll();

const callAPI2 = async(url, itemID = '', action = '') => {
    return $.ajax({
        url: url + action + itemID,
        method: "POST"
    })
}

/* ajax modal */
$('#ajaxModal, #ajaxLargeModal').on('show.bs.modal', function (e) {
    console.log(e)
    var link = $(e.relatedTarget);
    try{
        $(this).find('.modal-content').load(link.attr('href'))
    } catch (err) {
        console.log(err);
    }
    // $(this).find('.modal-content').load(link.attr('href'));
});

$('#ajaxModal, #ajaxLargeModal').on('hidden.bs.modal', function (e) {
    // e.preventDefault()
    console.log(e);
    $('.modal-content').empty();
    $(this).removeData('bs.modal');
});


$(document).ready( () => {
    let overlaySidebar = $('.overlay-sidebar');
    let searchData = {};
    var tableProduct = $('#Product').DataTable({
        ajax: {
            method: 'GET',
            url: 'http://localhost:3000/backendx/api/product/table_product',
            data: function(d){
				return $.extend(d, searchData);
			}

        },
        'columns': [
            {
                data: 'product_name',
                render: (data, type, row) => {
                    return (`
                        <a data-toggle="modal" data-target="#ajaxLargeModal" href="api/product/${row['_id']}/${userRole}">${row['product_name']}</a>
                    `)
                }
            },
            {
                data: 'product_code',
                render: (data, type, row) => {
                    return (`
                        <a data-toggle="modal" data-target="#ajaxLargeModal" href="api/product/${row['_id']}/${userRole}">${row['product_code']}</a>
                    `)
                }
            },
            {
                data: 'product_category',
                render: (data, type, row) => {
                    return (`
                        <span>${row['product_category'].item_description}</span>
                    `)
                }
            },
            {
                data: 'product_status',
                render: (data, type, row) => {
                    let statBox = data  === true ? '<span class="fas fa-check"> </span>' : '<span class="fas fa-times"></span>' ;
                    return (`
                        <span>${statBox}</span>
                    `)
                }
            },
            {
                data: 'product_image',
                render: (data, type, row) => {
                    let path = row['product_image']['path']
                    if(path) path = path.replace('public\\', '../');
                    let picture = (data !== null ? '<div class="t-center"><img src="'+ path +'" height="150" width="150" /></div>' : '<span>No Picture</span>')
                    return picture;
                }
            },
            {
                data: '_id',
                render:  (data, type, row) => {
                    return userRole.toLowerCase() === 'admin' ? (`
                        <a
                            class="btn btn-outline-dark btn-sm mr-7 fas fa-edit"
                            href="api/product/${data}/${userRole}"
                            style="width: 85px; height: 32px"
                            data-toggle="modal" data-target="#ajaxLargeModal"
                            data-typed="edit"
                        >
                            <font class="thNews">แก้ไข</font></a>
                        <a
                            class="btn btn-outline-danger btn-sm btn-delete mr-7 fas fa-trash"
                            href="api/product/"
                            data-itemid="${data}"
                            data-desc="${row['product_name']}"
                            data-action="delete"
                            style="width: 85px; height: 32px"
                        >
                        <font class="thNews">ลบ</font></a>
                
                    `) : (`
                        <a
                            class="btn btn-outline-dark btn-sm mr-7 fas fa-edit"
                            href="api/product/${data}/${userRole}"
                            style="width: 102px; height: 32px"
                            data-toggle="modal" data-target="#ajaxLargeModal"
                            data-typed="edit"
                        >
                            <font class="thNews">ตรวจสอบ</font></a>
                    `) ;
                },
                orderable: false
            },
        ]
        
        });
        $('body').on('change', 'select[name=category_id]', function (e) {
            searchData.category_id = $('select[name=category_id]').val();
            tableProduct.ajax.reload();
        });
        $('body').on('click', '.btn-delete', async (e) => {
            if(e.target.nodeName === 'FONT') {
                e.preventDefault();
                e = e.target.parentNode
                var { href, dataset, offsetHeight, offsetWidth } = e;
            } else {
                e.preventDefault();
                var { href, dataset, offsetHeight, offsetWidth } = e.target;
            }

            swal({
                title: "ยืนยันการทำรายการ ?",
                text: `ต้องการจะลบวัสดุ/ครุภัณฑ์ ${dataset.desc} ใช่หรือไม่`,
                icon: "warning",
                buttons: {
                    "ยืนยัน": {
                        value: 'confirm'
                    },
                    cancel: "ยกเลิก"
                },
                dangerMode: true,
            }).then(async(value) => {
                if(value === 'confirm'){       
                    let reqData = await callAPI2(href, dataset.itemid, 'delete/');
                    // return false;
                    if(reqData === "success") {
                        swal({
                            title: "ลบข้อมูลเรียบร้อยแล้ว !",
                            text: ' ',
                            icon: "success",
                            button: false,
                            timer: 1500
                        }).then(async() => {
                            overlaySidebar.addClass('show-overlay-sidebar');
                            overlaySidebar.append(`
                                <div id='spinner' style='top:calc(${overlaySidebar.height() / 2}px - 3rem);left:calc(${overlaySidebar.width() / 2}px - 3rem)'>
                                    <div class="spinner-border text-primary" role="status" style="width:5rem;height:5rem;">
                                        <span class="sr-only">Loading...</span>
                                    </div>
                                </div>
                                
                            `)
                            setTimeout(() => {
                                overlaySidebar.removeClass('show-overlay-sidebar');
                                overlaySidebar.empty();
                            }, 600)
                            tableProduct.ajax.reload();
                        })
                    } else if (reqData === "using") {

                    } else if (reqData === 'error') {

                    }
                }
            })
        })
    $('body').on('click', '.btn-add-product', async(e) => {

        let errCount = 0;
        if(formProduct.product_name.value.length === 0) {
            let spanAlert = $('span[data-from="'+formProduct.product_name.name+'"]');
            spanAlert.addClass('error');
            formProduct.product_name.focus();
            errCount++;
        }
        // if(formProduct.product_code.value.length === 0 ) {
        //     let spanAlert = $('span[data-from="'+formProduct.product_code.name+'"]');
        //     spanAlert.addClass('error');
        //     formProduct.product_code.focus();
        //     errCount++;
        // }
        if(formProduct.product_category.value.length === 0 ) {
            let spanAlert = $('span[data-from="'+formProduct.product_category.name+'"]');
            spanAlert.addClass('error');        
            formProduct.product_category.focus()
            errCount++;
        }
        if(formProduct.product_unitCount.value.length === 0 ) {
            let spanAlert = $('span[data-from="'+formProduct.product_unitCount.name+'"]');
            spanAlert.addClass('error');
            formProduct.product_unitCount.focus()
            errCount++;
        }
        
        if(errCount > 0) return false;
        
        let dateVal = new Date(formProduct.dateStarted.value)
        let formData = new FormData(formProduct);

        
        formData.append('product_startDate', dateVal)
        formData.set('product_price', removeComma(formProduct.product_price.value));
        formData.set('product_status', formProduct.product_status.checked)
        formData.forEach((val, key, parent) => {
            console.log(val, key, parent)
        })
        
        let { typed, action, editbyid } = e.target.dataset;
        let addData = await $.ajax({
            url:'api/' + typed + '/' + action + '/' + editbyid,
            method:"POST",
            processData: false,
            contentType: false,
            data: formData,
            success: (result) => {
                return result;
            }
        })
       
        if(addData.data !== undefined) {
            if(addData.action == 'add') {
                swal({
                    title: "เพิ่มข้อมูลเรียบร้อยแล้ว !",
                    text: ' ',
                    icon: "success",
                    button: false,
                    timer: 1500
                })
                tableProduct.ajax.reload();
                $('#ajaxLargeModal').modal('hide')
            } else if (addData.action == 'edit') {
                swal({
                    title: "แก้ไขข้อมูลเรียบร้อยแล้ว !",
                    text: ' ',
                    icon: "success",
                    button: false,
                    timer: 1500
                })
                tableProduct.ajax.reload();
                $('#ajaxLargeModal').modal('hide')
            }
        } 
        // $('.modal').modal('toggle')
    })
})

