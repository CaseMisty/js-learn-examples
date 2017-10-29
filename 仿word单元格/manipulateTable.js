(function() {
    var doc = document,
        table = doc.getElementById('manipulate-table').getElementsByTagName('table')[0],
        thead = table.getElementsByTagName('thead')[0],
        tHeadtr = thead.getElementsByTagName('tr')[0],
        tbody = table.getElementsByTagName('tbody')[0],
    	tBodytrs = tbody.getElementsByTagName('tr'),
    	maniTableBtns = doc.querySelectorAll('#mani-table-btns button'),
    	hintBox = doc.querySelector('#hint-box');
    var colNum = tBodytrs[0].childElementCount, //列数
    	rowNum = tbody.childElementCount; //tBody的行数
    var addRow = maniTableBtns[0],
    	addCol = maniTableBtns[1],
    	delRow = maniTableBtns[2],
    	delCol = maniTableBtns[3];
    var selectedRow = -1,
    	selectedCol = -1;
    	
    /**
     * @event 选中行
     */
    function addActiveRowEvent() {
    	for (let i = 0; i < rowNum; i++) {
    		tBodytrs[i].addEventListener('click', function addOperRow(event){
	    		hintBox.innerText = '';
				cancelActive();
				tBodytrs[i].classList.add('active');
				selectedRow = i;
	    		event.stopPropagation();
    		}, false);
	    }
    }
    
	/**
	 * @event 选中列 
	 */
	function addActiveColEvent() {
		for (let i = 0; i < colNum; i++) {
			tHeadtr.children[i].addEventListener('click', function colActivte(event){
				hintBox.innerText = '';
				cancelActive();
				for (let j = 0; j < rowNum; j++) {
					tHeadtr.children[i].classList.add('active');
					tBodytrs[j].children[i].classList.add('active');
				}
				selectedCol = i;
				event.stopPropagation();
			}, false);
		}
	}
	
	/**
	 * @function 取消被选中的行和列的效果
	 */
	function cancelActive() {
		function cancelActiveCol() {
			if(selectedCol != -1){
				for (let i = 0; i < rowNum; i++) {
					tHeadtr.children[selectedCol].classList.remove('active');
					tBodytrs[i].children[selectedCol].classList.remove('active');
				}
				selectedCol = -1;
			}
		}
		function cancelActiveRow() {
			if(selectedRow != -1){
				tBodytrs[selectedRow].classList.remove('active');
				var deletedRow = selectedRow;
				selectedRow = -1;
			}
		}
		hintBox.innerText = '';
		cancelActiveRow();
		cancelActiveCol();
	}

    /**
     * @event 添加行
     */
    addRow.addEventListener('click', function(e){
    	var insertHTML = '<tr>';
    	for (let i = 0; i < colNum; i++) {
    		insertHTML += '<td><input></td>';
    	}
    	insertHTML += '</tr>';
    	if(selectedRow == -1){
    		tBodytrs[rowNum - 1].insertAdjacentHTML('afterend', insertHTML);
    	}
    	else{
    		tBodytrs[selectedRow].insertAdjacentHTML('beforebegin', insertHTML);
    		selectedRow++;
    	}
    	rowNum++;
    	addActiveRowEvent();
    	cancelActive();
    	e.stopPropagation();
    }, false);
    
    /**
     * @event 添加列
     */
    addCol.addEventListener('click', function(e){
    	if(selectedCol == -1){
    		tHeadtr.insertAdjacentHTML('beforeend', '<th></th>');
    		for (let i = 0; i < rowNum; i++) {
    			tBodytrs[i].insertAdjacentHTML('beforeend', '<td></td>');
    		}
    	}
    	else{
    		tHeadtr.children[selectedCol].insertAdjacentHTML('beforebegin', '<th></th>');
    		for (let i = 0; i < rowNum; i++) {
    			tBodytrs[i].children[selectedCol].insertAdjacentHTML('beforebegin', '<td></td>');
    		}
    		selectedCol++;
    	}
    	colNum++;
    	cancelActive();
    	addActiveColEvent();
    	e.stopPropagation();
    }, false);
    
    /**
     * @event 删除行
     */
    delRow.addEventListener('click', function(e) {
    	if(selectedRow == -1) {
    		hintBox.innerText = '请选择要删除的行';
    	}
    	else if(rowNum == 1) {
    		hintBox.innerText = '别删了，再删没了';
    	}
    	else {
    		tBodytrs[selectedRow].remove();
    		rowNum--;
    		addActiveRowEvent();
    		selectedRow = -1;
    	}
    	e.stopPropagation();
    },false);
    
    /**
     * @event 删除列 
     */
    delCol.addEventListener('click', function(e) {
    	if(selectedCol == -1){
    		hintBox.innerText = '请选择要删除的列';
    	}
    	else if(colNum == 1) {
    		hintBox.innerText = '别删了，要没了';
    	}
    	else{
			tHeadtr.children[selectedCol].remove();
    		for (let i = 0; i < rowNum; i++) {
    			tBodytrs[i].children[selectedCol].remove();
    		}
    		colNum--;
    		selectedCol = -1;
			addActiveColEvent();
    	}
    	e.stopPropagation();
    }, false);
	addActiveRowEvent();
	addActiveColEvent();
	doc.addEventListener('click', cancelActive, false);
	
    window.maniTable = { 
    	table: table,
    	tBodytrs: tBodytrs, 
    	maniTableBtns: maniTableBtns, 
    	hintBox: hintBox,
    	getColNum: function() {return colNum;},
    	getBodyRowNum: function() {return rowNum;},
    	val: function(str) {
    		var attr = eval(str);
    		if(attr) {
    			return attr;
    		}else{
    			return '';
    		}
// 			return selectedCol;
    	}
    };
}());
