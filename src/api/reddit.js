export const API_ROOT = 'https://www.reddit.com';


export const getRedditPosts = async (category) => {
    const response = await fetch(`${API_ROOT}${category}.json`);
    const json = await response.json();

    return [json.data.children.map(post => post.data), json.data.after];
};

export const getPostData = async (permalink) => {
    const response = await fetch(`${API_ROOT}${permalink}.json`);
    const json = await response.json();
    const data = json[1].data.children.map(post => post.data);
    const names = data.map(comment => comment.author);
    const avatars = await Promise.all(names.map(async name => {
        if(name !== '[deleted]' && name !== undefined) {
            const profileData = await fetch(`${API_ROOT}/user/${name}/about.json`);
            const jsonProfileData = await profileData.json();
            return jsonProfileData.data.icon_img.replace(/\?.*$/, '');
        } else {
            return '';
        } 
    }));
    return [data, avatars];
};

export const getSearchResults = async (term) => {
    const response = await fetch(`${API_ROOT}/search.json?q=${term}&type=link`);
    const json = await response.json();

    return json.data.children.map(post => post.data);
}

export const getNextPage = async (page, category) => {
    const response = await fetch(`${API_ROOT}${category}.json?after=${page}`);
    const json = await response.json();
    
    return [json.data.children.map(post => post.data), json.data.after];
}