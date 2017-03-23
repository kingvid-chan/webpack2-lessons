var element = $("#body-input"),
	str = element.html(),
	progress = 0,
	timer = setInterval(() => {
	    let current = str.substr(progress, 1);
	    if (current == '<') {
	        progress = str.indexOf('>', progress) + 1;
	    } else {
	        progress++;
	    }
	    element.html(str.substring(0, progress) + (progress && 1 ? '_' : ''));
	    if (progress >= str.length) {
	        clearInterval(timer);
	        element.html(str.substring(0, progress));
	    }
	}, 150);

require('../../public/a.js');
$("#body-btn").click(() => {
	require.ensure(['../../public/b.js'], function(require){
		require('../../public/c.js');
	}, 'bc');
});

$("#pack-btn").click(() => {
	$(".mask").addClass('active');
	$.ajax({
		url: '/build',
		success: (data) => {
			if (data.success) {
				alert('打包成功，请查看build文件夹');
			}else{
				alert('打包失败!');
			}
			$(".mask").removeClass('active');
		}
	});
});

$("#getData-btn").click(() => {
	$.ajax({
		url: '/mockData',
		success: (data) => {
			let str = '';
			str = '<h1>'+data.date+'</h1><ul>';
			str += '<li>'+data.string+'</li>'+'<li>'+data.paragraph+'</li>'+'<li>'+data.number+'</li>';
			str += '<img src='+data.image+'>';
			$("#mockData-con").append(str);
		}
	});
});