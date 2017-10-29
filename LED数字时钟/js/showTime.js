(function() {
    var digits = document.getElementById('digits').getElementsByTagName('div');
    var weekdays = document.getElementById("weekdays").getElementsByTagName('span');
    var ampms = document.getElementById("ampm").getElementsByTagName('p');

    var showTime = function() {
        var date = new Date();
        var timeStr = '';
        var add0_hour = function(num) {
            if (num < 10) {
                return '0' + (num);
            } else if(num <=12 ) {
                return '' + num;
            }else return '0'+(num-12);
        };
        var add0_60 = num => {
            if(num>10) return ''+num;
            else return '0'+num
        }
        var hour = add0_hour(date.getHours());
        var min = add0_60(date.getMinutes());
        var sec = add0_60(date.getSeconds());
        var ampm = '';
        if (hour > 　12) {
            hour -= 12;
            ampm = 'PM';
        } else {
            ampm = 'AM';
        }
        digits[0].setAttribute('class', 'd' + hour[0] + ' digit');
        digits[1].setAttribute('class', 'd' + hour[1] + ' digit');

        digits[3].setAttribute('class', 'd' + min[0] + ' digit');
        digits[4].setAttribute('class', 'd' + min[1] + ' digit');

        digits[6].setAttribute('class', 'd' + sec[0] + ' digit');
        digits[7].setAttribute('class', 'd' + sec[1] + ' digit');

        var day = date.getDay();
        if (--day < 0) {
            day = 6;
        }
        Array.prototype.forEach.call(weekdays, (ele, index) => {
            if (index === day) {
                addClass(ele, 'active');
            } else {
                removeClass(ele, 'active');
            }
        });

        Array.prototype.forEach.call(ampms, (ele, index) => {
            if (ele.innerText === ampm) {
                addClass(ele, 'active');
            } else {
                removeClass(ele, 'active');
            }
        });
    };
    showTime();
    setInterval(showTime, 1000);
	
	var swThemeBtn = document.getElementById("switch-theme");
	var swThemeLink = document.getElementById("theme");
	swThemeBtn.addEventListener('click',() => {
		var theme = swThemeLink.getAttribute('href');
		if(theme.indexOf('light')!=-1){
			swThemeLink.setAttribute('href','css/dark.css');
		}else{
			swThemeLink.setAttribute('href','css/light.css');
		}
	});
})();