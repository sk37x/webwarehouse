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
    $(this).find('.modal-content').load(link.attr('href'))
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
    // return false;
    var tablesx = $('#'+gClass).DataTable({
        ajax: {
            method: 'GET',
            url: gUrl + '/api/' + gClass + '/table_data',
            data: function(d){
				return $.extend(d, searchData);
			}
        },
        'columns': [
            {
                data: 'userlogin',
                render: (data, type, row) => {
                    return (`
                        <a data-toggle="modal" data-target="#ajaxLargeModal" href="api/${gClass}/modal/${row['_id']}">${row['firstname']} ${row['lastname']}</a>
                    `)
                }
            },
            {
                data: 'userlogin',
                render: (data, type, row) => {
                    return (`
                        <span>${data.username}</span>
                    `)
                }
            },
            {
                data: 'userlogin',
                render: (data, type, row) => {
                    return (`
                        <span class='mr-7 password-display' data-itemid='${data._id}'>*********</span>
                        <a class='btn btn-outline-warning fa fa-unlock-alt btn-show-pass' style='color:black;float:right;' href='api/${gClass}/showpass' data-itemid='${data._id}' style='float:right;'>
                            <font class='thNews'>แสดงรหัสผ่าน</font>
                        </a>
                    `)
                }
            },
            {
                data: 'userlevel',
                render: (data, type, row) => {
                    return (`
                        <span>${data.userlevel}</span>
                    `)
                }
            },
            {
                data: 'phoneTel',
                render: (data, type, row) => {
                    return (`
                        <span>${data}</span>
                    `)
                }
            },
            {
                data: 'userlogin',
                render: (data, type, row) => {
                    return (`
                        <span>${data.email}</span>
                    `)
                }
            },
            {
                data: 'status',
                render: (data, type, row) => {
                    let status = data == 'Online' ? 'status-online' : 'status-offline';
                    return (`
                        <div class="blockx-status">
                            <span class='${status}'></span>
                            <span class="statusx">${data}</span>
                        </div>
                    `)
                }
            },
            {
                data: '_id',
                render: (data, type, row) => {
                    return row['status'] === 'Offline' ? (`
                        <a
                            class="btn btn-outline-dark btn-sm mr-7 fas fa-edit"
                            href="api/${gClass}/modal/${row['_id']}"
                            style="width: 85px; height: 32px"
                            data-toggle="modal" data-target="#ajaxLargeModal"
                            data-typed="edit"
                        >
                            <font class="thNews">แก้ไข</font></a>
                        <a
                            class="btn btn-outline-danger btn-sm btn-delete mr-7 fas fa-trash"
                            href="api/${gClass}/"
                            data-itemid="${data}"
                            data-desc="${row['userlogin']['username']}"
                            data-action="delete"
                            style="width: 85px; height: 32px"
                        >
                        <font class="thNews">ลบ</font></a>
                
                    `) : '';
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
                text: `ต้องการจะลบผู้ใช้ ${dataset.desc} ใช่หรือไม่`,
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
                    console.log(reqData);
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
                            tablesx.ajax.reload();
                        })
                    } else if (reqData === "using") {

                    } else if (reqData === 'error') {

                    }
                }
            })
        })

        

    $('body').on('click', '.btn-add', async(e) => {
        var { action:ac } = e.target.dataset;
        let errCount = 0;
        if(ac === 'add') {
            if(form.passwordConf.value.length > 0 && form.password.value.length > 0) {
                if(form.password.value !== form.passwordConf.value){
                    $(`span[data-from="password"]`).text('รหัสยืนยันไม่ตรง')
                    $(`span[data-from="passwordConf"]`).text('กรุณากรอกให้ตรงกับรหัสผ่าน')
                    $(form.password).addClass('is-invalid');
                    $(form.passwordConf).addClass('is-invalid');
                    form.passwordConf.focus();
                    errCount++;
                } else {
                    $(form.password).removeClass('is-invalid');
                    $(form.passwordConf).removeClass('is-invalid');
                    $(`span[data-from="passwordConf"]`).text('กรุณากรอกข้อมูล') ;
                }
            }
            if(form.email.value.length > 0) {
                let validate = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9]\.[a-zA-Z0-9])(?:\.{0,11}[a-zA-Z0-9](?:[a-zA-Z0-9-]{1,61}[a-zA-Z0-9])?)*$/;
                console.log(validate.test(form.email.value));
                if(!validate.test(form.email.value)) {
                    form.email.classList.add('is-invalid');
                    $('span[data-from="email"]').addClass('error');
                    $('span[data-from="email"]').text('รูปแบบอีเมลไม่ถูกต้อง');
                    errCount++;
                } else {
                    form.email.classList.remove('is-invalid');
                    $('span[data-from="email"]').removeClass('error');
                }
            }
            try {


                let x = await $.ajax({
                    url:"api/users",
                    method: 'POST', 
                    data : $(form).serialize(),
                    success: (result) => {
                        if(result.userExist === true) {
                            $(form.username).addClass('is-invalid');
                            $(`span[data-from="username"]`).text(`กรุณาเปลี่ยนชื่อผู้ใช้งานเนื่องจากมี ${form.username.value} อยู่แล้ว`);
                            $(form.username).focus();
                            errCount++;
                        } else {
                            // $(form.username).addClass('is-invalid');
                            $(`span[data-from="username"]`).text('กรุณากรอกข้อมูล')
                        }
                        result.objNull.map((value, index) => {
                            switch(value) {
                                case 'username':
                                    $(`span[data-from="${value}"]`).addClass('error');
                                    $(form[value]).addClass('is-invalid');
                                    errCount === 0 ? $(form[value]).focus() : '';
                                    errCount++;
                                    break;
                                case 'password':
                                    $(`span[data-from="${value}"]`).addClass('error');
                                    $(form[value]).addClass('is-invalid');
                                    errCount === 0 ? $(form[value]).focus() : '';
                                    errCount++;
                                    break;
                                case 'passwordConf':
                                    $(`span[data-from="${value}"]`).addClass('error');
                                    $(form[value]).addClass('is-invalid');
                                    errCount === 0 ? $(form[value]).focus() : '';
                                    errCount++;
                                    break;
                                case 'firstname':
                                    $(`span[data-from="${value}"]`).addClass('error');
                                    $(form[value]).addClass('is-invalid');
                                    errCount === 0 ? $(form[value]).focus() : '';
                                    errCount++;
                                    break;
                                case 'lastname':
                                    $(`span[data-from="${value}"]`).addClass('error');
                                    $(form[value]).addClass('is-invalid');
                                    errCount === 0 ? $(form[value]).focus() : '';
                                    errCount++;
                                    break;
                                case 'userlevel':
                                    $(`span[data-from="${value}"]`).addClass('error');
                                    $(form[value]).addClass('is-invalid');
                                    errCount === 0 ? $(form[value]).focus() : '';
                                    errCount++;
                                    break;
                            }
                        })

                    }
                })        
            } catch(err) {

                console.log(err)
                if(err.statusText === "Payload Too Large") {
                    swal({
                        title: "ไม่สามารถเพิ่มข้อมูลได้ !",
                        text: 'เนื่องจากรูปภาพมีขนาดเกินกำหนด กรุณาเปลี่ยนรูปภาพ',
                        icon: "error",
                        button: false,
                        timer: 1500
                    })
                    return false; 
                } 
            }
                
        } else {
            
        }

        if(errCount > 0) return false;
        var formData = new FormData(form);
        formData.forEach((val, key, parent) => {
            console.log(val, key, parent)
        })
        // formData.test =  form.fileUpload.files[0];
        // formData.append('test', form.fileUpload.files[0]);
        // console.log(formData)
        // console.log(formData.getAll('test').values)
        let { typed, action, editbyid } = e.target.dataset;
        console.log(editbyid)
        let urlPost = !editbyid ? gUrl + '/api/' + gClass + '/' + action : gUrl + '/api/' + gClass + '/' + action +'/' + editbyid;
        // console.log(urlPost);
        // return false;
            var addData = await $.ajax({
                url: urlPost,
                method: "POST",
                processData: false,
                contentType: false,
                data: formData,
                // data: $(form).serialize(),
                success: (result) => {
                    return result;
                }, 
                error: (err) => {
                    console.log(err);
                }
            })
            console.log(addData);
            // return false;
            if(addData.data !== undefined) {
                if(addData.action == 'add') {
                    swal({
                        title: "เพิ่มข้อมูลเรียบร้อยแล้ว !",
                        text: ' ',
                        icon: "success",
                        button: false,
                        timer: 1500
                    }).then(() => {
                        tablesx.ajax.reload();
                        $('#ajaxLargeModal').modal('hide')
                    })
                } else if (addData.action == 'edit') {
                    swal({
                        title: "แก้ไขข้อมูลเรียบร้อยแล้ว !",
                        text: ' ',
                        icon: "success",
                        button: false,
                        timer: 1500
                    }).then(() => {
                        tablesx.ajax.reload();
                        $('#ajaxLargeModal').modal('hide')
                    })
                }
                } else if (addData.action == 'alertExist') {
                    swal({
                        title: "ไม่สามารถเพิ่มข้อมูลได้เนื่องจากมีผู้ใช้นี้อยู่แล้ว !",
                        text: ' ',
                        icon: "error",
                        button: false,
                        timer: 1500
                    }).then(() => {
                        tablesx.ajax.reload();
                        $('#ajaxLargeModal').modal('hide')
                    })
                }
            // } 

        // $('.modal').modal('toggle')
    })
 
    $('body').on('click', '.btn-show-pass', async(e) => {
        if(e.target.nodeName === 'FONT') {
            e.preventDefault();
            e = e.target.parentNode
            var { href, dataset, offsetHeight, offsetWidth } = e;
        } else {
            e.preventDefault();
            e = e.target
            var { href, dataset, offsetHeight, offsetWidth } = e.target;
        }
        let b = await $.ajax({
            url: e.href + '/' + dataset.itemid,
            method: "POST",
            success : (result) => {
                $.each($('.password-display'), (index, elem) => {
                    let _id = elem.dataset.itemid;
                    if(_id === dataset.itemid){
                        elem.innerText = result.passwordDecode;
                        elem.classList.add('showed');
                    } else {
                        elem.innerText = '*********';
                        elem.classList.remove('showed');
                    }
                })
            }
        })
    })
    
    
})

