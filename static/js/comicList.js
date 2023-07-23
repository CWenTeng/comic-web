var html = "";SpeechSynthesisEvent

function img_list() {
    $.ajax({
        "url": SERVER_HOST + "imgweb/imglists",
        "method": "GET",
        // "origin": "192.168.1.107",
    }).success(function (data) {
        fileName = data.fileName
        filePath = data.filePath
        html = comicOrder(fileName, filePath);
        $("#main_content").html(html);
    }).fail(function () {
        // alert('error')
    })

};

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
        <div class="album py-5 bg-light">\
        <div class="container">\
            <div id="img-items" class="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-3">';

    //正序排列
    //表头样式更新

    for (var i = fileName.length - 1; i >= 0; i--) {
        html += ('<div class="col">\
            <div class="card shadow-sm">\
            <div class="img">\
                <img class="bd-placeholder-img card-img-top" width="100%" src="'+ IMG_HOST + filePath + '/' + fileName[i] + '/HomeImg.jpg"></img>\
            </div>\
                <div class="card-body">\
                    <div class="caption">\
                        <div class="title" title="'+ fileName[i] + '">\
                            <h6>'+ fileName[i] + '</h6>\
                        </div>\
                    </div>\
                    <div class="d-flex justify-content-between align-items-center">\
                        <div class="btn-group">\
                            <button type="button" class="btn btn-sm btn-outline-secondary" onclick="comicView(\''+fileName[i]+'\')">View</button>\
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
function chapterOrder(fileName, filePath) {
    html = '        <div class="bd-example-snippet bd-code-snippet"><div class="bd-example">\
    <nav>\
      <div class="nav nav-tabs mb-3" id="nav-tab" role="tablist">\
        <button id="Comic" class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Comic</button>\
        <button id="Chapter" class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Chapter</button>\
        <button id="Page" class="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Page</button>\
      </div>\
    </nav >\
        <div class="album py-5 bg-light">\
        <div class="container">\
            <div id="img-items" class="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-3">';

    //正序排列
    //表头样式更新

    for (var i = fileName.length - 1; i >= 0; i--) {
        html += ('<div class="col">\
            <div class="card shadow-sm">\
            <div class="img">\
                <img class="bd-placeholder-img card-img-top" width="100%" src="'+ IMG_HOST + filePath + '/' + fileName[i] + '/HomeImg.jpg"></img>\
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
        fileName = data.fileName
        filePath = data.filePath
        html = chapterOrder(fileName, filePath);
        $("#main_content").html(html);
    }).fail(function () {
        // alert('error')
    })

};

// 查看
function chapterView(filePath) {
    window.open('/imgweb/imgpage?filePath=' + filePath)
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