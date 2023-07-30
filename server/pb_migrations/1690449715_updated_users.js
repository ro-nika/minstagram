migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "6cwx4ynb",
    "name": "favorites",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "ijn46uxymov2ot3",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "6cwx4ynb",
    "name": "favorits",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "ijn46uxymov2ot3",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
})
