

function Account() {
	var self = this;
	
	self.username = null;
}


Account.prototype.login( username ) {
	self.username = username;
}


Account.prototype.getUsername() {
	return self.username;
}


module.exports = Account;