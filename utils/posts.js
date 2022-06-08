// imports
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import {remark} from 'remark';
import html from 'remark-html';

// post directory
const postsDirectory = path.join(process.cwd(), "pages/posts");

/**
 * @param a string of tags in format "hello,world,this,is,another,tag"
 * @returns an array of tags
 */

function getTags(tagsStr){
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

// get post data & sort. used to preview blogposts on home page
export function getSortedPostData(){
    var filenames = fs.readdirSync(postsDirectory);

    filenames = filenames.filter(ensureMarkdown);

    const allPostsData = filenames.map( filename => {
        // remove .md
        const id = filename.replace(/\.md$/, '');

        // read markdown file
        const fullPath = path.join(postsDirectory, filename);
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        // gray matter to parse metadata
        const matterResult = matter(fileContents);

        // tags
        var tagsArr = getTags(matterResult.data.tags);

        return {
            id, 
            title: matterResult.data.title,
            date: matterResult.data.date,
            tags: tagsArr
        };
    });

    // Sort posts by date
    return allPostsData.sort(({ date: a }, { date: b }) => {
        if (a < b) {
        return 1;
        } else if (a > b) {
        return -1;
        } else {
        return 0;
        }
  });
}

// get all post ids; used to create post routes
export function getPostIds(){
    const fileNames = fs.readdirSync(postsDirectory);

    return fileNames.map( fileName =>{
        return {
            params: {
                id: fileName.replace(/\.md$/, ''),
            },
        };
    });
}

// returns post content, to be rendered in /post/[id] route
export async function getPostData(id){
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // parse meta-data
    const matterResult = matter(fileContents);

    // markdown => html
    const processedContent = await remark()
        .use(html)
        .process(matterResult.content);
    const contentHtml = processedContent.toString();

    return {
        id,
        contentHtml,
        ...matterResult.data,
    };
}

// filter fcn to ensure array only contains markdown files
function ensureMarkdown(filename){
    return filename.indexOf(".md") != -1;
}