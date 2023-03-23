const moment=require("moment");
const jwt=require("jsonwebtoken");

module.exports={
    formatDate:function(date,format){
      return moment(date).format(format);
    },
    truncate:function(str,len){
      if(str.length>len && str.length>0){
          let new_str=str+"";
          new_str=str.substr(0,str);
          new_str=str.substr(0,new_str.lastIndexOf(" "));
          new_str=new_str.length>0?new_str:str.substr(0,len);
          return new_str+".....";
      }
      return str;
    },
    // scirptTags:function(input){
    //     return input.replace()
    // }
    editIcon:function(storyUserId,storyId,loggedUserId,folating=true){
        // console.log("hello");
        // console.log(storyUserId);
        // console.log("ki");
        // console.log(loggedUserId);
    if(storyUserId==loggedUserId){
        // console.log("equal");
     if(folating){
         return `<a href="post/edit/${storyId}" class="btn-floating halfway-fab blue"><i class="fas fa-edit fa-small"></i></a>`;
     }else{
         return `<a href="post/edit/${storyId}"><i class="fas fa-edit"></i></a>`
     }
    }else{
        // console.log("not equal");
        return "";
    }
    },
    isStatusPublic:function(status){
        if(status=="public"){
            return `<p>
            <span>
              <label>
                <input name="status" type="radio" value="public" checked />
                <span>Public</span>
              </label>
            </span>
            <span class="ml-2">
              <label>
                <input name="status" type="radio" value="private" />
                <span>Private</span>
              </label>
            </span>
            </p>`;
        }
        return `<p>
   
        <span>
          <label>
            <input name="status" type="radio" value="public" />
            <span>Public</span>
          </label>
        </span>
        <span class="ml-2">
          <label>
            <input name="status" type="radio" value="private" checked />
            <span>Private</span>
          </label>
        </span>
        </p>`
    },
    showEditAndDeleteIcon:function(storyUserId,loggedUserId,storyId){
        if(storyUserId.toString()==loggedUserId.toString()){
            return `<a href="/post/edit/${storyId}" class="btn-small indigo waves-ripple blue-grey">
            <i class="fas fa-edit"></i>
        </a>
        <a href="/post/delete/${storyId}" class="btn-small del waves-ripple red">
            <i class="fas fa-trash"></i>
        </a>`;
        }
        return "";
    },
    getUserRoles:function(roles){
      console.log(roles[0]);
      var result="";
     roles.forEach((item)=>{
        result+=`<h5 class="indigo-text">${item}</h5>`
      });
      return result;
    },
   isAdmin:function(roles){
     ///console.log(roles)
     roles.forEach((item)=>{
       console.log(item)
       if(item.toString()=="user"){
       return true;
       }
       
     })
   
  return false;
   }

};