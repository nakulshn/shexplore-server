module.exports = function(bookshelf){
  var User = bookshelf.Model.extend({
    tableName: 'users'
  });

  function validateUsername(username){
    if(username.length >= 3 && username.length <= 15){
      return (new RegExp(/^[A-Za-z0-9]+[A-Za-z0-9\_\-]*$/)).test(username);
    }
  }

  function validatePassword(password){
    if(password.length >= 6 && password.length <= 30){
      return (new RegExp(/^[A-Za-z0-9\!\@\#\$\%\^\&\*\(\)\_\-\+\=\{\[\}\]\|\\\:\;\'\'\<\,\>\.\?\/]+$/)).test(password);
    }
  }

  function validateEmail(email){
    return (email.length >= 1 && email.length <= 100);
  }

  function register(username,password,email,callback){
    if(validatePassword(password) && validateUsername(username) && validateEmail(email)){
      var verification = "querty";
      bcrypt.hash(password, 8, function(err, hash) {
        if(err){
          callback(err);
          return;
        }
        new User({name: username,password: hash,email: email,verification: verification}).save().then(function(model) {
          callback(undefined,model);
        }).catch(function(err){
          callback(err);
        });
      });
    }else{
      callback(new Error('Uh oh! Password: '+(validatePassword(password)?'valid':'invalid')+' Username: '+(validateUsername(username)?'valid':'invalid')+' Email: ' +(validateEmail(email)?'valid':'invalid')));
    }
  }

  function login(username,password,callback){
    if(validatePassword(password) && validateUsername(username)){
      var verification = "querty";
      new User({
        name:username
      }).fetch().then(function(model){
        bcrypt.compare(password,model.attributes.password,function(err,res){
          if(err){callback(err);return;}
          if(res)
            callback(undefined,username);
          else
            callback(new Error('Password doesn\'t match'));
        });
      }).catch(function(err){
        callback(err);
      });
    }else{
      callback(new Error('Uh oh! Password: '+(validatePassword(password)?'valid':'invalid')+' Username: '+(validateUsername(username)?'valid':'invalid')));
    }
  }
};
