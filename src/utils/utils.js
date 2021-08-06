export const getTime = created => {
    const time = Math.round((Date.now() / 1000  - created) / 60);
    switch (true) {
      case time > 10080:
        return `${Math.round(time / 10080)} weeks ago`;
      case time > 1440:
        return `${Math.round(time / 1440)} days ago`;
      case time > 60:
        return `${Math.round(time / 60)} hrs ago`;
      case (time < 60 && time > 1) || time === 0:
        return `${time} mins ago`;
      case time === 1:
        return `${time} min ago`;
      default:
        break;
    } 
}

export const shortNumber = number => {
    const result = number > 1000 ? `${(number / 1000).toFixed(1)}K` : number;
    return result;
}

export const randomNumber = () => Math.floor(Math.random() * (8-4) + 4);

export const decode = html => {
  const text = document.createElement('span');
  text.innerHTML = html;
  return text.textContent || text.innerText;
}


export const getImgUrls = (items, metadata) => {
  const imgArray = items.map(data => {
    const imgType = metadata[data.media_id].m.replace('image/', '');
    const url = `https://i.redd.it/${data.media_id}.${imgType}`;
    return {
      original: url,
    };
  });
  return imgArray;
};