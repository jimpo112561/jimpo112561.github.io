function convert() {
    var source = document.getElementById("urlTextBox").value.replace(" ", "");
    var listbox = document.getElementById("resultListBox");
    while (listbox.options.length != 0)
        listbox.options[0] = null;
    document.getElementById("goHentai").setAttribute("disabled", '');	

    if (source.length == 0) {
        alert('未輸入網址');
        return;
    }

    var sourceSplit = source.split("\n")
    for (var i = 0; i < sourceSplit.length; i++) {
        source = sourceSplit[i];
		if (source == '') continue;
		var result = '';
        if (!source.startsWith("https://"))
            if (confirm('原網址非https開頭，是否要自動新增上去'))
                source = 'https://' + source;

        for (var j = 0; j < source.length; j++) {
            var charInt = source.charCodeAt(j);
            if (charInt == 37) {
                j += 2;
                continue;
            }
            if ((charInt >= 45 && charInt <= 47) || charInt == 58 || (charInt >= 48 && charInt <= 57) || (charInt >= 65 && charInt <= 90) || (charInt >= 97 && charInt <= 122) && (charInt < 0x4E00 || charInt > 0x9FA5))
                result += String.fromCharCode(charInt);
        }

        if (result.length != 0) {
            var AddOpt = new Option(result,0);
            listbox.options[listbox.options.length++] = AddOpt;
            if (result.startsWith("https://")) {
                document.getElementById("goHentai").firstChild.data = '轉對了嗎?發車嘍';
                document.getElementById("goHentai").removeAttribute("disabled");
                gtag('event', 'ConvertURL', {
                    'event_category': 'Success',
                    'event_label': source,
                    'transport_type': 'beacon',
                    'non_interaction': false
                });
            } else {
                gtag('event', 'ConvertURL', {
                    'event_category': 'Fail',
                    'event_label': source,
                    'transport_type': 'beacon',
                    'non_interaction': false
                });
                document.getElementById("goHentai").firstChild.data = '網址非https://開頭，無法發車';
            }
        }
    }
	listbox.setAttribute("size", listbox.options.length);
}

function resetForm() {
	var listbox = document.getElementById("resultListBox");
    while (listbox.options.length != 0) listbox.options[0] = null;
    document.getElementById("urlTextBox").value = '';
    document.getElementById("goHentai").setAttribute("disabled", '');
    document.getElementById("goHentai").firstChild.data = '轉對了嗎?發車嘍';
}

function referrerHentai() {
	try	{
		var listbox = document.getElementById("resultListBox");
		var URL = listbox.options[listbox.selectedIndex].text;
		gtag('event', 'GoGoGo', {
			'event_category': URL,
			'transport_type': 'beacon',
			'non_interaction': false
		});
		window.open(URL);
	}
	catch { alert('未選擇網址');  return; }    
}
