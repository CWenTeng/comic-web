var lastcate = "Task";
var template_html;
var IMG_HOST = "http://192.168.1.108:8888/"
var SERVER_HOST = "http://192.168.1.107:8000/"
$(function () {
    $.ajax({
        'url':'build/addTask/add_task.html',
        'type':'GET',
    }).success(function (data) {
        document.getElementById("main_content").innerHTML = data;
        add_task()
        cate = "Task"
    }).fail(function () {
        alert('error')
    })
})

function navLoadPage(cate) {
    if (lastcate != cate) {
        // alert(lastcate+"==="+cate)
        rm_cate_class(lastcate)
        set_cate_class(cate)
        lastcate = cate;
        if (cate === "Task") {
            $.ajax({
                'url':'build/addTask/add_task.html',
                'type':'GET',
            }).success(function (data) {
                document.getElementById("main_content").innerHTML = data;
                cate = "Task"
            }).fail(function () {
                alert('error')
            })
        } else if (cate === "comicList") {
            // console.log("COMIC");
            img_list()
        }
    }
}
function rm_cate_class(cate) {
    document.getElementById(cate).className = "nav-link";
}
function set_cate_class(cate) {
    document.getElementById(cate).className = "nav-link active";
}
