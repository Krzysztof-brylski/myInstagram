import React from 'react';
/**
 * displaying post content
 * @component
 * @param {Object} data; Object with post data
 * @returns {<Post_content>}
 */
function Post_content({data}) {
    return(
        <div><p>{data.content}</p></div>
    )
}
export default Post_content;
