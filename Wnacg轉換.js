javascript:(function(){
	var source = document.documentURI;
	if (location.host.startsWith('www.wnacg'))
	{
		var sourceSplit = source.split('-');
		var tempBookId = sourceSplit[sourceSplit.length - 1];
		
		var bookId = new String();
		for (var j = 0; j < tempBookId.length; j++) {
            var charInt = tempBookId.charCodeAt(j);
			if (charInt >= 48 && charInt <= 57) bookId += String.fromCharCode(charInt);			
        }
		if (bookId == '') { alert('找不到本本的ID!'); return; }
		
		var mode = new String();
		if (confirm('本本ID為: ' + bookId + '\r\n按確定以使用手機版(slide)觀看\r\n按取消以使用電腦版(index)觀看')) mode = 'slide';
		else mode = 'index';
		var newUrl = 'https://' + location.host + '/photos-' + mode + '-aid-' + bookId + '.html';
		
		if (newUrl == source) alert('你已經使用了' + mode + '觀看，無須轉換');
		else location.href = newUrl;
	}
	else alert('網址非Wnacg!');
})
()