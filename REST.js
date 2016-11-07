var mysql   = require("mysql");

function REST_ROUTER(router,connection,md5) {
    var self = this;
    self.handleRoutes(router,connection,md5);
}

REST_ROUTER.prototype.handleRoutes = function(router,connection,md5) {
    var self = this;
    router.get("/",function(req,res){
        res.json({"Message" : "Connected"});
    });

    router.get("/object/:key",function(req,res){
        var query = "SELECT ?? FROM ?? join ?? on ??=?? where ??=?";
        
        //var query = "SELECT * FROM ?? where ??=?";
        var table = ["players_attributes.player_attribute","players_names","players_attributes","players_names.player_id","players_attributes.player_id","players_names.player_name",req.params.key];
        

           
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                
                res.json({"Error" : false, "Message" : "Success", "PlayerAttributes" : rows});
            }
        });
    });

    router.get("/object/:key/:timestamp",function(req,res){
    var query = "SELECT ?? FROM ?? join ?? on ??=?? where ??=? and ??=?";
var table = ["players_attributes.player_attribute","players_attributes","players_names","players_names.player_id","players_attributes.player_id","players_names.player_name",req.params.key,"players_attributes.player_created",req.params.timeStamp];
        query = mysql.format(query,table);
        console.log(req.params.key);
        console.log(req.params.timeStamp);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Success", "PlayerAttributes" : rows});
            }
        });
    });

    router.post("/users",function(req,res){
        var query = "INSERT INTO ??(??,??) VALUES (?,?)";
        var table = ["user_login","user_email","user_password",req.body.email,md5(req.body.password)];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "User Added !"});
            }
        });
    });


}

module.exports = REST_ROUTER;
