const fs = require("fs");
let model = {}
model.readJson = readJson
model.writeJson = writeJson
model.generateId = generateId

function generateId(prefix='user')
{
  
  return prefix+'_' + Math.random().toString(36).substr(2, 9);
}


async function readJson(file)
{
  try 
  {
    let jsonString = fs.readFileSync(file,'utf-8');
    return JSON.parse(jsonString);
  } 
  catch (err) 
  {
    console.log(err);
    return [];
  }
}

async function writeJson(file,data)
{
  try 
  {
    let jsonString = fs.writeFileSync(file,data);
    return JSON.parse(data);
  } catch (err) 
  {
    console.log(err);
    return [];
  }
}


module.exports = model
