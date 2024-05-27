const axios = require('axios');
const cheerio = require('cheerio');

async function fetchFilesFromPublicFolder(folderId) {
  try {
    const url = `https://drive.google.com/drive/folders/${folderId}`;
    const response = await axios.get(url);
    
    if (response.status === 200) {
      const html = response.data;
      const $ = cheerio.load(html);
      const files = [];

      $('div[data-id]').each((index, element) => {
        const fileId = $(element).attr('data-id');
        const fileName = $(element).attr('data-tooltip');
        
        if (fileId && fileName) {
          files.push({
            id: fileId,
            name: fileName,
            link: `https://drive.google.com/file/d/${fileId}/view`
          });
        }
      });

      return files;
    }
  } catch (error) {
    console.error('Error fetching files:', error);
    return [];
  }
}

const folderId = 'YOUR_PUBLIC_FOLDER_ID';

fetchFilesFromPublicFolder(folderId).then(files => {
  console.log('Files:', files);
}).catch(error => {
  console.error('Error:', error);
});
