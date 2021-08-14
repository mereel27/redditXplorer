export const getTime = created => {
    const time = Math.round((Date.now() / 1000  - created) / 60);
    switch (true) {
      case time > 10080:
        return `${Math.round(time / 10080)} weeks`;
      case time > 1440:
        return `${Math.round(time / 1440)} days`;
      case time > 60:
        return `${Math.round(time / 60)}h`;
      case (time < 60 && time > 1) || time === 0:
        return `${time}m`;
      case time === 1:
        return `${time}m`;
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

export const getVideoUrl = (link) => {
  let url =  link.match(/(?:youtube(?:-nocookie)?\.com\/(?:[^/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  if(url) {
    return `https://www.youtube-nocookie.com/embed/${url[1]}`;
  }
};