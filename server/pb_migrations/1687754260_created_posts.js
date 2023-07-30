migrate((db) => {
  const collection = new Collection({
    "id": "ijn46uxymov2ot3",
    "created": "2023-06-26 04:37:40.492Z",
    "updated": "2023-06-26 04:37:40.492Z",
    "name": "posts",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "cy8qnj5o",
        "name": "title",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": 3,
          "max": 100,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "sooyz2bc",
        "name": "description",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "alp69vnw",
        "name": "creator",
        "type": "relation",
        "required": true,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": []
        }
      },
      {
        "system": false,
        "id": "yy6fekx2",
        "name": "createdAt",
        "type": "date",
        "required": true,
        "unique": false,
        "options": {
          "min": "",
          "max": ""
        }
      },
      {
        "system": false,
        "id": "yankxszj",
        "name": "images",
        "type": "file",
        "required": true,
        "unique": false,
        "options": {
          "maxSelect": 10,
          "maxSize": 500000,
          "mimeTypes": [
            "image/png",
            "image/vnd.mozilla.apng",
            "image/jpeg",
            "image/heif",
            "image/heic-sequence",
            "image/heic",
            "image/heif-sequence"
          ],
          "thumbs": [],
          "protected": false
        }
      },
      {
        "system": false,
        "id": "ms18pk0o",
        "name": "likes",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": null,
          "displayFields": []
        }
      },
      {
        "system": false,
        "id": "gfkldcaz",
        "name": "comments",
        "type": "json",
        "required": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "yqdsqorx",
        "name": "location",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("ijn46uxymov2ot3");

  return dao.deleteCollection(collection);
})
