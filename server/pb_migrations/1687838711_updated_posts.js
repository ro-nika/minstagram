migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ijn46uxymov2ot3")

  // remove
  collection.schema.removeField("yy6fekx2")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ijn46uxymov2ot3")

  // add
  collection.schema.addField(new SchemaField({
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
  }))

  return dao.saveCollection(collection)
})
