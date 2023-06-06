import fs from 'fs';
import path from 'path';
import { glob } from "glob";


let separator = path.sep;


async function getDirectories(src) {

    const paths = await glob(src + "/**/*", { dot: true });

    let longest = 0;
    let longestCollection = [];
    paths.forEach((item) => {
        const osConvertedItem = item.replace(new RegExp(/\//, "g"), "\\");;
        const lnh = osConvertedItem.split("\\").length;
        if (longest < lnh) {
            longest = lnh;
            longestCollection = [osConvertedItem];
        } else if (longest === lnh) {
            longestCollection.push(osConvertedItem);
        }
    });

    const longestCollectionItem = longestCollection[0];
    let deepestDirectoriesItem = longestCollectionItem.split("\\");
    deepestDirectoriesItem.splice(-1);
    deepestDirectoriesItem = deepestDirectoriesItem.join('\\');

    const newFile = path.join(deepestDirectoriesItem, 'file.txt');
    fs.writeFile(newFile, 'hello world', function (err, file) {
        console.log(`'file.txt' is created successfully in >> ${deepestDirectoriesItem}`);
    });


}

const nodeModulesDir = path.join("node_modules");
const deepestDirectory = await getDirectories(nodeModulesDir);
console.log(deepestDirectory);
















