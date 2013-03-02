var csv = '';
var nl = '\n';
var $table = $('table:not(".extPibTable")');
var statement_date = $('.extContentHighlightPib:eq(1) .extPibRow:eq(0) .hsbcTextRight').html();
var year = statement_date.substr(statement_date.length-4);

// build header
$('thead th', $table).each(function(){
	if($('a', $(this)).length) {
		csv = csv + '"' + $('strong', $(this)).html() + '",';
	} else {
		csv = csv + '"' + $(this).html() + '"';
	}
});

csv = csv + nl;

// get rest of data

// loop rows
$('tbody tr', $table).each(function(){
	
	// loop cells
	var cell_count = 0;
	$('td', $(this)).each(function(){
		
		if(cell_count==0) {
			// this is the date
			csv = csv + '"' + $('p', $(this)).html().trim() + ' ' + year + '",';
		} else if(cell_count==5) {
			// this is the balance
			
			var balance = $('p', $(this)).html().trim().replace('<b>', '').replace('</b>', '');
			if($('p', $(this).next()).html().trim()=='D') {
				balance = '-' + balance;
			}
			csv = csv + '"' + balance + '"';
			
		} else if(cell_count!=6) {
			
			if($('a', $(this)).length) {
				csv = csv + '"' + $('a', $(this)).html().trim() + '",';
			} else {
				
				if($('strong', $(this)).length) {
					csv = csv + '"' + $('strong', $(this)).html().trim().replace('<b>', '').replace('</b>', '') + '",';
				} else {
					csv = csv + '"' + $('p', $(this)).html().trim().replace('&nbsp;', '').replace('<b>', '').replace('</b>', '') + '",';
				}
				
			}
		}
		
		cell_count++;
	});
	
	csv = csv + nl;
	
});

var data = 'data:application/csv;charset=utf-8,' + encodeURIComponent(csv);

$('body').append('<a href="'+data+'" download="statement.csv" id="download-statement">Download</a>');

$('#download-statement').trigger('click');

//window.location = 'data:application/csv;charset=utf-8,' + encodeURIComponent(csv);