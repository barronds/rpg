
var Util = {};


Util.Assert = function( cond, options )
{
	if( !cond )
	{
		var info = Util._BuildAndLogMsg( "Assert", options );
		alert( info );
	}
}


Util.Warning = function( cond, options )
{
	if( !cond )
	{
		Util._BuildAndLogMsg( "Warning", options );
	}
}


Util.Clamp = function( min, max, value )
{
	return (value > max) ? max : (value < min) ? min : value;
}


Util._BuildAndLogMsg = function( alert_kind, options )
{
	options = options || {};
	var msg = options.msg || "";
	var prefix = Util._GetAlertPrefix( options.channel );
	var info = prefix + msg;
	console.log( alert_kind + ": " + info );
	return info;
}


Util._GetAlertPrefix = function( channel )
{
	return channel ? "[" + channel + "]: " : "" ;
}



