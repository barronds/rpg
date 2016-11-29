

function InputParser()
{
	var self = this;

	self.console_text 			= "";
	self.console_text_display 	= "uninitialized";
	self.cursor_text 			= "";
	self.cursor 				= "_";
	self.cursor_pos				= 0;
	self.cursor_forced			= false;
	self.command_stack 			= new FixedStack( 20, { allow_push_on_full: true } );
	self.command_stack_cursor	= -1;
	self.commands 				= {};
	self.unknown_command		= false;
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


InputParser.prototype.RegisterCommand = function( command, callback )
{
	var self = this;
	Util.Assert( !self.commands[ command ], "command already exists", "Input Parser Commands" );
	self.commands[ command ] = callback;
}


InputParser.prototype._RenderConsoleDisplayText = function()
{
	var self = this;

	// process console_text for display
	self.console_text_display = "";
	
	for( var i = 0; i < self.console_text.length; ++i )
	{
		var c = self.console_text.charAt( i );
		var char_to_render = c;
		
		// check for cursor or space
		if( i == self.cursor_pos && self.cursor_text.length > 0 )
		{
			char_to_render = self.cursor_text;
		}
		else if( c == " " )
		{
			char_to_render = "&nbsp";
		}
		
		self.console_text_display += char_to_render;
	}
	
	if( self.cursor_pos == self.console_text.length )
	{
		self.console_text_display += self.cursor_text;
	}
	
	document.getElementById( "cursor" ).innerHTML = self.console_text_display;	
}


InputParser.prototype._RenderFeedback = function()
{
	var self = this;
	document.getElementById( "feedback" ).innerHTML = self.unknown_command ? "UNKNOWN COMMAND" : ""; 
}


InputParser._ClearFeedback = function()
{
	console.log( "clearing feedback" );
	InputParser._sInstance._ClearFeedback();
}


InputParser.prototype._ClearFeedback = function()
{
	var self = this;
	self.unknown_command = false;
	self._RenderFeedback();
}


InputParser.prototype._FlashCursor = function() 
{
	var self = this;
	
	if( self.cursor_forced )
	{
		self.cursor_forced = false;
		return;
	}
	
	self.cursor_text = (self.cursor_text.length == 0) ? self.cursor : "";
	self._RenderConsoleDisplayText();
}


InputParser.prototype._ForceCursor = function()
{
	var self = this;
	self.cursor_text = self.cursor;
	self.cursor_forced = true;
}


InputParser.prototype._InputParserChar = function( c ) 
{
	var self = this;
	var keycode = c.charCodeAt( 0 );	
	
	if( keycode >= 32 && keycode <= 126 )
	{
		var case_sensitive_char = String.fromCharCode( keycode );
		var prefix = self.console_text.substring( 0, self.cursor_pos );
		var postfix = self.console_text.substring( self.cursor_pos, self.console_text.length );
		self.console_text = prefix + case_sensitive_char + postfix;
		++ self.cursor_pos;
	}
		
	if( keycode == 13 )
	{
		// parse this but not yet
		var trimmed = self.console_text.trim();
		
		if( trimmed.length > 0 )
		{
			self.command_stack.Push( trimmed );
			
			if( !self.commands[ self.console_text ] )
			{
				self.unknown_command = true;
				console.log( "unknown command" );
				// TODO : this doesn't work right
				// want it called once after time elapsed
				setInterval( 2000, InputParser._ClearFeedback() );
			}
		}
			
		self.console_text = "";
		self.command_stack_cursor = -1;
		self.cursor_pos = 0;
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
		var target_index = self.cursor_pos - 1;
		
		if( target_index >= 0 )
		{
			var prefix = self.console_text.substring( 0, target_index );
			var postfix = self.console_text.substring( target_index + 1, self.console_text.length );
			self.console_text = prefix + postfix;
			-- self.cursor_pos;
		}
	}	
	
	// detect toggling history
	if( (keycode == 38 || keycode == 40) )
	{
		var delta = (keycode == 38) ? 1 : -1 ;
		self.command_stack_cursor = Util.Clamp( -1, self.command_stack.GetSize() - 1, self.command_stack_cursor + delta );
		self.console_text = (self.command_stack_cursor > -1) ? self.command_stack.Peek( self.command_stack_cursor ) : "" ;
		self.cursor_pos = self.console_text.length;
	}
	
	// detect cursor movement
	if( (keycode == 37 || keycode == 39) )
	{
		var delta = (keycode == 37) ? -1 : 1 ;
		self.cursor_pos = Util.Clamp( 0, self.console_text.length, self.cursor_pos + delta );
	}
	
	self._ForceCursor();
	self._RenderConsoleDisplayText();
}



