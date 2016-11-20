
// policies:
// allow_push_on_full


function FixedStack( capacity, policies ) 
{
	var self = this;
	self.container = new FixedCircularBuffer( capacity, policies );
}


FixedStack.prototype.GetCapacity 	= function() { var self = this; return self.container.GetCapacity(); }
FixedStack.prototype.GetSize 		= function() { var self = this; return self.container.GetSize(); }
FixedStack.prototype.IsEmpty 		= function() { var self = this; return self.container.IsEmpty(); }
FixedStack.prototype.IsFull 		= function() { var self = this; return self.container.IsFull(); }


FixedStack.prototype.Clear = function() 
{ 
	var self = this;
	self.container.Clear();
}


FixedStack.prototype.Push = function( obj ) 
{	
	var self = this;
	self.container.PushBack( obj );

}


FixedStack.prototype.Pop = function()
{
	var self = this;	
	return self.container.PopBack();
}


FixedStack.prototype.Peek = function( depth )
{
	var self = this;
	return self.container.PeekBack( depth );
}


FixedStack.prototype._DebugPrint = function( name )
{
	var self = this;
	self.container._DebugPrint( name );
}


