import { version } from '../../package.json';
import { Router } from 'express';
import facets from './facets';
import 'babel-polyfill';

export function createFulfillmentMessages(res,title, author, category, url,intent){
    var fulfillmentMessagesList = [];
    fulfillmentMessagesList.push(creatCard(res,title, author, category, url));
    fulfillmentMessagesList.push(createQuickReplies(res,title, author, category,intent));
    return fulfillmentMessagesList;
}

export function creatCard(res, title, author, category, url) {
    return {
  
      "card": {
        "title": title,
        "subtitle": author,
        "imageUri": url,
        "buttons": [
          {
            //"text": "borrow " + title
          }
        ]
      },
      "platform": "FACEBOOK"
    };
}

export function createQuickReplies(res,title, author, category, intent){
    var action;
    switch(intent){
        case 'searchBook':
            action = ["borrow "+title,"return "+title];
            break;
    }
    return {
        "quickReplies": {
        //   "title": "asss",
          "quickReplies": action
        },
        "platform": "FACEBOOK"
      };
}
