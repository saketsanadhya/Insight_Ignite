import Embed from "@editorjs/embed";
import List from "@editorjs/list";
import Image from "@editorjs/image";
import Header from "@editorjs/header";
import Quote from "@editorjs/quote";
import Marker from "@editorjs/marker";
import InlineCode from "@editorjs/inline-code";

const uploadImageByUrl=(e)=>{
    let link=new Promise((resolve,reject)=>{
        try {
            resolve(e)
        } catch (err) {
            reject(err)
        }
    })
    return link.then(url=>{
        return{
            success:1,
            file:{url}
        }
    })
}
export const Tools = {
    embed: Embed,
    list: {
        class: List,
        inlineToolbar: true
    },
    image:{
        class:Image,
        config:{
            uploader:{
                uploadByUrl:uploadImageByUrl,
            }
        }
    },
    header: {
        class:Header,
        config:{
            placeholder:"Type Heading...",
            levels:[2,3],
            defaultLevel:2
        }
    },
    quote:{
        class:Quote,
        inlineToolbar: true
    },
    marker: Marker,
    inlineCode: InlineCode 
};
