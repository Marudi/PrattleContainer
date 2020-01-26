var MYLIBRARY = MYLIBRARY || (function(){
    var _args = {}; // private

    return {
        init : function(Args) {
            _args = Args;
            // some other initialising
        },
        campaignStatus : function(i) {
            return _args[i];
        },
        accountInfo : function(i) {
            return _args[i];
        }
    };
}());