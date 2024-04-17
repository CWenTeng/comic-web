var html = ""; SpeechSynthesisEvent
var filePath="";
var a=1;
var b=1;

function getBakImg(imgUrl) {
    var img = event.srcElement;
    img.src = imgUrl + "/001.jpg";
    // 控制不要一直跳动 
    img.onerror = null;
}



var imgs = document.querySelectorAll('img');

//用来判断bound.top<=clientHeight的函数，返回一个bool值
function isIn(el) {
    var bound = el.getBoundingClientRect();
    var clientHeight = window.innerHeight;
    return bound.top <= clientHeight;
}
//检查图片是否在可视区内，如果不在，则加载
function check() {
    Array.from(imgs).forEach(function (el) {
        if (isIn(el)) {
            loadImg(el);
        }
    })
}
function loadImg(el) {
    if (!el.src) {
        var source = el.dataset.src;
        el.src = source;
    }
}
window.onload = window.onscroll = function () { //onscroll()在滚动条滚动的时候触发
    check();
}

function img_list() {
    $.ajax({
        "url": SERVER_HOST + "imgweb/imglists",
        "method": "GET",
        // "origin": "192.168.1.107",
    }).success(function (data) {
        fileName = data.fileName;
        window.filePath = data.filePath;
        html = comicOrder(fileName, window.filePath);
        $("#main_content").html(html);
        imgs = document.querySelectorAll('img');
        check();
    }).fail(function () {
        // alert('error')
    })

    // $('#sortID').click(function () {
    //     if (a == 0) {
    //         a = 1
    //         html = comicOrder(fileName, filePath);
    //         $("#main_content").html(html);
    //     } else {
    //         a = 0
    //         html = comicOrderDes(fileName, filePath);
    //         $("#main_content").html(html);
    //     }
    // })

};


function chapterfanzhuan(){
    if (b == 0) {
        b = 1;
        html = chapterOrder(fileName, window.filePath);
        $("#main_content").html(html);
    } else {
        b = 0;
        html = chapterOrderDes(fileName, window.filePath);
        $("#main_content").html(html);
    }
    check();
}


function comicfanzhuan(){
    if (a == 0) {
        a = 1;
        html = comicOrder(fileName, window.filePath);
        $("#main_content").html(html);
    } else {
        a = 0;
        html = comicOrderDes(fileName, window.filePath);
        $("#main_content").html(html);
    }
    check();
}

// 倒序
function comicOrder(fileName, filePath) {
    html = '        <div class="bd-example-snippet bd-code-snippet"><div class="bd-example">\
    <nav>\
      <div class="nav nav-tabs mb-3" id="nav-tab" role="tablist">\
        <button id="Comic" class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Comic</button>\
        <button id="Chapter" class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Chapter</button>\
        <button id="Page" class="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Page</button>\
      </div>\
    </nav >\
    <button id="sortID" onclick="comicfanzhuan()">翻转</button>\
        <div class="album py-5 bg-light">\
        <div class="container">\
            <div id="img-items" class="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-3">';

    //正序排列
    //表头样式更新

    for (var i = fileName.length - 1; i >= 0; i--) {
        html += ('<div class="col">\
            <div class="card shadow-sm">\
            <div class="img">\
                <img class="bd-placeholder-img card-img-top" width="100%" data-src="'+ IMG_HOST + filePath + '/' + fileName[i] + '/HomeImg.jpg" onerror="getBakImg(\'' + IMG_HOST + filePath + '/' + fileName[i] + '\')"></img>\
            </div>\
                <div class="card-body">\
                    <div class="caption">\
                        <div class="title" title="'+ fileName[i] + '">\
                            <h6>'+ fileName[i] + '</h6>\
                        </div>\
                    </div>\
                    <div class="d-flex justify-content-between align-items-center">\
                        <div class="btn-group">\
                            <button type="button" class="btn btn-sm btn-outline-secondary" onclick="comicView(\''+ fileName[i] + '\')">View</button>\
                            <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>\
                        </div>\
                        <small class="text-muted">9 mins</small>\
                    </div>\
                </div>\
            </div>\
        </div>'
        );
    }
    html += '</div>\
    </div>\
</div>';

    return html;
};
// 倒序
function comicOrderDes(fileName, filePath) {
    html = '        <div class="bd-example-snippet bd-code-snippet"><div class="bd-example">\
    <nav>\
      <div class="nav nav-tabs mb-3" id="nav-tab" role="tablist">\
        <button id="Comic" class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Comic</button>\
        <button id="Chapter" class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Chapter</button>\
        <button id="Page" class="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Page</button>\
      </div>\
    </nav >\
    <button id="sortID" onclick="comicfanzhuan()">翻转</button>\
        <div class="album py-5 bg-light">\
        <div class="container">\
            <div id="img-items" class="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-3">';

    //正序排列
    //表头样式更新

    for (var i = 0; i < fileName.length; i++) {
        html += ('<div class="col">\
            <div class="card shadow-sm">\
            <div class="img">\
                <img class="bd-placeholder-img card-img-top" width="100%" data-src="'+ IMG_HOST + filePath + '/' + fileName[i] + '/HomeImg.jpg" onerror="getBakImg(\'' + IMG_HOST + filePath + '/' + fileName[i] + '\')"></img>\
            </div>\
                <div class="card-body">\
                    <div class="caption">\
                        <div class="title" title="'+ fileName[i] + '">\
                            <h6>'+ fileName[i] + '</h6>\
                        </div>\
                    </div>\
                    <div class="d-flex justify-content-between align-items-center">\
                        <div class="btn-group">\
                            <button type="button" class="btn btn-sm btn-outline-secondary" onclick="comicView(\''+ fileName[i] + '\')">View</button>\
                            <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>\
                        </div>\
                        <small class="text-muted">9 mins</small>\
                    </div>\
                </div>\
            </div>\
        </div>'
        );
    }
    html += '</div>\
    </div>\
</div>';

    return html;
};

