
function Presentation()
{
	var self = this;
	self.console_prompt = ">";
}


Presentation.prototype._Render = function()
{
	var self = this;
	
	document.getElementById( "display" ).innerHTML = "welcome to rpg!";			
	document.getElementById( "cursor_prefix" ).innerHTML = "welcome";
	document.getElementById( "cursor_delimiter" ).innerHTML = ">";
	document.getElementById( "feedback" ).innerHTML = "";
}


Presentation.prototype.RenderConsoleDisplayText = function( console_text_display )
{
	document.getElementById( "cursor" ).innerHTML = console_text_display;	
}


Presentation.prototype.RenderFeedback = function( feedback )
{
	document.getElementById( "feedback" ).innerHTML = feedback; 
}


Presentation.prototype.RenderResponse = function( data )
{
	// interpret data from the server
	document.getElementById( "display" ).innerHTML = JSON.stringify( data );
	document.getElementById( "feedback" ).innerHTML = "command processed";
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


