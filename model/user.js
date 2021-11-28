const util = require("../lib/util")
let model = {}
model.userRegisteration = userRegisteration
model.userLogin = userLogin
model.searchPartner = searchPartner

async function userRegisteration(params={})
{
  const Id = util.generateId('user');
  params.Id = Id
  let dataInJson = await util.readJson("data/user.json",params);
  if(dataInJson.length > 0){
      dataInJson.push(params)
  }
  else
  {
    dataInJson = [params];
  }
  const dataJson = await util.writeJson("data/user.json",JSON.stringify(dataInJson));
  
  return Id;
}

async function userLogin(params={})
{
   
  
  let flag = false;
  let user = {}
  let dataInJson = await util.readJson("data/user.json",params);
 

  if(dataInJson.length > 0){
     let dataS  = dataInJson.filter( 
      function(val){
        
    return (val.email == params.email && val.password == params.password)
  });

     

      user = dataS.length > 0 ? dataS[0] : {}
      flag = 'email' in user ? true : false
  }
  
   

  return { 'flag': flag,user:user }

}

async function searchPartner(name,type)
{
    let dataInJson = await util.readJson("data/user.json");

    let filterResult = dataInJson.filter( function(val) {
      let fullName = val.firstName+' '+val.lastName
      return fullName.match(/name/i) != -1 && val.gender == type

    });
    console.log(filterResult)
    return filterResult;
}



module.exports = model