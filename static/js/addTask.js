function add_task() {
    const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
    
    // 告警
    const alert = (message, type) => {
        alertPlaceholder.innerHTML=""
        const wrapper = document.createElement('div')
        wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
        ].join('')

        alertPlaceholder.append(wrapper)
    }

    $('#add_task').click(function () {
        console.log("qweqwe")
        task_url = $('#task_url').val()
        site_name = $('#site_name').val()
        start_sign = $('#start_sign').val()
        end_sign = $('#end_sign').val()
        select = $("input:checkbox[name='select']:checked").serialize();
        if (task_url == '') {
            // alerts()
            alert("任务URL不能为空!","warning")
            return
        }
        if (site_name == '' || site_name == 'None') {
            alert("请选择站点!","warning")
            return
        }
        $.ajax({
            'url': SERVER_HOST + 'add_task',
            'type': 'POST',
            'data': {
                'task_url': task_url,
                'site_name': site_name,
                'select': select,
                'end_sign': end_sign,
                'start_sign': start_sign,
            },
            'dataType': 'json',
            'traditional': true
        }).success(function (data) {
            if (data.res == 1) {
                alert('添加成功',"success")
                // location.href = '/imgweb/imglist'
            } else if (data.res == 2) {
                alert(task_url + '\n格式错误\n添加失败',"danger")
            } else if (data.res == 3) {
                alert(task_url + '\n任务重复\n添加失败',"danger")
            } else {
                alert(task_url + '\n添加失败',"danger")
            }
        }).fail(function () {
            alert('error')
        })
    })

}