"use strict";

$("#main").niceScroll();

const callAPI2 = async (urlH, itemID = "", action = "") => {
	console.log(urlH + action + itemID);
	return $.ajax({
		url: urlH + action + itemID,
		method: "POST",
	});
};

/* ajax modal */
$("#ajaxModal, #ajaxLargeModal").on("show.bs.modal", async function (e) {
	console.log(e);
	var link = $(e.relatedTarget);
	try {
		await $(this).find(".modal-content").load(link.attr("href"));
	} catch (err) {
		console.log(err);
	}
	// $(this).find('.modal-content').load(link.attr('href'));
});

$("#ajaxModal, #ajaxLargeModal").on("hidden.bs.modal", function (e) {
	// e.preventDefault()
	console.log(e);
	$(".modal-content").empty();
	$(this).removeData("bs.modal");
});

$(document).ready(() => {
	var col = [];
	if (gClass == "reportx") gClass = gClass + "_" + gSubClass;
	var sortCol = {
		itemwithdraw:0,
		reportx_itemwithdraw:2,
		reportx_product:0,
	}
	var colType = {
		itemwithdraw: [
			{
				data: "order_date",
				render: (data, type, row) => {
					let date = new Date(data);
					// console.log(date);
					let showDateTH = compareDate2TextTH(date);
                    // console.log(data);
					if (type === "sort") {
                        let time = date.getTime();
                        // console.log(new Date(time))
						return time;
					}

					return `
                        <a data-toggle="modal" data-target="#ajaxLargeModal" href="api/${gClass}/modal/${row["_id"]}">${showDateTH}</a>
                    `;
				},
			},
			{
				data: "order_no",
				render: (data, type, row) => {
					return `
                        <a data-toggle="modal" data-target="#ajaxLargeModal" href="api/${gClass}/modal/${row["_id"]}">${data}</a>
                    `;
				},
			},
			{
				data: "order_by",
				render: (data, type, row) => {
					return `
                        <span>${data.firstname} ${data.lastname}</span>
                    `;
				},
			},
			{
				data: "order_totalmoney",
				render: (data, type, row) => {
					return `
                        <div class='t-right'>${addComma(data)}</div>
                    `;
				},
			},
			{
				data: "order_status",
				render: (data, type, row) => {
					let renderStatus = "";
					switch (data.toLowerCase()) {
						case "pending":
							renderStatus =
								"<span class='badge badge-warning' style='font-size:16pt;'> รอการตรวจสอบ </span>";
							break;
						case "approve":
							renderStatus =
								"<span class='badge badge-success' style='font-size:16pt;'> อนุมัติ </span>";
							break;
						case "disapprove":
							renderStatus =
								"<span class='badge badge-danger' style='font-size:16pt;'> ไม่อนุมัติ </span>";
							break;
					}
					return `
                        <div>${renderStatus}</div>
                    `;
				},
			},

			{
				data: "_id",
				render: (data, type, row) => {
					return row["order_status"].toLowerCase() === "pending"
						? `
                        <a
                            class="btn btn-outline-dark btn-sm mr-7 fas fa-edit"
                            href="api/${gClass}/modal/${data}"
                            style="width: 85px; height: 32px"
                            data-toggle="modal" data-target="#ajaxLargeModal"
                            data-typed="edit"
                        >
                            <font class="thNews">แก้ไข</font></a>
                        <a
                            class="btn btn-outline-danger btn-sm btn-delete mr-7 fas fa-trash"
                            href="api/${gClass}/"
                            data-itemid="${data}"
                            data-desc="${row["order_no"]}"
                            data-action="delete"
                            style="width: 85px; height: 32px"
                        >
                        <font class="thNews">ลบ</font></a>
                
                    `
						: `
                    <a
                        class="btn btn-outline-dark btn-sm mr-7 fas fa-edit"
                        href="api/${gClass}/modal/${data}"
                        style="width: 100px; height: 32px"
                        data-toggle="modal" data-target="#ajaxLargeModal"
                        data-typed="edit"
                    >
                        <font class="thNews">ตรวจสอบ</font></a>`;
				},
				orderable: false,
			},
		],

		reportx_itemwithdraw: [
			{
				data: "order_no",
				render: (data, type, row) => {

					return `
                    <span>${data}</span>
                `;
				},
			},
			{
				data: "order_by",
				render: (data, type, row) => {
					return `
                    <span>${data.firstname} ${data.lastname}</span>
                `;
				},
			},
			{
				data: "order_date",
				render: (data, type, row) => {
					let date = new Date(data);
                    let showDateTH = compareDate2TextTH(date);
                    if (type === "sort") {
                        let time = date.getTime();
                        // console.log(new Date(time))
						return time;
					}
					return `
                    <div>${showDateTH}</div>
                `;
				},
			},
			{
				data: "order_totalmoney",
				render: (data, type, row) => {
					return `
                    <div class='t-right'>${addComma(data)}</div>
                `;
				},
			},
			{
				data: "order_status",
				render: (data, type, row) => {
					let renderStatus = "";
					switch (data.toLowerCase()) {
						case "pending":
							renderStatus =
								"<span class='badge badge-warning' style='font-size:16pt;'> รอการตรวจสอบ </span>";
							break;
						case "approve":
							renderStatus =
								"<span class='badge badge-success' style='font-size:16pt;'> อนุมัติ </span>";
							break;
						case "disapprove":
							renderStatus =
								"<span class='badge badge-danger' style='font-size:16pt;'> ไม่อนุมัติ </span>";
							break;
					}
					return `
                    <div>${renderStatus}</div>
                `;
				},
			},
			{
				data: "_id",
				render: (data, type, row) => {
					return `
                    <a href='${gUrl}/print/${data}' class="thNews btn btn-primary btn-print">
                        <i class="fas fa-print">
                            <font class="thNews">พิมพ์</font>
                        </i>
                    </a>
                `;
				},
			},
		],

		reportx_product: [
			{
				data: "product_image",
				render: (data, type, row) => {
					let path = row["product_image"]["path"];
					if (path) path = path.replace("public\\", "../../");
					let picture =
						data !== null
							? '<div class="t-center"><img src="' +
							  path +
							  '" height="150" width="150" /></div>'
							: "<span>No Picture</span>";
					return picture;
				},
			},
			{
				data: "product_code",
				render: (data, type, row) => {
					return `
                    <div>${row["product_code"]}</div>
                `;
				},
			},
			{
				data: "product_category",
				render: (data, type, row) => {
					return `
                    <span>${row["product_category"].item_description}</span>
                `;
				},
			},
			{
				data: "product_name",
				render: (data, type, row) => {
					return `
                    <div>${row["product_name"]}</div>
                `;
				},
			},
			{
				data: "product_price",
				render: (data, type, row) => {
					return `
                    <div class='text-right'>${addComma(
											row["product_price"]
										)}</div>
                `;
				},
			},
			{
				data: "product_unitCount",
				render: (data, type, row) => {
					var unitC = [
						"นิ้ว",
						"ถุง",
						"เล่ม",
						"ขวด",
						"กระป๋อง",
						"กล่อง",
						"คาร์ตัน",
						"ถ้วย",
						"หีบ",
						"ถัง",
						"โหล",
						"ชิ้น",
						"แฟ้ม",
						"ออนซ์หน่วยวัดของเหลว US",
						"ฟุต",
						"ตารางฟุต",
						"กรัม",
						"ออนซ์",
						"คู่",
						"แพค/ห่อ",
						"งวด",
						"รีม",
						"Roll",
						"ผืน",
						"แผ่น",
						"ชุด",
						"ท่อน",
						"ตัน",
						"กิโลกรัม",
						"ลิตร",
						"เมตร",
						"โมลต่อลิตร",
						"ตารางเมตร",
						"เครื่อง",
						"มัด",
						"มิลลิกรัม",
						"มิลลิลิตร",
						"มิลลิเมตร",
						"ท่อ",
						"แท่ง",
						"ขด",
						"โคม",
						"คิว",
						"ปี๊บ",
						"ซอง",
						"ดวง",
						"ดอก",
						"แผง",
						"ตลับ",
						"เที่ยว",
						"ตัว",
						"นัด",
						"แท่น",
						"บาน",
						"ใบ",
						"ภาพ/รูป",
						"เรือน",
						"ล้อ",
						"ลัง",
						"วง",
						"เส้น",
						"ลูก",
						"หลอด",
						"หลัง",
						"เม็ด",
						"กรง",
						"กรอบ",
						"กระถาง",
						"กระบอก",
						"ก้อน",
						"หน่วย",
					];
					return `
                    <span>${unitC[data]}</span>
                `;
				},
			},
			{
				data: "product_onStock",
				render: (data, type, row) => {
					const percentCal = (parseInt(row["product_quantity"]) * 10) / 100;
					const classBadge =
						data < percentCal ? "badge badge-danger" : "badge badge-success";
					return `
                    <span class="${classBadge}">${data}</span>
                `;
				},
			},
			{
				data: "product_status",
				render: (data, type, row) => {
					let statBox =
						data === true
							? '<span class="badge badge-success">ใช้งาน</span>'
							: '<span class="badge badge-danger">ยกเลิกใช้งาน</span>';
					return `
                    ${statBox}
                `;
				},
			},
		],
	};
	var searchData = {};
	
	var tablesx = $("#" + gClass).DataTable({
		ajax: {
			method: "GET",
			url:
				"http://localhost:3000/backendx/api/" +
				gClass.replace("_", "/") +
				"/table_data",
			data: function (d) {
				return $.extend(d, searchData);
			},
		},
		columns: colType[gClass],
		order: [[sortCol[gClass], "desc"]],
	});

	$("body").on("change", "select[name=order_status]", function (e) {
		searchData.category_id = $("select[name=order_status]").val();
		tablesx.ajax.reload();
	});

	$("body").on("click", ".testx", async (e) => {
		e.preventDefault();
		$.ajax({
			url: e.target.href,
			method: "POST",
			data: $(".app").html(),
			success: (result) => {
				console.log(result);
			},
		});
	});
	$("body").on("click", ".btn-delete", async (e) => {
		if (e.target.nodeName === "FONT") {
			e.preventDefault();
			e = e.target.parentNode;
			var { href, dataset, offsetHeight, offsetWidth } = e;
		} else {
			e.preventDefault();
			var { href, dataset, offsetHeight, offsetWidth } = e.target;
		}

		swal({
			title: "ยืนยันการทำรายการ ?",
			text: `ต้องลบรายการเบิกสินค้า ${dataset.desc} ใช่หรือไม่`,
			icon: "warning",
			buttons: {
				ยืนยัน: {
					value: "confirm",
				},
				cancel: "ยกเลิก",
			},
			dangerMode: true,
		}).then(async (value) => {
			if (value === "confirm") {
				let reqData = await callAPI2(href, dataset.itemid, "delete/");
				console.log(reqData);
				if (reqData === "success") {
					swal({
						title: "ลบข้อมูลเรียบร้อยแล้ว !",
						text: " ",
						icon: "success",
						button: false,
						timer: 1500,
					}).then(async () => {
						let overlaySidebar = $(".overlay-sidebar");
						overlaySidebar.addClass("show-overlay-sidebar");
						overlaySidebar.append(`
                            <div id='spinner' style='top:calc(${
															overlaySidebar.height() / 2
														}px - 3rem);left:calc(${
							overlaySidebar.width() / 2
						}px - 3rem)'>
                                <div class="spinner-border text-primary" role="status" style="width:5rem;height:5rem;">
                                    <span class="sr-only">Loading...</span>
                                </div>
                            </div>
                            
                        `);
						setTimeout(() => {
							overlaySidebar.removeClass("show-overlay-sidebar");
							overlaySidebar.empty();
						}, 600);
						tablesx.ajax.reload();
					});
				} else if (reqData === "using") {
				} else if (reqData === "error") {
				}
			}
		});
	});

	$("body").on("click", ".btn-add", async (e) => {
		if (gClass === "itemwithdraw") {
			if (!form.item_id) {
				swal({
					title: "กรุณาเพิ่มวัสดุที่ต้องการเบิก !",
					text: " ",
					icon: "error",
					button: false,
					timer: 1500,
				});
			}
		}
		let errCount = 0;

		if (errCount > 0) return false;

		var dateVal = prepareDate(form.order_date.value);
		let formData = new FormData(form);
		formData.append("order_date", dateVal);
		// formData.set('product_price', removeComma(formProduct.product_price.value));
		// formData.set('product_status', formProduct.product_status.checked)
		// formData.forEach((val, key, parent) => {
		//     console.log(val, key, parent)
		// })
		let pSelect = $(".table_product");
		$.each(pSelect, (index, elem) => {
			console.log(elem);
		});
		let { typed, action, editbyid } = e.target.dataset;
		console.log(editbyid);
		let urlPost =
			editbyid == undefined
				? gUrl + "/api/" + gClass + "/" + action
				: gUrl + "/api/" + gClass + "/" + action + "/" + editbyid;
		console.log(urlPost);
		let addData = await $.ajax({
			url: urlPost,
			method: "POST",
			// cache: false,
			data: $(form).serialize(),
			success: (result) => {
				return result;
			},
		});
		console.log(addData);

		if (addData.data !== undefined) {
			if (addData.action == "add") {
				swal({
					title: "เพิ่มข้อมูลเรียบร้อยแล้ว !",
					text: " ",
					icon: "success",
					button: false,
					timer: 1500,
				});
				tablesx.ajax.reload();
				$("#ajaxLargeModal").modal("hide");
			} else if (addData.action == "edit") {
				swal({
					title: "แก้ไขข้อมูลเรียบร้อยแล้ว !",
					text: " ",
					icon: "success",
					button: false,
					timer: 1500,
				});
				tablesx.ajax.reload();
				$("#ajaxLargeModal").modal("hide");
			} else if (addData.action == "error") {
				if (gClass === "itemwithdraw") {
					if (addData.data === "dataexists") {
						let a = $("#order_no");
						a.addClass("is-invalid");
						$('[data-from="order_no"]').addClass("error");
					}
					console.log("testErr");
					return false;
				}
			}
		}
		// $('.modal').modal('toggle')
	});

	$("body").on("click", ".export-excel", (e) => {
		// reportx_product
		let tableExport = document.querySelector("table[id]");
		let test = tableExport.cloneNode(true);
		console.log([test]);
		if (test.id.indexOf("product") > -1) {
			$(test).children("thead").children("tr").children("th").eq(0).remove();
			$.each($(test).children("tbody").children("tr"), (index, elem) => {
				console.log($(elem).children("td").eq(0));
				$(elem).children("td").eq(0).remove();
			});
		}
		var workbook = XLSX.utils.table_to_book(test, { sheet: test.id });
		console.log(workbook);
		XLSX.write(workbook, { bookType: "xlsx", bookSST: true, type: "base64" });
		XLSX.writeFile(workbook, test.id + ".xlsx");

		/* DO SOMETHING WITH workbook HERE */

		/* create new workbook */
		// var workbook = XLSX.utils.book_new();

		// /* convert table 'table1' to worksheet named "Sheet1" */
		// var ws1 = XLSX.utils.table_to_sheet(document.getElementById('table1'));
		// XLSX.utils.book_append_sheet(workbook, ws1, "Sheet1");

		// /* convert table 'table2' to worksheet named "Sheet2" */
		// var ws2 = XLSX.utils.table_to_sheet(document.getElementById('table2'));
		// XLSX.utils.book_append_sheet(workbook, ws2, "Sheet2");

		/* workbook now has 2 worksheets */

		// var htmlstr = document.getElementById('tableau').outerHTML;
		// var workbook = XLSX.read(htmlstr, {type:'string'});
	});
});

function doit(type, fn, dl) {
	var elt = document.getElementById("data-table");
	var wb = XLSX.utils.table_to_book(elt, { sheet: "Sheet JS" });
	return dl
		? XLSX.write(wb, { bookType: type, bookSST: true, type: "base64" })
		: XLSX.writeFile(wb, fn || "test." + (type || "xlsx"));
}
