

var console_text = "";
var console_text_display = "uninitialized";
var cursor_text = "";
var cursor = "_";
var console_prompt = ">";


var renderConsoleDisplayText = function()
{
	// process console_text for display
	console_text_display = console_prompt;
	
	for( var i = 0; i < console_text.length; ++i )
	{
		var c = console_text.charAt( i );
		
		if( c == " " )
		{
			console_text_display += "&nbsp";
		}
		else
		{
			console_text_display += c;
		}
	}
	
	console_text_display += cursor_text;
	document.getElementById( "cursor" ).innerHTML = console_text_display;	
}


var flashCursor = function() 
{
	cursor_text = (cursor_text.length == 0) ? cursor : "";
	renderConsoleDisplayText();
}


var forceCursor = function()
{
	cursor_text = cursor;
}


var inputParserChar = function( c ) 
{
	var keycode = c.charCodeAt( 0 );	
	
	if( keycode >= 32 && keycode <= 126 )
	{
		console_text += String.fromCharCode( keycode );
	}
		
	if( keycode == 13 )
	{
		// parse this but not yet
		console_text = "";
	}
	
	forceCursor();
	renderConsoleDisplayText();
}


var inputParserCode = function( keycode )
{
	// detect backspace
	if( keycode == 8 && console_text.length > 0 )
	{
		console_text = console_text.substring( 0, console_text.length - 1 );
	}	
	
	forceCursor();
	renderConsoleDisplayText();
}