{/* <img class="bd-placeholder-img card-img-top" width="100%" src="'+ IMG_HOST + filePath + '/' + fileName[i] + '/HomeImg.jpg" onerror="this.src=\''+ IMG_HOST + filePath + '/' + fileName[i] + '/001.jpg\'"></img>\ */ }
// 倒序
function chapterOrder(fileName, filePath) {
    html = '        <div class="bd-example-snippet bd-code-snippet"><div class="bd-example">\
    <nav>\
      <div class="nav nav-tabs mb-3" id="nav-tab" role="tablist">\
        <button id="Comic" class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Comic</button>\
        <button id="Chapter" class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Chapter</button>\
        <button id="Page" class="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Page</button>\
      </div>\
    </nav >\
        <button id="sortID" onclick="chapterfanzhuan()">翻转</button>\
        <div class="album py-5 bg-light">\
        <div class="container">\
            <div id="img-items" class="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-3">';

    //正序排列
    //表头样式更新

    for (var i = fileName.length - 1; i >= 0; i--) {
        html += ('<div class="col">\
            <div class="card shadow-sm">\
            <div class="img">\
                <img class="bd-placeholder-img card-img-top" width="100%" data-src="'+ IMG_HOST + filePath + '/' + fileName[i] + '/HomeImg.jpg" onerror="getBakImg(\'' + IMG_HOST + filePath + '/' + fileName[i] + '\')"></img>\
            </div>\
                <div class="card-body">\
                    <div class="caption">\
                        <div class="title" title="'+ fileName[i] + '">\
                            <h6>'+ fileName[i] + '</h6>\
                        </div>\
                    </div>\
                    <div class="d-flex justify-content-between align-items-center">\
                        <div class="btn-group">\
                            <button type="button" class="btn btn-sm btn-outline-secondary" onclick="chapterView(\''+ filePath + '/' + fileName[i] + '\')">View</button>\
                            <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>\
                        </div>\
                        <small class="text-muted">9 mins</small>\
                    </div>\
                </div>\
            </div>\
        </div>'
        );
    }
    html += '</div>\
    </div>\
</div>';

    return html;
};
// 倒序
function chapterOrderDes(fileName, filePath) {
    html = '        <div class="bd-example-snippet bd-code-snippet"><div class="bd-example">\
    <nav>\
      <div class="nav nav-tabs mb-3" id="nav-tab" role="tablist">\
        <button id="Comic" class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Comic</button>\
        <button id="Chapter" class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Chapter</button>\
        <button id="Page" class="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Page</button>\
      </div>\
    </nav >\
        <button id="sortID" onclick="chapterfanzhuan()">翻转</button>\
        <div class="album py-5 bg-light">\
        <div class="container">\
            <div id="img-items" class="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-3">';

    //正序排列
    //表头样式更新

    for (var i = 0; i < fileName.length; i++) {
        html += ('<div class="col">\
            <div class="card shadow-sm">\
            <div class="img">\
                <img class="bd-placeholder-img card-img-top" width="100%" data-src="'+ IMG_HOST + filePath + '/' + fileName[i] + '/HomeImg.jpg" onerror="getBakImg(\'' + IMG_HOST + filePath + '/' + fileName[i] + '\')"></img>\
            </div>\
                <div class="card-body">\
                    <div class="caption">\
                        <div class="title" title="'+ fileName[i] + '">\
                            <h6>'+ fileName[i] + '</h6>\
                        </div>\
                    </div>\
                    <div class="d-flex justify-content-between align-items-center">\
                        <div class="btn-group">\
                            <button type="button" class="btn btn-sm btn-outline-secondary" onclick="chapterView(\''+ filePath + '/' + fileName[i] + '\')">View</button>\
                            <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>\
                        </div>\
                        <small class="text-muted">9 mins</small>\
                    </div>\
                </div>\
            </div>\
        </div>'
        );
    }
    html += '</div>\
    </div>\
</div>';

    return html;
};



// 查看
function comicView(filePath) {
    console.log(filePath);
    $.ajax({
        "url": SERVER_HOST + "imgweb/imglists",
        "method": "GET",
        'data': {
            "filePath": filePath,
        },
    }).success(function (data) {
        fileName = data.fileName;
        window.filePath = data.filePath;
        html = chapterOrder(fileName, window.filePath);
        $("#main_content").html(html);
        imgs = document.querySelectorAll('img');
        check();
    }).fail(function () {
        // alert('error')
    })




};

// 查看
function chapterView(filePath) {
    window.open('/imgweb/imgpage?filePath=' + filePath)
    imgs = document.querySelectorAll('img');
    check();
    // console.log(fileName);
    // $.ajax({
    //     "url": SERVER_HOST + "imgweb/imgpage",
    //     "method": "GET",
    //     'data': {
    //         "fileName": fileName,
    //     },
    // }).success(function (data) {
    //     fileName = data.fileName
    //     filePath = data.filePath
    //     html = chapterOrder(fileName, filePath);
    //     $("#main_content").html(html);
    // }).fail(function () {
    //     // alert('error')
    // })
};