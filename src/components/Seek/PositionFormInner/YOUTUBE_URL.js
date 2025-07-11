const YOUTUBE_URL =(value)=>{
  if(/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/.test(value)){
    return {result:true};
  }

  return {result:false,errMsg:'Only YouTube links are supported. Please enter a valid YouTube URL。'};
};

export default YOUTUBE_URL;