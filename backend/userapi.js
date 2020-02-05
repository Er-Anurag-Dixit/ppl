var userdb=require('./userschema')
var userdb1=require('./userschema2')
module.exports={
    adduser: function(data){
        return new Promise((resolve,reject)=>{
            userdb.create(data,function(err,result){
            if(err){
                reject(err)
            }
            else{
                resolve(result)
            }
        });
    });
},
    get_data:function(data){
        return new Promise((resolve,reject)=>{
            let email1=data.email;
            userdb.find({email:email1},function(err,result){
                if(err){
                    reject(err);
                }
                else{
                    resolve(result);
                }
            })
        });
    },
    exist:function(data){
        return new Promise((resolve,reject)=>{
            let pass1=data.password;
            userdb.find({password:pass1},function(err,result){
                if(err){
                    reject(err);
                }
                else{
                    resolve(result);
                }
            })
        });
    },
    adduser1: function(data){
        return new Promise((resolve,reject)=>{
            userdb1.create(data,function(err,result){
            if(err){
                reject(err)
            }
            else{
                resolve(result)
            }
        });
    });
}
}