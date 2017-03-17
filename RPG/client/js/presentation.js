
function Presentation()
{
	var self = this;
	
	self.lines = [];
	self.num_lines = 27;
	self.console_prompt = ">";
	
	for( var i = 0; i < self.num_lines; ++i )
	{
		self.lines[ i ] = "- " + i;
	}
}


Presentation.prototype._Render = function()
{
	var self = this;
	
	for( var i = 0; i < self.num_lines; ++i )
	{
		document.getElementById( "pres" + i ).innerHTML = self.lines[ i ];		
	}
	
	document.getElementById( "cursor_prefix" ).innerHTML = "welcome" + self.console_prompt;
	document.getElementById( "feedback" ).innerHTML = "unknown command";
}


Presentation.prototype.RenderConsoleDisplayText = function( console_text_display )
{
	document.getElementById( "cursor" ).innerHTML = console_text_display;	
}


Presentation.prototype.RenderFeedback = function( feedback )
{
	document.getElementById( "feedback" ).innerHTML = feedback; 
}


Presentation.StaticInit = function()
{
	Presentation._sInstance = new Presentation();
	Presentation._sInstance._Render();
}


Presentation.Get = function()
{
	return Presentation._sInstance;
}


