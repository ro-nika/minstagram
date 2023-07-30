migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ijn46uxymov2ot3")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "yankxszj",
    "name": "images",
    "type": "file",
    "required": true,
    "unique": false,
    "options": {
      "maxSelect": 10,
      "maxSize": 5000000,
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
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ijn46uxymov2ot3")

  // update
  collection.schema.addField(new SchemaField({
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
  }))

  return dao.saveCollection(collection)
})
