export const API_ROOT = 'https://www.reddit.com';

export const getRedditPosts = async (category) => {
  const response = await fetch(`${API_ROOT}${category}.json`);
  const json = await response.json();
  const data = json.data.children.map((post) => post.data);
  const nextPage = json.data.after || '';

  return [data, nextPage];
};

export const getAvatars = async (data) => {
  let names = [];
  const getNames = (data) => {
    const temp = data.map((comment) => comment.data.author);
    names.push(...temp);
    const nextData = [];
    data.forEach((comment) =>
      comment.data.author && comment.data.replies
        ? nextData.push(...comment.data.replies.data.children)
        : null
    );
    if (nextData.length > 0) {
      getNames(nextData);
    }
  };
  getNames(data);
  const avatars = await Promise.all(
    [...new Set(names)]
      .filter((name) => name !== '[deleted]' && name !== undefined)
      .map(async (name) => {
        const profileData = await fetch(`${API_ROOT}/user/${name}/about.json`);
        const jsonProfileData = await profileData.json();
        if (profileData.ok && !jsonProfileData.data.is_suspended) {
          return [name, jsonProfileData.data.icon_img.replace(/\?.*$/, '')];
        } else {
          return [];
        }
      })
  );

  return Object.fromEntries(avatars);
};

export const getPostData = async (permalink) => {
  const response = await fetch(`${API_ROOT}${permalink}.json?depth=3`);
  const json = await response.json();
  const data = json[1].data.children;

  const avatars = await getAvatars(data);

  return [data, avatars];
};

export const getSubredditIcons = async (posts) => {
  const subreddits = posts.map((post) => post.subreddit_name_prefixed);
  const sorted = [...new Set(subreddits)];
  const uniqIcons = await Promise.all(
    sorted.map(async (name) => {
      let user = false;
      let subName = name;
      if (subName.substring(0, 2) === 'u/') {
        subName = `user/${name.substring(2)}`;
        user = true;
      }
      const subredditData = await fetch(`${API_ROOT}/${subName}/about.json`);
      const jsonSubredditData = await subredditData.json();
      const iconURL = user
        ? jsonSubredditData.data.icon_img.replace(/\?.*$/, '')
        : jsonSubredditData.data.icon_img ||
          jsonSubredditData.data.community_icon.replace(/\?.*$/, '');
      return [name, iconURL];
    })
  );

  const icons = subreddits.map((name) => {
    return Object.fromEntries(uniqIcons)[name];
  });

  return icons;
};

export const getSearchResults = async (term) => {
  const response = await fetch(`${API_ROOT}/search.json?q=${term}&type=link`);
  const json = await response.json();
  const data = json.data.children.map((post) => post.data);
  const nextPage = json.data.after || '';

  return [data, nextPage];
};

export const getNextPage = async (page, category) => {
  const response = await fetch(`${API_ROOT}${category}.json?after=${page}`);
  const json = await response.json();
  const data = json.data.children.map((post) => post.data);
  const nextPage = json.data.after || '';

  return [data, nextPage];
};

export const getNextComments = async (idList, permalink) => {
  const commentsList = await Promise.all(
    idList.map(async (link) => {
      const commentData = await fetch(`${API_ROOT}${permalink}${link}.json?depth=3`);
      const jsonCommentData = await commentData.json();
      if (jsonCommentData[1].data.children.length > 0) {
        return jsonCommentData[1].data.children[0];
      } else {
        return null;
      }
    })
  );
  const data = commentsList.filter((comment) => comment !== null);
  const avatars = await getAvatars(data);

  return [data, avatars];
};

export const getNextSearchResults = async (term, page) => {
  const response = await fetch(
    `${API_ROOT}/search.json?q=${term}&type=link&after=${page}`
  );
  const json = await response.json();
  const data = json.data.children.map((post) => post.data);
  const nextPage = json.data.after || '';

  return [data, nextPage];
};
