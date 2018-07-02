import RNFetchBlob from 'react-native-fetch-blob';
import { Platform } from 'react-native';

export function getMediaPath(path){
    path = RNFetchBlob.fs.dirs.DocumentDir + path;
    if(Platform.OS === 'android'){
        path = 'file://' + path;
    }
    return path;
}

export function getFileNameFromPath(url){
    var fileName = url.split('/').pop();
    return fileName;
}
export function saveImage(url){
    return new Promise((resolve, reject) => {
        var fileName = getFileNameFromPath(url);
        var originalRelativePath = '/Attachments/Application/' + fileName;
        var path = RNFetchBlob.fs.dirs.DocumentDir + originalRelativePath;
        RNFetchBlob.fs.exists(path).then((exists) => {
            if(exists) {
                resolve(originalRelativePath);
            } else {
                RNFetchBlob.fs.writeFile(path, url, 'uri')
                .then(() => {
                    resolve(originalRelativePath);
                })
                .catch((err) => {
                    reject(err);
                });
            }
        })
        .catch((error) => { 
            reject(error);
        });
    });
}