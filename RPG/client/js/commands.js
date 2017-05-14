
Commands = function()
{
}


Commands._commands = [];


Commands.addCommand = function( command )
{
	
}


Commands.consider( command, cb ) 
{
	// execute if recognizable client command
	// send to server if appropriate or unrecognized
	// return response from client or server or both
}


var command_help = function()
{
	
}

// todo: can inherit work?  would like to re-use this class client and server side.
// would like to instantiate commands.  have their constructors in the _commands map.
// have a folder commands with all the individual command classes in it.

// i think inherit can work if we use inherit.js or something.  maybe same for require.
