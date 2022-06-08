// Tag helper functions!

/**
 * helper function for Home– extract the tags from allPostsData
 * PRECONDITION: allPostsData is formatted like this– 
 * [{id: something, tags: [something, something]}, {id: something, tags: [something, something]}...]
 * @param allPostsData
 * @return array tags
 */
export function extractTags(allPostsData){

    var allTags = [];
    allPostsData.forEach(postData =>{
      var tags = postData.tags;
  
      tags.forEach( tag => {
        // make sure no overlapping tags
        if (allTags.indexOf(tag) == -1){
          allTags.push(tag);
        }
      })
  
    }) 
    return allTags;
}

/**
 * @param a string of tags in format "hello,world,this,is,another,tag"
 * @returns an array of tags
 */

export function getTags(tagsStr){
    var tagsArr = [];
    var tag = '';
    var indexComma = 0;
    var hasNextTag = true;

    while(hasNextTag){
        // find endpoint of this tag
        indexComma = tagsStr.indexOf(",") == -1 ? tagsStr.length : tagsStr.indexOf(','); 

        // determine if there is another tag left
        if (tagsStr.substring(indexComma + 1).trim().length == 0) hasNextTag = false;

        // extract the tag
        tag = tagsStr.substring(0, indexComma).trim();
        tagsStr = tagsStr.substring(indexComma + 1);

        tagsArr.push(tag);
    }

    return tagsArr;
}

/**
 * Given a tag, returns an array of post data for posts containing that tag
 */
export function filterTags(tag, allPostsData){
  var posts = [];
  for (var i = 0; i < allPostsData.length; i++){
    var postTags = allPostsData[i].tags;
    if (postTags.indexOf(tag) != -1){
      posts.push(allPostsData[i]);
    }
  }
  return posts;
}