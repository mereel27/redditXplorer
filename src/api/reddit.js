export const API_ROOT = 'https://www.reddit.com';

export const getRedditPosts = async (category) => {
  const response = await fetch(`${API_ROOT}${category}.json`);
  const json = await response.json();

  return [json.data.children.map((post) => post.data), json.data.after];
};

export const getPostData = async (permalink) => {
  const response = await fetch(`${API_ROOT}${permalink}.json`);
  const json = await response.json();
  const data = json[1].data.children.map((post) => post.data);
  const names = data.map((comment) => comment.author);
  const avatars = await Promise.all(
    names.map(async (name) => {
      if (name !== '[deleted]' && name !== undefined) {
        const profileData = await fetch(`${API_ROOT}/user/${name}/about.json`);
        const jsonProfileData = await profileData.json();
        return jsonProfileData.data.icon_img.replace(/\?.*$/, '');
      } else {
        return '';
      }
    })
  );
  return [data, avatars];
};

export const getSearchResults = async (term) => {
  const response = await fetch(`${API_ROOT}/search.json?q=${term}&type=link`);
  const json = await response.json();

  return json.data.children.map((post) => post.data);
};

export const getNextPage = async (page, category) => {
  const response = await fetch(`${API_ROOT}${category}.json?after=${page}`);
  const json = await response.json();

  return [json.data.children.map((post) => post.data), json.data.after];
};

export const getNextComments = async (idList, permalink) => {
  const commentsList = await Promise.all(
    idList.map(async (link, index) => {
      const commentData = await fetch(`${API_ROOT}${permalink}${link}.json`);
      const jsonCommentData = await commentData.json();
      if (jsonCommentData[1].data.children.length > 0) {
        return jsonCommentData[1].data.children[0].data;
      } else {
        return null;
      }
    })
  );

  const data = commentsList.filter((comment) => comment !== null);
  const names = data.map((comment) => comment.author);

  const avatars = await Promise.all(
    names.map(async (name, index) => {
      if (name !== '[deleted]' && name !== undefined) {
        const profileData = await fetch(`${API_ROOT}/user/${name}/about.json`);
        const jsonProfileData = await profileData.json();
        if (!jsonProfileData.data.is_suspended) {
          return jsonProfileData.data.icon_img.replace(/\?.*$/, '');
        } else {
          return '';
        }
      } else {
        return '';
      }
    })
  );
  return [data, avatars];
};
