migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ijn46uxymov2ot3")

  // remove
  collection.schema.removeField("ms18pk0o")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ykrwuc3c",
    "name": "likes",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ijn46uxymov2ot3")

  // add
  collection.schema.addField(new SchemaField({
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
  }))

  // remove
  collection.schema.removeField("ykrwuc3c")

  return dao.saveCollection(collection)
})
