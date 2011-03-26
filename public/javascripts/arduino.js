var Arduino = {
    start: function() {
        $.get("/arduino/start");
    },

    stop: function(callback) {
        $.get("/arduino/stop",function(data){
            if (callback)
                callback(data);
        });
    },

    forward: function() {
        $.get("/arduino/forward");
    },

    backward: function() {
        $.get("/arduino/backward");
    },

    toggle: function() {
        $.get("/arduino/toggle");
    },

    delay: function(n) {
        $.get("/arduino/delay/" + n);
    },

    sense: function(callback) {
        $.get("/arduino/sense",function(data){
            if (callback)
                callback(data);
        });
    }
}
