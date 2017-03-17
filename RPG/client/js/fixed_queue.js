
// policies:
// allow_push_on_full


function FixedQueue( capacity, policies ) 
{
	var self = this;
	self.container = new FixedCircularBuffer( capacity, policies );
}


FixedQueue.prototype.GetCapacity 	= function() { var self = this; return self.container.GetCapacity(); }
FixedQueue.prototype.GetSize 		= function() { var self = this; return self.container.GetSize(); }
FixedQueue.prototype.IsEmpty 		= function() { var self = this; return self.container.IsEmpty(); }
FixedQueue.prototype.IsFull 		= function() { var self = this; return self.container.IsFull(); }


FixedQueue.prototype.Clear = function() 
{ 
	var self = this;
	self.container.Clear();
}


FixedQueue.prototype.Push = function( obj ) 
{	
	var self = this;
	self.container.PushBack( obj );

}


FixedQueue.prototype.Pop = function()
{
	var self = this;	
	return self.container.PopFront();
}


FixedQueue.prototype.Peek = function( depth )
{
	var self = this;
	return self.container.PeekFront( depth );
}


FixedQueue.prototype._DebugPrint = function( name )
{
	var self = this;
	self.container._DebugPrint( name );
}

