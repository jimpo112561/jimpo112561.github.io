function convert() {
    document.getElementById("resultTextBox").value = '';
    document.getElementById("goHentai").setAttribute("disabled", '');

    var source = document.getElementById("urlTextBox").value.replace(" ", "");
    var result = '';

    if (source.length == 0) {
        alert('未輸入網址');
        return;
    }
    if (!source.startsWith("http"))
        if (!confirm('原網址非http開頭，請確認是否繼續')) return;

    for (var i = 0; i < source.length; i++) {
        var charInt = source.charCodeAt(i);
        if (charInt == 37) {
            i += 2;
            continue;
        }
        if ((charInt >= 45 && charInt <= 47) || charInt == 58 || (charInt >= 48 && charInt <= 57) || (charInt >= 65 && charInt <= 90) ||
            (charInt >= 97 && charInt <= 122) && (charInt < 0x4E00 || charInt > 0x9FA5)) result += String.fromCharCode(charInt);
    }

    if (result.length != 0) {
        document.getElementById("resultTextBox").value = result;
        if (result.startsWith("http")) {
            document.getElementById("goHentai").firstChild.data = '轉對了嗎?發車嘍';
            document.getElementById("goHentai").removeAttribute("disabled");
			dataLayer.push({
				"event": "Success",
				"source": source,
				'result': result
			});
        } else {
			dataLayer.push({
				"event": "Fail",
				"source": source
			});
            document.getElementById("goHentai").firstChild.data = '網址非http開頭，無法發車';
        }
    }
}

function resetForm() {
    document.getElementById("urlTextBox").value = '';
    document.getElementById("resultTextBox").value = '';
    document.getElementById("goHentai").setAttribute("disabled", '');
    document.getElementById("goHentai").firstChild.data = '轉對了嗎?發車嘍';
}

function referrerHentai() {
	var URL = document.getElementById("resultTextBox").value;
	dataLayer.push({
        "event": "GoGoGo",
        "source": URL
    });
    window.open(URL);
}
