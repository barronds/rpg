

function InputParser()
{
	var self = this;

	self.console_text 			= "";
	self.console_text_display 	= "uninitialized";
	self.cursor_text 			= "";
	self.cursor 				= "_";
	self.console_prompt 		= ">";
	self.command_stack 			= new FixedStack( 20, { allow_push_on_full: true } );
	self.command_stack_cursor	= -1;
}


InputParser.StaticInit = function()
{
	InputParser._sInstance = new InputParser();
}


InputParser.InputParserChar = function( c )
{
	InputParser._sInstance._InputParserChar( c );
}


InputParser.InputParserCode = function( keycode )
{
	InputParser._sInstance._InputParserCode( keycode );
}


InputParser.FlashCursor = function()
{
	InputParser._sInstance._FlashCursor();
}


InputParser.prototype._RenderConsoleDisplayText = function()
{
	var self = this;

	// process console_text for display
	self.console_text_display = self.console_prompt;
	
	for( var i = 0; i < self.console_text.length; ++i )
	{
		var c = self.console_text.charAt( i );
		
		if( c == " " )
		{
			self.console_text_display += "&nbsp";
		}
		else
		{
			self.console_text_display += c;
		}
	}
	
	self.console_text_display += self.cursor_text;
	document.getElementById( "cursor" ).innerHTML = self.console_text_display;	
}


InputParser.prototype._FlashCursor = function() 
{
	var self = this;
	self.cursor_text = (self.cursor_text.length == 0) ? self.cursor : "";
	self._RenderConsoleDisplayText();
}


InputParser.prototype._ForceCursor = function()
{
	var self = this;
	self.cursor_text = self.cursor;
}


InputParser.prototype._InputParserChar = function( c ) 
{
	var self = this;
	var keycode = c.charCodeAt( 0 );	
	
	if( keycode >= 32 && keycode <= 126 )
	{
		self.console_text += String.fromCharCode( keycode );
	}
		
	if( keycode == 13 )
	{
		// parse this but not yet
		var trimmed = self.console_text.trim();
		
		if( trimmed.length > 0 )
		{
			self.command_stack.Push( trimmed );
		}
			
		self.console_text = "";
		self.command_stack_cursor = -1;
		
		self._ParseCommand( trimmed );
	}
	
	self._ForceCursor();
	self._RenderConsoleDisplayText();
}


InputParser.prototype._InputParserCode = function( keycode )
{
	var self = this;

	// detect backspace
	if( keycode == 8 && self.console_text.length > 0 )
	{
		self.console_text = self.console_text.substring( 0, self.console_text.length - 1 );
	}	
	
	// detect toggling history
	if( (keycode == 38 || keycode == 40) )
	{
		var delta = (keycode == 38) ? 1 : -1 ;
		self.command_stack_cursor = Util.Clamp( -1, self.command_stack.GetSize() - 1, self.command_stack_cursor + delta );
		self.console_text = (self.command_stack_cursor > -1) ? self.command_stack.Peek( self.command_stack_cursor ) : "" ;
	}
	
	self._ForceCursor();
	self._RenderConsoleDisplayText();
}


InputParser.prototype._ParseCommand = function( command )
{
	// todo:
	// check on syntax for switch.
	// maybe data drive responses.
	// look into tokenize for all the tokens that might be in the input.
	var self = this;
	var tokens = InputParser._Tokenize( command );

	if( tokens[ 0 ] == "alias" )
	{
		if( tokens.length < 3 )
		{
			console.log( "usage: alias [alias-name] [alias-target[s]]" );
		}
	}
}


InputParser._Tokenize = function( str )
{
	var result = [];
	var token_found = false;
	var token = "";
	var c = null;
	
	for( var i = 0; i < str.length; ++ i )
	{
		c = str.charAt( i );
		if( !token_found && c != " " )
		{
			token_found = true;
			token = "";
		}
		
		if( token_found && c == " " )
		{
			token_found = false;
			result.push( token );
		}
		
		if( token_found )
		{
			token += c;
		}
	}
	
	// pick up the last token if there are tokens.  (input is assumed to be trimmed)
	if( token_found )
	{
		result.push( token );
	}
	
	return result;
}


