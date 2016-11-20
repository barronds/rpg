
// policies:
// allow_push_on_full


function FixedCircularBuffer( capacity, policies ) 
{
	var self = this;
	self.policies = policies || {};
	self._Reset( capacity );
}


FixedCircularBuffer.prototype.GetCapacity 	= function() { var self = this; return self.capacity; }
FixedCircularBuffer.prototype.GetSize 		= function() { var self = this; return self.size; }
FixedCircularBuffer.prototype.IsEmpty 		= function() { var self = this; return self.size == 0; }
FixedCircularBuffer.prototype.IsFull 		= function() { var self = this; return self.size == self.capacity; }


FixedCircularBuffer.prototype.Clear = function() 
{ 
	var self = this;
	self._Reset( self.capacity );
}


FixedCircularBuffer.prototype.PushBack = function( obj ) 
{
	var self = this;
	
	if( self._PushPreamble( obj, "PopFront" ) )
	{
		self.back = self._IncrimentWrap( self.back );	
		self.data[ self.back ] = obj;
	}
}


FixedCircularBuffer.prototype.PushFront = function( obj ) 
{
	var self = this;
	
	if( self._PushPreamble( obj, "PopBack" ) )
	{
		self.front = self._DecrimentWrap( self.front );	
		self.data[ self.front ] = obj;
	}
}


FixedCircularBuffer.prototype.PopBack = function()
{
	var self = this;	
	return self._Pop( "back", -1 );
}


FixedCircularBuffer.prototype.PopFront = function()
{
	var self = this;
	return self._Pop( "front", 1 );
}


FixedCircularBuffer.prototype.PeekBack = function( depth )
{
	var self = this;
	return self._Peek( self.back, -depth );
}


FixedCircularBuffer.prototype.PeekFront = function( depth )
{
	var self = this;
	return self._Peek( self.front, depth );
}


FixedCircularBuffer.prototype._Peek = function( start_index, delta )
{
	var self = this;
	delta = delta || 0;
	
	if( Math.abs( delta ) >= self.size  )
	{
		Util.Warning( false, { msg: "peek past depth of container", channel: "containers" } );
		return null;
	}
	
	var index = start_index + delta;
	
	if( index >= self.capacity )
	{
		index -= self.capacity;
	}
	else if( index < 0 )
	{
		index += self.capacity;
	}
	
	return self.data[ index ];
}


FixedCircularBuffer.prototype._Pop = function( member, delta )
{
	var self = this;
	var result = null;
	
	if( self.size > 0 )
	{
		var index = self[ member ];
		result = self.data[ index ];
		self.data[ index ] = null;
		-- self.size;
		var value = self[ member ] + delta;
		self[ member ] = value;
		
		if( value >= self.capacity )
		{
			self[ member ] -= self.capacity;
		}
		else if( value < 0 )
		{
			self[ member ] += self.capacity;
		}
	}
	
	return result;
}


FixedCircularBuffer.prototype._DebugPrint = function( name )
{
	var self = this;
	console.log( "\nfixed circular buffer: " + name + ":" );
	console.log( "capacity: " + self.GetCapacity() );
	console.log( "size: " + self.GetSize() );
	console.log( "IsEmpty: " + self.IsEmpty() );
	console.log( "IsFull: " + self.IsFull() );
	console.log( "Front: " + self.front );
	console.log( "Back: " + self.back );
	console.log( "Array Contents:" );
			
	for( var i = 0; i < self.GetCapacity(); ++i )
	{
		console.log( i + ": " + JSON.stringify( self.data[ i ] ) + "," );
	}

	console.log( "\n" );
}


FixedCircularBuffer.prototype._PushPreamble = function( obj, make_room_on_full_func ) 
{
	// return true if obj is still to be added in the general case
	var self = this;
	
	if( self.IsFull() )
	{
		if( self.policies.allow_push_on_full )
		{
			self[ make_room_on_full_func ]();
		}
		else
		{
			Util.Warning( false, { msg: "adding to full container", channel: "containers" } );
			return false;
		}
	}
	
	if( self.IsEmpty() )
	{
		self.front = 0;
		self.back = 0;
		self.data[ 0 ] = obj;
		self.size = 1;
		return false;
	}
	
	++ self.size;
	return true;
}


FixedCircularBuffer.prototype._Reset = function( capacity )
{ 
	var self = this;
	Util.Assert( (typeof capacity == "number") && (capacity > 0), { msg: "fixed circular buffer with non-positive capacity", channel: "containers" } );
	self.data = [];
	self.capacity = capacity;
	self.size = 0;
	self.front = -1;
	self.back = -1;
}


FixedCircularBuffer.prototype._IncrimentWrap = function( index )
{
	var self = this;		
	var result = index + 1;
	
	if( result >= self.capacity )
	{
		result = 0;
	}
	
	return result;
}


FixedCircularBuffer.prototype._DecrimentWrap = function( index )
{
	var self = this;
	var result = index - 1;
	
	if( result < 0 )
	{
		result = self.capacity - 1;
	}
	
	return result;
}


// implementation details:
//
// front and back will point to valid entries unless the stack is empty, in which case they are not specified
// front is the lower index (wrapped) end.  

