import http from "https";
import fs from "fs";
import path from "path";

const URL = "https://github.com/rafaelreis-hotmart/Audio-Sample-files/raw/master/sample.mp3";
const DEST = path.resolve(process.cwd(), "client/public/music.mp3");

function download(url: string, dest: string) {
    console.log(`Downloading ${url} to ${dest}...`);
    const file = fs.createWriteStream(dest);

    const request = http.get(url, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
    }, (response) => {
        if (response.statusCode === 301 || response.statusCode === 302) {
            console.log(`Redirecting to ${response.headers.location}...`);
            download(response.headers.location!, dest);
            return;
        }

        if (response.statusCode !== 200) {
            console.error(`Failed to download: ${response.statusCode}`);
            process.exit(1);
        }

        response.pipe(file);

        file.on('finish', () => {
            file.close();
            console.log('Download complete.');
            process.exit(0);
        });
    });

    request.on('error', (err) => {
        fs.unlink(dest, () => { });
        console.error(`Error: ${err.message}`);
        process.exit(1);
    });
}

download(URL, DEST);
